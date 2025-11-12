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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleSubmenu = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-primary/90 backdrop-blur-[8px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.08)]">
      <div className="max-w-[1280px] mx-auto px-10 h-full flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/uefZpqehpfg3Yk6PexORXxnOA-1.png"
            alt="Lambda Charity Logo"
            width={120}
            height={35}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-nav-link text-white transition-opacity duration-300 hover:opacity-80">
                  {item.name}
                  <ChevronDown className="w-2.5 h-2.5 text-white transition-transform duration-300" />
                </button>
                {openDropdown === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                    <div className="bg-primary/90 backdrop-blur-[8px] rounded-lg shadow-lg overflow-hidden whitespace-nowrap">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-white hover:bg-white/10"
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
                className="text-nav-link text-white transition-opacity duration-300 hover:opacity-80"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact-us"
            className="text-button text-primary bg-secondary rounded-[24px] px-6 py-3 transition-all duration-300 ease-in-out hover:bg-accent hover:scale-[1.02] block"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MenuIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-primary px-10 py-5 overflow-y-auto">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-white/10">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className="w-full flex justify-between items-center py-4 text-nav-link text-white"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeSubmenu === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeSubmenu === item.name && (
                      <div className="flex flex-col pl-4 pb-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="py-2 text-sm text-white/80"
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
                    className="block py-4 text-nav-link text-white"
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
            className="mt-6 inline-block w-full text-center text-button text-primary bg-secondary rounded-[24px] px-6 py-3 transition-colors duration-300 hover:bg-accent"
          >
            Donate Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;