"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { getPublicHeroImages } from "@/lib/api";
import { AnimatedButton } from "@/components/ui/animated-button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import TrustLoader from "@/components/TrustLoader";

interface HeroSlide {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  badge: string;
}

const HeroBanner = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);

  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    try {
      const result = await getPublicHeroImages();
      if (result.success && result.data) {
        // Filter active images and sort by admin-defined order (ascending: 0, 1, 2...)
        const activeImages = result.data
          .filter((img: any) => img.active !== false)
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
        
        const slides: HeroSlide[] = activeImages.map((img: any) => ({
          title: img.title || "",
          description: img.description || "",
          ctaLabel: img.ctaLabel || "Learn More",
          ctaHref: img.ctaHref || "/",
          image: img.imageBase64 || img.image || "",
          badge: img.badge || "",
        }));
        setHeroSlides(slides);
      }
    } catch (error) {
      console.error("Error fetching hero images:", error);
      setHeroSlides([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  if (loading) {
    return (
      <section className="relative w-full min-h-screen mt-0 overflow-hidden flex items-center justify-center bg-[#1a1a1a]">
        <TrustLoader variant="blood" size="lg" label="Loading..." />
      </section>
    );
  }

  if (heroSlides.length === 0) {
    return null; // Don't show hero section if no images
  }

  return (
    <section
      data-page-animation="fade-in-up"
      className="relative w-full min-h-screen mt-0 overflow-hidden"
    >
      <Carousel
        className="w-full"
        opts={{ loop: true, align: "start", skipSnaps: true, duration: 60 }}
        plugins={[autoplayPlugin.current]}
        setApi={setApi}
      >
        <CarouselContent className="ml-0 h-screen">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.title} className="pl-0">
              <div className="relative h-screen w-full overflow-hidden">
                {/* Hero Image - Background Layer */}
                <div className="absolute inset-0 z-0">
                  {slide.image && slide.image.startsWith('data:') ? (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover scale-105"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover scale-105"
                      priority={index === 0}
                      quality={100}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]"></div>
                  )}
                </div>

                {/* Dark gradient overlay - stronger at bottom to create text safe zone, avoid overlapping faces */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.9) 100%)",
                  }}
                />

                {/* Text content - bottom-aligned to avoid overlapping faces in center of photos */}
                <div
                  data-stagger-parent
                  className="absolute inset-x-0 bottom-0 z-20 flex justify-center pb-16 pt-32 md:pb-24 md:pt-40"
                >
                  <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 text-center md:px-12 lg:px-20">
                    {slide.badge && slide.badge.trim() && (
                      <span
                        data-stagger-item
                        data-animation="fade-down"
                        data-animation-duration="1s"
                        className="inline-flex items-center rounded-full border border-white/30 bg-black/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm"
                      >
                        {slide.badge}
                      </span>
                    )}

                    {slide.title && slide.title.trim() && (
                      <h1
                        data-stagger-item
                        data-animation="fade-up"
                        data-animation-duration="1.1s"
                        className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg md:text-4xl lg:text-5xl lg:leading-[1.2]"
                      >
                        {slide.title}
                      </h1>
                    )}

                    {slide.description && slide.description.trim() && (
                      <p
                        data-stagger-item
                        data-animation="fade-in"
                        data-animation-duration="1s"
                        className="max-w-2xl text-sm text-white/90 drop-shadow-md md:text-base lg:text-lg"
                      >
                        {slide.description}
                      </p>
                    )}

                    {slide.ctaLabel && slide.ctaLabel.trim() && (
                      <div
                        data-stagger-item
                        data-animation="scale-in"
                        data-animation-duration="0.9s"
                        className="relative z-30"
                      >
                        <AnimatedButton href={slide.ctaHref || "/"} variant="filled">
                          {slide.ctaLabel}
                        </AnimatedButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Scroll buttons - positioned for visibility */}
        <CarouselPrevious
          className="left-4 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full border-2 border-white/30 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:border-white/50 hover:text-white disabled:opacity-40 md:left-6 md:size-14"
          aria-label="Previous slide"
        />
        <CarouselNext
          className="right-4 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full border-2 border-white/30 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 hover:border-white/50 hover:text-white disabled:opacity-40 md:right-6 md:size-14"
          aria-label="Next slide"
        />

        {/* Carousel indicators */}
        <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2 md:bottom-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`pointer-events-auto h-1.5 w-8 rounded-full transition-all duration-300 ${
                current === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default HeroBanner;
