import { Router } from "express";

import {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  addToCartValidators,
  updateCartItemValidators,
  deleteCartItemValidators,
} from "../controllers/cartController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.post("/", addToCartValidators, addToCart);
router.get("/", getCart);
router.put("/:id", updateCartItemValidators, updateCartItem);
router.delete("/:id", deleteCartItemValidators, deleteCartItem);
router.delete("/", clearCart);

export default router;

