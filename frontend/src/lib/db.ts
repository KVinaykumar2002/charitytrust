import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./db/schema";

// For development, use a local SQLite file
// For production, use your Turso database URL
const client = createClient({
  url: process.env.DATABASE_URL || "file:./local.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

