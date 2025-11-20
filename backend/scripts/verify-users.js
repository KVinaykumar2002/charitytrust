/**
 * Script to verify and display all users in the database
 * Run with: node scripts/verify-users.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function verifyUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get database and collection info
    const dbName = mongoose.connection.name;
    const collectionName = User.collection.name;
    
    console.log('📊 Database Information:');
    console.log(`   Database: ${dbName}`);
    console.log(`   Collection: ${collectionName}\n`);

    // Count users
    const userCount = await User.countDocuments();
    console.log(`📈 Total Users: ${userCount}\n`);

    if (userCount === 0) {
      console.log('⚠️  NO USERS FOUND in the database!');
      console.log('\n💡 To create users, run:');
      console.log('   npm run create-users');
      console.log('   OR');
      console.log('   npm run seed-data\n');
      process.exit(0);
    }

    // Fetch all users
    const users = await User.find().lean();
    
    console.log('👥 All Users in Database:');
    console.log('='.repeat(50));
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. ${user.name}`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Created: ${new Date(user.createdAt).toLocaleString()}`);
    });

    console.log('\n' + '='.repeat(50));
    console.log('\n✅ Verification complete!');
    console.log('\n📋 Login Credentials:');
    console.log('\n🔐 Admin Dashboard:');
    const admin = users.find(u => u.role === 'admin');
    if (admin) {
      console.log(`   Email: ${admin.email}`);
      console.log(`   Password: ${admin.password}`);
      console.log(`   Dashboard: http://localhost:3000/admin/dashboard`);
    }
    
    console.log('\n👤 User Dashboard:');
    const user = users.find(u => u.role === 'user');
    if (user) {
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Dashboard: http://localhost:3000/dashboard`);
    }
    
    console.log('\n🔗 Login URL: http://localhost:3000/login\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

verifyUsers();

