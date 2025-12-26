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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="https://www.cinejosh.com/newsimg/newsmainimg/chiranjeevi-on-world-blood-donation-day_b_1506220926.jpg"
          alt="Chiranjeevi Charity Trust Blood Donation Campaign"
          className="rounded-lg w-full h-80 md:h-96 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-4 justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-0 text-white mt-0 !m-0">
            Blood & Eye Donation Drives
          </h2>
          <p className="text-base md:text-lg text-gray-200 mt-0 leading-relaxed">
            Chiranjeevi Charitable Trust has pioneered large-scale blood and eye donation drives across India. Over <strong className="text-white">10 lakh units</strong> of life-saving blood collected and <strong className="text-white">10,000+ corneal transplants</strong> performed, saving countless lives and restoring vision to thousands.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Contact for Blood Donation:</strong><br />
              📞 040 23554849 | 040 23555005 | 98497 56785
            </p>
            <p className="text-sm text-gray-300">
              <strong className="text-white">Location:</strong><br />
              Chiranjeevi Eye and Blood Bank<br />
              82/A, Road No. 1, Jawahar Colony, Jubilee Hills<br />
              Hyderabad, Telangana, India
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "monthly",
    label: "Monthly Support",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="https://assets.hmtvlive.com/h-upload/2023/07/09/357070-chiranjeevi-charitable-trust.webp"
          alt="Chiranjeevi Charity Trust Monthly Support Programs"
          className="rounded-lg w-full h-80 md:h-96 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-4 justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-0 text-white mt-0 !m-0">
            Pledge Monthly Support
          </h2>
          <p className="text-base md:text-lg text-gray-200 mt-0 leading-relaxed">
            Your recurring monthly contribution helps Chiranjeevi Charitable Trust maintain critical services including ambulance operations, subsidized diagnostics, and ongoing medical support. Monthly donors ensure we can provide <strong className="text-white">50% subsidy in diagnostics</strong> and support to <strong className="text-white">15,000+ daily wage workers</strong>.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Benefits of Monthly Support:</strong><br />
              • Sustained ambulance services<br />
              • Subsidized medical diagnostics<br />
              • Continuous patient support programs
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "partnerships",
    label: "Partnerships",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="https://img.ap7am.com/froala-uploads/20240126fr65b342713b414.jpg"
          alt="Chiranjeevi Charity Trust Corporate Partnerships"
          className="rounded-lg w-full h-80 md:h-96 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-4 justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-0 text-white mt-0 !m-0">
            Partner With CCT
          </h2>
          <p className="text-base md:text-lg text-gray-200 mt-0 leading-relaxed">
            Corporate CSR programmes and institutional grants enable Chiranjeevi Charitable Trust to establish new relief centres, community health clinics, and expand our reach. We've established <strong className="text-white">32 oxygen banks</strong> across Telugu states and continue to build infrastructure for community welfare.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Partnership Opportunities:</strong><br />
              • Corporate CSR Programs<br />
              • Institutional Grants<br />
              • Healthcare Infrastructure Development<br />
              • Community Health Initiatives
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "volunteer",
    label: "Volunteer",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        <img
          src="https://img1.wsimg.com/isteam/ip/3f9bf7ba-9991-425c-8ad7-3fa919af01f1/cct1.jpeg/:/cr=t:19.74%25,l:9.68%25,w:80.65%25,h:60.52%25/rs=w:600,h:300,cg:true,m"
          alt="Chiranjeevi Charity Trust Volunteer Programs"
          className="rounded-lg w-full h-80 md:h-96 object-cover mt-0 !m-0 shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none"
        />
        <div className="flex flex-col gap-y-4 justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-0 text-white mt-0 !m-0">
            Volunteer With CCT
          </h2>
          <p className="text-base md:text-lg text-gray-200 mt-0 leading-relaxed">
            Join Chiranjeevi Charitable Trust's medical camps, awareness drives, and relief missions. Volunteers are the backbone of our operations, helping us deliver hope directly to communities in need across India.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-300">
              <strong className="text-white">Volunteer Opportunities:</strong><br />
              • Medical camps and health checkups<br />
              • Blood and eye donation awareness drives<br />
              • Disaster relief and emergency response<br />
              • Community outreach programs
            </p>
            <p className="text-sm text-gray-300 mt-4">
              <strong className="text-white">Contact for Volunteering:</strong><br />
              📞 040 23554849 | 98497 56785<br />
              📧 Reach out through our website or visit our office
            </p>
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
  autoScrollInterval = 5000, // 5 seconds default
}: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || !tabs?.length) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval
    intervalRef.current = setInterval(() => {
      setActiveTab((currentTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === currentTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, autoScrollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, tabs, autoScrollInterval]);

  // Handle manual tab change - reset the interval
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Clear current interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Restart auto-scroll after a brief pause (only if not paused)
    if (!isPaused) {
      setTimeout(() => {
        if (!isPaused && intervalRef.current === null) {
          intervalRef.current = setInterval(() => {
            setActiveTab((currentTab) => {
              const currentIndex = tabs.findIndex((tab) => tab.id === currentTab);
              const nextIndex = (currentIndex + 1) % tabs.length;
              return tabs[nextIndex].id;
            });
          }, autoScrollInterval);
        }
      }, 2000); // 2 second pause after manual change
    }
  };

  if (!tabs?.length) return null;

  return (
    <div
      className={cn("w-full flex flex-col gap-y-3", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex gap-3 flex-wrap bg-[#11111198] bg-opacity-50 backdrop-blur-sm p-2 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "relative px-5 py-2.5 text-base font-medium rounded-lg text-white outline-none transition-colors"
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-[#111111d1] bg-opacity-50 shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm !rounded-lg"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] text-white bg-opacity-50 backdrop-blur-sm rounded-xl border min-h-[400px] md:min-h-[500px] h-full">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  x: -10,
                  filter: "blur(10px)",
                }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                transition={{
                  duration: 0.5,
                  ease: "circInOut",
                  type: "spring",
                }}
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

