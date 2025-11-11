import { Router } from "express";

import {
  register,
  registerValidators,
  login,
  loginValidators,
  forgotPassword,
  forgotPasswordValidators,
  resetPassword,
  resetPasswordValidators,
  changePassword,
  changePasswordValidators,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerValidators, register);
router.post("/login", loginValidators, login);
router.post("/forgot-password", forgotPasswordValidators, forgotPassword);
router.post("/reset-password", resetPasswordValidators, resetPassword);
router.put("/change-password", authenticate, changePasswordValidators, changePassword);

export default router;

