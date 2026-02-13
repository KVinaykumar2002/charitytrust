import React from "react";

interface EventItem {
  date: string;
  title: string;
}

const events: EventItem[] = [
  { date: "2012", title: "Padma Bhushan conferred by the President of India" },
  { date: "2011", title: "NTR National Award for contribution to Indian cinema" },
  { date: "2009", title: "Chiranjeevi Charitable Trust founded" },
  { date: "—", title: "Chiranjeevi Eye Bank & Blood Center inaugurated" },
  { date: "—", title: "Numerous blood and eye donation drives across India" },
  { date: "—", title: "Public addresses on voluntary donation and social welfare" },
];

const ShareholderSpeeches = () => {
  return (
    <section className="bg-brand-blue relative py-[100px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="absolute right-[-5%] top-[-10%] w-[50%] h-auto text-white fill-current"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1200px]">
        <h2 className="font-display text-[48px] leading-[1.2] text-white mb-12 max-w-[600px] font-medium">
          Key Moments &amp; <br />
          Chiranjeevi Charitable Trust
        </h2>

        <div className="bg-white rounded-[4px] shadow-card p-[40px] md:p-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[50px]">
            {events.map((event, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#004291] mb-2 font-sans">
                  {event.date}
                </span>
                <h4 className="text-[20px] font-bold text-[#333333] leading-[1.4] font-sans">
                  {event.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareholderSpeeches;
