"use client";

import HeroSection from '@/components/ui/hero-section-9';
import { Users, Heart, Eye } from 'lucide-react';

const HeroSection9Section = () => {
  // Charity-themed data
  const heroData = {
    title: (
      <>
        Transforming Lives Through <br /> Compassion & Care
      </>
    ),
    subtitle: 'Chiranjeevi Charitable Trust is dedicated to saving sight and lives through compassionate eye and blood care. Every initiative is inspired by the belief that timely support, expert treatment, and community participation can transform futures.',
    actions: [
      {
        text: 'Donate Now',
        onClick: () => window.location.href = '/donate',
        variant: 'default' as const,
        href: '/donate',
      },
      {
        text: 'Learn More',
        onClick: () => window.location.href = '/about',
        variant: 'outline' as const,
        href: '/about',
      },
    ],
    stats: [
      {
        value: '10 Lakh+',
        label: 'Units of blood',
        icon: <Heart className="h-5 w-5" />,
      },
      {
        value: '10K+',
        label: 'Corneal transplants',
        icon: <Eye className="h-5 w-5" />,
      },
      {
        value: '50K+',
        label: 'Active volunteers',
        icon: <Users className="h-5 w-5" />,
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    ],
  };

  return (
    <div className="w-full bg-background">
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        stats={heroData.stats}
        images={heroData.images}
      />
    </div>
  );
};

export default HeroSection9Section;

