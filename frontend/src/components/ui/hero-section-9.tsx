"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';
import { AnimatedButton } from '@/components/ui/animated-button';

// Define the props for reusability
interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ActionProps {
  text: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  href?: string;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  stats: StatProps[];
  images: string[];
  className?: string;
}

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const HeroSection = ({ title, subtitle, actions, stats, images, className }: HeroSectionProps) => {
  return (
    <section className={cn('w-full overflow-hidden bg-background py-12 sm:py-24', className)}>
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Left Column: Text Content */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            variants={titleVariants}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="mt-6 max-w-md text-lg text-muted-foreground" 
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start" 
            variants={itemVariants}
          >
            {actions.map((action, index) => (
              <AnimatedButton 
                key={index} 
                href={action.variant === 'outline' ? '/about' : '/donate'}
                variant={action.variant === 'outline' ? 'outline' : 'filled'}
              >
                {action.text}
              </AnimatedButton>
            ))}
          </motion.div>
          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start" 
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-3 cursor-pointer group"
                variants={statCardVariants}
                whileHover="hover"
                custom={index}
              >
                <motion.div 
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FD7E14]/20 to-[#FD7E14]/10 border border-[#FD7E14]/20 group-hover:from-[#FD7E14]/30 group-hover:to-[#FD7E14]/20 group-hover:border-[#FD7E14]/40 transition-all duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-[#FD7E14]">{stat.icon}</div>
                </motion.div>
                <div>
                  <motion.p 
                    className="text-xl font-bold text-foreground group-hover:text-[#FD7E14] transition-colors duration-300"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Image Collage */}
        <motion.div
          className="relative h-[400px] w-full sm:h-[500px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Decorative Shapes - Animated */}
          <motion.div
            className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-gradient-to-br from-[#FD7E14]/40 to-[#FD7E14]/20"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute top-1/4 right-8 h-10 w-10 rounded-full bg-gradient-to-br from-[#FD7E14]/30 to-transparent"
            variants={pulseVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-gradient-to-br from-[#FD7E14]/30 to-[#FD7E14]/10"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-1/4 left-4 h-8 w-8 rounded-full bg-gradient-to-br from-[#FD7E14]/50 to-[#FD7E14]/20"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 h-6 w-6 rounded-full bg-[#FD7E14]/40"
            variants={pulseVariants}
            animate="animate"
          />

          {/* Images with hover effects */}
          <motion.div
            className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-xl sm:h-64 sm:w-64 group cursor-pointer overflow-hidden"
            style={{ transformOrigin: 'bottom center' }}
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05, 
              rotate: 2, 
              y: -10,
              boxShadow: '0 25px 50px -12px rgba(253, 126, 20, 0.25)'
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#FD7E14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl" />
            <img src={images[0]} alt="Charity work" className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110" />
          </motion.div>
          <motion.div
            className="absolute right-0 top-1/3 h-40 w-40 rounded-2xl bg-white p-2 shadow-xl sm:h-56 sm:w-56 group cursor-pointer overflow-hidden"
            style={{ transformOrigin: 'left center' }}
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05, 
              rotate: -2, 
              x: -10,
              boxShadow: '0 25px 50px -12px rgba(253, 126, 20, 0.25)'
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#FD7E14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl" />
            <img src={images[1]} alt="Community support" className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-32 w-32 rounded-2xl bg-white p-2 shadow-xl sm:h-48 sm:w-48 group cursor-pointer overflow-hidden"
            style={{ transformOrigin: 'top right' }}
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05, 
              rotate: 3, 
              y: -10,
              boxShadow: '0 25px 50px -12px rgba(253, 126, 20, 0.25)'
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#FD7E14]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl" />
            <img src={images[2]} alt="Volunteer helping" className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

