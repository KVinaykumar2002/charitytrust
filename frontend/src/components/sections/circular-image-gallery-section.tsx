"use client";

import { ImageGallery } from "@/components/ui/carousel-circular-image-gallery";

export default function CircularImageGallerySection() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-gradient-to-b from-white via-slate-50/60 to-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="mx-auto mb-16 flex max-w-[780px] flex-col items-center gap-4 text-center">
          <span className="inline-flex rounded-full border border-primary/20 px-4 py-1 text-sm font-medium uppercase tracking-[0.24em] text-primary/80">
            Visual Journey
          </span>
          <h2
            data-text-animation="split-text"
            className="text-4xl md:text-5xl font-bold text-foreground"
          >
            CCT in Action
          </h2>
          <p
            data-animation="fade-in"
            className="text-body-large text-text-secondary"
          >
            Experience the impact of Chiranjeevi Charitable Trust through our visual gallery showcasing blood donation drives, medical camps, and community outreach programs.
          </p>
        </div>

        <div className="relative">
          <ImageGallery />
        </div>
      </div>
    </section>
  );
}

