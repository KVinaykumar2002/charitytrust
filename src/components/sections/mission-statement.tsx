import Image from "next/image";

const missionItems = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2947/2947997.png",
    title: "Blood & Eye Donation",
    description:
      "CCT has pioneered large-scale blood and eye donation drives, saving countless lives and restoring vision across India.",
    alt: "Blood and Eye Donation icon",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966484.png",
    title: "Medical Assistance",
    description:
      "We provide critical medical support and financial aid to patients in need, ensuring access to essential healthcare for all.",
    alt: "Medical Assistance icon",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966488.png",
    title: "Disaster & Emergency Relief",
    description:
      "In times of natural calamities and emergencies, CCT extends immediate relief, rehabilitation, and hope to affected communities.",
    alt: "Disaster Relief icon",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2966/2966493.png",
    title: "Community Welfare",
    description:
      "Through education, awareness, and empowerment initiatives, we aim to build stronger, self-reliant, and compassionate communities.",
    alt: "Community Welfare icon",
  },
];

const MissionStatement = () => {
  return (
    <section
      data-page-animation="scale-fade"
      className="bg-primary text-primary-foreground"
    >
      <div className="container mx-auto py-[140px]">
        <div
          data-stagger-parent
          className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12"
        >
          {/* LEFT TEXT SECTION */}
          <div
            data-stagger-item
            data-animation="fade-right"
            data-animation-duration="1s"
            className="lg:col-span-7"
          >
            <div className="max-w-xl space-y-4">
              <h2
                data-text-animation="reveal-from-bottom"
                className="text-[40px] leading-[48px] font-bold tracking-[-0.01em]"
              >
                The mission of Chiranjeevi Charitable Trust
              </h2>
              <p
                data-animation="fade-in"
                className="text-lg leading-[1.55] text-white/70"
              >
                Founded with the vision of serving humanity, CCT is dedicated to
                saving lives and empowering communities through blood and eye
                donation, medical aid, and social welfare initiatives. Our work
                embodies compassion, integrity, and a relentless commitment to
                the well-being of all.
              </p>
            </div>

            {/* MISSION CARDS */}
            <div
              data-stagger-parent
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {missionItems.map((item, index) => (
                <div
                  key={index}
                  data-stagger-item
                  data-animation="slide-up"
                  data-animation-duration="0.85s"
                  className="rounded-2xl bg-ring p-10 hover-lift-up"
                >
                  <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6">
                    <Image
                      src={item.icon}
                      alt={item.alt}
                      width={32}
                      height={32}
                    />
                  </div>
                  <h5 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h5>
                  <p className="text-base text-white/70 leading-[1.6]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            data-stagger-item
            data-animation="zoom-in"
            data-animation-duration="1s"
            className="flex h-full items-center lg:col-span-5"
          >
            <Image
              src="/mission_image.jpg"
              alt="CCT founder welcoming with folded hands"
              width={528}
              height={704}
              className="h-auto w-full rounded-3xl object-cover shadow-[0px_4px_15px_rgba(0,0,0,0.08)] hover-image-zoom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
