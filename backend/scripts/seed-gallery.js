/**
 * Seed Gallery with sample main → sub categories and multiple images per sub.
 * Run from backend: node scripts/seed-gallery.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gallery from '../models/Gallery.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chiranjeevicharitabletrust73_db_user:kX4XqLVshAQtLZYu@cluster0.dook7v6.mongodb.net/charity-db?retryWrites=true&w=majority';

// Chiranjeevi Charitable Trust related images (Wikimedia Commons - Chiranjeevi, events, awards)
const W = (path) => `https://upload.wikimedia.org/wikipedia/commons/${path}`;
const PADMA = '5/5a/The_President%2C_Dr._A.P.J._Abdul_Kalam_presenting_Padma_Bhushan_to_Shri_Konidala_Chiranjeevi%2C_a_well_known_cine_actor_and_philanthropist%2C_at_investiture_ceremony_in_New_Delhi_on_March_29%2C_2006.jpg';
const CHIRAN_WELCOME = '9/9d/Chiranjeevi_welcome01.jpg';
const CHIRAN_AMITABH = '2/2a/Chiranjeevi_at_Amitabh_Bachchan%27s_70th_birthday_celebration.jpg';
const CHIRAN_60TH = 'f/fb/Chiranjeevi_with_Salman_Khan_and_his_son_Ram_Charan_at_his_60th_Birthday_Bash.jpg';
const CHIRAN_IITTM = 'e/e6/K._Chiranjeevi_at_the_inauguration_of_the_new_campus_of_Indian_Institute_of_Tourism_%26_Travel_Management%2C_at_Bhubaneswar_on_April_18%2C_2013._The_Chief_Minister_of_Odisha%2C_Shri_Naveen_Patnaik_is_also_seen.jpg';
// Generic health/donation (Unsplash) for blood & eye bank imagery
const U = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

const galleryItems = [
  {
    mainCategory: 'Events',
    subCategory: 'Charity',
    title: 'Chiranjeevi Charitable Trust – charity events and drives',
    images: [
      W(PADMA),           // Padma Bhushan – philanthropy
      W(CHIRAN_WELCOME),  // Chiranjeevi public appearance
      W(CHIRAN_AMITABH),  // Chiranjeevi at event
      W(CHIRAN_60TH),     // Chiranjeevi with family at birthday bash
      W(CHIRAN_IITTM),    // Chiranjeevi at official inauguration
    ],
    order: 0,
    active: true,
  },
  {
    mainCategory: 'Events',
    subCategory: 'Awareness',
    title: 'Awareness campaigns by the Trust',
    images: [
      W(CHIRAN_WELCOME),
      W(CHIRAN_AMITABH),
      W(CHIRAN_IITTM),
    ],
    order: 1,
    active: true,
  },
  {
    mainCategory: 'Projects',
    subCategory: 'Relief',
    title: 'Disaster relief and community support',
    images: [
      W(PADMA),
      W(CHIRAN_IITTM),
      W(CHIRAN_WELCOME),
    ],
    order: 0,
    active: true,
  },
  {
    mainCategory: 'Projects',
    subCategory: 'Health',
    title: 'Health camps and medical initiatives',
    images: [
      W(CHIRAN_AMITABH),
      U('1579684385127-1ef15d508118'),
      U('1584516150909-c434b0212b8a'),
    ],
    order: 1,
    active: true,
  },
  {
    mainCategory: 'Programs',
    subCategory: 'Blood Donation',
    title: 'Chiranjeevi Blood Bank – donation drives',
    images: [
      W(CHIRAN_WELCOME),
      W(CHIRAN_AMITABH),
      U('1579684385127-1ef15d508118'),
      U('1584516150909-c434b0212b8a'),
    ],
    order: 0,
    active: true,
  },
  {
    mainCategory: 'Programs',
    subCategory: 'Eye Donation',
    title: 'Chiranjeevi Eye Bank – eye donation programs',
    images: [
      W(CHIRAN_WELCOME),
      U('1579684385127-1ef15d508118'),
      U('1584516150909-c434b0212b8a'),
    ],
    order: 1,
    active: true,
  },
];

async function seedGallery() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const item of galleryItems) {
      const existing = await Gallery.findOne({
        mainCategory: item.mainCategory,
        subCategory: item.subCategory,
      });
      if (existing) {
        existing.images = item.images;
        existing.title = item.title ?? existing.title;
        existing.order = item.order ?? existing.order;
        existing.active = item.active !== false;
        await existing.save();
        console.log(`✅ Updated: ${item.mainCategory} → ${item.subCategory} (${item.images.length} charity-related images)`);
      } else {
        await Gallery.create(item);
        console.log(`✅ Created: ${item.mainCategory} → ${item.subCategory} (${item.images.length} images)`);
      }
    }

    console.log('\n✅ Seed gallery complete. Charity-related images are in the DB. Test the Gallery page in the UI.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedGallery();
