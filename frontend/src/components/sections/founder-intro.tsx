"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FounderIntro = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder-chairman"
      className="relative w-full overflow-hidden bg-[#004291] py-16 md:py-24 lg:py-32 scroll-mt-24"
    >
      {/* Background Graphic Element */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="absolute left-[-10%] top-[-10%] w-[60%] h-auto text-white fill-current"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
        <svg
          className="absolute right-[-5%] bottom-[-15%] w-[50%] h-auto text-white fill-current"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Content Column */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-white">
            <div
              className={`mb-12 max-w-lg transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <blockquote className="relative">
                <p className="font-sans text-xl md:text-2xl leading-relaxed font-normal mb-0">
                  Our dreams have to be bigger. Our ambitions higher. Our
                  commitment deeper. And our efforts greater. This is my dream
                  for Chiranjeevi Charitable Trust and for India.
                </p>
              </blockquote>
            </div>

            {/* Large Animated Name - Scroll triggered */}
            <div className="flex flex-col mt-4 overflow-hidden">
              <div className="overflow-hidden">
                <h2
                  className={`font-display text-[60px] md:text-[80px] lg:text-[100px] leading-[0.9] font-medium tracking-tight text-white transition-all ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0 translate-x-0"
                      : "opacity-0 translate-y-[100%]"
                  }`}
                  style={{
                    transitionDuration: "1.2s",
                    transitionDelay: "0.3s",
                  }}
                >
                  Chiranjeevi
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2
                  className={`font-display text-[60px] md:text-[80px] lg:text-[100px] leading-[0.9] font-medium tracking-tight ml-12 md:ml-32 text-white transition-all ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0 translate-x-0"
                      : "opacity-0 translate-y-[100%]"
                  }`}
                  style={{
                    transitionDuration: "1.2s",
                    transitionDelay: "0.6s",
                  }}
                >
                  Garu
                </h2>
              </div>
            </div>
          </div>

          {/* Right Portrait Column */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div
              className={`relative w-full max-w-[480px] aspect-[4/5] shadow-2xl transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <Image
                src="/founder-chairman.jpg"
                alt="Portrait of Chiranjeevi - Founder and Chairman, Chiranjeevi Charitable Trust"
                fill
                className="object-cover rounded-sm"
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
    </section>
  );
};

export default FounderIntro;
