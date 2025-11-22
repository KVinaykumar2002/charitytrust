"use client";

import Image from "next/image";
import { Heart, Shield, Eye, Users, Target } from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const values = [
  {
    icon: (
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full">
        <Shield className="w-8 h-8 text-white" />
      </div>
    ),
    title: "Trust",
    description: "Building unwavering trust through transparency and accountability in every action we take.",
  },
  {
    icon: (
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full">
        <Heart className="w-8 h-8 text-white" />
      </div>
    ),
    title: "Compassion",
    description: "Serving with genuine care and empathy, treating every individual with dignity and respect.",
  },
  {
    icon: (
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full">
        <Eye className="w-8 h-8 text-white" />
      </div>
    ),
    title: "Integrity",
    description: "Upholding the highest ethical standards in all our operations and decision-making processes.",
  },
  {
    icon: (
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full">
        <Target className="w-8 h-8 text-white" />
      </div>
    ),
    title: "Transparency",
    description: "Maintaining open communication and clear reporting of our activities and impact.",
  },
  {
    icon: (
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full">
        <Users className="w-8 h-8 text-white" />
      </div>
    ),
    title: "Service to Society",
    description: "Dedicated to creating lasting positive change in communities across India.",
  },
];

const AboutCompanySection = () => {
  return (
    <section
      id="about-company"
      data-page-animation="staggered-fade"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Hero Section */}
        <div
          data-stagger-parent
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight"
          >
            About Chiranjeevi Charity Trust
          </h1>
          <div
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.2s"
            className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
          ></div>
          <p
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.3s"
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
          >
            Transforming lives through compassion, service, and unwavering commitment to humanity
          </p>
        </div>

        {/* Main Content Grid */}
        <div
          data-stagger-parent
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20"
        >
          {/* Left: Image */}
          <div
            data-stagger-item
            data-animation="fade-right"
            data-animation-duration="1s"
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover-image-zoom">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop"
                alt="Chiranjeevi Charity Trust - Serving Communities"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl"></div>
          </div>

          {/* Right: Content */}
          <div
            data-stagger-item
            data-animation="fade-left"
            data-animation-duration="1s"
            className="space-y-6"
          >
            <h2
              data-text-animation="reveal-from-bottom"
              className="text-4xl md:text-5xl font-bold text-primary mb-6"
            >
              Who We Are
            </h2>
            <p
              data-animation="fade-in"
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Chiranjeevi Charity Trust (CCT) is a beacon of hope and transformation, 
              founded with a vision to serve humanity and create lasting positive change 
              in communities across India. For over two decades, we have been at the 
              forefront of humanitarian service, touching millions of lives through our 
              comprehensive initiatives in healthcare, education, and community welfare.
            </p>
            <p
              data-animation="fade-in"
              data-animation-delay="0.1s"
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Our journey began with a simple yet powerful belief: that every act of 
              kindness, no matter how small, can create a ripple effect of positive change. 
              Today, CCT stands as one of India's most trusted and impactful charitable 
              organizations, recognized for our unwavering commitment to transparency, 
              compassion, and service excellence.
            </p>
            <p
              data-animation="fade-in"
              data-animation-delay="0.2s"
              className="text-lg text-muted-foreground leading-relaxed"
            >
              We believe in the power of collective action and community participation. 
              Every program we launch, every life we touch, and every initiative we 
              undertake is driven by our core purpose: to empower individuals, strengthen 
              communities, and build a society where everyone has access to opportunities 
              for growth, health, and happiness.
            </p>
          </div>
        </div>

        {/* Why We Were Founded */}
        <div
          data-stagger-parent
          className="max-w-4xl mx-auto mb-20"
        >
          <h2
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-8"
          >
            Why We Were Founded
          </h2>
          <div
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.1s"
            className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-3xl p-8 md:p-12 border border-primary/10"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              CCT was founded to bridge the gap between those who need help and those 
              who can provide it. We recognized that many communities across India lacked 
              access to essential healthcare services, educational opportunities, and 
              support systems. Our founders envisioned an organization that would not 
              just provide temporary relief, but create sustainable solutions that 
              empower communities to thrive independently.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div
          data-stagger-parent
          className="mb-20"
        >
          <h2
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          >
            Our Core Values
          </h2>
          <div className="max-w-7xl mx-auto">
            <HoverEffect items={values} />
          </div>
        </div>

        {/* Impact Statement */}
        <div
          data-stagger-parent
          className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2
              data-stagger-item
              data-animation="fade-up"
              data-text-animation="reveal-from-bottom"
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              The Impact We Create
            </h2>
            <p
              data-stagger-item
              data-animation="fade-up"
              data-animation-delay="0.2s"
              className="text-lg md:text-xl leading-relaxed text-white/90"
            >
              CCT aims to create transformative impact in communities by providing 
              access to life-saving healthcare services, educational opportunities, 
              and support systems that enable individuals and families to break the 
              cycle of poverty and build brighter futures. We measure our success not 
              just in numbers, but in the lives transformed, hope restored, and 
              communities empowered to create lasting change.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;

