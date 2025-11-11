import crypto from "crypto";

import { body, validationResult, param } from "express-validator";

import { query } from "../config/database.js";

export const addFavoriteValidators = [
  body("product_id").isUUID().withMessage("Valid product_id is required."),
];

const SHARE_BASE_URL =
  process.env.PUBLIC_SHARE_BASE_URL ??
  process.env.FRONTEND_ORIGIN?.split(",")?.[0]?.trim() ??
  "";

const fetchProductById = async (productId) => {
  const { rows } = await query(
    `
      SELECT id, is_active
      FROM products
      WHERE id = $1
    `,
    [productId],
  );
  return rows[0];
};

const fetchFavoritesForUser = async (userId) => {
  const { rows } = await query(
    `
      SELECT
        f.id,
        f.added_at,
        p.id AS product_id,
        p.name,
        p.description,
        p.price,
        p.discount_percentage,
        p.final_price,
        p.category,
        p.images,
        p.is_active,
        p.stock_quantity,
        p.created_at,
        p.updated_at
      FROM favorites f
      JOIN products p ON f.product_id = p.id
      WHERE f.user_id = $1
      ORDER BY f.added_at DESC
    `,
    [userId],
  );

  return rows.map((row) => ({
    id: row.id,
    added_at: row.added_at,
    product: {
      id: row.product_id,
      name: row.name,
      description: row.description,
      price: row.price != null ? Number.parseFloat(row.price) : null,
      discount_percentage:
        row.discount_percentage != null ? Number.parseFloat(row.discount_percentage) : null,
      final_price: row.final_price != null ? Number.parseFloat(row.final_price) : null,
      category: row.category,
      images: row.images,
      is_active: row.is_active,
      stock_quantity: row.stock_quantity,
      created_at: row.created_at,
      updated_at: row.updated_at,
    },
  }));
};

const resolveShareBaseUrl = (req) => {
  if (SHARE_BASE_URL) {
    return SHARE_BASE_URL.replace(/\/$/, "");
  }

  const forwardedHost = req.get("x-forwarded-host");
  const forwardedProto = req.get("x-forwarded-proto");

  if (forwardedHost) {
    const proto = forwardedProto ? forwardedProto.split(",")[0].trim() : req.protocol;
    return `${proto}://${forwardedHost}`.replace(/\/$/, "");
  }

  const host = req.get("host");
  if (!host) {
    return "";
  }

  return `${req.protocol}://${host}`.replace(/\/$/, "");
};

export const addFavorite = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { product_id: productId } = req.body;

  try {
    const product = await fetchProductById(productId);

    if (!product || !product.is_active) {
      return res.status(404).json({ message: "Product not found." });
    }

    await query(
      `
        INSERT INTO favorites (user_id, product_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, product_id) DO NOTHING
      `,
      [userId, productId],
    );

    return res.status(200).json({ message: "Product added to favorites." });
  } catch (error) {
    console.error("Add favorite error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getFavorites = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const favorites = await fetchFavoritesForUser(userId);

    return res.status(200).json({ favorites });
  } catch (error) {
    console.error("Get favorites error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const removeFavoriteValidators = [
  param("product_id").isUUID().withMessage("Valid product ID is required."),
];

export const removeFavorite = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { product_id: productId } = req.params;

  try {
    const { rowCount } = await query(
      `
        DELETE FROM favorites
        WHERE user_id = $1 AND product_id = $2
      `,
      [userId, productId],
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    return res.status(200).json({ message: "Product removed from favorites." });
  } catch (error) {
    console.error("Remove favorite error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const shareWishlist = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const favorites = await fetchFavoritesForUser(userId);

    if (!favorites.length) {
      return res.status(400).json({ message: "Add items to your wishlist before sharing." });
    }

    const token = crypto.randomBytes(16).toString("hex");

    await query(
      `
        INSERT INTO public_wishlists (user_id, share_token)
        VALUES ($1, $2)
        ON CONFLICT (user_id) DO UPDATE
        SET share_token = EXCLUDED.share_token,
            created_at = NOW()
      `,
      [userId, token],
    );

    const baseUrl = resolveShareBaseUrl(req);
    const shareUrl = baseUrl
      ? `${baseUrl}/api/public/wishlist/${token}`
      : `/api/public/wishlist/${token}`;

    return res.status(201).json({
      url: shareUrl,
      token,
      favorites,
    });
  } catch (error) {
    console.error("Share wishlist error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getPublicWishlist = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Share token is required." });
  }

  try {
    const { rows } = await query(
      `
        SELECT pw.user_id, u.full_name
        FROM public_wishlists pw
        JOIN users u ON pw.user_id = u.id
        WHERE pw.share_token = $1
      `,
      [token],
    );

    const share = rows[0];

    if (!share) {
      return res.status(404).json({ message: "Shared wishlist not found or expired." });
    }

    const favorites = await fetchFavoritesForUser(share.user_id);

    return res.status(200).json({
      owner: {
        id: share.user_id,
        full_name: share.full_name,
      },
      favorites,
    });
  } catch (error) {
    console.error("Get public wishlist error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default {
  addFavorite,
  getFavorites,
  removeFavorite,
  addFavoriteValidators,
  removeFavoriteValidators,
  shareWishlist,
  getPublicWishlist,
};

