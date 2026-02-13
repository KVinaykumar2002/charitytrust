"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { founderCarouselImages } from "@/lib/founder-images";

const AUTO_SCROLL_INTERVAL_MS = 1000;

const HeroVisionary = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % founderCarouselImages.length);
    }, AUTO_SCROLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-neutral-900">
      {/* Background: auto-scrolling Chiranjeevi images */}
      <div className="absolute inset-0 w-full h-full z-0">
        {founderCarouselImages.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              zIndex: index === activeIndex ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-center brightness-90"
              priority={index === 0}
              sizes="100vw"
              unoptimized={src.startsWith("https://upload.wikimedia.org")}
            />
          </div>
        ))}
        {/* Top Overlay for Navbar Visibility */}
        <div className="absolute inset-0 bg-hero-overlay pointer-events-none z-[2]" />
        {/* Subtle Vignette/Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-[2]" />
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
              textShadow: "0px 2px 8px rgba(0,0,0,0.4)",
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
              textShadow: "0px 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            whose legacy inspires millions to save lives and restore sight
          </p>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
        {founderCarouselImages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-[#c59b5f]"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroVisionary;
