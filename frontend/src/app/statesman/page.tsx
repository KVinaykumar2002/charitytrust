import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import StatesmanSection from "@/components/sections/statesman-section";

export default function StatesmanPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        <StatesmanSection />
      </main>
      <FlickeringFooter />
    </div>
  );
}

