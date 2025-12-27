"use client";

import * as React from "react";
import { TestimonialSlider } from "@/components/ui/testimonial-slider-1";

// Charity-themed testimonial reviews
const charityReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    affiliation: "Blood Donor",
    quote:
      "CCT's blood bank saved my brother's life. Their professionalism and compassion during our time of need was incredible. Forever grateful for their service.",
    imageSrc:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    affiliation: "Eye Transplant Recipient",
    quote:
      "The eye bank program restored my vision. I can see my grandchildren again. Chiranjeevi Charitable Trust gave me a new lease on life. Thank you from the bottom of my heart.",
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Anita Reddy",
    affiliation: "Volunteer",
    quote:
      "Volunteering with CCT has been life-changing. The impact they create in communities is remarkable. Every initiative is driven by genuine care and compassion.",
    imageSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Dr. Venkatesh Iyer",
    affiliation: "Medical Advisor",
    quote:
      "Working with CCT has shown me what true dedication to healthcare means. Their transparency and commitment to saving lives sets them apart. Highly trustworthy organization.",
    imageSrc:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Meera Patel",
    affiliation: "COVID-19 Beneficiary",
    quote:
      "During the pandemic, CCT's oxygen banks were a lifeline for my family. Their quick response and free services saved countless lives. Truly grateful for their humanitarian work.",
    imageSrc:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=120&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Arjun Singh",
    affiliation: "Regular Donor",
    quote:
      "I've been donating blood through CCT for years. Their transparency and impact reports show exactly how contributions make a difference. This is how charity should work.",
    imageSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&q=80",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=120&fit=crop&q=80",
  },
];

export default function TestimonialSliderSection() {
  return (
    <div className="w-full bg-background">
      <TestimonialSlider 
        reviews={charityReviews} 
        autoScrollInterval={5000}
        pauseOnHover={true}
      />
    </div>
  );
}

