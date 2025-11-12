import Image from "next/image";

const helpData = [
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/l52CxeR8ZGfBIsLQJ1RsZt4xcF8-5.svg",
    title: "Monetary Donations",
    description: "Your financial support is a lifeline for our projects and initiatives.",
  },
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/t16nSBaXD048l6Y4RvRx6hVSgc-6.svg",
    title: "Become a Donor Today",
    description: "Consider becoming a monthly donor to ensure ongoing support.",
  },
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/olxSZ6wPyqEIDOF3c9m6nZl1lx4-7.svg",
    title: "Corporate cooperation",
    description: "Lanbda welcomes partnerships with corporations that share.",
  },
  {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/svgs/o4mUJYg58RZz2euTW6FXFRWNVdA-8.svg",
    title: "Volunteer Your Time",
    description: "If you're passionate about creating positive change directly.",
  },
];

const HelpWays = () => {
  return (
    <section className="bg-background py-[120px]">
      <div className="container mx-auto">
        <div className="mx-auto mb-16 flex max-w-[800px] flex-col items-center gap-4 text-center">
          <h2 className="text-primary">
            How could you help?
          </h2>
          <p className="text-body-large text-text-secondary">
            At Lambda, we believe that the collective power of compassion and
            generosity can create meaningful change in the world. Your support is
            crucial in enabling us to continue our mission of making a positive
            impact on communities in need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {helpData.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col gap-4 rounded-[20px] border border-border bg-card p-10 min-h-[266px] transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              <div className="flex flex-col gap-6">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={32}
                    height={32}
                  />
                </div>
                <h5 className="text-primary">{item.title}</h5>
              </div>
              <p className="text-body-regular text-text-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpWays;