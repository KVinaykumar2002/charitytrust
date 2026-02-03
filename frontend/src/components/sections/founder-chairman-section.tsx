"use client";

import { useState } from "react";
import Image from "next/image";

export default function FounderChairmanSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="founder-chairman"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-12 text-center">
          Founder and Chairman
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-shrink-0 w-64 h-80 md:w-80 md:h-96 relative rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl bg-primary/10">
            {!imgError ? (
              <Image
                src="/founder-chairman.jpg"
                alt="Chiranjeevi - Founder and Chairman, Chiranjeevi Charitable Trust"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-center p-4 text-xl font-semibold">
                Chiranjeevi
              </div>
            )}
          </div>
          <div className="flex-1 space-y-6">
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Chiranjeevi garu founded Chiranjeevi Charitable Trust with a vision to save lives and restore sight through blood and eye donation. Inspired by the belief that every act of compassion creates lasting change, he has led the Trust to become one of India&apos;s most impactful charitable organizations.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Under his leadership, the Trust has touched millions of lives through Chiranjeevi Eye Bank, Chiranjeevi Blood Center, medical assistance, and community welfare programs—bringing help and hope to those who need it most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
