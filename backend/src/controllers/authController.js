import crypto from "crypto";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

import { query } from "../config/database.js";
import { generateToken } from "../utils/jwt.js";
import {
  welcomeEmail,
  welcomeBackEmail,
  passwordResetEmail,
  sendEmail,
} from "../utils/email.js";
import {
  sendWelcomeWhatsAppMessage,
  sendWelcomeBackWhatsAppMessage,
} from "../utils/whatsapp.js";

const SALT_ROUNDS = Number.parseInt(process.env.SALT_ROUNDS ?? "10", 10);

export const registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required."),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isLength({ min: 5 })
    .withMessage("Phone number must be at least 5 characters long."),
];

export const loginValidators = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required.")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, full_name, phone } = req.body;
  const trimmedPhone = (phone ?? "").trim();

  try {
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (existingUser.rowCount > 0) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const insertUserQuery = `
      INSERT INTO users (email, password_hash, full_name, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, full_name, phone, email_verified, created_at, updated_at, last_login
    `;

    const { rows } = await query(insertUserQuery, [
      email,
      passwordHash,
      full_name,
      trimmedPhone,
    ]);

    const user = rows[0];

    const frontendOrigin = process.env.FRONTEND_ORIGIN?.replace(/\/$/, "") ?? "";
    const verificationLink = frontendOrigin
      ? `${frontendOrigin}/verify-email?email=${encodeURIComponent(user.email)}`
      : "#";
    const hasVerificationLink = Boolean(
      verificationLink && verificationLink !== "#",
    );

    const welcomeEmailResult = await sendEmail(
      welcomeEmail(user.full_name, user.email, verificationLink),
    );
    if (!welcomeEmailResult.success && !welcomeEmailResult.skipped) {
      console.error("Failed to send welcome email:", welcomeEmailResult.error);
    }

    const welcomeWhatsAppResult = await sendWelcomeWhatsAppMessage({
      name: user.full_name,
      phone: trimmedPhone,
      verificationLink: hasVerificationLink ? verificationLink : undefined,
    });
    if (!welcomeWhatsAppResult.success && !welcomeWhatsAppResult.skipped) {
      console.error(
        "Failed to send welcome WhatsApp message:",
        welcomeWhatsAppResult.error,
      );
    }

    const token = generateToken(user.id);

    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email is already registered." });
    }

    console.error("User registration error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const frontendOrigin = process.env.FRONTEND_ORIGIN?.replace(/\/$/, "") ?? "";
    const { rows } = await query(
      `
        SELECT id, email, password_hash, full_name, phone, email_verified, created_at, updated_at, last_login
        FROM users
        WHERE email = $1
      `,
      [email],
    );

    const userRecord = rows[0];

    if (!userRecord) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(password, userRecord.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(userRecord.id);

    await query(
      `
        UPDATE users
        SET last_login = NOW(), updated_at = NOW()
        WHERE id = $1
      `,
      [userRecord.id],
    );

    const welcomeBackEmailResult = await sendEmail(
      welcomeBackEmail(userRecord.full_name, userRecord.email),
    );
    if (!welcomeBackEmailResult.success && !welcomeBackEmailResult.skipped) {
      console.error("Failed to send welcome-back email:", welcomeBackEmailResult.error);
    }

    const welcomeBackWhatsAppResult = await sendWelcomeBackWhatsAppMessage({
      name: userRecord.full_name,
      phone: userRecord.phone,
      dashboardLink: frontendOrigin ? `${frontendOrigin}/dashboard` : undefined,
    });
    if (!welcomeBackWhatsAppResult.success && !welcomeBackWhatsAppResult.skipped) {
      console.error(
        "Failed to send welcome-back WhatsApp message:",
        welcomeBackWhatsAppResult.error,
      );
    }

    const { password_hash: _passwordHash, ...user } = userRecord;

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error("User login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const forgotPasswordValidators = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required.")
    .normalizeEmail(),
];

export const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const { rows } = await query(
      `
        SELECT id, email
        FROM users
        WHERE email = $1
      `,
      [email],
    );

    const user = rows[0];

    if (!user) {
      // Avoid user enumeration
      return res.status(200).json({ message: "If that email exists, we have sent a reset link." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await query("DELETE FROM password_reset_tokens WHERE user_id = $1", [user.id]);

    await query(
      `
        INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
        VALUES ($1, $2, $3)
      `,
      [user.id, tokenHash, expiresAt],
    );

    const frontendOrigin = process.env.FRONTEND_ORIGIN?.replace(/\/$/, "") ?? "";
    const resetLink = frontendOrigin
      ? `${frontendOrigin}/reset-password?token=${token}&email=${encodeURIComponent(user.email)}`
      : `https://example.com/reset-password?token=${token}`;

    const resetEmailResult = await sendEmail(
      passwordResetEmail(user.full_name, user.email, resetLink),
    );

    if (!resetEmailResult.success && !resetEmailResult.skipped) {
      console.error("Failed to send password reset email:", resetEmailResult.error);
    }

    return res.status(200).json({ message: "If that email exists, we have sent a reset link." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const resetPasswordValidators = [
  body("token").notEmpty().withMessage("Reset token is required."),
  body("new_password")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long."),
];

export const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token, new_password: newPassword } = req.body;

  try {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const { rows } = await query(
      `
        SELECT user_id, expires_at
        FROM password_reset_tokens
        WHERE token_hash = $1
      `,
      [tokenHash],
    );

    const tokenRecord = rows[0];

    if (!tokenRecord) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    if (new Date(tokenRecord.expires_at).getTime() < Date.now()) {
      await query("DELETE FROM password_reset_tokens WHERE token_hash = $1", [tokenHash]);
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await query(
      `
        UPDATE users
        SET password_hash = $1, updated_at = NOW()
        WHERE id = $2
      `,
      [passwordHash, tokenRecord.user_id],
    );

    await query("DELETE FROM password_reset_tokens WHERE token_hash = $1", [tokenHash]);

    return res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const changePasswordValidators = [
  body("current_password")
    .notEmpty()
    .withMessage("Current password is required."),
  body("new_password")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long."),
];

export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { current_password: currentPassword, new_password: newPassword } = req.body;

  try {
    const { rows } = await query(
      `
        SELECT password_hash
        FROM users
        WHERE id = $1
      `,
      [userId],
    );

    const userRecord = rows[0];

    if (!userRecord) {
      return res.status(404).json({ message: "User not found." });
    }

    const passwordMatches = await bcrypt.compare(currentPassword, userRecord.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await query(
      `
        UPDATE users
        SET password_hash = $1, updated_at = NOW()
        WHERE id = $2
      `,
      [newPasswordHash, userId],
    );

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default {
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
};

