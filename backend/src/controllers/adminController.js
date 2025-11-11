import { validationResult, body } from "express-validator";

import { query } from "../config/database.js";
import { orderShippedEmail, orderDeliveredEmail, sendEmail } from "../utils/email.js";
import { uploadFileToS3 } from "../utils/upload.js";

const parsePagination = (req, defaultLimit = 20) => {
  const page = Math.max(Number.parseInt(req.query.page ?? "1", 10), 1);
  const limit = Math.max(
    Math.min(Number.parseInt(req.query.limit ?? String(defaultLimit), 10), 100),
    1,
  );

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
};

const allowedStatusTransitions = {
  pending: ["confirmed", "processing", "cancelled"],
  confirmed: ["processing", "shipped", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered", "returned"],
  delivered: ["returned"],
  cancelled: [],
  returned: [],
};

const validateImageUrls = (value) => {
  const values = Array.isArray(value) ? value : [value];

  for (const item of values) {
    if (typeof item !== "string") {
      throw new Error("Images must be provided as URL strings.");
    }

    if (!item.trim()) {
      throw new Error("Image URLs cannot be empty.");
    }
  }

  return true;
};

const setStatusTimestamps = (status) => {
  const updates = [];

  if (status === "shipped") {
    updates.push("shipped_at = NOW()");
  }

  if (status === "delivered") {
    updates.push("delivered_at = NOW()");
  }

  return updates;
};

export const getAdminOrders = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Forbidden: admin access required." });
  }

  const { page, limit, offset } = parsePagination(req);
  const { status, user_id: userIdFilter } = req.query;

  const params = [];
  const conditions = [];

  if (status) {
    params.push(status);
    conditions.push(`o.status = $${params.length}`);
  }

  if (userIdFilter) {
    params.push(userIdFilter);
    conditions.push(`o.user_id = $${params.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM orders o
      ${whereClause}
    `;

    const { rows: countRows } = await query(countQuery, params);
    const total = Number.parseInt(countRows[0]?.total ?? "0", 10);

    const ordersQuery = `
      SELECT
        o.id,
        o.order_number,
        o.status,
        o.payment_status,
        o.total_amount,
        o.created_at,
        o.updated_at,
        o.confirmed_at,
        o.shipped_at,
        o.delivered_at,
        o.user_id,
        u.email AS user_email,
        u.full_name AS user_full_name,
        (
          SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id
        ) AS items_count
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `;

    const ordersParams = [...params, limit, offset];

    const { rows: orders } = await query(ordersQuery, ordersParams);

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return res.status(200).json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Admin get orders error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateOrderStatusValidators = [
  body("status")
    .isIn([
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "returned",
    ])
    .withMessage("Invalid status provided."),
  body("tracking_number").optional({ checkFalsy: true }).isString(),
  body("tracking_description").optional({ checkFalsy: true }).isString().isLength({ max: 1000 }),
];

export const updateOrderStatus = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Forbidden: admin access required." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status, tracking_number: trackingNumber, tracking_description: trackingDescription } =
    req.body;

  try {
    const { rows } = await query(
      `
        SELECT id, status, user_id, coupon_code
        FROM orders
        WHERE id = $1
      `,
      [id],
    );

    const order = rows[0];

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const allowedNextStatuses = allowedStatusTransitions[order.status] ?? [];
    if (!allowedNextStatuses.includes(status) && order.status !== status) {
      return res.status(400).json({
        message: `Cannot transition order from ${order.status} to ${status}.`,
      });
    }

    const timestampUpdates = setStatusTimestamps(status);
    const updateFields = ["status = $1", "updated_at = NOW()"];
    const updateValues = [status];
    let paramIndex = 2;

    if (trackingNumber) {
      updateFields.push(`tracking_number = $${paramIndex++}`);
      updateValues.push(trackingNumber);
    }

    for (const field of timestampUpdates) {
      updateFields.push(field);
    }

    const updateQuery = `
      UPDATE orders
      SET ${updateFields.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const { rows: updatedRows } = await query(updateQuery, [...updateValues, id]);
    const updatedOrder = updatedRows[0];

    if (order.status !== status) {
      const description =
        typeof trackingDescription === "string" && trackingDescription.trim().length
          ? trackingDescription.trim()
          : `Status updated to ${status}`;

      await query(
        `
          INSERT INTO order_tracking (order_id, status, description)
          VALUES ($1, $2, $3)
        `,
        [id, status, description],
      );
    }

    if (order.status !== status && status === "cancelled" && order.coupon_code) {
      await query(
        `
          UPDATE coupons
          SET usage_count = GREATEST(usage_count - 1, 0), updated_at = NOW()
          WHERE UPPER(code) = UPPER($1)
        `,
        [order.coupon_code],
      );
    }

    const { rows: userRows } = await query(
      `
        SELECT email, full_name
        FROM users
        WHERE id = $1
      `,
      [order.user_id],
    );

    const user = userRows[0];

    if (user) {
      if (status === "shipped") {
        const emailResult = await sendEmail(
          orderShippedEmail(updatedOrder, user, trackingNumber),
        );
        if (!emailResult.success && !emailResult.skipped) {
          console.error("Failed to send order shipped email:", emailResult.error);
        }
      } else if (status === "delivered") {
        const emailResult = await sendEmail(orderDeliveredEmail(updatedOrder, user));
        if (!emailResult.success && !emailResult.skipped) {
          console.error("Failed to send order delivered email:", emailResult.error);
        }
      }
    } else {
      console.warn(`User not found for order ${updatedOrder.order_number} while sending email.`);
    }

    return res.status(200).json({ order: updatedOrder });
  } catch (error) {
    console.error("Admin update order status error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const normalizeProductPayload = (payload, { forUpdate = false } = {}) => {
  const result = {};

  if (payload.name !== undefined) {
    result.name = payload.name;
  }

  if (payload.description !== undefined) {
    result.description = payload.description ?? null;
  }

  if (payload.price !== undefined) {
    const priceValue = Number.parseFloat(payload.price);
    if (!Number.isFinite(priceValue)) {
      throw new Error("Invalid price value.");
    }
    result.price = priceValue;
  } else if (!forUpdate) {
    throw new Error("Product price is required.");
  }

  if (payload.discount_percentage !== undefined) {
    const discountValue = Number.parseFloat(payload.discount_percentage);
    if (!Number.isFinite(discountValue)) {
      throw new Error("Invalid discount percentage.");
    }
    result.discount_percentage = discountValue;
  }

  if (payload.category !== undefined) {
    result.category = payload.category ?? null;
  }

  if (payload.stock_quantity !== undefined) {
    const stockValue = Number.parseInt(payload.stock_quantity, 10);
    if (!Number.isFinite(stockValue)) {
      throw new Error("Invalid stock quantity.");
    }
    result.stock_quantity = stockValue;
  }

  if (payload.images !== undefined) {
    const rawImages = Array.isArray(payload.images)
      ? payload.images
      : payload.images != null
      ? [payload.images]
      : [];

    const sanitizedImages = rawImages
      .map((value) => {
        if (typeof value !== "string") {
          throw new Error("Image URLs must be strings.");
        }

        const trimmed = value.trim();
        if (!trimmed) {
          return null;
        }

        return trimmed;
      })
      .filter(Boolean);

    result.images = sanitizedImages;
  }

  if (payload.specifications !== undefined) {
    if (typeof payload.specifications === "object" && payload.specifications !== null) {
      result.specifications = payload.specifications;
    } else if (payload.specifications) {
      try {
        result.specifications = JSON.parse(payload.specifications);
      } catch (error) {
        throw new Error("Invalid specifications JSON.");
      }
    } else {
      result.specifications = {};
    }
  }

  if (payload.is_active !== undefined) {
    result.is_active = Boolean(payload.is_active);
  } else if (!forUpdate) {
    result.is_active = true;
  }

  return result;
};

export const createProductValidators = [
  body("name").notEmpty().withMessage("Product name is required."),
  body("price").isFloat({ min: 0 }).withMessage("Product price must be >= 0."),
  body("discount_percentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100."),
  body("stock_quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be >= 0.")
    .toInt(),
  body("images").optional({ checkFalsy: true }).custom(validateImageUrls),
];

export const uploadProductImage = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Forbidden: admin access required." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required." });
  }

  try {
    const { url, key } = await uploadFileToS3(req.file, { folder: "products" });

    return res.status(201).json({ url, key });
  } catch (error) {
    console.error("Admin upload product image error:", error);
    return res.status(500).json({ message: "Failed to upload product image." });
  }
};

export const createProduct = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Forbidden: admin access required." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let productData;
  try {
    productData = normalizeProductPayload(req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const insertQuery = `
      INSERT INTO products (
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)
      RETURNING *
    `;

    const { rows } = await query(insertQuery, [
      productData.name,
      productData.description ?? null,
      productData.price,
      productData.discount_percentage ?? 0,
      productData.category ?? null,
      productData.stock_quantity ?? 0,
      productData.images ?? [],
      JSON.stringify(productData.specifications ?? {}),
      productData.is_active ?? true,
    ]);

    return res.status(201).json({ product: rows[0] });
  } catch (error) {
    console.error("Admin create product error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateProductValidators = [
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be >= 0."),
  body("discount_percentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100."),
  body("stock_quantity").optional().isInt({ min: 0 }).withMessage("Stock must be >= 0."),
  body("images").optional({ nullable: true }).custom(validateImageUrls),
];

export const updateProduct = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Forbidden: admin access required." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const productId = req.params.id;
  let productData;
  try {
    productData = normalizeProductPayload(req.body, { forUpdate: true });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(productData)) {
    if (value === undefined) continue;

    if (key === "specifications") {
      fields.push(`${key} = $${index++}::jsonb`);
      values.push(JSON.stringify(value));
    } else if (key === "images") {
      fields.push(`${key} = $${index++}`);
      values.push(Array.isArray(value) ? value : []);
    } else {
      fields.push(`${key} = $${index++}`);
      values.push(value);
    }
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No product fields provided to update." });
  }

  fields.push(`updated_at = NOW()`);

  const updateQuery = `
    UPDATE products
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *
  `;

  try {
    const { rows } = await query(updateQuery, [...values, productId]);

    if (!rows.length) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ product: rows[0] });
  } catch (error) {
    console.error("Admin update product error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const softDeleteProduct = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: "Forbidden: admin access required." });
  }

  const productId = req.params.id;

  try {
    const { rowCount } = await query(
      `
        UPDATE products
        SET is_active = FALSE, updated_at = NOW()
        WHERE id = $1
      `,
      [productId],
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ message: "Product deactivated successfully." });
  } catch (error) {
    console.error("Admin delete product error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default {
  getAdminOrders,
  updateOrderStatus,
  uploadProductImage,
  createProduct,
  updateProduct,
  softDeleteProduct,
  updateOrderStatusValidators,
  createProductValidators,
  updateProductValidators,
};

