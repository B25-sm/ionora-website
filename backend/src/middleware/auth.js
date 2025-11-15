import { verifyToken } from "../utils/jwt.js";
import { query } from "../config/database.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication token missing." });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return res.status(401).json({ message: error.message || "Invalid token." });
    }

    const userId = decoded?.sub;

    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    const { rows } = await query(
      `
        SELECT id, email, full_name, phone, email_verified, created_at, updated_at, last_login
        FROM users
        WHERE id = $1
      `,
      [userId],
    );

    const user = rows[0];

    if (!user) {
      return res.status(403).json({ message: "User not found." });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Optional authentication: doesn't fail if no token is provided, but sets req.user if token is valid
export const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // No token provided, continue without authentication
      req.user = null;
      return next();
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      // Invalid token, continue without authentication
      req.user = null;
      return next();
    }

    const userId = decoded?.sub;

    if (!userId) {
      // Invalid token payload, continue without authentication
      req.user = null;
      return next();
    }

    const { rows } = await query(
      `
        SELECT id, email, full_name, phone, email_verified, created_at, updated_at, last_login
        FROM users
        WHERE id = $1
      `,
      [userId],
    );

    const user = rows[0];

    // Set user if found, otherwise continue without authentication
    req.user = user || null;
    return next();
  } catch (error) {
    console.error("Optional authentication middleware error:", error);
    // On error, continue without authentication
    req.user = null;
    return next();
  }
};

export default authenticate;

