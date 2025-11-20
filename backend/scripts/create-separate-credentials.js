/**
 * Script to create admin and user credentials in separate collections
 * Run with: node scripts/create-separate-credentials.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import RegularUser from '../models/RegularUser.js';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chiranjeevicharitabletrust73_db_user:kX4XqLVshAQtLZYu@cluster0.dook7v6.mongodb.net/charity-db?retryWrites=true&w=majority';

async function createSeparateCredentials() {
  try {
    console.log('🔌 Connecting to MongoDB...\n');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const dbName = mongoose.connection.name;
    console.log(`📊 Database: ${dbName}\n`);

    // Create Admin in admins collection
    console.log('👤 Creating Admin in "admins" collection...');
    await Admin.deleteMany({}); // Clear existing
    
    const admin = new Admin({
      name: 'Admin User',
      email: 'admin@charitytrust.org',
      password: 'Admin@123456',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Admin created in "admins" collection:');
    console.log(`   ID: ${admin._id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${admin.password}`);
    console.log(`   Role: ${admin.role}\n`);

    // Create User in regularusers collection
    console.log('👤 Creating User in "regularusers" collection...');
    await RegularUser.deleteMany({}); // Clear existing
    
    const user = new RegularUser({
      name: 'Test User',
      email: 'user@charitytrust.org',
      password: 'User@123456',
      role: 'user'
    });
    await user.save();
    console.log('✅ User created in "regularusers" collection:');
    console.log(`   ID: ${user._id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: ${user.password}`);
    console.log(`   Role: ${user.role}\n`);

    // Also create in users collection for backward compatibility
    console.log('👤 Creating credentials in "users" collection (for backward compatibility)...');
    await User.deleteMany({});
    
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@charitytrust.org',
      password: 'Admin@123456',
      role: 'admin'
    });
    await adminUser.save();
    
    const regularUser = new User({
      name: 'Test User',
      email: 'user@charitytrust.org',
      password: 'User@123456',
      role: 'user'
    });
    await regularUser.save();
    console.log('✅ Users created in "users" collection\n');

    // Verify all collections
    const adminCount = await Admin.countDocuments();
    const userCount = await RegularUser.countDocuments();
    const usersCount = await User.countDocuments();

    console.log('='.repeat(70));
    console.log('📋 CREDENTIALS STORAGE SUMMARY');
    console.log('='.repeat(70));
    console.log(`\n📁 Collection: admins`);
    console.log(`   Count: ${adminCount}`);
    console.log(`   Contains: Admin credentials`);
    
    console.log(`\n📁 Collection: regularusers`);
    console.log(`   Count: ${userCount}`);
    console.log(`   Contains: User credentials`);
    
    console.log(`\n📁 Collection: users`);
    console.log(`   Count: ${usersCount}`);
    console.log(`   Contains: Both admin and user (for backward compatibility)`);

    // Display all credentials
    const admins = await Admin.find().lean();
    const regularUsers = await RegularUser.find().lean();
    const allUsers = await User.find().lean();

    console.log('\n' + '='.repeat(70));
    console.log('🔐 ADMIN CREDENTIALS (stored in "admins" collection)');
    console.log('='.repeat(70));
    admins.forEach((a, index) => {
      console.log(`\n${index + 1}. ${a.name}`);
      console.log(`   Collection: admins`);
      console.log(`   Document ID: ${a._id}`);
      console.log(`   Email: ${a.email}`);
      console.log(`   Password: ${a.password}`);
      console.log(`   Role: ${a.role}`);
    });

    console.log('\n' + '='.repeat(70));
    console.log('👤 USER CREDENTIALS (stored in "regularusers" collection)');
    console.log('='.repeat(70));
    regularUsers.forEach((u, index) => {
      console.log(`\n${index + 1}. ${u.name}`);
      console.log(`   Collection: regularusers`);
      console.log(`   Document ID: ${u._id}`);
      console.log(`   Email: ${u.email}`);
      console.log(`   Password: ${u.password}`);
      console.log(`   Role: ${u.role}`);
    });

    console.log('\n' + '='.repeat(70));
    console.log('📋 LOGIN CREDENTIALS');
    console.log('='.repeat(70));
    console.log('\n🔐 Admin Dashboard:');
    console.log('   Email: admin@charitytrust.org');
    console.log('   Password: Admin@123456');
    console.log('   Dashboard: http://localhost:3000/admin/dashboard');
    console.log('   Stored in: admins collection');
    
    console.log('\n👤 User Dashboard:');
    console.log('   Email: user@charitytrust.org');
    console.log('   Password: User@123456');
    console.log('   Dashboard: http://localhost:3000/dashboard');
    console.log('   Stored in: regularusers collection');
    
    console.log('\n🔗 Login URL: http://localhost:3000/login');
    console.log('\n' + '='.repeat(70));

    console.log('\n💡 To view in MongoDB Compass:');
    console.log('   1. Open charity-db database');
    console.log('   2. Check "admins" collection for admin credentials');
    console.log('   3. Check "regularusers" collection for user credentials');
    console.log('   4. Check "users" collection (contains both for compatibility)\n');

    await mongoose.disconnect();
    console.log('✅ Credentials created successfully in separate collections!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    process.exit(1);
  }
}

createSeparateCredentials();

