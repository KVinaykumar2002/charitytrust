import React from 'react';
import Image from 'next/image';

const events = [
  {
    title: 'Lambda Annual Charity Gala Event',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/upJDLBDbWyBMCOemJrh5RYgxa6M-17.jpg',
  },
  {
    title: 'Lambda Walkathon for Clean Water',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/trQnfN2dAoyuMPnpgpnAmoZsI-18.jpg',
  },
  {
    title: 'Lambda Virtual Charity Auction',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/Zg8WxGxN3gxG8SBOGL87fr6ANHE-19.jpg',
  },
  {
    title: 'Lambda Youth Volunteer Challenge',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/zR5uuOQpXLTxX1yNwHeIM7XydL4-20.jpg',
  },
  {
    title: 'Lambda Charity Auction and Art Exhibition',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/8eTRHuc6olAkewAXU4AXCM7Y9CQ-21.jpg',
  },
  {
    title: 'Lambda Charity Gala',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/v5Ou7cyVo7k7kzWNUQRxGUFJsgQ-22.jpg',
  },
];

const EventCard = ({ title, image }: { title: string; image: string }) => {
  return (
    <div className="group flex flex-col flex-shrink-0 w-[280px] mx-3">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <h6 className="mt-4 font-semibold text-text-primary text-base">
        {title}
      </h6>
    </div>
  );
};

const EventsBanner = () => {
    // We assume `animate-scroll` and its keyframes are defined in the global CSS or Tailwind config.
    // @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    // .animate-scroll { animation: scroll 50s linear infinite; }
    
  const allEvents = [...events, ...events];

  return (
    <section className="bg-background-white py-[100px] overflow-hidden">
      <div className="container mx-auto text-center mb-16 px-6 md:px-12 lg:px-20">
        <h2 className="text-[40px] leading-[48px] font-bold tracking-[-0.01em] text-text-primary">
          This is the new generation of events
        </h2>
        <p className="mt-4 text-body-large text-text-secondary max-w-3xl mx-auto">
          These events not only provide opportunities for fundraising but also serve as platforms to raise awareness about Chari's mission.
        </p>
      </div>

      <div
        className="w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)',
        }}
      >
        <div className="group">
          <div className="flex w-max animate-scroll [animation-play-state:running] group-hover:[animation-play-state:paused]">
            {allEvents.map((event, index) => (
              <EventCard key={index} title={event.title} image={event.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsBanner;