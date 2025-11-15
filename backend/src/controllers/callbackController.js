import { body, validationResult } from "express-validator";

import { query } from "../config/database.js";

export const callbackRequestValidators = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isLength({ min: 7 })
    .withMessage("Phone number must be at least 7 characters long."),
  body("state").trim().notEmpty().withMessage("State is required."),
];

export const createCallbackRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { name, phone, state } = req.body;

  try {
    const { rows } = await query(
      `
        INSERT INTO callback_requests (
          user_id,
          name,
          phone,
          state
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id, user_id, name, phone, state, created_at
      `,
      [userId, name, phone, state],
    );

    return res.status(201).json({ callbackRequest: rows[0] });
  } catch (error) {
    console.error("Create callback request error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default {
  callbackRequestValidators,
  createCallbackRequest,
};








