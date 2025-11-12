"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

const AboutUsIntro = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="bg-muted py-[120px]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-5 lg:grid-cols-2 lg:gap-[60px]">
          <div
            className={`transition-all duration-1000 ease-out md:col-span-2 lg:col-span-1 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/dAC5hfe7zvZQJT8cduxaihyVs-4.jpg"
              alt="A man organizes various donations"
              width={580}
              height={580}
              className="aspect-square w-full rounded-2xl object-cover shadow-[0px_4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div
            className={`flex flex-col transition-all duration-1000 ease-out delay-200 md:col-span-3 lg:col-span-1 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-[40px] font-bold leading-[48px] -tracking-[0.01em] text-primary">
              At Lambda, we prioritize transparency, and inclusivity.
            </h2>
            <p className="mt-4 text-lg leading-7 text-muted-foreground">
              Lambda is a dynamic and forward-thinking charity donation organization committed to making a positive impact on communities around the world. Our mission is rooted in the belief that compassion has the power to transform lives, and we strive to create a world where everyone has access to the support they need to thrive.
            </p>
            <div className="mt-8">
              <Link
                href="/about-us"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-background py-[14px] px-[30px] text-base font-medium leading-6 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
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