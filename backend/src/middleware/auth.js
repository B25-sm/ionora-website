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

export default authenticate;

