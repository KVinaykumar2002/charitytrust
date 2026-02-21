import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import ContactSection from "@/components/sections/contact-section";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        <ContactSection />
      </main>
      <FlickeringFooter />
    </div>
  );
}
