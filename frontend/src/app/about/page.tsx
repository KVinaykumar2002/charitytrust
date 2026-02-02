import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import AboutCompanySection from "@/components/sections/about-company-section";
import JourneyTimelineSection from "@/components/sections/journey-timeline-section";
import MissionSection from "@/components/sections/mission-section";
import VisionSection from "@/components/sections/vision-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        <AboutCompanySection />
        <JourneyTimelineSection />
        <MissionSection />
        <VisionSection />
      </main>
      <FlickeringFooter />
    </div>
  );
}

