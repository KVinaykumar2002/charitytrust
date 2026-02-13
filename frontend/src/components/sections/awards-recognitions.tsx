import Image from "next/image";

const AwardsRecognitions = () => {
  const awards = [
    {
      id: 1,
      name: "Padma Vibhushan",
      description:
        "Posthumously conferred the Padma Vibhushan, India's second highest civilian honour, by the Hon'ble Former President of India, Shri Pranab Mukherjee",
      image:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/2016-16.jpg",
      bgColor: "#E9C7BE",
    },
    {
      id: 2,
      name: "ABLF",
      description:
        "Posthumously awarded the 'ABLF Global Asian Award' at the Asian Business Leadership Forum Awards",
      image:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/2011-17.jpg",
      bgColor: "#FFFFFF",
    },
    {
      id: 3,
      name: "Postal Stamp",
      description:
        "Commemorative postal stamp is released by the Philately Department, Department of Posts, on Dhirubhai Ambani's 70th birth anniversary",
      image:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/2002_0-18.jpg",
      bgColor: "#FFFFFF",
    },
    {
      id: 4,
      name: "The Economic Times",
      description:
        "The Economic Times confers 'Lifetime Achievement Award for Corporate Excellence'",
      image:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/2001-19.jpg",
      bgColor: "#FFFFFF",
    },
    {
      id: 5,
      name: "TOI",
      description:
        "Voted as 'Creator of Wealth of the Century' in The Times of India (TOI) poll",
      image:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/2000-20.jpg",
      bgColor: "#D52000",
    },
    {
      id: 6,
      name: "BMC",
      description:
        "Bombay Municipal Corporation (BMC) confers 'First Citizen's Award'; hosts civic reception in his honour",
      image:
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/2000_0-21.jpg",
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
                <div className="relative w-full h-full">
                  <Image
                    src={award.image}
                    alt={award.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                    priority={award.id <= 3}
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-[#004291]/90 text-white p-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform pointer-events-none">
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
