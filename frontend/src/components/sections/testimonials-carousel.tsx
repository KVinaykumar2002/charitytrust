"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    text: "Chiranjeevi Charitable Trust has inspired millions through its relentless service and compassion. Their efforts truly define humanity in action.",
    name: "Dr. A.P.J. Abdul Kalam",
    role: "Former President of India",
    avatar: "/leaders/abdul_kalam.jpg",
  },
  {
    text: "Initiatives like Chiranjeevi Blood Bank prove that leadership isn’t about power — it’s about serving others selflessly and spreading hope.",
    name: "Shri Narendra Modi",
    role: "Prime Minister of India",
    avatar: "/leaders/narender_modi.jpg",
  },
  {
    text: "Through consistent dedication, the Trust has saved countless lives. It continues to remind us that compassion and unity can build a better world.",
    name: "Dr. Tamilisai Soundararajan",
    role: "Governor of Telangana",
    avatar: "/leaders/tamilsai.jpg",
  },
];

const leaderImages = [
  {
    src: "/leaders/abdul_kalam.jpg",
    alt: "Dr. A.P.J. Abdul Kalam",
  },
  {
    src: "/leaders/kishan_reddy.jpg",
    alt: "Shri G. Kishan Reddy",
  },
  {
    src: "/leaders/narender_modi.jpg",
    alt: "Shri Narendra Modi",
  },
  {
    src: "/leaders/tamilsai.jpg",
    alt: "Dr. Tamilisai Soundararajan",
  },
  {
    src: "/leaders/venkaiah_nadiu.jpg",
    alt: "Shri M. Venkaiah Naidu",
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];
  const [abdul, kishan, modi, tamilsai, venkaiah] = leaderImages;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="relative w-full py-20 bg-white transition-all duration-500">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-16 px-6 md:flex-row md:gap-20 lg:px-12">
        {/* LEFT: Text Section */}
        <div className="flex flex-col items-start md:w-1/2 transition-all duration-500">
          <p
            key={testimonial.text}
            className="text-3xl font-semibold leading-tight text-gray-900 md:text-4xl lg:text-5xl mb-6 transition-all duration-500"
          >
            “{testimonial.text}”
          </p>

          <div
            key={testimonial.name}
            className="flex items-center gap-4 mb-10 transition-all duration-500"
          >
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="rounded-full border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="rounded-full border border-gray-300 p-2 text-gray-600 transition hover:bg-gray-100"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* RIGHT: Creative Collage Layout */}
        <div className="relative md:w-1/2 h-[550px] w-full flex items-center justify-center">
          {/* Top Left */}
          <div className="absolute top-0 left-16 w-40 h-48 rounded-lg overflow-hidden shadow-md">
            <Image
              src={modi.src}
              alt={modi.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Top Right */}
          <div className="absolute top-0 right-16 w-44 h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src={kishan.src}
              alt={kishan.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Center */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-48 h-64 rounded-lg overflow-hidden shadow-lg z-10">
            <Image
              src={abdul.src}
              alt={abdul.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom Left */}
          <div className="absolute bottom-8 left-0 w-48 h-56 rounded-lg overflow-hidden shadow-md">
            <Image
              src={tamilsai.src}
              alt={tamilsai.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Bottom Right */}
          <div className="absolute bottom-8 right-0 w-48 h-56 rounded-lg overflow-hidden shadow-md">
            <Image
              src={venkaiah.src}
              alt={venkaiah.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
