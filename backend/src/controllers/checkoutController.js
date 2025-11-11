import { body, validationResult } from "express-validator";

import pool, { query } from "../config/database.js";
import { createRazorpayOrder, verifyPaymentSignature } from "../utils/razorpay.js";
import {
  calculateOrderTotal,
  validateCartStock,
  generateOrderNumber,
  lockInventory,
  unlockInventory,
} from "../utils/orderHelper.js";
import { orderConfirmationEmail, sendEmail } from "../utils/email.js";

const runQuery = (client, text, params = []) => {
  if (client && typeof client.query === "function") {
    return client.query(text, params);
  }

  return query(text, params);
};

const normalizeCouponCode = (code = "") => code.trim().toUpperCase();

const sanitizeCouponResponse = (coupon) => {
  if (!coupon) {
    return null;
  }

  const remainingUses =
    coupon.max_uses == null
      ? null
      : Math.max(Number(coupon.max_uses) - Number(coupon.usage_count ?? 0), 0);

  return {
    code: coupon.code,
    discount_type: coupon.discount_type,
    discount_value: Number.parseFloat(coupon.discount_value),
    min_order_value:
      coupon.min_order_value == null ? 0 : Number.parseFloat(coupon.min_order_value),
    max_uses: coupon.max_uses == null ? null : Number(coupon.max_uses),
    remaining_uses: remainingUses,
    valid_from: coupon.valid_from,
    valid_until: coupon.valid_until,
  };
};

const createCouponError = (message, code = "INVALID_COUPON") => {
  const error = new Error(message);
  error.code = code;
  error.isCouponError = true;
  return error;
};

const fetchCouponByCode = async (code, client) => {
  const normalized = normalizeCouponCode(code);

  if (!normalized) {
    throw createCouponError("Coupon code is required.");
  }

  const { rows } = await runQuery(
    client,
    `
      SELECT id,
             code,
             discount_type,
             discount_value,
             min_order_value,
             max_uses,
             usage_count,
             valid_from,
             valid_until,
             is_active
      FROM coupons
      WHERE UPPER(code) = $1
    `,
    [normalized],
  );

  return rows[0];
};

const validateCouponForSubtotal = async (code, subtotal, client) => {
  const coupon = await fetchCouponByCode(code, client);

  if (!coupon) {
    throw createCouponError("Coupon not found or inactive.");
  }

  if (!coupon.is_active) {
    throw createCouponError("Coupon is inactive.");
  }

  const now = new Date();

  if (coupon.valid_from && new Date(coupon.valid_from) > now) {
    throw createCouponError("Coupon is not yet valid.");
  }

  if (coupon.valid_until && new Date(coupon.valid_until) < now) {
    throw createCouponError("Coupon has expired.");
  }

  const minOrderValue = Number(coupon.min_order_value ?? 0);
  if (Number.isFinite(minOrderValue) && subtotal < minOrderValue) {
    throw createCouponError(`Minimum order value of INR ${minOrderValue.toFixed(2)} required.`);
  }

  const maxUses = coupon.max_uses == null ? null : Number(coupon.max_uses);
  const usageCount = Number(coupon.usage_count ?? 0);
  if (maxUses !== null && usageCount >= maxUses) {
    throw createCouponError("Coupon usage limit reached.", "COUPON_USAGE_LIMIT");
  }

  return coupon;
};

const withTransaction = async (callback) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getCartItemsForUser = async (userId, client) => {
  const { rows } = await runQuery(
    client,
    `
      SELECT
        c.id,
        c.product_id,
        c.quantity,
        p.name,
        p.description,
        p.price,
        p.discount_percentage,
        p.final_price,
        p.stock_quantity,
        p.images,
        p.is_active
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
    `,
    [userId],
  );

  return rows;
};

