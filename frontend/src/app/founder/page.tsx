import RelianceHeader from "@/components/sections/reliance-header";
import HeroVisionary from "@/components/sections/hero-visionary";
import FounderIntro from "@/components/sections/founder-intro";
import FounderBiography from "@/components/sections/founder-biography";
import MemorableSpeeches from "@/components/sections/memorable-speeches";
import ShareholderSpeeches from "@/components/sections/shareholder-speeches";
import AwardsRecognitions from "@/components/sections/awards-recognitions";
import RelianceFooter from "@/components/sections/reliance-footer";

export const metadata = {
  title: "Founder-Chairman | Chiranjeevi Charitable Trust",
  description:
    "A timeless visionary whose legacy emboldens the imagination of a billion people",
};

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-white">
      <RelianceHeader />
      <main className="pt-0">
        <HeroVisionary />
        <FounderIntro />
        <FounderBiography />
        <MemorableSpeeches />
        <ShareholderSpeeches />
        <section id="awards">
          <AwardsRecognitions />
        </section>
      </main>
      <RelianceFooter />
    </div>
  );
}
