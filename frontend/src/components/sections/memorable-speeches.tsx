import React from "react";
import Image from "next/image";

/**
 * MemorableSpeeches component - from reliance-website
 * Central image of the founder surrounded by four cards describing specific awards/speeches.
 */
const MemorableSpeeches = () => {
  return (
    <section className="bg-[#fdf5e6] py-20 px-4 md:px-0">
      <div className="max-w-[1200px] mx-auto text-center mb-16">
        <h2 className="font-display text-[48px] leading-[1.2] text-[#333333] mb-8">
          Memorable Speeches
        </h2>
        <p className="max-w-[800px] mx-auto text-[#666666] text-[16px] leading-[1.6]">
          A collection of memorable speeches by the Founder-Chairman that shed
          light on his persona
          <br className="hidden md:block" />
          and inspired scores of people to believe in their dreams
        </p>
      </div>

      <div className="container mx-auto px-4 relative max-w-[1250px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-12 lg:gap-y-0">
          {/* Left Column Cards */}
          <div className="lg:col-span-4 flex flex-col gap-12 z-10">
            <div className="bg-white flex items-center p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[4px] min-h-[140px] relative">
              <div className="flex-1 pr-4 text-left">
                <h3 className="text-[#004291] font-sans font-bold text-[18px] leading-[1.3] mb-2">
                  Lifetime Achievement Award Acceptance Speech
                </h3>
                <p className="text-[#666666] text-[14px] leading-[1.4]">
                  The Economic Times Awards for Corporate Excellence
                </p>
              </div>
              <div className="w-[80px] h-[60px] relative flex-shrink-0">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/ach-img1-12.png"
                  alt="Lifetime Achievement Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="bg-white flex items-center p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[4px] min-h-[140px] relative">
              <div className="flex-1 pr-4 text-left">
                <h3 className="text-[#004291] font-sans font-bold text-[18px] leading-[1.3] mb-2">
                  Man of the Century Award Acceptance Speech
                </h3>
                <p className="text-[#666666] text-[14px] leading-[1.4]">
                  Chemtech Foundation
                </p>
              </div>
              <div className="w-[80px] h-[60px] relative flex-shrink-0">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/ach-img2-13.png"
                  alt="Chemtech Foundation Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className="lg:col-span-4 flex justify-center items-center relative z-0 mt-8 lg:mt-0">
            <div className="relative w-[300px] md:w-[450px] lg:w-[600px] h-[400px] md:h-[550px] lg:h-[650px] -mx-10 md:-mx-20 lg:-mx-32 pointer-events-none">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/founder-img-11.png"
                alt="Founder seated"
                fill
                priority
                style={{ objectFit: "contain" }}
                className="drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right Column Cards */}
          <div className="lg:col-span-4 flex flex-col gap-12 z-10">
            <div className="bg-white flex items-center p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[4px] min-h-[140px] relative">
              <div className="flex-1 pr-4 text-left">
                <h3 className="text-[#004291] font-sans font-bold text-[18px] leading-[1.3] mb-2">
                  Wharton Dean&apos;s Medal Acceptance Speech
                </h3>
                <p className="text-[#666666] text-[14px] leading-[1.4]">
                  The Wharton School, University of Pennsylvania
                </p>
              </div>
              <div className="w-[80px] h-[60px] relative flex-shrink-0">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/ach-img3-14.png"
                  alt="Wharton School Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="bg-white flex items-center p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[4px] min-h-[140px] relative">
              <div className="flex-1 pr-4 text-left">
                <h3 className="text-[#004291] font-sans font-bold text-[18px] leading-[1.3] mb-2">
                  Civic Address & Civic Reception Acceptance Speech
                </h3>
                <p className="text-[#666666] text-[14px] leading-[1.4]">
                  Bombay Municipal Corporation
                </p>
              </div>
              <div className="w-[80px] h-[60px] relative flex-shrink-0">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/ach-img4-15.png"
                  alt="BMC Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-10 lg:h-20" />
    </section>
  );
};

export default MemorableSpeeches;
