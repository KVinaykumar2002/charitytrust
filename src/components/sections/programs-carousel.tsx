"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const leafIconSrc = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/bnKXOUslJL6JJ4AjTZE6M99wFw-9.svg";

const programs = [
  {
    title: "Emergency Fund for Rapid Relief Assistance",
    description: "Lambda maintains an emergency fund to offer swift financial aid during crises and natural disasters.",
    category: "Emergency",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/ysXZlrm78bvozoT4e0KoJNJqvAA-6.jpg",
    link: "#",
  },
  {
    title: "Educational Fund for Scholarships and Schools",
    description: "Lambda allocates funds to support education through scholarships and improving infrastructure.",
    category: "Emergency",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/w3vLvJZwbQ1QQcuGTUAuI5UEU-7.jpg",
    link: "#",
  },
  {
    title: "Healthcare Fund for Better Access and Research",
    description: "Lambda directs funds towards healthcare initiatives, supporting medical clinics, awareness campaigns.",
    category: "Emergency",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/31llwCguNvKYNGeOjkgcNe1qTnI-8.jpg",
    link: "#",
  },
  {
    title: "Microfinance and small business programs",
    description: "Lambda facilitates economic empowerment through the allocation of funds to microfinance.",
    category: "Emergency",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/ysXZlrm78bvozoT4e0KoJNJqvAA-6.jpg",
    link: "#",
  },
  {
    title: "Community Development Vital Projects",
    description: "Lambda invests in community development projects that uplift communities economically.",
    category: "Emergency",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/w3vLvJZwbQ1QQcuGTUAuI5UEU-7.jpg",
    link: "#",
  },
  {
    title: "Ecological Conservation Grant Fund",
    description: "Lambda fully recognizes the financial aspect of environmental conservation efforts.",
    category: "Emergency",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/31llwCguNvKYNGeOjkgcNe1qTnI-8.jpg",
    link: "#",
  },
];

export default function ProgramsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-background-white py-[120px]">
      <div className="container">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[40px] font-bold leading-[48px] tracking-[-0.01em] text-text-primary">
              Programs and Initiatives
            </h2>
            <div className="hidden lg:flex items-center gap-4">
              <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-full bg-primary-dark-teal text-white border-0 hover:bg-primary-teal hover:scale-105 transition-all duration-300" />
              <CarouselNext className="static translate-y-0 w-12 h-12 rounded-full bg-primary-dark-teal text-white border-0 hover:bg-primary-teal hover:scale-105 transition-all duration-300" />
            </div>
          </div>
          <CarouselContent className="-ml-6">
            {programs.map((program, index) => (
              <CarouselItem key={index} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="h-full group overflow-hidden bg-white rounded-2xl p-0 border border-border-light shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover rounded-t-2xl"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow gap-6">
                      <div className="flex-grow">
                        <h4 className="text-xl font-semibold leading-7 text-text-primary mb-2">
                          {program.title}
                        </h4>
                        <p className="text-base text-text-secondary leading-[26px]">
                          {program.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-2">
                          <Image src={leafIconSrc} alt="Category icon" width={16} height={16} />
                          <span className="text-tag text-tag-green uppercase">
                            {program.category}
                          </span>
                        </div>
                        <a
                          href={program.link}
                          className="px-6 py-3 bg-primary-dark-teal text-white text-base font-medium rounded-lg hover:bg-primary-teal transition-colors duration-300"
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
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-full bg-primary-dark-teal text-white border-0 hover:bg-primary-teal hover:scale-105 transition-all duration-300" />
            <CarouselNext className="static translate-y-0 w-12 h-12 rounded-full bg-primary-dark-teal text-white border-0 hover:bg-primary-teal hover:scale-105 transition-all duration-300" />
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  current === index ? "bg-primary-dark-teal" : "bg-border-medium"
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