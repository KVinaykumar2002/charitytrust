/**
 * Script to seed initial data for the charity website
 * Run with: node scripts/seed-data.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Donation from '../models/Donation.js';
import Program from '../models/Program.js';
import Project from '../models/Project.js';
import Event from '../models/Event.js';
import Testimonial from '../models/Testimonial.js';
import Volunteer from '../models/Volunteer.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create users if they don't exist
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

    console.log('\n👥 Creating users...');
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email}`);
      } else {
        const user = new User(userData);
        await user.save();
        console.log(`✅ Created ${userData.role}: ${userData.email}`);
      }
    }

    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Donation.deleteMany({});
    // await Program.deleteMany({});
    // await Project.deleteMany({});
    // await Event.deleteMany({});
    // await Testimonial.deleteMany({});
    // await Volunteer.deleteMany({});

    // Check if data already exists
    const existingPrograms = await Program.countDocuments();
    if (existingPrograms > 0) {
      console.log('\n⚠️  Data already exists. Skipping seed.');
      console.log('\n📋 Login Credentials (stored in database):');
      console.log('\n🔐 Admin Dashboard:');
      console.log('   Email: admin@charitytrust.org');
      console.log('   Password: Admin@123456');
      console.log('   Dashboard: http://localhost:3000/admin/dashboard');
      console.log('\n👤 User Dashboard:');
      console.log('   Email: user@charitytrust.org');
      console.log('   Password: User@123456');
      console.log('   Dashboard: http://localhost:3000/dashboard');
      console.log('\n🔗 Login URL: http://localhost:3000/login');
      process.exit(0);
    }

    // Create Programs
    const programs = await Program.insertMany([
      {
        title: 'Health Care Initiative',
        description: 'Providing free health checkups and medical assistance to underprivileged communities.',
        category: 'Health',
        targetAmount: 500000,
        currentAmount: 125000,
        status: 'active',
        imageUrl: '/programs/health.jpg'
      },
      {
        title: 'Eye Donation Campaign',
        description: 'Raising awareness about eye donation and facilitating eye transplants.',
        category: 'Vision',
        targetAmount: 300000,
        currentAmount: 85000,
        status: 'active',
        imageUrl: '/programs/vision.jpg'
      },
      {
        title: 'Disaster Relief Fund',
        description: 'Providing immediate relief and support during natural disasters.',
        category: 'Relief',
        targetAmount: 1000000,
        currentAmount: 450000,
        status: 'active',
        imageUrl: '/programs/relief.jpg'
      },
      {
        title: 'Health Awareness Program',
        description: 'Educating communities about preventive healthcare and hygiene.',
        category: 'Awareness',
        targetAmount: 200000,
        currentAmount: 75000,
        status: 'active',
        imageUrl: '/programs/awareness.jpg'
      }
    ]);
    console.log(`✅ Created ${programs.length} programs`);

    // Create Projects
    const projects = await Project.insertMany([
      {
        title: 'Rural Health Camp',
        description: 'Organizing health camps in rural areas with free medical checkups.',
        programId: programs[0]._id,
        status: 'in_progress',
        location: 'Rural Districts',
        imageUrl: '/projects/health-camp.jpg'
      },
      {
        title: 'Eye Donation Awareness Drive',
        description: 'Conducting awareness sessions about eye donation.',
        programId: programs[1]._id,
        status: 'in_progress',
        location: 'Multiple Cities',
        imageUrl: '/projects/eye-donation.jpg'
      }
    ]);
    console.log(`✅ Created ${projects.length} projects`);

    // Create Events
    const now = new Date();
    const events = await Event.insertMany([
      {
        title: 'Blood Donation Drive',
        description: 'Community blood donation camp organized in partnership with local hospitals.',
        date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        location: 'Community Center, Main Street',
        status: 'upcoming',
        maxAttendees: 200,
        currentAttendees: 45,
        imageUrl: '/events/blood-donation.jpg'
      },
      {
        title: 'Health Awareness Workshop',
        description: 'Workshop on preventive healthcare and nutrition.',
        date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        location: 'City Hall Auditorium',
        status: 'upcoming',
        maxAttendees: 150,
        currentAttendees: 32,
        imageUrl: '/events/workshop.jpg'
      },
      {
        title: 'Charity Fundraising Gala',
        description: 'Annual fundraising event with dinner and entertainment.',
        date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        location: 'Grand Hotel Ballroom',
        status: 'upcoming',
        maxAttendees: 500,
        currentAttendees: 120,
        imageUrl: '/events/gala.jpg'
      }
    ]);
    console.log(`✅ Created ${events.length} events`);

    // Create Donations (last 6 months)
    const donations = [];
    const monthsAgo = [5, 4, 3, 2, 1, 0];
    const amounts = [35000, 42000, 38000, 45000, 50000, 55000];
    
    for (let i = 0; i < monthsAgo.length; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - monthsAgo[i], Math.floor(Math.random() * 28) + 1);
      const donationCount = Math.floor(Math.random() * 10) + 5; // 5-15 donations per month
      
      for (let j = 0; j < donationCount; j++) {
        const programIndex = Math.floor(Math.random() * programs.length);
        donations.push({
          donorName: `Donor ${i * 10 + j + 1}`,
          donorEmail: `donor${i * 10 + j + 1}@example.com`,
          amount: Math.floor(Math.random() * 5000) + 500,
          programId: programs[programIndex]._id,
          programName: programs[programIndex].title,
          paymentMethod: ['online', 'cash', 'bank_transfer'][Math.floor(Math.random() * 3)],
          status: 'completed',
          createdAt: new Date(date.getTime() + j * 24 * 60 * 60 * 1000)
        });
      }
    }
    
    await Donation.insertMany(donations);
    console.log(`✅ Created ${donations.length} donations`);

    // Create Testimonials
    const testimonials = await Testimonial.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'The health camp organized by the trust was life-changing. Thank you for your service!',
        rating: 5,
        status: 'approved'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Amazing work in disaster relief. Your team was there when we needed help the most.',
        rating: 5,
        status: 'approved'
      },
      {
        name: 'Robert Johnson',
        email: 'robert@example.com',
        message: 'The eye donation awareness program helped me understand the importance of organ donation.',
        rating: 5,
        status: 'approved'
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        message: 'Great initiative! Keep up the excellent work in serving the community.',
        rating: 5,
        status: 'approved'
      }
    ]);
    console.log(`✅ Created ${testimonials.length} testimonials`);

    // Create Volunteers
    const volunteers = await Volunteer.insertMany([
      {
        name: 'Michael Brown',
        email: 'michael@example.com',
        phone: '+1234567890',
        skills: ['Medical', 'Event Management'],
        status: 'active',
        hoursContributed: 120
      },
      {
        name: 'Emily Davis',
        email: 'emily@example.com',
        phone: '+1234567891',
        skills: ['Teaching', 'Counseling'],
        status: 'active',
        hoursContributed: 95
      },
      {
        name: 'David Wilson',
        email: 'david@example.com',
        phone: '+1234567892',
        skills: ['Logistics', 'Coordination'],
        status: 'active',
        hoursContributed: 150
      }
    ]);
    console.log(`✅ Created ${volunteers.length} volunteers`);

    console.log('\n✅ Data seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Programs: ${programs.length}`);
    console.log(`   Projects: ${projects.length}`);
    console.log(`   Events: ${events.length}`);
    console.log(`   Donations: ${donations.length}`);
    console.log(`   Testimonials: ${testimonials.length}`);
    console.log(`   Volunteers: ${volunteers.length}`);
    
    console.log('\n📋 Login Credentials (stored in database):');
    console.log('\n🔐 Admin Dashboard:');
    console.log('   Email: admin@charitytrust.org');
    console.log('   Password: Admin@123456');
    console.log('   Dashboard: http://localhost:3000/admin/dashboard');
    console.log('\n👤 User Dashboard:');
    console.log('   Email: user@charitytrust.org');
    console.log('   Password: User@123456');
    console.log('   Dashboard: http://localhost:3000/dashboard');
    console.log('\n🔗 Login URL: http://localhost:3000/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();

