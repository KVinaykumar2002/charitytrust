"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Gift } from "lucide-react";

const MarqueeItem = () => (
  <div className="flex items-center shrink-0 gap-6 px-6">
    <h6 className="text-primary font-semibold text-base py-4 tracking-[0.02em]">
      Let's help each other
    </h6>
    <Gift className="text-primary h-5 w-5" />
  </div>
);

const JoinCtaBanner = () => {
    const ctaRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ctaRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const marqueeItemsCount = 10;
    const marqueeItems = Array(marqueeItemsCount).fill(null);

    return (
        <section className="bg-background">
            <style>
                {`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                `}
            </style>
            <div className="bg-secondary h-14 overflow-hidden whitespace-nowrap">
                <div className="flex animate-marquee">
                    <div className="flex shrink-0">
                        {marqueeItems.map((_, i) => <MarqueeItem key={`marquee-1-${i}`} />)}
                    </div>
                    <div className="flex shrink-0" aria-hidden="true">
                        {marqueeItems.map((_, i) => <MarqueeItem key={`marquee-2-${i}`} />)}
                    </div>
                </div>
            </div>

            <div className="py-[100px] text-center overflow-hidden">
                <div
                    ref={ctaRef}
                    className={`container max-w-7xl mx-auto px-6 md:px-12 lg:px-20 transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                    }`}
                >
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center gap-4">
                            <h1 className="text-[56px] leading-[64px] font-bold text-primary tracking-[-0.02em]">
                                139,364+
                            </h1>
                            <p className="text-base leading-[26px] text-muted-foreground">
                                people already joined
                            </p>
                        </div>
                        <a
                            href="#"
                            className="mt-6 inline-block bg-secondary text-primary font-medium text-base py-5 px-[60px] rounded-[32px] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Join Our Organization
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinCtaBanner;