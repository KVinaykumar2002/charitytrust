/**
 * Script to create initial admin and user accounts
 * Run with: node scripts/create-initial-users.js
 */

import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const users = [
  {
    name: "Admin User",
    email: "admin@charitytrust.org",
    password: "Admin@123456",
    role: "admin"
  },
  {
    name: "Test User",
    email: "user@charitytrust.org",
    password: "User@123456",
    role: "user"
  }
];

async function createUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const userData of users) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email}`);
        continue;
      }

      // Create user
      const user = new User(userData);
      await user.save();

      console.log(`✅ Created ${userData.role}: ${userData.email}`);
    }

    console.log('\n📋 Login Credentials:');
    console.log('\n🔐 Admin:');
    console.log('   Email: admin@charitytrust.org');
    console.log('   Password: Admin@123456');
    console.log('   Dashboard: http://localhost:3000/admin/dashboard');
    
    console.log('\n👤 User:');
    console.log('   Email: user@charitytrust.org');
    console.log('   Password: User@123456');
    console.log('   Dashboard: http://localhost:3000/dashboard');

    console.log('\n🔗 Login URL: http://localhost:3000/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  }
}

createUsers();

