import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

import pool from "./database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsPath = path.resolve(__dirname, "migrations.sql");

const run = async () => {
  const client = await pool.connect();

  try {
    if (!fs.existsSync(migrationsPath)) {
      throw new Error(`Migration file not found at ${migrationsPath}`);
    }

    const sql = fs.readFileSync(migrationsPath, "utf-8");

    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");

    console.log("Database migrations executed successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Migration execution failed:", error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  run()
    .catch((err) => {
      process.exitCode = 1;
      console.error("Migration run encountered an error:", err);
    })
    .finally(() => {
      process.exit();
    });
}

export default run;







