"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Mail, Heart, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const VolunteerHeroSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Add API call to submit volunteer form
    console.log("Volunteer form data:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your interest in volunteering! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    }, 1000);
  };

  const handleDonateClick = () => {
    window.location.href = "/donate";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const formItemVariants = {
    hidden: { x: -30, opacity: 0, scale: 0.95 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  // Floating animation for icons
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Pulsing sparkle animation
  const sparkleAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Section - 2/3 width */}
      <motion.div
        className="relative flex-[2] min-h-[600px] lg:min-h-screen flex items-center justify-center p-8 lg:p-16"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Image with zoom animation */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Happy children"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Animated Dark Overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Animated floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                y: [
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                ],
                x: [
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                  Math.random() * 100 + "%",
                ],
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-white">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={badgeVariants}>
              <motion.p 
                className="text-yellow-400 text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2 relative"
                whileHover={{ scale: 1.05, x: 5 }}
                animate={{
                  textShadow: [
                    "0 0 5px rgba(234, 179, 8, 0.5)",
                    "0 0 15px rgba(234, 179, 8, 0.8)",
                    "0 0 5px rgba(234, 179, 8, 0.5)",
                  ],
                }}
                transition={{
                  textShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <motion.div
                  animate={floatingAnimation}
                  transition={{ delay: 0 }}
                >
                  <Heart className="w-4 h-4" />
                </motion.div>
                JOIN WITH US
                <motion.div
                  animate={floatingAnimation}
                  transition={{ delay: 0.3 }}
                >
                  <Users className="w-4 h-4" />
                </motion.div>
                <motion.div
                  className="absolute -right-6 top-0"
                  animate={sparkleAnimation}
                >
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                </motion.div>
              </motion.p>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                Because Every Life{" "}
              </motion.span>
              <motion.span
                className="text-yellow-400 inline-block"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  textShadow: [
                    "0 0 10px rgba(234, 179, 8, 0.5)",
                    "0 0 20px rgba(234, 179, 8, 0.8)",
                    "0 0 10px rgba(234, 179, 8, 0.5)",
                  ],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.3 },
                  scale: { duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 },
                  rotate: { duration: 0.6, delay: 0.3 },
                  textShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                Matters!
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-lg md:text-xl leading-relaxed text-white/90 max-w-xl"
              variants={itemVariants}
            >
              Charitable giving as a religious act or duty is referred to as alms. The name stems from the most obvious expression of the virtue of charity, giving the recipients of it the means they need to survive.
            </motion.p>

            {/* Button */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Glowing background effect */}
                <motion.div
                  className="absolute inset-0 bg-yellow-400 rounded-lg blur-xl opacity-50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Button
                  onClick={handleDonateClick}
                  className="relative bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg font-semibold rounded-lg mt-4 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.span
                    className="relative z-10 inline-flex items-center gap-2"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    💝 Donate Now ✨
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - 1/3 width */}
      <motion.div
        className="relative flex-1 min-h-[600px] lg:min-h-screen bg-white flex items-center justify-center p-8 lg:p-12 overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Decorative floating elements */}
        <motion.div
          className="absolute top-20 right-10 opacity-10"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-20 h-20 text-yellow-500" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-10 opacity-10"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Users className="w-16 h-16 text-yellow-500" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-5 opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="w-24 h-24 text-yellow-500" />
        </motion.div>

        <motion.div 
          className="w-full max-w-md relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <motion.p 
              className="text-yellow-500 text-sm font-semibold uppercase tracking-wider mb-2 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, x: 3 }}
              animate={{
                textShadow: [
                  "0 0 3px rgba(234, 179, 8, 0.3)",
                  "0 0 8px rgba(234, 179, 8, 0.6)",
                  "0 0 3px rgba(234, 179, 8, 0.3)",
                ],
              }}
              transition={{
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.div
                animate={floatingAnimation}
                transition={{ delay: 0 }}
              >
                <Heart className="w-4 h-4" />
              </motion.div>
              JOIN US NOW
              <motion.div
                className="ml-1"
                animate={sparkleAnimation}
              >
                <Sparkles className="w-3 h-3 text-yellow-500" />
              </motion.div>
            </motion.p>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900"
              whileHover={{ scale: 1.02, x: 5 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Become A{" "}
              <motion.span
                className="text-yellow-500"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(234, 179, 8, 0.3)",
                    "0 0 10px rgba(234, 179, 8, 0.6)",
                    "0 0 5px rgba(234, 179, 8, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Volunteer
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <motion.div
              variants={formItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-yellow-400 hover:shadow-md focus:shadow-lg"
              />
            </motion.div>

            {/* Email Input with Icon */}
            <motion.div
              variants={formItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 px-4 pr-12 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-yellow-400 hover:shadow-md focus:shadow-lg"
                />
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  animate={floatingAnimation}
                  transition={{ delay: 0.5 }}
                >
                  <Mail className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Phone Input */}
            <motion.div
              variants={formItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Input
                type="tel"
                name="phone"
                placeholder="Phone No"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-yellow-400 hover:shadow-md focus:shadow-lg"
              />
            </motion.div>

            {/* Address Input */}
            <motion.div
              variants={formItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Input
                type="text"
                name="address"
                placeholder="Your address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-yellow-400 hover:shadow-md focus:shadow-lg"
              />
            </motion.div>

            {/* Message Textarea */}
            <motion.div
              variants={formItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.01 }}
            >
              <Textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-yellow-400 hover:shadow-md focus:shadow-lg"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={formItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0"
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span
                      key="submitting"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                      }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="relative z-10 inline-flex items-center gap-2"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ⏳
                      </motion.span>
                      Submitting...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="submit"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="relative z-10 inline-flex items-center gap-2"
                    >
                      <motion.span
                        animate={floatingAnimation}
                      >
                        ✋
                      </motion.span>
                      Become A Volunteer
                      <motion.span
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        ❤️
                      </motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VolunteerHeroSection;

