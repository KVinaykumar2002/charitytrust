import Image from 'next/image';

const missionItems = [
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/JXvHCoQFHnnmyx7gkAaOknPZVcg-1.svg",
    title: "Education for All",
    description: "Lambda is dedicated to ensuring that every child has access to inclusive, quality education.",
    alt: "Education icon",
  },
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/E8JksqEJfvu7MeEvkhRocERfg-2.svg",
    title: "Health and Wellness",
    description: "Our strong commitment to health and wellness truly extends across global borders.",
    alt: "Health and Wellness icon",
  },
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/G3zsRuzFv8qj6pgURlSj2FU46s-3.svg",
    title: "Disaster Relief",
    description: "In times of crisis, Lambda responds swiftly to provide critical, urgent emergency relief.",
    alt: "Disaster Relief icon",
  },
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/6IDwdUb77x6Pw839CmQOvN3nQI-4.svg",
    title: "Community Development",
    description: "Lambda invests in innovative, sustainable community projects to create positive change.",
    alt: "Community Development icon",
  },
];

const MissionStatement = () => {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-[140px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="max-w-xl">
              <h2 className="text-[40px] leading-[48px] font-bold tracking-[-0.01em]">
                The mission of our organization
              </h2>
              <p className="mt-4 text-lg text-white/70 leading-[1.55]">
                At Lambda, we prioritize transparency, integrity, and inclusivity. These values guide our actions as we work tirelessly to bridge the gap between those in need and those willing to help.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {missionItems.map((item, index) => (
                <div key={index} className="bg-ring p-10 rounded-2xl transition-transform duration-200 ease-in-out hover:-translate-y-2">
                  <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6">
                    <Image src={item.icon} alt={item.alt} width={24} height={24} />
                  </div>
                  <h5 className="text-lg font-semibold text-white mb-2">{item.title}</h5>
                  <p className="text-base text-white/70 leading-[1.6]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-5 h-full flex items-center">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/pda2WLZ9YduQW4Sgq3X87nCig-5.jpeg"
              alt="Collecting donations"
              width={528}
              height={704}
              className="rounded-3xl w-full h-auto object-cover shadow-[0px_4px_15px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;