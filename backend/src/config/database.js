import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Please define it in your environment.");
}

const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exitCode = 1;
});

export const query = (text, params = []) => {
  if (!text) {
    return Promise.reject(new Error("Query text must be provided."));
  }

  return pool.query(text, params);
};

export const testConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    return {
      success: true,
      timestamp: result.rows[0]?.now,
    };
  } catch (error) {
    console.error("Database connection test failed:", error);
    return {
      success: false,
      error,
    };
  }
};

export default pool;

