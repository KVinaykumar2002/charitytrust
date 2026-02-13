import React from "react";

interface SpeechItem {
  date: string;
  title: string;
}

const speeches: SpeechItem[] = [
  { date: "Apr 08, 2002", title: "Equity Shareholders Meeting" },
  { date: "Jun 15, 2001", title: "27th Annual General Meeting" },
  { date: "Jun 13, 2000", title: "26th Annual General Meeting" },
  { date: "Jun 24, 1999", title: "25th Annual General Meeting" },
  { date: "Jun 26, 1998", title: "24th Annual General Meeting" },
  { date: "Oct 16, 1997", title: "Extraordinary General Meeting" },
];

const ShareholderSpeeches = () => {
  return (
    <section className="bg-brand-blue relative py-[100px] overflow-hidden">
      <div
        className="absolute top-0 right-[-10%] w-[800px] h-[800px] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/images/speech-bg-28.png')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 max-w-[1200px]">
        <h2 className="font-display text-[48px] leading-[1.2] text-white mb-12 max-w-[600px] font-medium">
          Speeches at <br />
          Reliance Shareholders&apos; Meetings
        </h2>

        <div className="bg-white rounded-[4px] shadow-card p-[40px] md:p-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[50px]">
            {speeches.map((speech, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#004291] mb-2 font-sans">
                  {speech.date}
                </span>
                <h4 className="text-[20px] font-bold text-[#333333] leading-[1.4] font-sans">
                  {speech.title}
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
