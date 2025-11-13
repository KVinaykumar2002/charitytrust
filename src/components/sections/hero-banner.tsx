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
    title: "Celebrating Lifesaving Achievements",
    description:
      "Honouring the teams and supporters who make Chiranjeevi Charitable Trust a beacon of hope for thousands each year.",
    ctaLabel: "Explore Our Work",
    ctaHref: "/#impact",
    image: "https://img1.wsimg.com/isteam/ip/3f9bf7ba-9991-425c-8ad7-3fa919af01f1/cct.jpeg",
    badge: "Community Impact",
  },
  {
    title: "Global Partnerships for Better Care",
    description:
      "Collaborating with international leaders to expand access to advanced eye and blood care across India.",
    ctaLabel: "View Collaborations",
    ctaHref: "/#partners",
    image: "/hero/Star-Hospitals.jpg",
    badge: "Worldwide Support",
  },
  {
    title: "Inspiring the Next Generation",
    description:
      "Mentoring young changemakers who carry forward our mission of compassion and service.",
    ctaLabel: "Meet Our Champions",
    ctaHref: "/#leaders",
    image: "/hero/chiranjeevi-ram-charan-giving-mementos-fans.jpg",
    badge: "Youth Leadership",
  },
  {
    title: "Honouring Excellence in Service",
    description:
      "Recognising extraordinary dedication that transforms lives through innovation and heartfelt care.",
    ctaLabel: "Read Their Stories",
    ctaHref: "/#stories",
    image:
      "/hero/chiranjeevi-few-days-ago-prior-blood-donation-drive-had-thanked-his-fans-initiative.jpg",
    badge: "Excellence Awards",
  },
  {
    title: "Standing Beside Every Donor",
    description:
      "Providing comfort, gratitude, and assurance to every donor whose generosity fuels our lifesaving work.",
    ctaLabel: "Give Blood Today",
    ctaHref: "/#donate-blood",
    image: "/hero/GYIxcb2X0AABGwm.jpg",
    badge: "Donor Care",
  },
  {
    title: "Conversations that Drive Change",
    description:
      "Uniting medical experts and supporters to advance cancer and hematology care through collective action.",
    ctaLabel: "Join the Dialogue",
    ctaHref: "/#events",
    image: "/hero/Star-caner-hospital.jpg",
    badge: "Advocacy Forum",
  },
  {
    title: "A Legacy of Record-Breaking Compassion",
    description:
      "Celebrating milestones that set world records and inspire millions to choose kindness.",
    ctaLabel: "Celebrate With Us",
    ctaHref: "/#milestones",
    image: "/hero/FjDWNV8VUAEDIqg.jpg",
    badge: "Historic Moments",
  },
];

const HeroBanner = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
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
              <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover scale-105"
                  priority={index === 0}
                  quality={100}
                />

                {/* dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/70" />

                {/* main hero content */}
                <div
                  data-stagger-parent
                  className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-6 text-center md:px-12 lg:px-20"
                >
                  <span
                    data-stagger-item
                    data-animation="fade-down"
                    data-animation-duration="1s"
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 md:text-sm md:tracking-[0.6em]"
                  >
                    {slide.badge}
                  </span>

                  <h1
                    data-stagger-item
                    data-animation="fade-up"
                    data-animation-duration="1.1s"
                    data-text-animation="letter-spacing-expand"
                    className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:text-5xl lg:text-[56px] lg:leading-[64px]"
                  >
                    {slide.title}
                  </h1>

                  <p
                    data-stagger-item
                    data-animation="fade-in"
                    data-animation-duration="1s"
                    className="max-w-2xl text-base text-white/80 md:text-lg md:leading-7"
                  >
                    {slide.description}
                  </p>

                  <Link
                    data-stagger-item
                    data-animation="scale-in"
                    data-animation-duration="0.9s"
                    href={slide.ctaHref}
                    className="inline-flex items-center rounded-[32px] bg-primary px-12 py-4 text-base font-medium text-primary-foreground btn-hover-bounce btn-shine-effect"
                  >
                    {slide.ctaLabel}
                  </Link>
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
