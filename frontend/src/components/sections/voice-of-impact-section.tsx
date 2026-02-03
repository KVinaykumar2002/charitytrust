"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";
import { getPublicTestimonials } from "@/lib/api";
import TrustLoader from "@/components/TrustLoader";

const celebritiesAndLeaders = [
  {
    id: "1",
    name: "Shri Narendra Modi",
    affiliation: "Prime Minister of India",
    quote: "Initiatives like Chiranjeevi Blood Bank prove that leadership isn't about power — it's about serving others selflessly and spreading hope.",
    imageSrc: "/leaders/narender_modi.jpg",
    thumbnailSrc: "/leaders/narender_modi.jpg",
  },
  {
    id: "2",
    name: "Dr. A.P.J. Abdul Kalam",
    affiliation: "Former President of India",
    quote: "Chiranjeevi Charitable Trust has inspired millions through its relentless service and compassion. Their efforts truly define humanity in action.",
    imageSrc: "/leaders/abdul_kalam.jpg",
    thumbnailSrc: "/leaders/abdul_kalam.jpg",
  },
  {
    id: "3",
    name: "Dr. Tamilisai Soundararajan",
    affiliation: "Governor of Telangana",
    quote: "Through consistent dedication, the Trust has saved countless lives. It continues to remind us that compassion and unity can build a better world.",
    imageSrc: "/leaders/tamilsai.jpg",
    thumbnailSrc: "/leaders/tamilsai.jpg",
  },
];

const organizationsFallback = [
  {
    id: "org1",
    name: "Apollo Hospitals",
    affiliation: "Partner Hospital",
    quote: "Chiranjeevi Charitable Trust's blood bank has been our reliable partner. Their efficient system and dedicated team have helped us save thousands of lives.",
    imageSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=600&fit=crop&q=80",
    thumbnailSrc: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=120&fit=crop&q=80",
  },
  {
    id: "org2",
    name: "Care Hospitals",
    affiliation: "Healthcare Partner",
    quote: "Working with Chiranjeevi Charitable Trust for eye and blood services has strengthened our ability to serve patients in need across the region.",
    imageSrc: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=600&fit=crop&q=80",
    thumbnailSrc: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=100&h=120&fit=crop&q=80",
  },
];

const beneficiariesFallback = [
  {
    id: "b1",
    name: "Ramesh Kumar",
    affiliation: "Blood Donation Beneficiary",
    quote: "When my father needed an emergency blood transfusion, Chiranjeevi Charitable Trust provided it within hours. They saved his life.",
    imageSrc: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=600&fit=crop&q=80",
    thumbnailSrc: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=100&h=120&fit=crop&q=80",
  },
  {
    id: "b2",
    name: "Lakshmi Devi",
    affiliation: "Eye Surgery Recipient",
    quote: "Chiranjeevi Charitable Trust's Eye Bank gave me a second chance. Today I can see my grandchildren's faces. This is nothing short of a miracle.",
    imageSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=600&fit=crop&q=80",
    thumbnailSrc: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=120&fit=crop&q=80",
  },
  {
    id: "b3",
    name: "Padma Venkatesh",
    affiliation: "Community Volunteer",
    quote: "Volunteering with Chiranjeevi Charitable Trust for the past 5 years has been the most fulfilling experience. Seeing the direct impact on people's lives motivates me every day.",
    imageSrc: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=600&fit=crop&q=80",
    thumbnailSrc: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=120&fit=crop&q=80",
  },
];

const placeholderImages = [
  "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=600&fit=crop&q=80",
];

interface APITestimonial {
  _id: string;
  name: string;
  role?: string;
  organization?: string;
  message: string;
  imageBase64?: string;
  imageUrl?: string;
  thumbnailBase64?: string;
  category?: string;
}

export default function VoiceOfImpactSection() {
  const [beneficiaries, setBeneficiaries] = React.useState(beneficiariesFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await getPublicTestimonials();
        if (result.success && result.data && result.data.length > 0) {
          const transformed = result.data.map((t: APITestimonial, index: number) => {
            const imageSrc = t.imageBase64 || t.imageUrl || placeholderImages[index % placeholderImages.length];
            const affiliation = [t.role, t.organization].filter(Boolean).join(", ") || "Chiranjeevi Charitable Trust Supporter";
            return {
              id: t._id,
              name: t.name,
              affiliation,
              quote: t.message,
              imageSrc,
              thumbnailSrc: t.thumbnailBase64 || imageSrc,
            };
          });
          setBeneficiaries(transformed);
        }
      } catch {
        // Keep fallback
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-gray-900 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-white mb-6">
            Voice of Impact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground dark:text-neutral-300 leading-relaxed">
            Hear from celebrities, leaders, organizations, and beneficiaries who have been part of our journey.
          </p>
        </div>

        {/* 1. Celebrities & Leaders */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white text-center mb-8">
            Celebrities & Leaders Voice of Impact
          </h3>
          <div className="max-w-5xl mx-auto">
            <TestimonialSlider
              reviews={celebritiesAndLeaders}
              autoScrollInterval={7000}
              pauseOnHover
              className="bg-transparent"
            />
          </div>
        </div>

        {/* 2. Organizations & Hospitals */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white text-center mb-8">
            Organizations & Hospitals
          </h3>
          <div className="max-w-5xl mx-auto">
            <TestimonialSlider
              reviews={organizationsFallback}
              autoScrollInterval={7000}
              pauseOnHover
              className="bg-transparent"
            />
          </div>
        </div>

        {/* 3. Beneficiaries, Volunteers & Patients */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white text-center mb-8">
            Beneficiaries, Volunteers & Patients
          </h3>
          <div className="max-w-5xl mx-auto">
            {loading ? (
              <div className="flex justify-center min-h-[300px] items-center">
                <TrustLoader variant="eye" size="lg" label="Loading..." />
              </div>
            ) : (
              <TestimonialSlider
                reviews={beneficiaries}
                autoScrollInterval={6000}
                pauseOnHover
                className="bg-transparent"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
