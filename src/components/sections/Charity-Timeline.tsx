"use client";

import Image from "next/image";
import { Heart, Eye, Wind, HandHeart, Hospital } from "lucide-react";

const highlights = [
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "BLOOD BANK",
    description:
      "Over 10 lakh units of life-saving blood collected and distributed to the poor and needy, saving countless lives.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <Eye className="w-8 h-8 text-white" />,
    title: "EYE BANK",
    description:
      "More than 10,000 corneal transplants performed, restoring vision and hope to thousands of visually challenged individuals.",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <Wind className="w-8 h-8 text-white" />,
    title: "OXYGEN BANK",
    description:
      "Thousands of lives saved through 32 oxygen banks established across Telugu states during the COVID-19 pandemic.",
    image:
      "https://images.unsplash.com/photo-1600959907703-125ba1374a12?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <HandHeart className="w-8 h-8 text-white" />,
    title: "RELIEF WORKS",
    description:
      "₹7 lakhs worth of accident insurance, 50% subsidy in diagnostics, and support to 15,000+ daily wage film workers.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <Hospital className="w-8 h-8 text-white" />,
    title: "HOSPITAL FOR MOVIE WORKERS",
    description:
      "Construction of a hospital in Chitrapuri, Hyderabad to provide free primary healthcare for movie workers.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop",
  },
];

export default function CharityTimeline() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Vertical Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-red-600 rounded-full h-full hidden md:block"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-12">
          Chiranjeevi Charitable Trust
        </h2>

        <div className="flex flex-col space-y-12">
          {highlights.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Left Card */}
              <div className="md:w-1/2 bg-red-600 text-white rounded-xl shadow-xl p-6 md:p-8 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-500 p-3 rounded-full">{item.icon}</div>
                  <h3 className="text-xl md:text-2xl font-semibold uppercase">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Right Image */}
              <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-red-600 shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
