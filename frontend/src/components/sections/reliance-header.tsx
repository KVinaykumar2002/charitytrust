"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, Headphones, Sun } from "lucide-react";

const RelianceHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topNavItems = [
    { name: "Contact Us", href: "/contact" },
    { name: "Donate", href: "/donate" },
  ];

  const mainNavItems = [
    { name: "About", href: "/about", active: true },
    { name: "Founder", href: "/founder" },
    { name: "Services", href: "/services" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Chiranjeevi Charitable Trust"
                width={180}
                height={50}
                className="h-12 w-auto object-contain"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <span
                className="text-xl font-bold text-[#004291]"
                style={{ display: "none" }}
              >
                Chiranjeevi Charitable Trust
              </span>
            </Link>
          </div>

          <div className="flex flex-col items-end flex-grow">
            {/* Top Bar */}
            <div className="hidden lg:flex items-center gap-6 mb-2">
              <nav className="flex items-center gap-4">
                {topNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-[13px] font-semibold transition-colors hover:text-[#C59B5F] ${
                      isScrolled ? "text-[#333333]" : "text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Main Navigation */}
            <nav className="flex items-center gap-8">
              <ul className="hidden lg:flex items-center gap-6">
                {mainNavItems.map((item) => (
                  <li key={item.name} className="group px-1">
                    <Link
                      href={item.href}
                      className={`relative py-2 text-[15px] font-semibold transition-colors hover:text-[#C59B5F] flex items-center gap-1 ${
                        isScrolled ? "text-[#333333]" : "text-white"
                      }`}
                    >
                      {item.name}
                      {item.active && (
                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C59B5F]" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Action Icons */}
              <div className="flex items-center gap-4 ml-6">
                <button
                  className={`p-2 transition-colors hover:text-[#C59B5F] ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                  aria-label="Search"
                >
                  <Search size={22} />
                </button>
              </div>

              {/* Mobile Menu Toggler */}
              <button
                className="lg:hidden flex flex-col gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-[2px] ${isScrolled ? "bg-black" : "bg-white"}`}
                />
                <span
                  className={`w-6 h-[2px] ${isScrolled ? "bg-black" : "bg-white"}`}
                />
                <span
                  className={`w-6 h-[2px] ${isScrolled ? "bg-black" : "bg-white"}`}
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RelianceHeader;
