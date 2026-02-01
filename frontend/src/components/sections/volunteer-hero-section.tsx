"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Heart, Users } from "lucide-react";
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
    
    console.log("Volunteer form data:", formData);
    
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

  return (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left Section - 2/3 width */}
      <div className="relative flex-[2] min-h-[600px] lg:min-h-screen flex items-center justify-center p-8 lg:p-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Happy children"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-white">
          <div className="space-y-6">
            {/* Badge */}
            <p className="text-[#FD7E14] text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2">
              <Heart className="w-4 h-4" />
              JOIN WITH US
              <Users className="w-4 h-4" />
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Because Every Life{" "}
              <span className="text-[#FD7E14]">Matters!</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-xl">
              Charitable giving as a religious act or duty is referred to as alms. The name stems from the most obvious expression of the virtue of charity, giving the recipients of it the means they need to survive.
            </p>

            {/* Button */}
            <Button
              onClick={handleDonateClick}
              className="bg-[#FD7E14] hover:bg-[#E56B00] text-white px-8 py-6 text-lg font-semibold rounded-lg mt-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              💝 Donate Blood
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section - 1/3 width */}
      <div className="relative flex-1 min-h-[600px] lg:min-h-screen bg-black flex items-center justify-center p-8 lg:p-12 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 opacity-10">
          <Heart className="w-20 h-20 text-[#FD7E14]" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-10">
          <Users className="w-16 h-16 text-[#FD7E14]" />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="mb-8">
            <p className="text-[#FD7E14] text-sm font-semibold uppercase tracking-wider mb-2 inline-flex items-center gap-2">
              <Heart className="w-4 h-4" />
              JOIN US NOW
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Become A{" "}
              <span className="text-[#FD7E14]">Volunteer</span>
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full h-12 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg focus:ring-2 focus:ring-[#FD7E14] focus:border-[#FD7E14] transition-all duration-300 hover:border-[#FD7E14]/50"
            />

            {/* Email Input with Icon */}
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg focus:ring-2 focus:ring-[#FD7E14] focus:border-[#FD7E14] transition-all duration-300 hover:border-[#FD7E14]/50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail className="w-5 h-5 text-white/50" />
              </div>
            </div>

            {/* Phone Input */}
            <Input
              type="tel"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full h-12 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg focus:ring-2 focus:ring-[#FD7E14] focus:border-[#FD7E14] transition-all duration-300 hover:border-[#FD7E14]/50"
            />

            {/* Address Input */}
            <Input
              type="text"
              name="address"
              placeholder="Your address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full h-12 px-4 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg focus:ring-2 focus:ring-[#FD7E14] focus:border-[#FD7E14] transition-all duration-300 hover:border-[#FD7E14]/50"
            />

            {/* Message Textarea */}
            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg resize-y focus:ring-2 focus:ring-[#FD7E14] focus:border-[#FD7E14] transition-all duration-300 hover:border-[#FD7E14]/50"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FD7E14] hover:bg-[#E56B00] text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  ⏳ Submitting...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  ✋ Become A Volunteer ❤️
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VolunteerHeroSection;
