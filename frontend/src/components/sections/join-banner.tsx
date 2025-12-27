"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Droplet, Eye, Wind } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

const ICON_URL = "/sscroll_icon.svg";
const TARGET_COUNT = 139_364;
const COUNT_DURATION = 1500;

const impactStats = [
  {
    icon: Droplet,
    target: 10,
    suffix: " Lakh+",
    highlight: "Units of blood",
    description: "collected & distributed to vulnerable patients across India.",
  },
  {
    icon: Eye,
    target: 10,
    suffix: " Thousand+",
    highlight: "Corneal transplants",
    description: "restoring sight and dignity to individuals with vision loss.",
  },
  {
    icon: Wind,
    target: 32,
    suffix: "",
    highlight: "Oxygen banks",
    description: "set up during Covid-19 to supply free oxygen and save lives.",
  },
];

const JoinBanner = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const startTimestampRef = useRef<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [statCounts, setStatCounts] = useState(() =>
    impactStats.map(() => 0)
  );

    const animateCount = (timestamp: number) => {
        if (startTimestampRef.current === null) {
            startTimestampRef.current = timestamp;
        }

        const startTime = startTimestampRef.current ?? timestamp;
        const progress = Math.min((timestamp - startTime) / COUNT_DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayCount(Math.round(eased * TARGET_COUNT));
        setStatCounts(
            impactStats.map((stat) => Math.round(eased * stat.target))
        );

        if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animateCount);
        } else {
            animationFrameRef.current = null;
        }
    };

    const cancelCountAnimation = () => {
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    };

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        cancelCountAnimation();
                        startTimestampRef.current = null;
                        animationFrameRef.current = requestAnimationFrame(animateCount);
                    } else {
                        cancelCountAnimation();
                        startTimestampRef.current = null;
                        setDisplayCount(0);
                        setStatCounts(impactStats.map(() => 0));
                    }
                });
            },
            { threshold: 0.45 }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
            cancelCountAnimation();
        };
    }, []);

    const keyframes = `
        @keyframes scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
        }
    `;

    const MarqueeContent = () => (
        <div className="flex shrink-0 items-center gap-x-10 px-5">
            {Array.from({ length: 12 }).map((_, i) => (
                <React.Fragment key={i}>
                    <h6 className="whitespace-nowrap text-base font-bold text-white md:text-xl">
                        Let's help each other
                    </h6>
                    <div className="shrink-0 w-7 h-7 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FD7E14" className="w-7 h-7">
                        <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                      </svg>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <section
            ref={sectionRef}
            data-page-animation="scale-fade"
            className="bg-background py-12 md:py-16 lg:py-24"
        >
            <style>{keyframes}</style>
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
                    <h3
                        data-animation="fade-in"
                        className="text-[28px] font-semibold leading-[36px] text-foreground"
                    >
                        Join us in the journey to empower communities and transform lives.
                    </h3>
                </div>
                <div data-stagger-parent className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
                    <div
                        data-stagger-item
                        data-animation="scale-in"
                        data-animation-duration="0.9s"
                        className="text-center"
                    >
                        <h2 className="text-[40px] font-bold leading-[48px] text-primary">
                            {displayCount.toLocaleString()}+
                        </h2>
                        <p className="mt-1 text-lg leading-7 text-text-secondary">
                            people already joined
                        </p>
                    </div>
                    <div
                        data-stagger-item
                        data-animation="fade-up"
                    >
                        <AnimatedButton href="/contact-us" variant="outline">
                            Join Our Organization
                        </AnimatedButton>
                    </div>
                </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {impactStats.map((stat, index) => (
            <div
              key={stat.highlight}
              data-stagger-item
              data-animation="fade-up"
              data-animation-delay={`${index * 0.08}s`}
              className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-black p-8 text-left shadow-[0_20px_40px_-24px_rgba(0,0,0,0.5)] transition hover:-translate-y-2 hover:shadow-[0_28px_50px_-24px_rgba(253,126,20,0.3)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FD7E14]/20 text-[#FD7E14]">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#FD7E14]">
                    {statCounts[index].toLocaleString()}
                    {stat.suffix}
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD7E14]/70">
                    {stat.highlight}
                  </p>
                </div>
              </div>
              <p className="text-base leading-6 text-white/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
            </div>

            <div
                data-animation="background-pan"
                className="relative mt-16 h-20 w-full overflow-hidden bg-black md:mt-24"
            >
                <div
                    className="absolute inset-0 z-[2]"
                    style={{ background: 'linear-gradient(to right, black, transparent 20%, transparent 80%, black)' }}
                />
                <div className="absolute left-0 top-0 flex h-full animate-[scroll_40s_linear_infinite] will-change-transform">
                    <MarqueeContent />
                    <MarqueeContent />
                </div>
            </div>
        </section>
    );
};

export default JoinBanner;