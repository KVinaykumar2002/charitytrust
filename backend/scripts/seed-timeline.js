/**
 * Script to seed timeline data for the "Our Journey" section
 * Run with: node scripts/seed-timeline.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Timeline from '../models/Timeline.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chiranjeevicharitabletrust73_db_user:kX4XqLVshAQtLZYu@cluster0.dook7v6.mongodb.net/charity-db?retryWrites=true&w=majority';

const timelineData = [
  {
    year: "1998",
    title: "The Beginning",
    description: "Chiranjeevi Charity Trust was founded with a vision to serve humanity. The journey began with a small team of dedicated volunteers committed to making a difference in people's lives.",
    highlights: [],
    icon: "heart",
    iconColor: "red",
    images: [
      { url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600&auto=format&fit=crop", alt: "CCT Foundation beginning" },
      { url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600&auto=format&fit=crop", alt: "Volunteers helping" },
    ],
    active: true,
    order: 0,
  },
  {
    year: "2000-2005",
    title: "Blood Bank Initiative",
    description: "Launched our first major initiative - the Blood Bank program. Over the years, we've collected and distributed over 10 lakh units of life-saving blood, saving countless lives across India.",
    highlights: [
      "✅ Established state-of-the-art blood collection centers",
      "✅ Over 10 lakh units of blood collected",
      "✅ Free blood for emergency patients",
      "✅ Mobile blood donation camps across Telugu states",
    ],
    icon: "heart",
    iconColor: "red",
    images: [
      { url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=600&auto=format&fit=crop", alt: "Blood donation" },
      { url: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=600&auto=format&fit=crop", alt: "Blood bank facility" },
    ],
    active: true,
    order: 1,
  },
  {
    year: "2005-2010",
    title: "Eye Bank Expansion",
    description: "Established the Eye Bank program, performing over 10,000 corneal transplants and restoring vision to thousands of visually challenged individuals. This milestone marked our commitment to comprehensive healthcare.",
    highlights: [
      "✅ Over 10,000 corneal transplants performed",
      "✅ Free eye surgeries for the underprivileged",
      "✅ Eye donation awareness campaigns",
    ],
    icon: "eye",
    iconColor: "blue",
    images: [
      { url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop", alt: "Eye care program" },
      { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop", alt: "Medical care" },
    ],
    active: true,
    order: 2,
  },
  {
    year: "2010-2015",
    title: "Community Welfare Programs",
    description: "Expanded our reach with comprehensive community welfare programs, including education support, medical assistance, and disaster relief initiatives. We touched over 100,000 lives during this period.",
    highlights: [],
    icon: "users",
    iconColor: "green",
    images: [
      { url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop", alt: "Community welfare" },
      { url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop", alt: "Education support" },
      { url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop", alt: "Helping communities" },
      { url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop", alt: "Disaster relief" },
    ],
    active: true,
    order: 3,
  },
  {
    year: "2015-2020",
    title: "Hospital for Movie Workers",
    description: "Initiated the construction of a dedicated hospital in Chitrapuri, Hyderabad, to provide free primary healthcare for movie workers. This project represents our commitment to supporting those who entertain and inspire us.",
    highlights: [],
    icon: "hospital",
    iconColor: "purple",
    images: [
      { url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop", alt: "Hospital construction" },
      { url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop", alt: "Healthcare facility" },
    ],
    active: true,
    order: 4,
  },
  {
    year: "2020-2021",
    title: "COVID-19 Relief - Oxygen Banks",
    description: "During the pandemic, we established 32 oxygen banks across Telugu states, saving thousands of lives. Provided ₹7 lakhs worth of accident insurance and 50% subsidy in diagnostics, supporting 15,000+ daily wage film workers.",
    highlights: [
      "✅ 32 Oxygen Banks established across Telugu states",
      "✅ ₹7 Lakhs accident insurance coverage",
      "✅ 50% subsidy in diagnostic services",
      "✅ 15,000+ daily wage workers supported",
      "✅ Essential supplies distribution to families",
    ],
    icon: "wind",
    iconColor: "cyan",
    images: [
      { url: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=600&auto=format&fit=crop", alt: "COVID relief" },
      { url: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=600&auto=format&fit=crop", alt: "Oxygen supply" },
      { url: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=600&auto=format&fit=crop", alt: "Medical assistance" },
      { url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop", alt: "Community support" },
    ],
    active: true,
    order: 5,
  },
  {
    year: "2021-Present",
    title: "Digital Transformation & Future Goals",
    description: "Embracing technology to reach more people, we've launched digital platforms for donations, volunteer registration, and program management. Our future goals include expanding to 50+ cities, establishing 100+ healthcare centers, and impacting 10 million lives by 2030.",
    highlights: [
      "🎯 Expand to 50+ cities across India",
      "🏥 Establish 100+ healthcare centers",
      "👥 Impact 10 million lives by 2030",
      "💻 Digital-first approach for donations & volunteering",
      "🌱 Sustainable community development programs",
    ],
    icon: "target",
    iconColor: "orange",
    images: [
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", alt: "Digital transformation" },
      { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop", alt: "Future goals" },
    ],
    active: true,
    order: 6,
  },
];

async function seedTimeline() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if timeline data already exists
    const existingCount = await Timeline.countDocuments();
    if (existingCount > 0) {
      console.log(`\n⚠️  Timeline already has ${existingCount} entries.`);
      console.log('   Do you want to replace them? Deleting existing entries...');
      await Timeline.deleteMany({});
      console.log('   ✅ Deleted existing timeline entries');
    }

    // Insert timeline data
    const timeline = await Timeline.insertMany(timelineData);
    console.log(`\n✅ Created ${timeline.length} timeline entries:`);
    
    timeline.forEach((entry, index) => {
      console.log(`   ${index + 1}. ${entry.year} - ${entry.title}`);
    });

    console.log('\n✅ Timeline seeding completed successfully!');
    console.log('\n📋 You can now view the timeline on the About page');
    console.log('   or manage it at /admin/timeline');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding timeline:', error);
    process.exit(1);
  }
}

seedTimeline();