const summarizeCartItems = (items) =>
  items.map((item) => ({
    id: item.id,
    product_id: item.product_id,
    quantity: item.quantity,
    name: item.name,
    description: item.description,
    price: Number.parseFloat(item.price),
    final_price: Number.parseFloat(item.final_price),
    discount_percentage: Number.parseFloat(item.discount_percentage),
    stock_quantity: item.stock_quantity,
    images: item.images,
    is_active: item.is_active,
    item_total: Number.parseFloat(item.final_price) * item.quantity,
  }));

const detectPriceChanges = (items) => {
  const changes = [];

  for (const item of items) {
    if (!item.is_active) {
      changes.push({
        product_id: item.product_id,
        issue: "inactive",
        message: `${item.name} is no longer available.`,
      });
    }

    if (item.stock_quantity < item.quantity) {
      changes.push({
        product_id: item.product_id,
        issue: "stock",
        message: `${item.name} has only ${item.stock_quantity} units left.`,
      });
    }
  }

  return changes;
};

export const validateCheckout = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const cartItems = await getCartItemsForUser(userId);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const summarizedItems = summarizeCartItems(cartItems);
    const issues = detectPriceChanges(cartItems);
    const { valid, insufficient } = await validateCartStock(cartItems);

    if (insufficient.length > 0) {
      issues.push(
        ...insufficient.map((item) => ({
          product_id: item.product_id,
          issue: "stock",
          message: `Requested quantity ${item.requested} exceeds available ${item.available}.`,
        })),
      );
    }

    const pricingItems = summarizedItems.map((item) => ({
      price: item.final_price,
      quantity: item.quantity,
    }));

    const totals = calculateOrderTotal(pricingItems);

    return res.status(200).json({
      valid: valid && issues.length === 0,
      items: summarizedItems,
      summary: totals,
      issues,
    });
  } catch (error) {
    console.error("Checkout validation error:", error);
    return res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? `Checkout failed: ${error.message ?? "Unknown error."}`
          : "Internal server error.",
    });
  }
};

export const applyCouponValidators = [
  body("code").trim().notEmpty().withMessage("Coupon code is required."),
];

