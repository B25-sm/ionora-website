import crypto from "crypto";
import { body, validationResult } from "express-validator";

import { query } from "../config/database.js";
import { createRazorpayOrder, verifyPaymentSignature } from "../utils/razorpay.js";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

export const createOrderValidators = [
  body("order_id").isUUID().withMessage("Valid order_id is required."),
  body("amount")
    .isFloat({ min: 1 })
    .withMessage("Amount must be greater than zero.")
    .toFloat(),
];

const fetchOrderById = async (orderId) => {
  const { rows } = await query(
    `
      SELECT
        id,
        user_id,
        order_number,
        total_amount,
        payment_status,
        razorpay_order_id
      FROM orders
      WHERE id = $1
    `,
    [orderId],
  );
  return rows[0];
};

export const createPaymentOrder = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { order_id: orderId, amount } = req.body;

  try {
    const order = await fetchOrderById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.user_id !== userId) {
      return res.status(403).json({ message: "You are not authorized to pay for this order." });
    }

    if (order.payment_status === "paid") {
      return res.status(400).json({ message: "Order has already been paid." });
    }

    const razorpayOrder = await createRazorpayOrder(order.order_number, amount);

    await query(
      `
        UPDATE orders
        SET razorpay_order_id = $1, updated_at = NOW()
        WHERE id = $2
      `,
      [razorpayOrder.id, order.id],
    );

    return res.status(200).json({
      razorpay_order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create payment order error:", error);
    if (error?.name === "RazorpayOrderError") {
      return res.status(502).json({
        message:
          process.env.NODE_ENV === "development"
            ? `Razorpay order creation failed: ${error.message}`
            : "Unable to initiate payment. Please try again shortly.",
      });
    }
    return res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? `Payment order creation failed: ${error.message ?? "Unknown error."}`
          : "Internal server error.",
    });
  }
};

export const verifyPaymentValidators = [
  body("razorpay_order_id").notEmpty().withMessage("razorpay_order_id is required."),
  body("razorpay_payment_id").notEmpty().withMessage("razorpay_payment_id is required."),
  body("razorpay_signature").notEmpty().withMessage("razorpay_signature is required."),
];

const fetchOrderByRazorpayId = async (razorpayOrderId) => {
  const { rows } = await query(
    `
      SELECT id, user_id, payment_status
      FROM orders
      WHERE razorpay_order_id = $1
    `,
    [razorpayOrderId],
  );
  return rows[0];
};

export const verifyPayment = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: paymentId, razorpay_signature } =
    req.body;

  try {
    const isValid = verifyPaymentSignature(razorpayOrderId, paymentId, razorpay_signature);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid payment signature." });
    }

    const order = await fetchOrderByRazorpayId(razorpayOrderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (order.user_id !== userId) {
      return res.status(403).json({ message: "You are not authorized to verify this order." });
    }

    if (order.payment_status === "paid") {
      return res.status(200).json({ message: "Payment already verified." });
    }

    await query(
      `
        UPDATE orders
        SET payment_status = 'paid', payment_id = $1, updated_at = NOW()
        WHERE id = $2
      `,
      [paymentId, order.id],
    );

    return res.status(200).json({ message: "Payment verified successfully." });
  } catch (error) {
    console.error("Verify payment error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const fetchOrderByPaymentId = async (paymentId) => {
  const { rows } = await query(
    `
      SELECT id, payment_status
      FROM orders
      WHERE payment_id = $1
    `,
    [paymentId],
  );
  return rows[0];
};

const markOrderAsPaid = async (orderId, paymentId, amount) => {
  await query(
    `
      UPDATE orders
      SET payment_status = 'paid', payment_id = $1, total_amount = COALESCE(total_amount, $2), updated_at = NOW()
      WHERE id = $3
    `,
    [paymentId, amount, orderId],
  );
};

export const paymentWebhook = async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const payload = JSON.stringify(req.body);

  if (!RAZORPAY_WEBHOOK_SECRET) {
    console.warn("RAZORPAY_WEBHOOK_SECRET is not set. Webhook signature verification skipped.");
  }

  if (RAZORPAY_WEBHOOK_SECRET) {
    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(payload)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid webhook signature." });
    }
  }

  const event = req.body;

  if (event.event === "payment.captured") {
    const paymentEntity = event.payload?.payment?.entity;
    const razorpayOrderId = paymentEntity?.order_id;
    const paymentId = paymentEntity?.id;
    const amount = paymentEntity?.amount / 100;

    if (!razorpayOrderId || !paymentId) {
      return res.status(400).json({ message: "Invalid webhook payload." });
    }

    try {
      const processed = await fetchOrderByPaymentId(paymentId);

      if (processed && processed.payment_status === "paid") {
        return res.status(200).json({ message: "Webhook already processed." });
      }

      const order = await fetchOrderByRazorpayId(razorpayOrderId);

      if (!order) {
        console.warn(`Order not found for Razorpay order ID: ${razorpayOrderId}`);
        return res.status(200).json({ message: "Webhook processed." });
      }

      if (order.payment_status === "paid") {
        return res.status(200).json({ message: "Webhook already processed." });
      }

      await markOrderAsPaid(order.id, paymentId, amount);

      return res.status(200).json({ message: "Payment captured." });
    } catch (error) {
      console.error("Webhook processing error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  return res.status(200).json({ message: "Webhook received." });
};

export default {
  createPaymentOrder,
  verifyPayment,
  paymentWebhook,
  createOrderValidators,
  verifyPaymentValidators,
};

