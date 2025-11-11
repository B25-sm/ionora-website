import { body, validationResult, param } from "express-validator";

import { query } from "../config/database.js";

const TAX_RATE = 0.18;
const SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

export const addToCartValidators = [
  body()
    .custom((value) => {
      if (
        !value ||
        (!value.product_id &&
          !(value.product && typeof value.product.external_id === "string" && value.product.external_id.trim() !== ""))
      ) {
        throw new Error("Either product_id or product.external_id is required.");
      }
      return true;
    })
    .withMessage("Product reference is required."),
  body("product_id")
    .optional({ nullable: true })
    .isUUID()
    .withMessage("Valid product_id is required."),
  body("product")
    .if(body("product_id").not().exists())
    .isObject()
    .withMessage("Product details must be provided when product_id is missing."),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1.")
    .toInt(),
  body("product.external_id")
    .if(body("product_id").not().exists())
    .isString()
    .withMessage("Product external_id must be a string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Product external_id cannot be empty."),
  body("product.name")
    .if(body("product_id").not().exists())
    .isString()
    .withMessage("Product name must be a string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty."),
  body("product.final_price")
    .if(body("product_id").not().exists())
    .isFloat({ min: 0 })
    .withMessage("Product price must be a positive number.")
    .toFloat(),
  body("product.images")
    .optional()
    .isArray({ max: 8 })
    .withMessage("Product images must be an array of URLs."),
  body("product.images.*")
    .optional()
    .isString()
    .withMessage("Product image must be a string."),
];

const fetchProduct = async (productId) => {
  const { rows } = await query(
    `
      SELECT id, name, final_price, stock_quantity, is_active
      FROM products
      WHERE id = $1
    `,
    [productId],
  );
  return rows[0];
};

const fetchCartItem = async (userId, productId) => {
  const { rows } = await query(
    `
      SELECT id, quantity
      FROM cart
      WHERE user_id = $1 AND product_id = $2
    `,
    [userId, productId],
  );
  return rows[0];
};

const upsertExternalProduct = async (productPayload) => {
  const {
    external_id: externalId,
    name,
    description,
    final_price: finalPrice,
    category,
    stock_quantity: stockQuantity,
    images,
    specifications,
  } = productPayload;

  const parsedStock = Number.parseInt(stockQuantity, 10);
  const normalizedStock = Number.isNaN(parsedStock) ? 999 : Math.max(parsedStock, 1);
  const parsedPrice = Number.parseFloat(finalPrice);
  const normalizedPrice = Number.isNaN(parsedPrice) ? 0 : Math.max(parsedPrice, 0);

  const { rows } = await query(
    `
      INSERT INTO products (
        id,
        external_id,
        name,
        description,
        price,
        discount_percentage,
        category,
        stock_quantity,
        images,
        specifications,
        is_active
      )
      VALUES (
        uuid_generate_v4(),
        $1,
        $2,
        $3,
        $4,
        0,
        $5,
        $6,
        $7,
        $8::jsonb,
        TRUE
      )
      ON CONFLICT (external_id) DO UPDATE
        SET name = EXCLUDED.name,
            description = EXCLUDED.description,
            price = EXCLUDED.price,
            category = EXCLUDED.category,
            stock_quantity = EXCLUDED.stock_quantity,
            images = EXCLUDED.images,
            specifications = EXCLUDED.specifications,
            is_active = TRUE,
            updated_at = NOW()
      RETURNING id, name, description, final_price, stock_quantity, is_active
    `,
    [
      externalId,
      name,
      description ?? null,
      normalizedPrice,
      category ?? null,
      normalizedStock ?? 999,
      images ?? [],
      JSON.stringify(specifications ?? {}),
    ],
  );

  return rows[0];
};

const ensureProductAvailable = (product) => {
  if (!product || !product.is_active) {
    return { status: 404, message: "Product not found." };
  }
  if (product.stock_quantity <= 0) {
    return { status: 400, message: "Product is out of stock." };
  }
  return null;
};

const ensureQuantityAvailable = (product, quantity) => {
  if (quantity > product.stock_quantity) {
    return {
      status: 400,
      message: `Only ${product.stock_quantity} units available in stock.`,
    };
  }
  return null;
};

const getCartItemsWithDetails = async (userId) => {
  const { rows } = await query(
    `
      SELECT
        c.id,
        c.quantity,
        c.added_at,
        p.id AS product_id,
        p.name,
        p.description,
        p.category,
        p.final_price,
        p.images,
        p.stock_quantity
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
      ORDER BY c.added_at DESC
    `,
    [userId],
  );
  return rows;
};

