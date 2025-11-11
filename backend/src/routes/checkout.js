import { Router } from "express";

import {
  validateCheckout,
  applyCoupon,
  applyCouponValidators,
  createCheckoutOrder,
  processCheckoutPayment,
  createOrderValidators,
  checkoutPaymentValidators,
} from "../controllers/checkoutController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.post("/validate", validateCheckout);
router.post("/apply-coupon", applyCouponValidators, applyCoupon);
router.post("/create-order", createOrderValidators, createCheckoutOrder);
router.post("/payment", checkoutPaymentValidators, processCheckoutPayment);

export default router;

