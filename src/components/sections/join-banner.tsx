"use client";

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

const ICON_URL = "/sscroll_icon.svg";
const TARGET_COUNT = 139_364;
const COUNT_DURATION = 1500;

const JoinBanner = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const startTimestampRef = useRef<number | null>(null);
    const [displayCount, setDisplayCount] = useState(0);

    const animateCount = (timestamp: number) => {
        if (startTimestampRef.current === null) {
            startTimestampRef.current = timestamp;
        }

        const startTime = startTimestampRef.current ?? timestamp;
        const progress = Math.min((timestamp - startTime) / COUNT_DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayCount(Math.round(eased * TARGET_COUNT));

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
        <section ref={sectionRef} className="bg-background py-12 md:py-16 lg:py-24">
            <style>{keyframes}</style>
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <div className="mx-auto max-w-3xl text-center">
                    <h3 className="text-[28px] font-semibold leading-[36px] text-primary">
                        Join us in the journey to empower communities and transform lives.
                    </h3>
                </div>
                <div className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
                    <div className="text-center">
                        <h2 className="text-[40px] font-bold leading-[48px] text-primary">
                            {displayCount.toLocaleString()}+
                        </h2>
                        <p className="mt-1 text-lg leading-7 text-text-secondary">
                            people already joined
                        </p>
                    </div>
                    <Link
                        href="/contact-us"
                        className="flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[#1e4d4e] hover:shadow-[0_18px_35px_rgba(6,34,34,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#93f0b6]"
                    >
                        Join Our Organization
                    </Link>
                </div>
            </div>

            <div className="relative mt-16 h-20 w-full overflow-hidden bg-[#B8F4D3] md:mt-24">
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