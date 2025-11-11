import { query } from "../config/database.js";

const TAX_RATE = 0.18;
const SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

const roundCurrency = (value) => Number.parseFloat(Number(value).toFixed(2));

export const generateOrderNumber = async () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const prefix = `ORD${datePart}`;

  const { rows } = await query(
    `
      SELECT order_number
      FROM orders
      WHERE order_number LIKE $1
      ORDER BY order_number DESC
      LIMIT 1
    `,
    [`${prefix}%`],
  );

  if (rows.length === 0) {
    return `${prefix}001`;
  }

  const lastNumber = rows[0].order_number;
  const sequence = Number.parseInt(lastNumber.slice(-3), 10) + 1;
  return `${prefix}${sequence.toString().padStart(3, "0")}`;
};

export const computeCouponDiscount = (subtotal, coupon) => {
  if (!coupon || !subtotal || Number.isNaN(Number(subtotal))) {
    return 0;
  }

  const normalizedSubtotal = Math.max(Number(subtotal), 0);
  const type = coupon.discount_type;
  const value = Number(coupon.discount_value);

  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  let discount = 0;

  if (type === "percentage") {
    discount = normalizedSubtotal * (value / 100);
  } else if (type === "fixed") {
    discount = value;
  }

  if (!Number.isFinite(discount) || discount <= 0) {
    return 0;
  }

  return roundCurrency(Math.min(discount, normalizedSubtotal));
};

export const calculateOrderTotal = (items, { coupon } = {}) => {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      subtotal: 0,
      discount: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    };
  }

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price || item.final_price || 0) * Number(item.quantity || 0),
    0,
  );

  const roundedSubtotal = roundCurrency(subtotal);
  const discount = computeCouponDiscount(roundedSubtotal, coupon);
  const discountedSubtotal = roundCurrency(Math.max(roundedSubtotal - discount, 0));
  const tax = roundCurrency(discountedSubtotal * TAX_RATE);
  const shipping = discountedSubtotal >= SHIPPING_THRESHOLD || discountedSubtotal === 0 ? 0 : SHIPPING_FEE;
  const total = roundCurrency(discountedSubtotal + tax + shipping);

  return {
    subtotal: roundedSubtotal,
    discount,
    tax,
    shipping,
    total,
  };
};

export const validateCartStock = async (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return { valid: true, insufficient: [] };
  }

  const insufficient = [];

  for (const item of cartItems) {
    const { rows } = await query(
      `
        SELECT id, stock_quantity
        FROM products
        WHERE id = $1 AND is_active = TRUE
      `,
      [item.product_id],
    );

    const product = rows[0];

    if (!product || product.stock_quantity < item.quantity) {
      insufficient.push({
        product_id: item.product_id,
        available: product?.stock_quantity ?? 0,
        requested: item.quantity,
      });
    }
  }

  return {
    valid: insufficient.length === 0,
    insufficient,
  };
};

export const lockInventory = async (client, cartItems) => {
  for (const item of cartItems) {
    await client.query(
      `
        UPDATE products
        SET stock_quantity = stock_quantity - $1
        WHERE id = $2 AND stock_quantity >= $1
      `,
      [item.quantity, item.product_id],
    );
  }
};

export const unlockInventory = async (client, orderId) => {
  const { rows } = await client.query(
    `
      SELECT product_id, quantity
      FROM order_items
      WHERE order_id = $1
    `,
    [orderId],
  );

  for (const item of rows) {
    await client.query(
      `
        UPDATE products
        SET stock_quantity = stock_quantity + $1
        WHERE id = $2
      `,
      [item.quantity, item.product_id],
    );
  }
};

export default {
  generateOrderNumber,
  calculateOrderTotal,
  computeCouponDiscount,
  validateCartStock,
  lockInventory,
  unlockInventory,
};

