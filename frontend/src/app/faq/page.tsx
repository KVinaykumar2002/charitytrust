"use client";

import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import FAQWithSpiral from "@/components/ui/faq-section";

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        <FAQWithSpiral />
      </main>
      <FlickeringFooter />
    </div>
  );
}
