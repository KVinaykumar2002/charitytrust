/**
 * Script to display all users and admin credentials from MongoDB
 * Run with: node scripts/display-credentials.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chiranjeevicharitabletrust73_db_user:kX4XqLVshAQtLZYu@cluster0.dook7v6.mongodb.net/charity-db?retryWrites=true&w=majority';

async function displayCredentials() {
  try {
    console.log('🔌 Connecting to MongoDB...\n');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const dbName = mongoose.connection.name;
    const collectionName = User.collection.name;
    
    console.log('📊 Database Information:');
    console.log(`   Database: ${dbName}`);
    console.log(`   Collection: ${collectionName}`);
    console.log(`   Connection: MongoDB Atlas\n`);

    // Get all users
    const users = await User.find().lean();
    const userCount = users.length;

    console.log('='.repeat(70));
    console.log('👥 USERS AND ADMIN CREDENTIALS IN MONGODB DATABASE');
    console.log('='.repeat(70));
    console.log(`\n📈 Total Users: ${userCount}\n`);

    if (userCount === 0) {
      console.log('⚠️  NO USERS FOUND IN DATABASE!\n');
      console.log('💡 Creating users now...\n');
      
      // Create Admin User
      const admin = new User({
        name: 'Admin User',
        email: 'admin@charitytrust.org',
        password: 'Admin@123456',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Created Admin User in MongoDB');
      console.log(`   ID: ${admin._id}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Password: ${admin.password}`);
      console.log(`   Role: ${admin.role}\n`);

      // Create User Account
      const user = new User({
        name: 'Test User',
        email: 'user@charitytrust.org',
        password: 'User@123456',
        role: 'user'
      });
      await user.save();
      console.log('✅ Created User Account in MongoDB');
      console.log(`   ID: ${user._id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Role: ${user.role}\n`);

      // Fetch again to display
      const allUsers = await User.find().lean();
      displayUserDetails(allUsers);
    } else {
      displayUserDetails(users);
    }

    console.log('\n' + '='.repeat(70));
    console.log('📋 SUMMARY - LOGIN CREDENTIALS');
    console.log('='.repeat(70));
    
    const admin = users.find(u => u.role === 'admin') || await User.findOne({ role: 'admin' });
    const user = users.find(u => u.role === 'user') || await User.findOne({ role: 'user' });

    if (admin) {
      console.log('\n🔐 ADMIN DASHBOARD CREDENTIALS:');
      console.log('   Email:    ' + admin.email);
      console.log('   Password: ' + admin.password);
      console.log('   Role:     ' + admin.role);
      console.log('   ID:       ' + admin._id);
      console.log('   Dashboard: http://localhost:3000/admin/dashboard');
    }

    if (user) {
      console.log('\n👤 USER DASHBOARD CREDENTIALS:');
      console.log('   Email:    ' + user.email);
      console.log('   Password: ' + user.password);
      console.log('   Role:     ' + user.role);
      console.log('   ID:       ' + user._id);
      console.log('   Dashboard: http://localhost:3000/dashboard');
    }

    console.log('\n🔗 Login URL: http://localhost:3000/login');
    console.log('\n' + '='.repeat(70));

    // Show MongoDB connection details
    console.log('\n💾 MONGODB STORAGE DETAILS:');
    console.log('='.repeat(70));
    console.log(`   Database: ${dbName}`);
    console.log(`   Collection: ${collectionName}`);
    console.log(`   Connection String: ${MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`);
    console.log('\n💡 To view in MongoDB Compass:');
    console.log('   1. Open MongoDB Compass');
    console.log('   2. Connect to: mongodb+srv://chiranjeevicharitabletrust73_db_user:kX4XqLVshAQtLZYu@cluster0.dook7v6.mongodb.net/charity-db');
    console.log('   3. Navigate to: charity-db → users collection');
    console.log('   4. You will see all user documents with credentials\n');

    await mongoose.disconnect();
    console.log('✅ Display complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    process.exit(1);
  }
}

function displayUserDetails(users) {
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name.toUpperCase()}`);
    console.log('   '.repeat(1) + '-'.repeat(65));
    console.log(`   Document ID (_id): ${user._id}`);
    console.log(`   Name:              ${user.name}`);
    console.log(`   Email:             ${user.email}`);
    console.log(`   Password:          ${user.password} (stored as-is in MongoDB)`);
    console.log(`   Role:              ${user.role}`);
    console.log(`   Created At:        ${new Date(user.createdAt).toLocaleString()}`);
    console.log(`   Created Timestamp: ${user.createdAt}`);
    console.log('');
  });
}

displayCredentials();

