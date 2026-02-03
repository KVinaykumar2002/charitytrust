"use client";

import { Eye, Heart, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";

const FRONT_OFFICE_PHONE = "04023554849";
const FRONT_OFFICE_PHONE_ALT = "9849756785";
const WHATSAPP_NUMBER = "919063270884";
const WHATSAPP_MESSAGE = "Hi, I would like to inquire about eye donation pledge at Chiranjeevi Charitable Trust.";

export default function EyeDonationPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6 shadow-lg shadow-teal-500/30">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
              Eye Donation Pledge
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto mb-6" />
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Give the precious gift of sight. Eye donation pledge is handled through our internal application.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-teal-100 dark:border-neutral-800 mb-8">
            <p className="text-center text-neutral-600 dark:text-neutral-300 mb-8">
              To register for eye donation pledge or for any queries, please contact our front office. Our team will guide you through the internal application process.
            </p>
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
                className="inline-flex items-center justify-center gap-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 text-lg font-semibold transition-colors shadow-lg"
              >
                <Phone className="w-6 h-6" />
                Call Now
              </a>
            </div>
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
              Front office: <a href={`tel:${FRONT_OFFICE_PHONE}`} className="text-teal-600 dark:text-teal-400 font-medium">040 23554849</a>
              {" · "}
              <a href={`tel:${FRONT_OFFICE_PHONE_ALT}`} className="text-teal-600 dark:text-teal-400 font-medium">98497 56785</a>
            </p>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-6 border border-teal-100 dark:border-teal-800">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-teal-600" />
              Why pledge your eyes?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              Eye donation is done after natural death. One donor can restore sight to two people through corneal transplantation. Contact our front office to complete your pledge through our internal application.
            </p>
          </div>
        </div>
      </main>
      <FlickeringFooter />
    </div>
  );
}
