import Razorpay from "razorpay";
import crypto from "crypto";

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set.");
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const extractRazorpayErrorMessage = (error) => {
  if (!error || typeof error !== "object") {
    return null;
  }

  if ("description" in error && typeof error.description === "string") {
    return error.description;
  }

  if ("error" in error && error.error && typeof error.error === "object") {
    if ("description" in error.error && typeof error.error.description === "string") {
      return error.error.description;
    }
    if ("message" in error.error && typeof error.error.message === "string") {
      return error.error.message;
    }
  }

  if ("message" in error && typeof error.message === "string") {
    return error.message;
  }

  return null;
};

export const createRazorpayOrder = async (orderId, amount) => {
  if (!orderId) {
    throw new Error("orderId is required to create a Razorpay order.");
  }
  if (!amount || Number.isNaN(Number(amount))) {
    throw new Error("Valid amount is required to create a Razorpay order.");
  }

  const options = {
    amount: Math.round(Number(amount) * 100), // convert to paisa
    currency: "INR",
    receipt: String(orderId),
    payment_capture: 1,
  };

  try {
    return await razorpay.orders.create(options);
  } catch (error) {
    const message =
      extractRazorpayErrorMessage(error) || "Failed to create Razorpay order. Please try again.";
    console.error("Razorpay order creation error:", {
      message,
      statusCode: error?.statusCode ?? error?.status ?? null,
      original: error,
    });
    const wrappedError = new Error(message);
    wrappedError.name = "RazorpayOrderError";
    if (error && typeof error === "object") {
      wrappedError.statusCode = error.statusCode ?? error.status ?? null;
      wrappedError.details = error.error ?? error;
    }
    throw wrappedError;
  }
};

export const verifyPaymentSignature = (
  razorpayOrderId,
  razorpayPaymentId,
  signature,
) => {
  if (!razorpayOrderId || !razorpayPaymentId || !signature) {
    return false;
  }

  const hmac = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET);
  hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
  const generatedSignature = hmac.digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(generatedSignature),
    Buffer.from(signature),
  );
};

export default {
  createRazorpayOrder,
  verifyPaymentSignature,
};

