#!/usr/bin/env node
import "dotenv/config";
import { query } from "../src/config/database.js";

const email = process.argv[2];
const action = process.argv[3] ?? "select";

if (!email) {
  console.error("Usage: node scripts/manageUser.mjs <email> [select|delete]");
  process.exit(1);
}

try {
  if (action === "delete") {
    const result = await query("DELETE FROM users WHERE email = $1 RETURNING id", [email]);
    console.log(`Deleted ${result.rowCount} user(s) with email ${email}`);
  } else {
    const result = await query("SELECT id, email FROM users WHERE email = $1", [email]);
    console.log(JSON.stringify(result.rows, null, 2));
  }
  process.exit(0);
} catch (error) {
  console.error("Database operation failed:", error);
  process.exit(1);
}






