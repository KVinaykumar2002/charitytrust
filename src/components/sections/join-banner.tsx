"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Droplet, Eye, Wind } from "lucide-react";

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
                    <h6 className="whitespace-nowrap text-base font-bold text-primary md:text-xl">
                        Let's help each other
                    </h6>
                    <Image
                        src={ICON_URL}
                        alt="Gift box icon"
                        width={28}
                        height={28}
                        className="shrink-0"
                    />
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
                        data-text-animation="gradient-shift"
                        className="text-[28px] font-semibold leading-[36px] text-primary"
                        style={{
                            backgroundImage:
                                "linear-gradient(120deg, #1a3a3a, #4db69f, #1a3a3a)",
                        }}
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
                    <Link
                        href="/contact-us"
                        data-stagger-item
                        data-animation="fade-up"
                        className="flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-primary-foreground btn-hover-bounce btn-rotate-on-hover btn-ripple-effect focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#93f0b6] focus-visible:ring-offset-2"
                    >
                        Join Our Organization
                    </Link>
                </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {impactStats.map((stat, index) => (
            <div
              key={stat.highlight}
              data-stagger-item
              data-animation="fade-up"
              data-animation-delay={`${index * 0.08}s`}
              className="group flex h-full flex-col gap-4 rounded-3xl border border-primary/15 bg-white/90 p-8 text-left shadow-[0_20px_40px_-24px_rgba(15,45,46,0.35)] backdrop-blur supports-[backdrop-filter]:bg-white/70 transition hover:-translate-y-2 hover:shadow-[0_28px_50px_-24px_rgba(15,45,46,0.45)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-primary">
                    {statCounts[index].toLocaleString()}
                    {stat.suffix}
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
                    {stat.highlight}
                  </p>
                </div>
              </div>
              <p className="text-base leading-6 text-text-secondary">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
            </div>

            <div
                data-animation="background-pan"
                className="relative mt-16 h-20 w-full overflow-hidden bg-[#B8F4D3] md:mt-24"
                style={{ backgroundImage: "linear-gradient(90deg, #b8f4d3, #a0f0c6)" }}
            >
                <div
                    className="absolute inset-0 z-[2]"
                    style={{ background: 'linear-gradient(to right, #B8F4D3, transparent 20%, transparent 80%, #B8F4D3)' }}
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