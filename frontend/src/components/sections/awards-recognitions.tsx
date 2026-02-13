import Image from "next/image";
import { founderImages } from "@/lib/founder-images";

const AwardsRecognitions = () => {
  const awards = [
    {
      id: 1,
      name: "Padma Bhushan",
      description:
        "Conferred the Padma Bhushan, India's third highest civilian honour, for distinguished service to the arts and society.",
      image: founderImages.padmaBhushan,
      bgColor: "#E9C7BE",
    },
    {
      id: 2,
      name: "NTR National Award",
      description:
        "Honoured with the NTR National Award for outstanding contribution to Indian cinema and public service.",
      image: founderImages.portrait,
      bgColor: "#FFFFFF",
    },
    {
      id: 3,
      name: "Filmfare Awards",
      description:
        "Multiple Filmfare Awards and lifetime recognition for his contribution to Telugu and Indian cinema.",
      image: founderImages.portrait,
      bgColor: "#1a1a1a",
    },
    {
      id: 4,
      name: "Civil & Social Honours",
      description:
        "Numerous state and national honours for philanthropy, blood and eye donation advocacy, and social welfare.",
      image: founderImages.portrait,
      bgColor: "#fdf5e6",
    },
    {
      id: 5,
      name: "Chiranjeevi Charitable Trust",
      description:
        "Founded the Trust to save lives and restore sight; leading initiatives in eye banking and blood donation across India.",
      image: founderImages.portrait,
      bgColor: "#004291",
    },
    {
      id: 6,
      name: "Public Service",
      description:
        "Recognised for inspiring millions to donate blood and eyes and for building one of India's most impactful charitable organisations.",
      image: founderImages.portrait,
      bgColor: "#E9E9E9",
    },
  ];

  return (
    <section className="bg-brand-gold py-[100px] w-full">
      <div className="container max-w-[1240px] mx-auto px-4 lg:px-6">
        <h2 className="section-heading text-center text-white mb-16 text-[48px] font-display font-medium">
          Awards &amp; Recognitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-white rounded-[4px] shadow-card overflow-hidden h-[340px] flex items-center justify-center transition-transform duration-300 hover:-translate-y-2 group relative"
            >
              <div
                className="w-full h-full flex items-center justify-center relative p-8"
                style={{ backgroundColor: award.bgColor }}
              >
                <div className="relative w-full h-full min-h-[200px]">
                  <Image
                    src={award.image}
                    alt={award.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                    priority={award.id <= 3}
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-[#004291]/90 text-white p-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform pointer-events-none">
                <span className="font-display font-bold text-lg mb-2">{award.name}</span>
                <p className="text-center text-sm md:text-base leading-relaxed font-sans">
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsRecognitions;
