"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const leafIconSrc = "/hero/heart.svg";

const programs = [
  {
    title: "Mega Blood Donation Drives",
    description:
      "CCT has been a pioneer in organizing massive blood donation camps across India, ensuring a constant supply to hospitals and saving countless lives.",
    category: "Health",
    image: "/hero/chiranjeevi-few-days-ago-prior-blood-donation-drive-had-thanked-his-fans-initiative.jpg",
    link: "#",
  },
  {
    title: "Eye Donation and Restoration",
    description:
      "Through the Chiranjeevi Eye Bank, thousands of people have regained their vision. Join us in illuminating more lives with the gift of sight.",
    category: "Vision",
    image: "/hero/chiranjeevi-ram-charan-giving-mementos-fans.jpg",
    link: "#",
  },
  {
    title: "Medical Assistance for the Needy",
    description:
      "We provide essential medical aid, treatment support, and financial help for those who cannot afford critical healthcare.",
    category: "Medical Aid",
    image: "/hero/Star-Hospitals.jpg",
    link: "#",
  },
  {
    title: "Disaster Relief & Rehabilitation",
    description:
      "CCT extends immediate relief, food, and shelter during natural disasters and emergencies, helping families rebuild their lives.",
    category: "Relief",
    image: "/hero/Star-caner-hospital.jpg",
    link: "#",
  },
  {
    title: "Community Health Awareness Programs",
    description:
      "We organize free medical check-ups, awareness camps, and educational workshops to promote healthy living and hygiene.",
    category: "Awareness",
    image: "/hero/FjDWNV8VUAEDIqg.jpg",
    link: "#",
  },
  {
    title: "Organ Donation and Advocacy",
    description:
      "CCT actively promotes organ donation awareness, inspiring people to give the ultimate gift — a new lease on life for others.",
    category: "Humanity",
    image: "/hero/GYIxcb2X0AABGwm.jpg",
    link: "#",
  },
];

export default function ProgramsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section
      data-page-animation="slide-in-from-right"
      className="bg-background py-[120px]"
    >
      <div className="container">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full"
        >
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <h2
              data-animation="fade-in"
              data-text-animation="letter-spacing-expand"
              className="text-[40px] font-bold leading-[48px] tracking-[-0.01em] text-primary"
            >
              Our Key Programs & Initiatives
            </h2>
            <div className="hidden lg:flex items-center gap-4">
              <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-full bg-primary text-white border-0 hover:bg-primary/80 hover:scale-105 transition-all duration-300" />
              <CarouselNext className="static translate-y-0 w-12 h-12 rounded-full bg-primary text-white border-0 hover:bg-primary/80 hover:scale-105 transition-all duration-300" />
            </div>
          </div>

          {/* Carousel */}
          <CarouselContent className="-ml-6">
            {programs.map((program, index) => (
              <CarouselItem
                key={index}
                data-animation="fade-up"
                data-animation-delay={`${index * 0.04}s`}
                className="basis-full pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="group h-full overflow-hidden rounded-2xl border border-border-light bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Image */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover rounded-t-2xl transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow gap-6">
                      <div className="flex-grow">
                        <h4 className="text-xl font-semibold leading-7 text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                          {program.title}
                        </h4>
                        <p className="text-base text-text-secondary leading-[26px]">
                          {program.description}
                        </p>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-2">
                          <Image
                            src={leafIconSrc}
                            alt="Category icon"
                            width={16}
                            height={16}
                          />
                          <span className="text-sm uppercase text-green-700 font-medium">
                            {program.category}
                          </span>
                        </div>
                        <a
                          href={program.link}
                          className="rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary/80 hover:scale-105 transition-all duration-300"
                        >
                          Donate Now
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Mobile Nav Buttons */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-full bg-primary text-white border-0 hover:bg-primary/80 hover:scale-105 transition-all duration-300" />
            <CarouselNext className="static translate-y-0 w-12 h-12 rounded-full bg-primary text-white border-0 hover:bg-primary/80 hover:scale-105 transition-all duration-300" />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  current === index
                    ? "bg-primary scale-125"
                    : "bg-border-medium"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
