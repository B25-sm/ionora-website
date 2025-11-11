import { Router } from "express";

import {
  getAdminOrders,
  updateOrderStatus,
  createProduct,
  updateProduct,
  softDeleteProduct,
  updateOrderStatusValidators,
  createProductValidators,
  updateProductValidators,
  uploadProductImage,
} from "../controllers/adminController.js";
import { authenticate } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { uploadSingleProductImage } from "../utils/upload.js";

const router = Router();

router.use(authenticate, requireAdmin);

router.get("/orders", getAdminOrders);
router.put("/orders/:id/status", updateOrderStatusValidators, updateOrderStatus);
router.post("/products/upload-image", uploadSingleProductImage, uploadProductImage);
router.post("/products", createProductValidators, createProduct);
router.put("/products/:id", updateProductValidators, updateProduct);
router.delete("/products/:id", softDeleteProduct);

export default router;

