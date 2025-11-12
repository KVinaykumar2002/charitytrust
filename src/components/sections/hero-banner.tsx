import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroBanner = () => {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden">
      <Image
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/btHP5zn1GplKZHcF5Fhw29qNoQ-2.jpg"
        alt="Hero banner image"
        fill
        className="object-cover"
        quality={100}
        priority
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-[rgba(26,58,58,0.6)]">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/CeCwfeyraF9GE1LyrrBYqLdgg-3.png"
          alt="BG"
          fill
          className="object-cover opacity-20"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 text-center md:px-12 lg:px-20">
          <h1 className="font-bold text-white text-4xl leading-tight md:text-5xl lg:text-[56px] lg:leading-[64px] tracking-[-0.02em]">
            Lambda – Transforming Lives with Compassion
          </h1>
          
          <div className="flex flex-col items-center gap-10">
            <p className="max-w-3xl text-lg leading-7 text-white/70">
              Lambda is a dynamic charity donation organization committed to making a positive impact on communities around the world.
            </p>
            
            <Link
              href="/contact-us"
              className="inline-block rounded-[32px] bg-primary px-12 py-4 text-base font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-[#244543]"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;