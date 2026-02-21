/**
 * Seed Our Services with existing Eye Bank and Blood Center data.
 * Run from backend: node scripts/seed-services.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chiranjeevicharitabletrust73_db_user:kX4XqLVshAQtLZYu@cluster0.dook7v6.mongodb.net/charity-db?retryWrites=true&w=majority';

const existingServices = [
  {
    title: 'Chiranjeevi Eye Bank',
    slug: 'eye-bank',
    description: 'Our Eye Bank collects, processes, and distributes corneal tissue for transplantation. We work with hospitals and eye surgeons to restore vision to those suffering from corneal blindness. Through awareness campaigns and pledge drives, we encourage eye donation and have facilitated thousands of corneal transplants.',
    icon: 'Eye',
    linkText: 'Eye Donation Pledge →',
    linkHref: '/eye-donation',
    order: 0,
    active: true,
  },
  {
    title: 'Chiranjeevi Blood Center',
    slug: 'blood-center',
    description: 'Our Blood Center operates one of the largest blood banks in the region. We run regular blood donation camps, maintain a donor registry, and support patients in need of blood. One donation can save up to three lives—we connect donors and recipients with care and urgency.',
    icon: 'Droplet',
    linkText: 'Donate Blood / Need Blood →',
    linkHref: '/blood-donation',
    order: 1,
    active: true,
  },
];

async function seedServices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const s of existingServices) {
      const existing = await Service.findOne({ slug: s.slug });
      if (existing) {
        console.log(`⚠️  Service already exists: ${s.title}`);
      } else {
        await Service.create(s);
        console.log(`✅ Created service: ${s.title}`);
      }
    }

    console.log('\n✅ Seed services complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedServices();
