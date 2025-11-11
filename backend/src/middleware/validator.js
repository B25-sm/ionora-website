import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("email").isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("full_name").trim().notEmpty().withMessage("Full name is required."),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 5 })
    .withMessage("Phone number must be at least 5 characters long."),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required."),
];

export const addToCartValidation = [
  body("product_id").isUUID().withMessage("Valid product_id is required."),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1.").toInt(),
];

export const addAddressValidation = [
  body("address_type")
    .optional()
    .isIn(["billing", "shipping", "home", "office", "other"])
    .withMessage("Invalid address type."),
  body("full_address").trim().notEmpty().withMessage("Full address is required."),
  body("city").trim().notEmpty().withMessage("City is required."),
  body("state").trim().notEmpty().withMessage("State is required."),
  body("pincode").trim().notEmpty().withMessage("Pincode is required."),
  body("country").trim().notEmpty().withMessage("Country is required."),
  body("is_default").optional().isBoolean().withMessage("is_default must be a boolean.").toBoolean(),
];

export const createOrderValidation = [
  body("shipping_address_id")
    .isUUID()
    .withMessage("Valid shipping_address_id is required."),
  body("payment_method")
    .isIn(["cod", "razorpay"])
    .withMessage("Payment method must be 'cod' or 'razorpay'."),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
};

export default {
  registerValidation,
  loginValidation,
  addToCartValidation,
  addAddressValidation,
  createOrderValidation,
  handleValidationErrors,
};

