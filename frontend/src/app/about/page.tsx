import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import AboutCompanySection from "@/components/sections/about-company-section";
import JourneyTimelineSection from "@/components/sections/journey-timeline-section";
import MissionSection from "@/components/sections/mission-section";
import VisionSection from "@/components/sections/vision-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        <AboutCompanySection />
        <JourneyTimelineSection />
        <MissionSection />
        <VisionSection />
      </main>
      <Footer />
    </div>
  );
}

