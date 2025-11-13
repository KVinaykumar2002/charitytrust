"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const AboutUsIntro = () => {
  return (
    <section
      data-page-animation="staggered-fade"
      className="bg-white py-[120px]" // removed bg-muted
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        <div
          data-stagger-parent
          className="grid grid-cols-1 items-center gap-10 md:grid-cols-5 lg:grid-cols-2 lg:gap-[60px]"
        >
          <div
            data-stagger-item
            data-animation="fade-right"
            data-animation-duration="1s"
            className="md:col-span-2 lg:col-span-1"
          >
            <Image
              src="https://data1.ibtimes.co.in/en/full/771182/ram-charan.jpg?h=450&l=50&t=40"
              alt="A man organizes various donations"
              width={580}
              height={580}
              className="aspect-square w-full rounded-2xl object-cover shadow-[0px_4px_16px_rgba(0,0,0,0.08)] hover-image-zoom"
            />
          </div>

          <div
            data-stagger-item
            data-animation="fade-left"
            data-animation-duration="1s"
            className="flex flex-col gap-4 md:col-span-3 lg:col-span-1"
          >
            <h2
              data-text-animation="reveal-from-bottom"
              className="text-[40px] font-bold leading-[48px] -tracking-[0.01em] text-primary"
            >
              At Chiranjeevi Charitable Trust, we uphold the values of transparency, compassion, and inclusivity.
            </h2>
            <p
              data-animation="fade-in"
              data-animation-duration="0.9s"
              className="mt-4 text-lg text-muted-foreground"
            >
              The Chiranjeevi Charitable Trust (CCT) is a visionary organization dedicated to serving humanity and transforming lives through impactful initiatives. For over two decades, CCT has been at the forefront of blood and eye donation, medical assistance, and community welfare programs, touching millions of lives across India. Guided by the belief that every act of kindness can create lasting change, the Trust continues to work tirelessly to bring help and hope to those who need it most.
            </p>
            <div className="mt-8">
              <Link
                href="/about-us"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-background py-[14px] px-[30px] text-base font-medium leading-6 text-primary btn-hover-bounce btn-icon-slide"
              >
                About Us
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsIntro;
