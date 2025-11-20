/**
 * Script to create an admin user
 * Run with: node scripts/create-admin.js
 * 
 * This script creates an admin user directly in the database
 * Make sure to install dependencies: npm install @libsql/client bcrypt
 */

import { createClient } from "@libsql/client";
import bcrypt from "bcrypt";

// Database configuration
const DATABASE_URL = process.env.DATABASE_URL || "file:./local.db";
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN;

// Admin credentials (change these!)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@charitytrust.org";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123456";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";

async function createAdmin() {
  try {
    const client = createClient({
      url: DATABASE_URL,
      authToken: DATABASE_AUTH_TOKEN,
    });

    // Check if user already exists
    const checkUser = await client.execute({
      sql: "SELECT * FROM user WHERE email = ?",
      args: [ADMIN_EMAIL],
    });

    if (checkUser.rows.length > 0) {
      console.log("❌ User with this email already exists!");
      console.log("   Email:", ADMIN_EMAIL);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Generate ID
    const userId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const accountId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const now = new Date().toISOString();

    // Create user
    await client.execute({
      sql: `
        INSERT INTO user (id, name, email, role, emailVerified, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [userId, ADMIN_NAME, ADMIN_EMAIL, "admin", true, now, now],
    });

    // Create account
    await client.execute({
      sql: `
        INSERT INTO account (id, accountId, providerId, userId, password, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [accountId, ADMIN_EMAIL, "credential", userId, hashedPassword, now, now],
    });

    console.log("✅ Admin user created successfully!");
    console.log("\n📋 Admin Credentials:");
    console.log("   Email:", ADMIN_EMAIL);
    console.log("   Password:", ADMIN_PASSWORD);
    console.log("\n⚠️  IMPORTANT: Change the password after first login!");
    console.log("\n🔗 Login URL: http://localhost:3000/admin/login");

  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
}

createAdmin().catch(console.error);