export const applyCoupon = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { code } = req.body;

  try {
    const cartItems = await getCartItemsForUser(userId);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const summarizedItems = summarizeCartItems(cartItems);
    const pricingItems = summarizedItems.map((item) => ({
      price: item.final_price,
      quantity: item.quantity,
    }));

    const baseTotals = calculateOrderTotal(pricingItems);
    const coupon = await validateCouponForSubtotal(code, baseTotals.subtotal, null);
    const totals = calculateOrderTotal(pricingItems, { coupon });

    return res.status(200).json({
      coupon: sanitizeCouponResponse(coupon),
      summary: totals,
    });
  } catch (error) {
    if (error.isCouponError) {
      return res.status(400).json({ message: error.message });
    }

    console.error("Apply coupon error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createOrderValidators = [
  body("shipping_address_id")
    .isUUID()
    .withMessage("Valid shipping_address_id is required."),
  body("payment_method")
    .isIn(["cod", "razorpay"])
    .withMessage("Payment method must be 'cod' or 'razorpay'."),
  body("coupon_code").optional({ checkFalsy: true }).isString().isLength({ max: 64 }),
];

export const createCheckoutOrder = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    shipping_address_id: shippingAddressId,
    payment_method: paymentMethod,
    coupon_code: couponCodeInput,
  } = req.body;

  try {
    const result = await withTransaction(async (transactionClient) => {
      const cartItems = await getCartItemsForUser(userId, transactionClient);

      if (cartItems.length === 0) {
        throw new Error("CART_EMPTY");
      }

      const { valid, insufficient } = await validateCartStock(cartItems);

      if (!valid) {
        const error = new Error("INSUFFICIENT_STOCK");
        error.details = insufficient;
        throw error;
      }

      const orderNumber = await generateOrderNumber();
      const summarizedItems = summarizeCartItems(cartItems);
      const pricingItems = summarizedItems.map((item) => ({
        price: item.final_price,
        quantity: item.quantity,
      }));

      const baseTotals = calculateOrderTotal(pricingItems);

      let appliedCoupon = null;
      let totals = baseTotals;

      if (couponCodeInput) {
        try {
          appliedCoupon = await validateCouponForSubtotal(
            couponCodeInput,
            baseTotals.subtotal,
            transactionClient,
          );
        } catch (couponError) {
          if (couponError.isCouponError) {
            throw couponError;
          }
          throw new Error("COUPON_VALIDATION_FAILED");
        }

        totals = calculateOrderTotal(pricingItems, { coupon: appliedCoupon });
      }

      const insertOrderQuery = `
        INSERT INTO orders (
          user_id,
          order_number,
          status,
          shipping_address_id,
          shipping_method,
          subtotal,
          tax_amount,
          shipping_charge,
          discount_amount,
          total_amount,
          coupon_code,
          payment_method,
          payment_status
        )
        VALUES ($1, $2, 'pending', $3, 'standard', $4, $5, $6, $7, $8, $9, $10, 'pending')
        RETURNING id, order_number
      `;

      const { rows: orderRows } = await transactionClient.query(insertOrderQuery, [
        userId,
        orderNumber,
        shippingAddressId,
        totals.subtotal,
        totals.tax,
        totals.shipping,
        totals.discount,
        totals.total,
        appliedCoupon ? appliedCoupon.code : null,
        paymentMethod,
      ]);

      const order = orderRows[0];

      if (appliedCoupon) {
        const { rowCount } = await transactionClient.query(
          `
            UPDATE coupons
            SET usage_count = usage_count + 1, updated_at = NOW()
            WHERE id = $1 AND (max_uses IS NULL OR usage_count < max_uses)
          `,
          [appliedCoupon.id],
        );

        if (rowCount === 0) {
          throw createCouponError("Coupon usage limit reached.", "COUPON_USAGE_LIMIT");
        }

        appliedCoupon.usage_count = Number(appliedCoupon.usage_count ?? 0) + 1;
      }

      await transactionClient.query(
        `
          INSERT INTO order_tracking (order_id, status, description)
          VALUES ($1, 'pending', 'Order placed')
        `,
        [order.id],
      );

      const insertOrderItemsQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, subtotal)
        VALUES ($1, $2, $3, $4, $5)
      `;

      for (const item of summarizedItems) {
        const itemSubtotal = Number.parseFloat((item.final_price * item.quantity).toFixed(2));
        await transactionClient.query(insertOrderItemsQuery, [
          order.id,
          item.product_id,
          item.quantity,
          item.final_price,
          itemSubtotal,
        ]);
      }

      await lockInventory(transactionClient, cartItems);

      const razorpayOrder = await createRazorpayOrder(order.order_number, totals.total);

      await transactionClient.query(
        `
          UPDATE orders
          SET razorpay_order_id = $1
          WHERE id = $2
        `,
        [razorpayOrder.id, order.id],
      );

      await transactionClient.query(
        `
          DELETE FROM cart
          WHERE user_id = $1
        `,
        [userId],
      );

      return {
        order,
        totals,
        razorpayOrder,
        coupon: appliedCoupon ? sanitizeCouponResponse(appliedCoupon) : null,
      };
    });

    return res.status(201).json({
      order: {
        id: result.order.id,
        order_number: result.order.order_number,
        totals: result.totals,
        coupon: result.coupon,
      },
      razorpay_order_id: result.razorpayOrder.id,
      amount: result.razorpayOrder.amount,
      currency: result.razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create checkout order error:", error);

    if (error?.name === "RazorpayOrderError") {
      return res.status(502).json({
        message:
          process.env.NODE_ENV === "development"
            ? `Razorpay order creation failed: ${error.message}`
            : "Unable to initiate payment. Please try again shortly.",
      });
    }

    if (error.message === "CART_EMPTY") {
      return res.status(400).json({ message: "Cart is empty." });
    }

    if (error.message === "INSUFFICIENT_STOCK") {
      return res.status(400).json({
        message: "Insufficient stock for some items.",
        insufficient: error.details,
      });
    }

    if (error.isCouponError) {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "COUPON_VALIDATION_FAILED") {
      return res.status(400).json({ message: "Unable to validate coupon. Please try again." });
    }

    return res.status(500).json({ message: "Internal server error." });
  }
};

export const checkoutPaymentValidators = [
  body("order_id").isUUID().withMessage("Valid order_id is required."),
  body("razorpay_order_id").notEmpty().withMessage("razorpay_order_id is required."),
  body("razorpay_payment_id").notEmpty().withMessage("razorpay_payment_id is required."),
  body("razorpay_signature").notEmpty().withMessage("razorpay_signature is required."),
];

const fetchOrderByIdForUser = async (orderId, userId, client) => {
  const { rows } = await runQuery(
    client,
    `
      SELECT id, user_id, status, payment_status, razorpay_order_id, order_number, total_amount
      FROM orders
      WHERE id = $1 AND user_id = $2
    `,
    [orderId, userId],
  );
  return rows[0];
};

const fetchOrderItems = async (orderId, client) => {
  const { rows } = await runQuery(
    client,
    `
      SELECT oi.product_id, oi.quantity, oi.price_at_purchase, oi.subtotal, p.name, p.final_price
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `,
    [orderId],
  );
  return rows;
};

export const processCheckoutPayment = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    order_id: orderId,
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const order = await fetchOrderByIdForUser(orderId, userId, client);

    if (!order) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.razorpay_order_id !== razorpayOrderId) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Razorpay order mismatch." });
    }

    if (order.payment_status === "paid" || order.status === "confirmed") {
      await client.query("ROLLBACK");
      return res.status(200).json({ message: "Order already processed." });
    }

    const signatureValid = verifyPaymentSignature(razorpayOrderId, paymentId, signature);

    if (!signatureValid) {
      await client.query(
        `
          UPDATE orders
          SET payment_status = 'failed', updated_at = NOW()
          WHERE id = $1
        `,
        [order.id],
      );

      await unlockInventory(client, order.id);

      await client.query("COMMIT");

      return res.status(400).json({ message: "Invalid payment signature." });
    }

    await client.query(
      `
        UPDATE orders
        SET status = 'confirmed',
            payment_status = 'paid',
            payment_id = $1,
            confirmed_at = NOW(),
            updated_at = NOW()
        WHERE id = $2
      `,
      [paymentId, order.id],
    );

    await client.query(
      `
        DELETE FROM cart
        WHERE user_id = $1
      `,
      [userId],
    );

    await client.query("COMMIT");

    const orderItems = await fetchOrderItems(order.id, client);
    const updatedOrder = {
      ...order,
      status: "confirmed",
      payment_status: "paid",
    };

    const { rows: userRows } = await runQuery(
      client,
      `
        SELECT email, full_name
        FROM users
        WHERE id = $1
      `,
      [order.user_id],
    );

    const user = userRows[0];

    if (user) {
      const emailResult = await sendEmail(
        orderConfirmationEmail(
          {
            ...updatedOrder,
            items: orderItems,
          },
          user,
        ),
      );

      if (!emailResult.success && !emailResult.skipped) {
        console.error("Failed to send order confirmation email:", emailResult.error);
      }
    } else {
      console.warn("User data not found for order while sending confirmation email:", order.id);
    }

    return res.status(200).json({
      message: "Payment processed successfully.",
      order: {
        id: order.id,
        order_number: order.order_number,
        status: "confirmed",
        payment_status: "paid",
        total_amount: order.total_amount,
        items: orderItems,
      },
    });
  } catch (error) {
    console.error("Checkout payment processing error:", error);
    await client.query("ROLLBACK");
    return res.status(500).json({ message: "Internal server error." });
  } finally {
    client.release();
  }
};

export default {
  validateCheckout,
  applyCoupon,
  applyCouponValidators,
  createCheckoutOrder,
  createOrderValidators,
  processCheckoutPayment,
  checkoutPaymentValidators,
};

