import NavigationHeader from "@/components/sections/navigation-header";
import HeroBanner from "@/components/sections/hero-banner";
import AboutUsIntro from "@/components/sections/about-us-intro";
import HeroSection9Section from "@/components/sections/hero-section-9-section";
import MissionStatement from "@/components/sections/mission-statement";
import HelpWays from "@/components/sections/help-ways";
import ProgramsCarousel from "@/components/sections/programs-carousel";
import JoinBanner from "@/components/sections/join-banner";
import ProjectsShowcase from "@/components/sections/projects-showcase";
import EventsBanner from "@/components/sections/events-banner";
import CharityTimeline from "@/components/sections/Charity-Timeline";
import TestimonialsCarousel from "@/components/sections/testimonials-carousel";
import CircularTestimonialsSection from "@/components/sections/circular-testimonials-section";
import TestimonialsColumnsSection from "@/components/sections/testimonials-columns-section";
import TestimonialSliderSection from "@/components/sections/testimonial-slider-section";
import ReviewsSection from "@/components/sections/reviews-section";
import Footer from "@/components/sections/footer";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import Featured_05 from "@/components/ui/globe-feature-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1">
        <HeroBanner />
        <AboutUsIntro />
        <HeroSection9Section />
        <MissionStatement />
        <HelpWays />
        <ProgramsCarousel />
        <JoinBanner />
        <Featured_05 />
        <ProjectsShowcase />
        <EventsBanner />
        <ReviewsSection />
        <TestimonialsCarousel />
        <CircularTestimonialsSection />
        <TestimonialSliderSection />
        <TestimonialsColumnsSection />
      </main>
      <FlickeringFooter />
    </div>
  );
}