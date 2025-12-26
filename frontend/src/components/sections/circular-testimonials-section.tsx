"use client";

import React from "react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const cctTestimonials = [
  {
    quote:
      "Initiatives like Chiranjeevi Blood Bank prove that leadership isn't about power — it's about serving others selflessly and spreading hope.",
    name: "Shri Narendra Modi",
    designation: "Prime Minister of India",
    src: "/leaders/narender_modi.jpg",
  },
  {
    quote:
      "Chiranjeevi Charitable Trust has inspired millions through its relentless service and compassion. Their efforts truly define humanity in action.",
    name: "Dr. A.P.J. Abdul Kalam",
    designation: "Former President of India",
    src: "/leaders/abdul_kalam.jpg",
  },
  {
    quote:
      "Through consistent dedication, the Trust has saved countless lives. It continues to remind us that compassion and unity can build a better world.",
    name: "Dr. Tamilisai Soundararajan",
    designation: "Governor of Telangana",
    src: "/leaders/tamilsai.jpg",
  },
  {
    quote:
      "The work of Chiranjeevi Charitable Trust exemplifies true service to humanity. Their blood and eye donation initiatives have transformed countless lives across India.",
    name: "Shri G. Kishan Reddy",
    designation: "Union Minister",
    src: "/leaders/kishan_reddy.jpg",
  },
  {
    quote:
      "Chiranjeevi Charitable Trust stands as a beacon of hope, demonstrating that when compassion meets action, miracles happen. Their commitment to saving lives is truly commendable.",
    name: "Shri M. Venkaiah Naidu",
    designation: "Former Vice President of India",
    src: "/leaders/venkaiah_nadiu.jpg",
  },
];

export default function CircularTestimonialsSection() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-white via-slate-50/60 to-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mx-auto mb-16 flex max-w-[780px] flex-col items-center gap-4 text-center">
          <span className="inline-flex rounded-full border border-primary/20 px-4 py-1 text-sm font-medium uppercase tracking-[0.24em] text-primary/80">
            Recognition
          </span>
          <h2
            data-text-animation="split-text"
            className="text-4xl font-bold text-primary"
          >
            What Leaders Say About CCT
          </h2>
          <p
            data-animation="fade-in"
            className="text-body-large text-text-secondary"
          >
            Prominent leaders and dignitaries recognize the impact of Chiranjeevi Charitable Trust's humanitarian work across India.
          </p>
        </div>

        {/* Light testimonials section */}
        <div className="bg-[#f7f7fa] p-12 md:p-20 rounded-2xl min-h-[400px] flex flex-wrap gap-6 items-center justify-center relative shadow-lg">
          <div
            className="items-center justify-center relative flex w-full"
            style={{ maxWidth: "1456px" }}
          >
            <CircularTestimonials
              testimonials={cctTestimonials}
              autoplay={true}
              colors={{
                name: "#1a3a3a",
                designation: "#6b7280",
                testimony: "#4b5563",
                arrowBackground: "#1a3a3a",
                arrowForeground: "#ffffff",
                arrowHoverBackground: "#b8f4d3",
              }}
              fontSizes={{
                name: "28px",
                designation: "20px",
                quote: "20px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

