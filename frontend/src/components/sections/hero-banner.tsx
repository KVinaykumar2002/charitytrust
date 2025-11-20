"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { getPublicHeroImages } from "@/lib/api";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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
        // Filter only active images and sort by order
        const activeImages = result.data
          .filter((img: any) => img.active !== false)
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        
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
      <section className="relative w-full min-h-screen mt-0 overflow-hidden flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
                    <div className="w-full h-full bg-gradient-to-br from-[#1a3a3a] to-[#244543]"></div>
                  )}
                </div>

                {/* Dark gradient overlay for text readability - Middle Layer */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-black/40 to-black/70" />

                {/* Main hero content - Top Layer */}
                <div
                  data-stagger-parent
                  className="absolute inset-0 z-20 flex items-center justify-center"
                >
                  <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-6 text-center md:px-12 lg:px-20">
                  {/* Badge - only show if exists */}
                  {slide.badge && slide.badge.trim() && (
                    <span
                      data-stagger-item
                      data-animation="fade-down"
                      data-animation-duration="1s"
                      className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 md:text-sm md:tracking-[0.6em]"
                    >
                      {slide.badge}
                    </span>
                  )}

                  {/* Title - always show */}
                  {slide.title && slide.title.trim() && (
                    <h1
                      data-stagger-item
                      data-animation="fade-up"
                      data-animation-duration="1.1s"
                      data-text-animation="letter-spacing-expand"
                      className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:text-5xl lg:text-[56px] lg:leading-[64px]"
                    >
                      {slide.title}
                    </h1>
                  )}

                  {/* Description - always show */}
                  {slide.description && slide.description.trim() && (
                    <p
                      data-stagger-item
                      data-animation="fade-in"
                      data-animation-duration="1s"
                      className="max-w-2xl text-base text-white/80 md:text-lg md:leading-7"
                    >
                      {slide.description}
                    </p>
                  )}

                  {/* CTA Button - only show if label exists */}
                  {slide.ctaLabel && slide.ctaLabel.trim() && (
                    <Link
                      data-stagger-item
                      data-animation="scale-in"
                      data-animation-duration="0.9s"
                      href={slide.ctaHref || "/"}
                      className="inline-flex items-center rounded-[32px] bg-primary px-12 py-4 text-base font-medium text-primary-foreground btn-hover-bounce btn-shine-effect"
                    >
                      {slide.ctaLabel}
                    </Link>
                  )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* carousel indicators */}
        <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 w-10 rounded-full transition-all duration-500 ${
                current === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default HeroBanner;
