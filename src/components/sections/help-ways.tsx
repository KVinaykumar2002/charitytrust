import {
  Building2,
  HeartHandshake,
  PiggyBank,
  UsersRound,
} from "lucide-react";

const helpData = [
  {
    icon: PiggyBank,
    badge: "High Impact",
    title: "Fuel Lifesaving Campaigns",
    description:
      "Help us expand blood and eye donation drives, fund oxygen banks, and deliver urgent medical relief to families in crisis.",
  },
  {
    icon: HeartHandshake,
    badge: "Monthly",
    title: "Pledge Monthly Support",
    description:
      "A recurring gift keeps ambulances running, subsidises diagnostics, and ensures patients never walk alone.",
  },
  {
    icon: Building2,
    badge: "Partnerships",
    title: "Partner With The Trust",
    description:
      "Corporate CSR programmes and institutional grants help us set up new relief centres and community health clinics.",
  },
  {
    icon: UsersRound,
    badge: "On Ground",
    title: "Volunteer On The Ground",
    description:
      "Join medical camps, awareness drives, and relief missions to deliver hope directly to communities that need it most.",
  },
];

const HelpWays = () => {
  return (
    <section
      data-page-animation="slide-in-from-left"
      className="bg-gradient-to-b from-white via-slate-50/60 to-white py-[120px]"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-16 flex max-w-[780px] flex-col items-center gap-4 text-center">
          <span className="inline-flex rounded-full border border-primary/20 px-4 py-1 text-sm font-medium uppercase tracking-[0.24em] text-primary/80">
            Get Involved
          </span>
          <h2
            data-text-animation="split-text"
            className="text-4xl font-bold text-primary"
          >
            How You Can Strengthen CCT’s Mission
          </h2>
          <p
            data-animation="fade-in"
            className="text-body-large text-text-secondary"
          >
            Every contribution helps the Chiranjeevi Charitable Trust reach more
            patients, equip more clinics, and stand beside every family seeking
            dignity, health, and hope.
          </p>
        </div>

        <div
          data-stagger-parent
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {helpData.map((item, index) => (
            <div
              key={index}
              data-stagger-item
              data-animation="slide-up"
              className="group flex min-h-[300px] flex-col gap-6 rounded-[26px] border border-border/70 bg-card/80 p-10 backdrop-blur supports-[backdrop-filter]:bg-card/60 hover-lift-up"
            >
              <div className="flex flex-col gap-5">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent/30 text-primary">
                  <item.icon className="h-10 w-10" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {item.badge}
                  </span>
                  <h5
                    data-text-animation="text-slide-up"
                    className="text-lg font-semibold text-primary"
                  >
                    {item.title}
                  </h5>
                </div>
              </div>
              <p
                data-animation="fade-in"
                className="text-body-regular text-text-light"
              >
                {item.description}
              </p>
              <div className="mt-auto text-sm font-medium text-primary/90 transition-colors group-hover:text-primary">
                Discover impact →
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a
            href="/support-us"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-xl hover:shadow-primary/25"
          >
            See All Ways To Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default HelpWays;