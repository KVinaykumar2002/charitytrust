"use client";

import Link from "next/link";
import { Droplet, Eye, Compass } from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 text-center">
            Our Services
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto text-center mb-16">
            Chiranjeevi Charitable Trust delivers life-saving and sight-restoring services across India.
          </p>

          <section id="journey" className="scroll-mt-24 mb-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Our Journey</h2>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  Chiranjeevi garu started the Trust with a simple yet powerful belief: that timely support and community participation can transform lives. Inspired by the spirit of service, he established Chiranjeevi Eye Bank and Chiranjeevi Blood Center to save lives and restore sight—creating a legacy of compassion that continues to grow.
                </p>
                <Link href="/about#journey" className="text-primary font-semibold hover:underline">
                  Read more in Our Journey →
                </Link>
              </div>
            </div>
          </section>

          <section id="eye-bank" className="scroll-mt-24 mb-20">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Chiranjeevi Eye Bank</h2>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  Our Eye Bank collects, processes, and distributes corneal tissue for transplantation. We work with hospitals and eye surgeons to restore vision to those suffering from corneal blindness. Through awareness campaigns and pledge drives, we encourage eye donation and have facilitated thousands of corneal transplants.
                </p>
                <Link href="/eye-donation" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                  Eye Donation Pledge →
                </Link>
              </div>
            </div>
          </section>

          <section id="blood-center" className="scroll-mt-24">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <Droplet className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Chiranjeevi Blood Center</h2>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  Our Blood Center operates one of the largest blood banks in the region. We run regular blood donation camps, maintain a donor registry, and support patients in need of blood. One donation can save up to three lives—we connect donors and recipients with care and urgency.
                </p>
                <Link href="/blood-donation" className="text-red-600 dark:text-red-400 font-semibold hover:underline">
                  Donate Blood / Need Blood →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FlickeringFooter />
    </div>
  );
}
