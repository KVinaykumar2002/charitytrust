'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Lambda has truly touched my heart with its commitment to making a difference in the lives of those who need it most.",
    name: "Sarah M.",
    role: "Supporter and Volunteer",
  },
  {
    quote: "I started a fundraising campaign for their clean water projects, and the response from friends was overwhelming.",
    name: "Emily L.",
    role: "Clean Water Project Advocate",
  },
  {
    quote: "As a student from an underprivileged background, the financial burden of education seemed insurmountable.",
    name: "Ahmed K.",
    role: "Scholarship Recipient",
  },
];

const TestimonialsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(nextSlide, 6000);

        return () => {
            resetTimeout();
        };
    }, [currentIndex, nextSlide, resetTimeout]);

    const handleMouseEnter = () => resetTimeout();
    const handleMouseLeave = () => {
        resetTimeout();
        timeoutRef.current = setTimeout(nextSlide, 6000);
    };

    return (
        <section className="bg-white py-12 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-20">
                <div
                    className="relative rounded-3xl overflow-hidden h-[500px] lg:h-[600px] flex items-center justify-center p-6"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Image
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/ZNfLXxdgKgIt6QyjJHnyKdxWhOE-23.jpg"
                        alt="Volunteers sorting donations in a warehouse"
                        fill
                        objectFit="cover"
                        className="absolute inset-0 z-0"
                    />
                    <div className="absolute inset-0 bg-black/10 z-0" />

                    <div className="relative z-10 w-full max-w-[700px] mx-auto">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous testimonial"
                            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-[-60px] z-20 bg-primary-dark-teal text-white w-12 h-12 rounded-full items-center justify-center transition-opacity hover:opacity-80"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next testimonial"
                            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-[-60px] z-20 bg-primary-dark-teal text-white w-12 h-12 rounded-full items-center justify-center transition-opacity hover:opacity-80"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="relative bg-white rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-10 lg:p-[60px]">
                            <button
                                onClick={prevSlide}
                                aria-label="Previous testimonial"
                                className="lg:hidden absolute top-1/2 -translate-y-1/2 left-4 z-20 bg-primary-dark-teal text-white w-10 h-10 rounded-full flex items-center justify-center"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next testimonial"
                                className="lg:hidden absolute top-1/2 -translate-y-1/2 right-4 z-20 bg-primary-dark-teal text-white w-10 h-10 rounded-full flex items-center justify-center"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                            <div className="overflow-hidden">
                                <div
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                >
                                    {testimonials.map((testimonial, index) => (
                                        <div key={index} className="w-full flex-shrink-0 text-center px-8 lg:px-0">
                                            <h4 className="text-[28px] font-semibold leading-9 text-primary-dark-teal">
                                                "{testimonial.quote}"
                                            </h4>
                                            <p className="mt-8 text-base font-medium text-text-secondary">
                                                {testimonial.name} - {testimonial.role}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 pt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                        currentIndex === index ? 'bg-primary-dark-teal' : 'bg-border-medium hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;