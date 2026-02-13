"use client";

import React from "react";
import Image from "next/image";

const FounderBiography = () => {
  const thumbnailImages = [
    "/founder-chairman.jpg",
    "/founder-chairman.jpg",
    "/founder-chairman.jpg",
  ];

  return (
    <section className="relative w-full bg-[#fdf5e6] pb-20 dark:bg-neutral-900">
      {/* Background container for the offset look */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-transparent z-0" />

      <div className="container relative z-10">
        <div className="max-w-[1200px] mx-auto">
          {/* Main White Content Card */}
          <div className="bg-white dark:bg-neutral-950 p-10 md:p-14 border border-[#e5e5e5] dark:border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.08)] -mt-24 md:-mt-32">
            {/* Heading */}
            <h2 className="font-display text-[48px] leading-[1.2] font-medium text-[#333333] dark:text-white mb-10 border-b border-[#e5e5e5] dark:border-neutral-800 pb-6">
              Founder-Chairman
            </h2>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Left Column */}
              <div className="space-y-6">
                <p className="font-sans text-[16px] leading-[1.7] text-[#333333] dark:text-neutral-300">
                  Chiranjeevi garu founded Chiranjeevi Charitable Trust with a
                  vision to save lives and restore sight through blood and eye
                  donation. Inspired by the belief that every act of compassion
                  creates lasting change, he has led the Trust to become one of
                  India&apos;s most impactful charitable organizations.
                </p>
                <p className="font-sans text-[16px] leading-[1.7] text-[#333333] dark:text-neutral-300">
                  His extraordinary vision redefined the potential of
                  community-driven healthcare and he challenged conventional
                  wisdom in several areas. The philosophy he follows is simple
                  and succinct: &quot;Think Big. Think Differently. Think Fast.
                  Think Ahead. Aim for the Best.&quot;
                </p>
                <p className="font-sans text-[16px] leading-[1.7] text-[#333333] dark:text-neutral-300">
                  It was under his visionary leadership that Chiranjeevi
                  Charitable Trust emerged as one of India&apos;s most impactful
                  charitable organizations, touching millions of lives through
                  eye banking, blood donation, and community welfare programs.
                </p>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <p className="font-sans text-[16px] leading-[1.7] text-[#333333] dark:text-neutral-300">
                  During the course of his mission, Chiranjeevi garu set a number
                  of revolutionary precedents in the voluntary sector. His
                  contributions to saving lives and restoring sight have been
                  recognised by numerous national and international
                  organisations. He has been honoured with the Padma Bhushan—
                  India&apos;s third highest civilian honour—for his
                  distinguished service to the arts and society.
                </p>
                <p className="font-sans text-[16px] leading-[1.7] text-[#333333] dark:text-neutral-300">
                  He envisaged the growth of Chiranjeevi Charitable Trust as an
                  integral part of his vision for a healthier, more compassionate
                  India. He was convinced that every individual could contribute
                  to saving lives and wanted the Trust to play a leading role in
                  making blood and eye donation a widespread movement.
                </p>
                <p className="font-sans text-[16px] leading-[1.7] text-[#333333] dark:text-neutral-300">
                  Under his leadership, the Trust has touched millions of lives
                  through Chiranjeevi Eye Bank, Chiranjeevi Blood Center, medical
                  assistance, and community welfare programs—bringing help and
                  hope to those who need it most.
                </p>
              </div>
            </div>

            {/* Historical Photo Slider / Thumbnails Container */}
            <div className="mt-16 relative">
              <div className="flex items-center justify-between gap-4 overflow-hidden">
                {/* Previous Arrow */}
                <button
                  type="button"
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c59b5f] flex items-center justify-center transition-opacity hover:opacity-90 z-10 shadow-md"
                  aria-label="Previous"
                >
                  <svg
                    className="rotate-180 w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="flex gap-4 w-full overflow-hidden">
                  {thumbnailImages.map((src, index) => (
                    <div
                      key={index}
                      className="relative flex-1 min-w-[200px] h-[180px] overflow-hidden group"
                    >
                      <Image
                        src={src}
                        alt={`Founder moment ${index + 1}`}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>

                {/* Next Arrow */}
                <button
                  type="button"
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c59b5f] flex items-center justify-center transition-opacity hover:opacity-90 z-10 shadow-md"
                  aria-label="Next"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderBiography;
