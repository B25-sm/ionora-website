import jwt from "jsonwebtoken";

const buildErrorResponse = (code, message, details = null) => ({
  success: false,
  error: {
    code,
    message,
    ...(details ? { details } : {}),
  },
});

export const errorHandler = (err, req, res, _next) => {
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    details: err.details ?? err.errors ?? null,
  });

  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json(
      buildErrorResponse("AUTHENTICATION_ERROR", err.message || "Invalid token."),
    );
  }

  if (err.name === "ValidationError" || err.code === "VALIDATION_ERROR") {
    return res
      .status(400)
      .json(buildErrorResponse("VALIDATION_ERROR", err.message, err.details || err.errors));
  }

  if (err.status === 404 || err.code === "NOT_FOUND") {
    return res.status(404).json(buildErrorResponse("NOT_FOUND", err.message || "Not found."));
  }

  if (err.code === "23505") {
    return res
      .status(409)
      .json(buildErrorResponse("DUPLICATE_ERROR", err.message || "Duplicate record."));
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error.";

  return res
    .status(statusCode)
    .json(buildErrorResponse("SERVER_ERROR", message, err.details || err.stack));
};

export default errorHandler;






