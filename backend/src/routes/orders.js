import { Router } from "express";

import {
  getOrders,
  getOrderById,
  getOrderTracking,
  cancelOrder,
} from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/:id/tracking", getOrderTracking);
router.post("/:id/cancel", cancelOrder);

export default router;

