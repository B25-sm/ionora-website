import { body, validationResult, param } from "express-validator";

import { query } from "../config/database.js";

export const profileValidators = [
  body("full_name")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Full name cannot be empty."),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5 })
    .withMessage("Phone number must be at least 5 characters long."),
];

export const addressValidators = [
  body("address_type")
    .optional()
    .isIn(["billing", "shipping", "home", "office", "other"])
    .withMessage("Invalid address type."),
  body("full_address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full address is required."),
  body("city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City is required."),
  body("state")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("State is required."),
  body("pincode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Pincode is required."),
  body("country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Country is required."),
  body("is_default")
    .optional()
    .isBoolean()
    .withMessage("is_default must be a boolean.")
    .toBoolean(),
];

export const getProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  return res.status(200).json({ user: req.user });
};

export const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const { full_name: fullName, phone } = req.body;

  try {
    const { rows } = await query(
      `
        UPDATE users
        SET
          full_name = COALESCE($1, full_name),
          phone = COALESCE($2, phone),
          updated_at = NOW()
        WHERE id = $3
        RETURNING id, email, full_name, phone, email_verified, created_at, updated_at, last_login
      `,
      [fullName ?? null, phone ?? null, userId],
    );

    const updatedUser = rows[0];

    req.user = updatedUser;

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getAddresses = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const { rows } = await query(
      `
        SELECT id, address_type, full_address, city, state, pincode, country, is_default, created_at
        FROM addresses
        WHERE user_id = $1
        ORDER BY created_at DESC
      `,
      [userId],
    );

    return res.status(200).json({ addresses: rows });
  } catch (error) {
    console.error("Get addresses error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const enforceDefaultAddress = async (userId, isDefault) => {
  if (isDefault) {
    await query(
      `
        UPDATE addresses
        SET is_default = FALSE
        WHERE user_id = $1
      `,
      [userId],
    );
  }
};

export const createAddress = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    address_type: addressType = "shipping",
    full_address: fullAddress,
    city,
    state,
    pincode,
    country,
    is_default: isDefault = false,
  } = req.body;

  try {
    if (!fullAddress || !city || !state || !pincode || !country) {
      return res.status(400).json({ message: "All address fields are required." });
    }

    await enforceDefaultAddress(userId, isDefault);

    const { rows } = await query(
      `
        INSERT INTO addresses (
          user_id,
          address_type,
          full_address,
          city,
          state,
          pincode,
          country,
          is_default
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, address_type, full_address, city, state, pincode, country, is_default, created_at
      `,
      [userId, addressType, fullAddress, city, state, pincode, country, isDefault],
    );

    return res.status(201).json({ address: rows[0] });
  } catch (error) {
    console.error("Create address error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateAddressValidators = [
  param("id").isUUID().withMessage("Valid address ID is required."),
  ...addressValidators,
];

export const updateAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const addressId = req.params.id;

  try {
    const { rows: addressRows } = await query(
      `
        SELECT id, user_id
        FROM addresses
        WHERE id = $1 AND user_id = $2
      `,
      [addressId, userId],
    );

    if (addressRows.length === 0) {
      return res.status(404).json({ message: "Address not found." });
    }

    const {
      address_type: addressType,
      full_address: fullAddress,
      city,
      state,
      pincode,
      country,
      is_default: isDefault,
    } = req.body;

    if (
      addressType === undefined &&
      fullAddress === undefined &&
      city === undefined &&
      state === undefined &&
      pincode === undefined &&
      country === undefined &&
      isDefault === undefined
    ) {
      return res.status(400).json({ message: "No fields to update." });
    }

    await enforceDefaultAddress(userId, isDefault === true);

    const { rows } = await query(
      `
        UPDATE addresses
        SET
          address_type = COALESCE($1, address_type),
          full_address = COALESCE($2, full_address),
          city = COALESCE($3, city),
          state = COALESCE($4, state),
          pincode = COALESCE($5, pincode),
          country = COALESCE($6, country),
          is_default = COALESCE($7, is_default)
        WHERE id = $8
        RETURNING id, address_type, full_address, city, state, pincode, country, is_default, created_at
      `,
      [
        addressType ?? null,
        fullAddress ?? null,
        city ?? null,
        state ?? null,
        pincode ?? null,
        country ?? null,
        isDefault ?? null,
        addressId,
      ],
    );

    return res.status(200).json({ address: rows[0] });
  } catch (error) {
    console.error("Update address error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteAddressValidators = [
  param("id").isUUID().withMessage("Valid address ID is required."),
];

export const deleteAddress = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const addressId = req.params.id;

  try {
    const { rowCount } = await query(
      `
        DELETE FROM addresses
        WHERE id = $1 AND user_id = $2
      `,
      [addressId, userId],
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Address not found." });
    }

    return res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.error("Delete address error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default {
  getProfile,
  updateProfile,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  profileValidators,
  addressValidators,
  updateAddressValidators,
  deleteAddressValidators,
};

