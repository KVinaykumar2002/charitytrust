import React from "react";
import Image from "next/image";

/** Central portrait: chairman in chair. Use a PNG with transparent background to blend with section cream (#fdf5e6). */
const CHAIRMAN_IMAGE = "/chairman-portrait.png";

/**
 * Memorable Speeches – Chiranjeevi: central image with key addresses & moments.
 */
const MemorableSpeeches = () => {
  const speeches = [
    {
      title: "Padma Bhushan Acceptance",
      subtitle: "India's third highest civilian honour, for distinguished service to arts and society",
    },
    {
      title: "NTR National Award",
      subtitle: "For outstanding contribution to Indian cinema and public service",
    },
    {
      title: "Chiranjeevi Charitable Trust Launch",
      subtitle: "Inaugural address on the vision to save lives through blood and eye donation",
    },
    {
      title: "Eye & Blood Donation Drives",
      subtitle: "Public addresses inspiring citizens to donate and become part of the movement",
    },
  ];

  return (
    <section className="bg-[#fdf5e6] py-20 px-4 md:px-0">
      <div className="max-w-[1200px] mx-auto text-center mb-16">
        <h2 className="font-display text-[48px] leading-[1.2] text-[#333333] mb-8">
          Memorable Speeches &amp; Addresses
        </h2>
        <p className="max-w-[800px] mx-auto text-[#666666] text-[16px] leading-[1.6]">
          Key speeches and addresses by the Founder-Chairman that reflect his
          <br className="hidden md:block" />
          commitment to saving lives and inspiring millions to give back
        </p>
      </div>

      <div className="container mx-auto px-4 relative max-w-[1250px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-y-12 lg:gap-y-0">
          {/* Left Column Cards – top/bottom cards align to center image */}
          <div className="lg:col-span-4 flex flex-col gap-12 z-10 justify-center">
            {speeches.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="bg-white flex items-center p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[4px] min-h-[140px]"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-[#004291] font-sans font-bold text-[18px] leading-[1.3] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#666666] text-[14px] leading-[1.4]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center: Chairman portrait – larger, perfectly centered between the 4 cards */}
          <div className="lg:col-span-4 flex justify-center items-center relative z-20 mt-8 lg:mt-0 py-4">
            <div className="relative w-[320px] md:w-[420px] lg:w-[520px] h-[400px] md:h-[520px] lg:h-[640px] pointer-events-none flex-shrink-0">
              <Image
                src={CHAIRMAN_IMAGE}
                alt="Founder and Chairman, Chiranjeevi Charitable Trust"
                fill
                priority
                className="object-contain object-center drop-shadow-2xl"
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 420px, 520px"
              />
            </div>
          </div>

          {/* Right Column Cards */}
          <div className="lg:col-span-4 flex flex-col gap-12 z-10 justify-center">
            {speeches.slice(2, 4).map((item, i) => (
              <div
                key={i}
                className="bg-white flex items-center p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[4px] min-h-[140px]"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-[#004291] font-sans font-bold text-[18px] leading-[1.3] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#666666] text-[14px] leading-[1.4]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-10 lg:h-20" />
    </section>
  );
};

export default MemorableSpeeches;
