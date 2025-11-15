import { Router } from "express";

import {
  createPaymentOrder,
  verifyPayment,
  paymentWebhook,
  createOrderValidators,
  verifyPaymentValidators,
} from "../controllers/paymentController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/create-order", authenticate, createOrderValidators, createPaymentOrder);
router.post("/verify", authenticate, verifyPaymentValidators, verifyPayment);
router.post("/webhooks/payment", paymentWebhook);

export default router;








