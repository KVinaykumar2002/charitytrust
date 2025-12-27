"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";

// Testimonials from beneficiaries, volunteers, and supporters with charity-related images
const testimonials = [
  {
    id: 1,
    name: "Ramesh Kumar",
    affiliation: "Blood Donation Beneficiary",
    quote:
      "When my father needed an emergency blood transfusion, CCT provided it within hours. They saved his life. I am forever grateful to this organization and their dedicated volunteers.",
    imageSrc:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    affiliation: "Eye Surgery Recipient",
    quote:
      "After losing my vision, I had given up hope. CCT's Eye Bank program gave me a second chance at life. Today, I can see my grandchildren's faces. This is nothing short of a miracle.",
    imageSrc:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Srinivas Reddy",
    affiliation: "Film Industry Worker",
    quote:
      "During COVID, when oxygen was scarce everywhere, CCT's oxygen banks saved my colleague's life. Their support for film workers with insurance and medical subsidies has been life-changing.",
    imageSrc:
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Padma Venkatesh",
    affiliation: "Community Volunteer",
    quote:
      "Volunteering with CCT for the past 5 years has been the most fulfilling experience. Seeing the direct impact of our work on people's lives motivates me every single day.",
    imageSrc:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Dr. Anil Sharma",
    affiliation: "Partner Hospital",
    quote:
      "CCT's blood bank has been our reliable partner for over a decade. Their efficient system and dedicated team have helped us save thousands of lives in critical situations.",
    imageSrc:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Kavitha Rao",
    affiliation: "Education Program Beneficiary",
    quote:
      "CCT's scholarship helped me complete my engineering degree. Today, I work as a software engineer and support my entire family. They didn't just fund my education—they changed my destiny.",
    imageSrc:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=100&h=120&fit=crop&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Voices of Impact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Hear from the lives we&apos;ve touched—beneficiaries, volunteers, and partners
            share their experiences with Chiranjeevi Charity Trust.
          </p>
        </div>
      </div>

      {/* Testimonial Slider */}
      <div className="max-w-7xl mx-auto">
        <TestimonialSlider 
          reviews={testimonials}
          autoScrollInterval={6000}
          pauseOnHover={true}
          className="bg-transparent"
        />
      </div>
    </section>
  );
}

