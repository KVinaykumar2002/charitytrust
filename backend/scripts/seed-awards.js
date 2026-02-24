/**
 * Seed Awards & Recognitions with existing data.
 * Run from backend: node scripts/seed-awards.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Award from '../models/Award.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chiranjeevicharitabletrust73_db_user:kX4XqLVshAQtLZYu@cluster0.dook7v6.mongodb.net/charity-db?retryWrites=true&w=majority';

const WIKIMEDIA = 'https://upload.wikimedia.org/wikipedia/commons';
const PADMA_IMAGE = `${WIKIMEDIA}/5/5a/The_President%2C_Dr._A.P.J._Abdul_Kalam_presenting_Padma_Bhushan_to_Shri_Konidala_Chiranjeevi%2C_a_well_known_cine_actor_and_philanthropist%2C_at_investiture_ceremony_in_New_Delhi_on_March_29%2C_2006.jpg`;
const PORTRAIT_IMAGE = `${WIKIMEDIA}/2/2a/Chiranjeevi_at_Amitabh_Bachchan%27s_70th_birthday_celebration.jpg`;

const existingAwards = [
  {
    name: 'Padma Bhushan',
    description: "Conferred the Padma Bhushan, India's third highest civilian honour, for distinguished service to the arts and society.",
    image: PADMA_IMAGE,
    bgColor: '#E9C7BE',
    order: 0,
    link: '',
    active: true,
  },
  {
    name: 'NTR National Award',
    description: 'Honoured with the NTR National Award for outstanding contribution to Indian cinema and public service.',
    image: PORTRAIT_IMAGE,
    bgColor: '#FFFFFF',
    order: 1,
    link: '',
    active: true,
  },
  {
    name: 'Filmfare Awards',
    description: 'Multiple Filmfare Awards and lifetime recognition for his contribution to Telugu and Indian cinema.',
    image: PORTRAIT_IMAGE,
    bgColor: '#1a1a1a',
    order: 2,
    link: '',
    active: true,
  },
  {
    name: 'Civil & Social Honours',
    description: 'Numerous state and national honours for philanthropy, blood and eye donation advocacy, and social welfare.',
    image: PORTRAIT_IMAGE,
    bgColor: '#fdf5e6',
    order: 3,
    link: '',
    active: true,
  },
  {
    name: 'Chiranjeevi Charitable Trust',
    description: 'Founded the Trust to save lives and restore sight; leading initiatives in eye banking and blood donation across India.',
    image: PORTRAIT_IMAGE,
    bgColor: '#004291',
    order: 4,
    link: '',
    active: true,
  },
  {
    name: 'Public Service',
    description: 'Recognised for inspiring millions to donate blood and eyes and for building one of India\'s most impactful charitable organisations.',
    image: PORTRAIT_IMAGE,
    bgColor: '#E9E9E9',
    order: 5,
    link: '',
    active: true,
  },
];

async function seedAwards() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const a of existingAwards) {
      const existing = await Award.findOne({ name: a.name });
      if (existing) {
        console.log(`⚠️  Award already exists: ${a.name}`);
      } else {
        await Award.create(a);
        console.log(`✅ Created award: ${a.name}`);
      }
    }

    console.log('\n✅ Seed awards complete.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedAwards();
