"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const HeroVisionary = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-white">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale brightness-110"
        >
          <source
            src="https://rilstaticasset.akamaized.net/sites/default/files/2023-03/Ril-founder_chairman.mp4"
            type="video/mp4"
          />
        </video>
        {/* Top Overlay for Navbar Visibility */}
        <div className="absolute inset-0 bg-hero-overlay pointer-events-none" />
        {/* Subtle Vignette/Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container h-full flex flex-col justify-end pb-32 max-w-[1200px] mx-auto px-4">
        <div className="max-w-[1000px]">
          <h1
            className={`font-display text-white transition-all duration-1000 ease-out transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              fontSize: "clamp(40px, 8vw, 80px)",
              lineHeight: "1.1",
              fontWeight: "400",
              textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            A timeless visionary
          </h1>

          <p
            className={`font-display text-white mt-4 transition-all duration-1000 delay-300 ease-out transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              fontSize: "clamp(20px, 3.5vw, 36px)",
              fontWeight: "400",
              lineHeight: "1.2",
              textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            whose legacy emboldens the imagination of a billion people
          </p>
        </div>
      </div>

      {/* Breadcrumb Strip */}
      <div className="absolute bottom-0 left-0 w-full z-20 bg-[#FDF5E6] py-3 border-t border-white/20">
        <div className="container max-w-[1200px] mx-auto px-4">
          <nav className="flex items-center space-x-2 text-[13px] text-[#333333]">
            <Link href="/" className="hover:text-[#004291] transition-colors">
              Home
            </Link>
            <span className="text-[#666666]/50">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block mx-1"
              >
                <path
                  d="M1.5 1L6.5 6L1.5 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <Link href="/about" className="hover:text-[#004291] transition-colors">
              About
            </Link>
            <span className="text-[#666666]/50">
              <svg
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block mx-1"
              >
                <path
                  d="M1.5 1L6.5 6L1.5 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-semibold">Founder-Chairman</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default HeroVisionary;
