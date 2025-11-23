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

interface Program {
  _id?: string;
  title: string;
  description: string;
  category: string;
  imageBase64?: string;
  link?: string;
  featured?: boolean;
}

export default function ProgramsCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [loading, setLoading] = React.useState(true);

  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  // ✔️ Utility to validate Base64 images
  const isValidBase64 = (img?: string) =>
    img && typeof img === "string" && img.startsWith("data:image");

  // ✔️ Fetch programs
  React.useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("https://charitytrust-eykm.onrender.com/api/admin/programs");

        if (response.ok) {
          const result = await response.json();
          const programsData: Program[] = result.data || [];

          // Normalize image field
          const mapped = programsData.map((p) => ({
            _id: p._id,
            title: p.title,
            description: p.description,
            category: p.category,
            link: p.link || "#",
            featured: p.featured || false,

            // ONLY ONE IMAGE FIELD
            imageBase64: isValidBase64(p.imageBase64)
              ? p.imageBase64
              : "/hero/heart.svg",
          }));

          setPrograms(mapped);
        } else {
          console.error("Failed to fetch programs");
          setPrograms([]);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Carousel state updates
  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api, programs]);

  return (
    <section className="bg-background py-[120px]" data-page-animation="slide-in-from-right">
      <div className="container">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full"
        >
          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-[40px] font-bold leading-[48px] tracking-[-0.01em] text-primary">
              Our Key Programs & Initiatives
            </h2>
            <div className="hidden lg:flex items-center gap-4">
              <CarouselPrevious className="w-12 h-12 rounded-full bg-primary text-white hover:scale-105 transition-all" />
              <CarouselNext className="w-12 h-12 rounded-full bg-primary text-white hover:scale-105 transition-all" />
            </div>
          </div>

          {/* Carousel Content */}
          <CarouselContent className="-ml-6">
            {/* Loading */}
            {loading ? (
              <CarouselItem className="basis-full pl-6">
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Loading programs...</p>
                  </div>
                </div>
              </CarouselItem>
            ) : programs.length === 0 ? (
              <CarouselItem className="basis-full pl-6">
                <div className="flex items-center justify-center py-20">
                  <p className="text-text-secondary">No programs available.</p>
                </div>
              </CarouselItem>
            ) : (
              programs.map((program, index) => {
                const imageSrc = isValidBase64(program.imageBase64)
                  ? program.imageBase64!
                  : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

                return (
                  <CarouselItem
                    key={program._id || index}
                    className="basis-full pl-6 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-full overflow-hidden rounded-2xl border bg-white shadow-lg hover:-translate-y-2 transition-all duration-300">
                      <CardContent className="p-0 flex flex-col h-full">
                        {/* Image */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                          <img
                            src={imageSrc}
                            alt={program.title}
                            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 group-hover:scale-110"
                            onError={(e) =>
                              (e.currentTarget.src = "/placeholder-image.jpg")
                            }
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-grow gap-6">
                          <div className="flex-grow">
                            <h4 className="text-xl font-semibold text-text-primary mb-2">
                              {program.title}
                            </h4>
                            <p className="text-base text-text-secondary leading-[26px]">
                              {program.description}
                            </p>
                          </div>

                          {/* Bottom */}
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
                );
              })
            )}
          </CarouselContent>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="w-12 h-12 rounded-full bg-primary text-white hover:scale-105 transition-all" />
            <CarouselNext className="w-12 h-12 rounded-full bg-primary text-white hover:scale-105 transition-all" />
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  current === index ? "bg-primary scale-125" : "bg-border-medium"
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
