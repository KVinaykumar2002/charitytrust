"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const heroSlides = [
  {
    title: "Transforming Lives with Compassion",
    description:
      "Join Lambda in delivering vital aid, empowering communities, and inspiring hope where it’s needed most.",
    ctaLabel: "Donate Now",
    ctaHref: "/contact-us",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/btHP5zn1GplKZHcF5Fhw29qNoQ-2.jpg",
    badge: "Hope in Action",
  },
  {
    title: "Every Contribution Creates Change",
    description:
      "From emergency response to long-term education, your support fuels life-changing programs around the globe.",
    ctaLabel: "Discover Programs",
    ctaHref: "/#programs",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/ysXZlrm78bvozoT4e0KoJNJqvAA-6.jpg",
    badge: "Together We Rise",
  },
  {
    title: "Stand With Communities Worldwide",
    description:
      "Help us provide clean water, healthcare, and sustainable livelihoods for families facing hardship.",
    ctaLabel: "Get Involved",
    ctaHref: "/#volunteer",
    image:
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/w3vLvJZwbQ1QQcuGTUAuI5UEU-7.jpg",
    badge: "Compassion in Motion",
  },
];

const HeroBanner = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

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

  return (
    <section className="relative w-full min-h-screen -mt-4">

      <Carousel
        className="w-full"
        opts={{ loop: true, align: "start" }}
        plugins={[autoplayPlugin.current]}
        setApi={setApi}
      >
        <CarouselContent className="ml-0 h-screen">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.title} className="pl-0">
              <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover scale-105 brightness-[0.7] saturate-[0.85] blur-[1px]"
                  priority={index === 0}
                  quality={100}
                />

                <div className="absolute inset-0 bg-white/25" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

                <div className="absolute inset-0 opacity-20">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/CeCwfeyraF9GE1LyrrBYqLdgg-3.png"
                    alt="Decorative pattern"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-6 text-center md:px-12 lg:px-20">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 md:text-sm md:tracking-[0.6em]">
                    {slide.badge}
                  </span>

                  <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:text-5xl lg:text-[56px] lg:leading-[64px]">
                    {slide.title}
          </h1>
          
                  <p className="max-w-2xl text-base text-white/80 md:text-lg md:leading-7">
                    {slide.description}
            </p>
            
            <Link
                    href={slide.ctaHref}
                    className="inline-flex items-center rounded-[32px] bg-primary px-12 py-4 text-base font-medium text-primary-foreground transition-transform duration-300 hover:scale-105 hover:bg-[#244543]"
            >
                    {slide.ctaLabel}
            </Link>
          </div>
        </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="pointer-events-none absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
          {heroSlides.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 w-10 rounded-full transition-all duration-500 ${
                current === index ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
      </div>
      </Carousel>
    </section>
  );
};

export default HeroBanner;