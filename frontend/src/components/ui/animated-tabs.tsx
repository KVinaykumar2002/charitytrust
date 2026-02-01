"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
  autoScrollInterval?: number; // in milliseconds, default 5000 (5 seconds)
}

const defaultTabs: Tab[] = [
  {
    id: "campaigns",
    label: "Blood & Eye Donation",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full h-full items-center">
        <div className="flex items-center justify-center">
          <img
            src="https://www.cinejosh.com/newsimg/newsmainimg/chiranjeevi-on-world-blood-donation-day_b_1506220926.jpg"
            alt="Chiranjeevi Charity Trust Blood Donation Campaign"
            className="rounded-2xl w-full max-w-md h-80 md:h-96 object-cover shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-y-5 md:gap-y-6 justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Blood & Eye Donation Drives
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
            Chiranjeevi Charitable Trust has pioneered large-scale blood and eye donation drives across India. Over <strong className="text-[#FD7E14] font-semibold">10 lakh units</strong> of life-saving blood collected and <strong className="text-[#FD7E14] font-semibold">10,000+ corneal transplants</strong> performed, saving countless lives and restoring vision to thousands.
          </p>
          <div className="mt-6 space-y-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <div>
              <p className="text-sm font-semibold text-[#FD7E14] mb-2">Contact for Blood Donation</p>
              <p className="text-sm text-white/80">📞 040 23554849 | 040 23555005 | 98497 56785</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#FD7E14] mb-2">Location</p>
              <p className="text-sm text-white/80 leading-relaxed">
                Chiranjeevi Eye and Blood Bank<br />
                82/A, Road No. 1, Jawahar Colony, Jubilee Hills<br />
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "monthly",
    label: "Monthly Support",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full h-full items-center">
        <div className="flex items-center justify-center">
          <img
            src="https://assets.hmtvlive.com/h-upload/2023/07/09/357070-chiranjeevi-charitable-trust.webp"
            alt="Chiranjeevi Charity Trust Monthly Support Programs"
            className="rounded-2xl w-full max-w-md h-80 md:h-96 object-cover shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-y-5 md:gap-y-6 justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Pledge Monthly Support
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
            Your recurring monthly contribution helps Chiranjeevi Charitable Trust maintain critical services including ambulance operations, subsidized diagnostics, and ongoing medical support. Monthly donors ensure we can provide <strong className="text-[#FD7E14] font-semibold">50% subsidy in diagnostics</strong> and support to <strong className="text-[#FD7E14] font-semibold">15,000+ daily wage workers</strong>.
          </p>
          <div className="mt-6 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="text-sm font-semibold text-[#FD7E14] mb-3">Benefits of Monthly Support</p>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-[#FD7E14] mt-1">•</span>
                <span>Sustained ambulance services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FD7E14] mt-1">•</span>
                <span>Subsidized medical diagnostics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FD7E14] mt-1">•</span>
                <span>Continuous patient support programs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "partnerships",
    label: "Partnerships",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full h-full items-center">
        <div className="flex items-center justify-center">
          <img
            src="https://img.ap7am.com/froala-uploads/20240126fr65b342713b414.jpg"
            alt="Chiranjeevi Charity Trust Corporate Partnerships"
            className="rounded-2xl w-full max-w-md h-80 md:h-96 object-cover shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-y-5 md:gap-y-6 justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Partner With Chiranjeevi Charitable Trust
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
            Corporate CSR programmes and institutional grants enable Chiranjeevi Charitable Trust to establish new relief centres, community health clinics, and expand our reach. We've established <strong className="text-[#FD7E14] font-semibold">32 oxygen banks</strong> across Telugu states and continue to build infrastructure for community welfare.
          </p>
          <div className="mt-6 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <p className="text-sm font-semibold text-[#FD7E14] mb-3">Partnership Opportunities</p>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-[#FD7E14] mt-1">•</span>
                <span>Corporate CSR Programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FD7E14] mt-1">•</span>
                <span>Institutional Grants</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FD7E14] mt-1">•</span>
                <span>Healthcare Infrastructure Development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FD7E14] mt-1">•</span>
                <span>Community Health Initiatives</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "volunteer",
    label: "Volunteer",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full h-full items-center">
        <div className="flex items-center justify-center">
          <img
            src="https://img1.wsimg.com/isteam/ip/3f9bf7ba-9991-425c-8ad7-3fa919af01f1/cct1.jpeg/:/cr=t:19.74%25,l:9.68%25,w:80.65%25,h:60.52%25/rs=w:600,h:300,cg:true,m"
            alt="Chiranjeevi Charity Trust Volunteer Programs"
            className="rounded-2xl w-full max-w-md h-80 md:h-96 object-cover shadow-2xl"
          />
        </div>
        <div className="flex flex-col gap-y-5 md:gap-y-6 justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Volunteer With Chiranjeevi Charitable Trust
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed">
            Join Chiranjeevi Charitable Trust's medical camps, awareness drives, and relief missions. Volunteers are the backbone of our operations, helping us deliver hope directly to communities in need across India.
          </p>
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <p className="text-sm font-semibold text-[#FD7E14] mb-3">Volunteer Opportunities</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#FD7E14] mt-1">•</span>
                  <span>Medical camps and health checkups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FD7E14] mt-1">•</span>
                  <span>Blood and eye donation awareness drives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FD7E14] mt-1">•</span>
                  <span>Disaster relief and emergency response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FD7E14] mt-1">•</span>
                  <span>Community outreach programs</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <p className="text-sm font-semibold text-[#FD7E14] mb-2">Contact for Volunteering</p>
              <p className="text-sm text-white/80">📞 040 23554849 | 98497 56785</p>
              <p className="text-sm text-white/80 mt-2">📧 Reach out through our website or visit our office</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const AnimatedTabs = ({
  tabs = defaultTabs,
  defaultTab,
  className,
  autoScrollInterval = 6000, // 6 seconds default for better readability
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality - optimized for smooth operation
  useEffect(() => {
    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Don't start if paused or no tabs
    if (isPaused || !tabs?.length) {
      return;
    }

    // Set up new interval for auto-scrolling
    intervalRef.current = setInterval(() => {
      setActiveTab((currentTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === currentTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, autoScrollInterval);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, tabs, autoScrollInterval]);

  // Handle manual tab change - reset the interval smoothly
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Clear current interval to reset the timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // The useEffect will automatically restart the interval if not paused
    // This ensures smooth auto-scroll continues after manual interaction
  };

  if (!tabs?.length) return null;

  return (
    <div
      className={cn("w-full flex flex-col gap-y-4", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Enhanced Tab Navigation */}
      <div className="flex gap-2 flex-wrap bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-md p-2 rounded-2xl border border-primary/20 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "relative px-6 py-3 text-sm md:text-base font-semibold rounded-xl text-primary outline-none transition-all duration-300",
              "hover:bg-primary/10 hover:scale-105",
              activeTab === tab.id ? "text-white" : "text-primary/70 hover:text-primary"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/30 backdrop-blur-sm rounded-xl"
                transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Enhanced Content Area */}
      <div className="p-8 md:p-10 lg:p-12 bg-black shadow-2xl shadow-black/20 text-white backdrop-blur-sm rounded-2xl border-2 border-[#333] min-h-[450px] md:min-h-[550px] lg:min-h-[600px] h-full relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FD7E14]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FD7E14]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 20,
                  filter: "blur(8px)",
                }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, y: -20, filter: "blur(8px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative z-10"
              >
                {tab.content}
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs };

