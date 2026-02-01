"use client";

import Link from "next/link";
import { Heart, Eye, Droplet, ArrowRight, Sparkles, Users, Globe } from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { Button } from "@/components/ui/button";

const donationOptions = [
  {
    id: "monetary",
    title: "Monetary Donation",
    description: "Your financial contribution helps us provide medical care, education, and support to those in need. Every rupee makes a difference.",
    icon: Heart,
    href: "/donate/monetary",
    gradient: "from-[#FD7E14] to-[#E56B00]",
    bgGradient: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    iconBg: "bg-gradient-to-br from-[#FD7E14] to-[#E56B00]",
    buttonText: "Donate Money",
    stats: "500+ donors",
    impact: "Funds critical medical treatments and community programs",
  },
  {
    id: "eye",
    title: "Eye Donation Pledge",
    description: "Pledge to donate your eyes after your lifetime and give the precious gift of sight to someone in need. One pledge can help two people see.",
    icon: Eye,
    href: "/eye-donation",
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20",
    borderColor: "border-teal-200 dark:border-teal-800",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
    buttonText: "Pledge Eyes",
    stats: "Gift of sight",
    impact: "Restore vision to the blind and visually impaired",
  },
  {
    id: "blood",
    title: "Blood Donation",
    description: "Register as a blood donor or request blood for patients in need. One donation can save up to 3 lives. Be a hero today.",
    icon: Droplet,
    href: "/blood-donation",
    gradient: "from-red-500 to-rose-500",
    bgGradient: "from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    iconBg: "bg-gradient-to-br from-red-500 to-rose-500",
    buttonText: "Donate Blood",
    stats: "Save 3 lives",
    impact: "Help accident victims, surgery patients, and those with blood disorders",
  },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FD7E14]/10 text-[#FD7E14] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Make a Difference Today
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            Choose How You Want to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD7E14] to-[#E56B00]">
              Give Back
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FD7E14] to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            At Chiranjeevi Charitable Trust, we believe in creating lasting impact. 
            Whether through financial support, pledging your eyes, or donating blood — 
            every act of kindness transforms lives.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 mb-16">
          <div className="bg-gradient-to-r from-[#FD7E14] to-[#E56B00] rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <p className="text-4xl font-bold mb-1">10,000+</p>
                <p className="text-white/80">Lives Impacted</p>
              </div>
              <div>
                <Heart className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <p className="text-4xl font-bold mb-1">500+</p>
                <p className="text-white/80">Generous Donors</p>
              </div>
              <div>
                <Globe className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <p className="text-4xl font-bold mb-1">50+</p>
                <p className="text-white/80">Communities Served</p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Options */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {donationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className={`group relative bg-gradient-to-br ${option.bgGradient} rounded-3xl p-8 border ${option.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 ${option.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Stats Badge */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 mb-4`}>
                    <Sparkles className="w-3 h-3" />
                    {option.stats}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                    {option.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Impact */}
                  <div className="bg-white/50 dark:bg-neutral-800/50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="font-semibold">Your Impact:</span> {option.impact}
                    </p>
                  </div>

                  {/* Button */}
                  <Link href={option.href}>
                    <Button
                      className={`w-full bg-gradient-to-r ${option.gradient} hover:opacity-90 text-white py-6 rounded-xl font-semibold text-lg group-hover:shadow-lg transition-all`}
                    >
                      {option.buttonText}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Donate Section */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Why Your Donation Matters
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Every contribution, no matter how small, creates ripples of positive change in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">100% Transparent</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                We maintain complete transparency in how donations are utilized. Every rupee is accounted for.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Secure & Safe</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                All transactions and personal information are protected with industry-standard security.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Tax Benefits</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Monetary donations are eligible for tax exemption under Section 80G of the Income Tax Act.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Direct Impact</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Your donation directly reaches those in need without intermediaries or excessive overhead.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-20 text-center">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FD7E14] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of compassionate individuals who are transforming lives through their generosity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/donate/monetary">
                  <Button className="bg-[#FD7E14] hover:bg-[#E56B00] text-white px-8 py-6 rounded-full text-lg font-semibold">
                    <Heart className="w-5 h-5 mr-2" />
                    Donate Blood
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg font-semibold">
                    Learn About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FlickeringFooter />
    </div>
  );
}