const formatCartSummary = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + Number.parseFloat(item.final_price) * item.quantity,
    0,
  );
  const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = parseFloat((subtotal + tax + shipping).toFixed(2));

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax,
    shipping,
    total,
  };
};

const buildCartResponse = (items) => {
  const formattedItems = items.map((item) => {
    const finalPrice = Number.parseFloat(item.final_price);
    const itemTotal = Number.isFinite(finalPrice) ? finalPrice * item.quantity : 0;

    return {
      id: item.id,
      quantity: item.quantity,
      added_at: item.added_at,
      product: {
        id: item.product_id,
        name: item.name,
        description: item.description,
        category: item.category,
        final_price: finalPrice,
        images: item.images,
        stock_quantity: item.stock_quantity,
      },
      item_total: parseFloat(itemTotal.toFixed(2)),
    };
  });

  const summary = formatCartSummary(formattedItems);

  return { items: formattedItems, summary };
};

export const addToCart = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { product_id: productId, product: productPayload, quantity } = req.body;

  try {
    let resolvedProductId = productId;
    let product = null;

    if (resolvedProductId) {
      product = await fetchProduct(resolvedProductId);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
    } else if (productPayload) {
      product = await upsertExternalProduct(productPayload);
      resolvedProductId = product?.id ?? null;
    }

    if (!resolvedProductId || !product) {
      return res.status(400).json({ message: "Unable to resolve product for cart." });
    }

    const availabilityError = ensureProductAvailable(product);
    if (availabilityError) {
      return res.status(availabilityError.status).json({ message: availabilityError.message });
    }

    const existingItem = await fetchCartItem(userId, resolvedProductId);
    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    const quantityError = ensureQuantityAvailable(product, newQuantity);
    if (quantityError) {
      return res.status(quantityError.status).json({ message: quantityError.message });
    }

    if (existingItem) {
      await query(
        `
          UPDATE cart
          SET quantity = $1, added_at = NOW()
          WHERE id = $2
        `,
        [newQuantity, existingItem.id],
      );
    } else {
      await query(
        `
          INSERT INTO cart (user_id, product_id, quantity)
          VALUES ($1, $2, $3)
        `,
        [userId, resolvedProductId, quantity],
      );
    }

    const items = await getCartItemsWithDetails(userId);
    return res.status(200).json(buildCartResponse(items));
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const items = await getCartItemsWithDetails(userId);
    return res.status(200).json(buildCartResponse(items));
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateCartItemValidators = [
  param("id").isUUID().withMessage("Valid cart item ID is required."),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1.")
    .toInt(),
];

const fetchCartItemById = async (cartItemId, userId) => {
  const { rows } = await query(
    `
      SELECT c.id, c.product_id, c.quantity, p.stock_quantity, p.is_active
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.id = $1 AND c.user_id = $2
    `,
    [cartItemId, userId],
  );
  return rows[0];
};

export const updateCartItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const cartItemId = req.params.id;
  const { quantity } = req.body;

  try {
    const cartItem = await fetchCartItemById(cartItemId, userId);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    if (!cartItem.is_active) {
      return res.status(400).json({ message: "Product is no longer available." });
    }

    const quantityError = ensureQuantityAvailable(
      { stock_quantity: cartItem.stock_quantity },
      quantity,
    );
    if (quantityError) {
      return res.status(quantityError.status).json({ message: quantityError.message });
    }

    await query(
      `
        UPDATE cart
        SET quantity = $1
        WHERE id = $2
      `,
      [quantity, cartItemId],
    );

    return res.status(200).json({ message: "Cart item updated successfully." });
  } catch (error) {
    console.error("Update cart item error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteCartItemValidators = [
  param("id").isUUID().withMessage("Valid cart item ID is required."),
];

export const deleteCartItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const cartItemId = req.params.id;

  try {
    const { rowCount } = await query(
      `
        DELETE FROM cart
        WHERE id = $1 AND user_id = $2
      `,
      [cartItemId, userId],
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    return res.status(200).json({ message: "Cart item removed successfully." });
  } catch (error) {
    console.error("Delete cart item error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    await query(
      `
        DELETE FROM cart
        WHERE user_id = $1
      `,
      [userId],
    );

    return res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    console.error("Clear cart error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  addToCartValidators,
  updateCartItemValidators,
  deleteCartItemValidators,
};

