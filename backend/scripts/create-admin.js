/**
 * Script to create an admin user in MongoDB
 * Run with: node scripts/create-admin.js
 */

import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@charitytrust.org';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123456';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Admin User';

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('❌ Admin user already exists!');
      console.log(`   Email: ${ADMIN_EMAIL}`);
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD, // Stored as-is
      role: 'admin'
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('\n🔗 Login URL: http://localhost:3000/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();

