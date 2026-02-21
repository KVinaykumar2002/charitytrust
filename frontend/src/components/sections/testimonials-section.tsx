"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { getPublicTestimonials } from "@/lib/api";
import VideoLoader from "@/components/VideoLoader";

// Fallback testimonials in case API fails or returns empty
const fallbackTestimonials = [
  {
    id: 1,
    name: "Ramesh Kumar",
    affiliation: "Blood Donation Beneficiary",
    quote:
      "When my father needed an emergency blood transfusion, Chiranjeevi Charitable Trust provided it within hours. They saved his life. I am forever grateful to this organization and their dedicated volunteers.",
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
      "After losing my vision, I had given up hope. Chiranjeevi Charitable Trust's Eye Bank program gave me a second chance at life. Today, I can see my grandchildren's faces. This is nothing short of a miracle.",
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
      "During COVID, when oxygen was scarce everywhere, Chiranjeevi Charitable Trust's oxygen banks saved my colleague's life. Their support for film workers with insurance and medical subsidies has been life-changing.",
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
      "Volunteering with Chiranjeevi Charitable Trust for the past 5 years has been the most fulfilling experience. Seeing the direct impact of our work on people's lives motivates me every single day.",
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
      "Chiranjeevi Charitable Trust's blood bank has been our reliable partner for over a decade. Their efficient system and dedicated team have helped us save thousands of lives in critical situations.",
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
      "Chiranjeevi Charitable Trust's scholarship helped me complete my engineering degree. Today, I work as a software engineer and support my entire family. They didn't just fund my education—they changed my destiny.",
    imageSrc:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=100&h=120&fit=crop&q=80",
  },
];

// Default placeholder images for testimonials without images
const placeholderImages = [
  "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=600&fit=crop&q=80",
];

interface APITestimonial {
  _id: string;
  name: string;
  email?: string;
  role?: string;
  organization?: string;
  message: string;
  rating?: number;
  imageBase64?: string;
  imageUrl?: string;
  thumbnailBase64?: string;
  featured?: boolean;
  status: string;
  order?: number;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await getPublicTestimonials();
        if (result.success && result.data && result.data.length > 0) {
          // Transform API data to match the slider component format
          const transformedData = result.data.map((t: APITestimonial, index: number) => {
            // Determine the image source
            const imageSrc = t.imageBase64 || t.imageUrl || placeholderImages[index % placeholderImages.length];
            const thumbnailSrc = t.thumbnailBase64 || imageSrc;
            
            // Build affiliation string from role and organization
            let affiliation = "";
            if (t.role && t.organization) {
              affiliation = `${t.role}, ${t.organization}`;
            } else if (t.role) {
              affiliation = t.role;
            } else if (t.organization) {
              affiliation = t.organization;
            } else {
              affiliation = "Chiranjeevi Charitable Trust Supporter";
            }

            return {
              id: t._id,
              name: t.name,
              affiliation,
              quote: t.message,
              imageSrc,
              thumbnailSrc,
            };
          });
          setTestimonials(transformedData);
        }
      } catch (err: any) {
        console.error("Error fetching testimonials:", err);
        setError(err.message);
        // Keep fallback testimonials on error
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
            share their experiences with Chiranjeevi Charitable Trust.
          </p>
        </div>
      </div>

      {/* Testimonial Slider */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <VideoLoader size="lg" label="Loading testimonials..." />
          </div>
        ) : (
          <TestimonialSlider 
            reviews={testimonials}
            autoScrollInterval={6000}
            pauseOnHover={true}
            className="bg-transparent"
          />
        )}
      </div>
    </section>
  );
}
