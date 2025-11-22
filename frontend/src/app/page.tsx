import NavigationHeader from "@/components/sections/navigation-header";
import HeroBanner from "@/components/sections/hero-banner";
import AboutUsIntro from "@/components/sections/about-us-intro";
import MissionStatement from "@/components/sections/mission-statement";
import HelpWays from "@/components/sections/help-ways";
import ProgramsCarousel from "@/components/sections/programs-carousel";
import JoinBanner from "@/components/sections/join-banner";
import ProjectsShowcase from "@/components/sections/projects-showcase";
import EventsBanner from "@/components/sections/events-banner";
import CharityTimeline from "@/components/sections/Charity-Timeline";
import TestimonialsCarousel from "@/components/sections/testimonials-carousel";
import ReviewsSection from "@/components/sections/reviews-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1">
        <HeroBanner />
        <AboutUsIntro />
        <MissionStatement />
        <HelpWays />
        <ProgramsCarousel />
        <JoinBanner />
        <ProjectsShowcase />
        <EventsBanner />
        <ReviewsSection />
        <TestimonialsCarousel />
      </main>
      <Footer />
    </div>
  );
}