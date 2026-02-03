"use client";

import { Droplet, Heart, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
const FRONT_OFFICE_PHONE = "04023554849";
const FRONT_OFFICE_PHONE_ALT = "9849756785";
const WHATSAPP_NUMBER = "919063270884";
const WHATSAPP_MESSAGE = "Hi, I would like to inquire about blood donation at Chiranjeevi Charitable Trust.";

export default function BloodDonationPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-full mb-6 shadow-lg shadow-red-500/30">
              <Droplet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
              Blood Donation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-6" />
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Every drop counts. Want to donate blood or need blood? Contact our front office—we&apos;re here to help.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-red-100 dark:border-neutral-800">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 text-lg font-semibold transition-colors shadow-lg"
              >
                <FaWhatsapp className="w-7 h-7" />
                Message on WhatsApp
              </a>
              <a
                href={`tel:${FRONT_OFFICE_PHONE}`}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold transition-colors shadow-lg"
              >
                <Phone className="w-6 h-6" />
                Call Now
              </a>
            </div>
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
              Front office: <a href={`tel:${FRONT_OFFICE_PHONE}`} className="text-red-600 dark:text-red-400 font-medium">040 23554849</a>
              {" · "}
              <a href={`tel:${FRONT_OFFICE_PHONE_ALT}`} className="text-red-600 dark:text-red-400 font-medium">98497 56785</a>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-red-100 dark:border-neutral-800">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">I want to donate blood</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Use the WhatsApp or Call button above to reach our front office. We&apos;ll guide you through eligibility and scheduling.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-red-100 dark:border-neutral-800">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">I need blood</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Contact our front office via WhatsApp or call. Our team will assist you with blood availability and requirements.
              </p>
            </div>
          </div>
        </div>
      </main>
      <FlickeringFooter />
    </div>
  );
}
