import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import HeroVisionary from "@/components/sections/hero-visionary";
import FounderIntro from "@/components/sections/founder-intro";
import FounderBiography from "@/components/sections/founder-biography";
import MemorableSpeeches from "@/components/sections/memorable-speeches";
import ShareholderSpeeches from "@/components/sections/shareholder-speeches";
import AwardsRecognitions from "@/components/sections/awards-recognitions";
import AboutCompanySection from "@/components/sections/about-company-section";
import JourneyTimelineSection from "@/components/sections/journey-timeline-section";
import MissionSection from "@/components/sections/mission-section";
import VisionSection from "@/components/sections/vision-section";
import ScrollToHash from "@/components/ScrollToHash";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <ScrollToHash />
      <NavigationHeader />
      <main className="flex-1">
        <HeroVisionary />
        <FounderIntro />
        <FounderBiography />
        <MemorableSpeeches />
        <ShareholderSpeeches />
        <section id="awards">
          <AwardsRecognitions />
        </section>
        <AboutCompanySection />
        <JourneyTimelineSection />
        <MissionSection />
        <VisionSection />
      </main>
      <FlickeringFooter />
    </div>
  );
}

