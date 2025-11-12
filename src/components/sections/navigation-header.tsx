"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu as MenuIcon, X } from "lucide-react";

interface NavItem {
  name: string;
  href?: string;
  dropdown?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    dropdown: [
      { name: "Our Story", href: "/about" },
      { name: "Our Team", href: "/team" },
    ],
  },
  { name: "Causes", href: "/causes" },
  { name: "Events", href: "/events" },
  { name: "Projects", href: "/projects" },
  {
    name: "All Pages",
    dropdown: [
      { name: "Gallery", href: "/gallery" },
      { name: "FAQ", href: "/faq" },
    ],
  },
];

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const toggleSubmenu = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  return (
    <header className="fixed top-4 z-50 flex w-full justify-center px-4">


      <div className="relative flex w-full max-w-[1220px] items-center justify-between rounded-full border border-white/15 bg-[#0f3536] px-6 py-3 shadow-[0_10px_30px_rgba(1,28,42,0.25)] backdrop-blur-sm lg:px-10">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/uefZpqehpfg3Yk6PexORXxnOA-1.png"
            alt="Lambda Charity Logo"
            width={135}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                    item.name === "Home"
                      ? "text-[#bfffc7]"
                      : "text-white/80 hover:text-[#bfffc7]"
                  }`}
                >
                  {item.name}
                  <ChevronDown className="h-3 w-3 text-current transition-transform duration-300" />
                </button>
                {openDropdown === item.name && (
                  <div className="absolute top-full left-1/2 w-max -translate-x-1/2 pt-4">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f3536]/95 backdrop-blur-sm shadow-lg">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block whitespace-nowrap px-4 py-2 text-sm text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href!}
                className={`text-sm font-medium transition-colors duration-300 ${
                  item.name === "Home"
                    ? "text-[#bfffc7]"
                    : "text-white/80 hover:text-[#bfffc7]"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact-us"
            className="inline-flex items-center rounded-full bg-[#c6ffbf] px-6 py-2.5 text-sm font-semibold text-[#0f3536] transition-transform duration-300 hover:scale-[1.05]"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-full bg-white/10 p-2 text-white transition-colors duration-200 hover:bg-white/20"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[92px] left-0 w-full bg-[#0f3536] px-6 py-6 shadow-[0_20px_40px_rgba(5,34,46,0.45)] lg:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-white/10">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className={`flex w-full items-center justify-between py-4 text-sm font-medium text-white/80 ${
                        activeSubmenu === item.name ? "text-[#bfffc7]" : ""
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          activeSubmenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeSubmenu === item.name && (
                      <div className="flex flex-col pb-2 pl-4 text-sm text-white/70">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="py-2 transition-colors duration-200 hover:text-white"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-4 text-sm font-medium transition-colors duration-200 ${
                      item.name === "Home"
                        ? "text-[#bfffc7]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <Link
            href="/contact-us"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-6 inline-flex w-full justify-center rounded-full bg-[#c6ffbf] px-6 py-3 text-sm font-semibold text-[#0f3536] transition-transform duration-300 hover:scale-[1.02]"
          >
            Donate Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;