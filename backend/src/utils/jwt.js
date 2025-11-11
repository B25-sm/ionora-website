import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Please define it in your environment.");
}

const TOKEN_EXPIRY = "7d";

export const generateToken = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to generate a token.");
  }

  return jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
};

export const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token must be provided for verification.");
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired.");
    }

    throw new Error("Invalid token.");
  }
};

