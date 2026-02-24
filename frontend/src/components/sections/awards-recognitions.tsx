"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { founderImages } from "@/lib/founder-images";
import { getPublicAwards } from "@/lib/api"; // Fetches awards from backend GET /api/public/awards

export interface AwardItem {
  _id: string;
  name: string;
  description: string;
  image?: string;
  bgColor?: string;
  order?: number;
  link?: string;
}

const AwardsRecognitions = () => {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getPublicAwards();
        if (!cancelled && res?.data) setAwards(res.data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load awards");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const defaultImage = founderImages.portrait;

  if (loading) {
    return (
      <section className="bg-brand-gold py-[100px] w-full">
        <div className="container max-w-[1240px] mx-auto px-4 lg:px-6">
          <h2 className="section-heading text-center text-white mb-16 text-[48px] font-display font-medium">
            Awards &amp; Recognitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[4px] shadow-card h-[340px] animate-pulse bg-white/20"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-brand-gold py-[100px] w-full">
        <div className="container max-w-[1240px] mx-auto px-4 lg:px-6">
          <h2 className="section-heading text-center text-white mb-16 text-[48px] font-display font-medium">
            Awards &amp; Recognitions
          </h2>
          <p className="text-center text-white/90">{error}</p>
        </div>
      </section>
    );
  }

  if (awards.length === 0) {
    return (
      <section className="bg-brand-gold py-[100px] w-full">
        <div className="container max-w-[1240px] mx-auto px-4 lg:px-6">
          <h2 className="section-heading text-center text-white mb-16 text-[48px] font-display font-medium">
            Awards &amp; Recognitions
          </h2>
          <p className="text-center text-white/90">No awards to display.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-gold py-[100px] w-full">
      <div className="container max-w-[1240px] mx-auto px-4 lg:px-6">
        <h2 className="section-heading text-center text-white mb-16 text-[48px] font-display font-medium">
          Awards &amp; Recognitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {awards.map((award, index) => {
            const imageUrl = award.image?.trim() || defaultImage;
            const bgColor = award.bgColor?.trim() || "#fdf5e6";
            const href = award.link?.trim() || undefined;
            const cardClass =
              "bg-white rounded-[4px] shadow-card overflow-hidden h-[340px] flex items-center justify-center transition-transform duration-300 hover:-translate-y-2 group relative" +
              (href ? " cursor-pointer" : "");
            return (
              <div key={award._id} className="block">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    <CardContent award={award} imageUrl={imageUrl} bgColor={bgColor} index={index} />
                  </a>
                ) : (
                  <div className={cardClass}>
                    <CardContent award={award} imageUrl={imageUrl} bgColor={bgColor} index={index} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CardContent({
  award,
  imageUrl,
  bgColor,
  index,
}: {
  award: AwardItem;
  imageUrl: string;
  bgColor: string;
  index: number;
}) {
  return (
    <>
      <div
        className="w-full h-full flex items-center justify-center relative p-8"
        style={{ backgroundColor: bgColor }}
      >
        <div className="relative w-full h-full min-h-[200px]">
          <Image
            src={imageUrl}
            alt={award.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
            priority={index <= 2}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-[#004291]/90 text-white p-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform pointer-events-none">
        <span className="font-display font-bold text-lg mb-2">{award.name}</span>
        <p className="text-center text-sm md:text-base leading-relaxed font-sans">
          {award.description}
        </p>
      </div>
    </>
  );
}

export default AwardsRecognitions;
