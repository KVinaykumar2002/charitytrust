"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu as MenuIcon, X, User, LogOut, Settings, LayoutDashboard, Droplet, Eye, ArrowRight } from "lucide-react";
import { getUserData, clearAuthData, isAdmin } from "@/lib/auth-storage";
import { getPublicServices } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import TextToSpeech from "@/components/TextToSpeech";

interface NavItem {
  name: string;
  href?: string;
  dropdown?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    name: "About Us",
    dropdown: [
      { name: "Founder and Chairman", href: "/about#founder-chairman" },
      { name: "About Chiranjeevi Charitable Trust", href: "/about#about-company" },
      { name: "Our Journey", href: "/about#journey" },
      { name: "Our Mission", href: "/about#mission" },
      { name: "Our Vision", href: "/about#vision" },
      { name: "Voice of Impact", href: "/#voice-of-impact" },
      { name: "Awards", href: "/about#awards" },
    ],
  },
  {
    name: "Our Services",
    href: "/services",
    dropdown: [
      { name: "Chiranjeevi Eye Bank", href: "/services#eye-bank" },
      { name: "Chiranjeevi Blood Center", href: "/services#blood-center" },
    ],
  },
  {
    name: "Events",
    dropdown: [
      { name: "All Events", href: "/events" },
      { name: "Events by Fans", href: "/events-by-fans" },
    ],
  },
  { name: "Special Services", href: "/projects" },
  { name: "Our Team", href: "/team" },
  {
    name: "Donations",
    dropdown: [
      { name: "Eye Donation", href: "/eye-donation" },
      { name: "Blood Donation", href: "/blood-donation" },
    ],
  },
  {
    name: "More",
    dropdown: [
      { name: "Gallery", href: "/gallery" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact Us", href: "/contact-us" },
    ],
  },
];

const DEFAULT_SERVICES_DROPDOWN: { name: string; href: string }[] = [
  { name: "Chiranjeevi Eye Bank", href: "/services#eye-bank" },
  { name: "Chiranjeevi Blood Center", href: "/services#blood-center" },
];

const NavigationHeader = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState<{ name: string; href: string }[]>(DEFAULT_SERVICES_DROPDOWN);

  useEffect(() => {
    getPublicServices()
      .then((res: { success?: boolean; data?: Array<{ title: string; slug: string }> }) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setServicesDropdown(
            res.data.map((s) => ({ name: s.title, href: `/services#${s.slug}` }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const navItemsDisplay = useMemo(
    () =>
      navItems.map((item) =>
        item.name === "Our Services"
          ? { ...item, dropdown: servicesDropdown }
          : item
      ),
    [servicesDropdown]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check if a nav item is active
  const isActive = (item: NavItem) => {
    if (item.name === "About Us") {
      return pathname?.startsWith("/about");
    }
    if (item.name === "Our Services") {
      return pathname?.startsWith("/services");
    }
    if (item.name === "Events") {
      return pathname === "/events" || pathname === "/events-by-fans";
    }
    if (item.name === "Special Services") {
      return pathname === "/projects";
    }
    if (item.name === "Our Team") {
      return pathname === "/team";
    }
    if (item.name === "Donations") {
      return pathname === "/eye-donation" || pathname === "/blood-donation";
    }
    if (item.name === "More") {
      return pathname === "/gallery" || pathname === "/faq" || pathname === "/contact-us";
    }
    if (item.href) {
      return pathname === item.href;
    }
    return false;
  };

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  const handleSignOut = () => {
    clearAuthData();
    window.location.href = "/";
  };

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

  // Handle smooth scroll for hash links
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    // Handle initial load with hash
    handleHashScroll();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  const toggleSubmenu = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  // Fully transparent on hero (home) and about when at top; glassy when scrolled or on other pages
  const isTransparent = (pathname === "/" || pathname?.startsWith("/about")) && !scrolled;
  const navTextClass = isTransparent
    ? "text-white font-semibold hover:text-white/95"
    : "text-white/80 font-semibold hover:text-[#FD7E14]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 flex h-24 max-h-24 w-full justify-center px-3 sm:px-4 transition-[background-color,backdrop-filter] duration-300 overflow-visible ${isTransparent ? "bg-transparent" : "bg-black/60 backdrop-blur-md"}`}>
      <div className="relative flex h-full w-full max-w-[1280px] min-w-0 items-center justify-between gap-1 lg:gap-1.5 lg:px-2 lg:pr-4 xl:px-3 xl:pr-5 overflow-visible">
        {/* Logo - size independent of navbar height */}
        <Link href="/" className="flex shrink-0 items-center justify-center overflow-visible">
          <Image
            src="/LogoFinal.png"
            alt="Chiranjeevi Charitable Trust logo"
            width={500}
            height={150}
            className="h-32 w-auto object-contain object-left lg:h-36 xl:h-40"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex lg:gap-3 xl:gap-4">
          {navItemsDisplay.map((item) =>
            item.dropdown ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => {
                  if (dropdownTimeout) {
                    clearTimeout(dropdownTimeout);
                    setDropdownTimeout(null);
                  }
                  setOpenDropdown(item.name);
                }}
                onMouseLeave={() => {
                  // Add small delay before closing to prevent accidental closes
                  const timeout = setTimeout(() => {
                    setOpenDropdown(null);
                  }, 100);
                  setDropdownTimeout(timeout);
                }}
              >
                <div className="flex items-center gap-1 py-1.5 px-0.5">
                  <Link
                    href={item.name === "About Us" ? "/about" : item.href || "#"}
                    className={`whitespace-nowrap text-sm transition-colors duration-300 hover-underline-slide ${
                      isActive(item)
                        ? "text-[#FD7E14] font-semibold"
                        : navTextClass
                    }`}
                  >
                    {item.name}
                  </Link>
                  <ChevronDown className="h-2.5 w-2.5 text-current transition-transform duration-300" />
                </div>
                {openDropdown === item.name && (
                  <div 
                    className="absolute top-full left-1/2 w-max -translate-x-1/2 z-[9999]"
                    onMouseEnter={() => {
                      if (dropdownTimeout) {
                        clearTimeout(dropdownTimeout);
                        setDropdownTimeout(null);
                      }
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => {
                        setOpenDropdown(null);
                      }, 100);
                      setDropdownTimeout(timeout);
                    }}
                  >
                    {/* Bridge area to prevent gap issues */}
                    <div className="h-2" />
                    <div className="overflow-hidden rounded-xl border border-[#333] bg-[#1a1a1a] shadow-lg">
                      {item.dropdown.map((subItem) => {
                      const isEye = subItem.href === "/eye-donation";
                      const isBlood = subItem.href === "/blood-donation";
                      const Icon = isEye ? Eye : isBlood ? Droplet : null;
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => {
                            setOpenDropdown(null);
                            if (dropdownTimeout) {
                              clearTimeout(dropdownTimeout);
                              setDropdownTimeout(null);
                            }
                            // Smooth scroll to anchor if hash is present
                            if (subItem.href.includes('#')) {
                              setTimeout(() => {
                                const hash = subItem.href.split('#')[1];
                                const element = document.getElementById(hash);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 100);
                            }
                          }}
                          className="flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-base text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-[#FD7E14]"
                        >
                          {Icon && <Icon className="h-4 w-4 shrink-0 text-[#FD7E14]" />}
                          {subItem.name}
                        </Link>
                      );
                    })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href!}
                className={`whitespace-nowrap py-1.5 px-0.5 text-sm transition-colors duration-300 hover-underline-slide ${
                  isActive(item)
                    ? "text-[#FD7E14] font-semibold"
                    : navTextClass
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Auth Buttons (Desktop) - rightmost */}
        <div className={`hidden lg:flex items-center gap-1 shrink-0 ml-auto lg:gap-1.5 xl:gap-1.5 ${isTransparent ? "[&_button]:text-white [&_button]:font-semibold [&_button]:bg-white/15 [&_button:hover]:bg-white/25" : ""}`}>
          <TextToSpeech />
          <LanguageSelector />
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-sm transition-colors ${isTransparent ? "bg-white/15 text-white font-semibold hover:bg-white/25" : "bg-white/10 font-medium text-white hover:bg-white/20"}`}>
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="bg-[#FD7E14] text-white text-[10px]">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[100px] truncate">{user?.name || "User"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#333]">
                <DropdownMenuLabel className="text-[#1a1a1a] dark:text-white">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-[#4a4a4a] dark:text-[#a0a0a0]">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Only show user dashboard, never admin dashboard in public navigation */}
                {user?.role === "user" && (
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      My Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          <a
            href="https://wa.me/919849756785"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FD7E14] px-4 py-1.5 text-base font-semibold text-[#ffffff] whitespace-nowrap btn-hover-bounce btn-shine-effect"
          >
            Reach us
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className={`lg:hidden flex items-center gap-2 ${isTransparent ? "[&_button]:text-white [&_button]:font-semibold [&_button]:bg-white/15 [&_button:hover]:bg-white/25" : ""}`}>
          <TextToSpeech />
          <LanguageSelector />
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className={`rounded-full p-2 text-white transition-colors duration-200 btn-press-down ${isTransparent ? "bg-white/15 font-semibold hover:bg-white/25" : "bg-white/10 hover:bg-white/20"}`}
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
        <div className="absolute top-full left-0 mt-2 w-full bg-[#1a1a1a] px-6 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.45)] lg:hidden">
          <nav className="flex flex-col">
            {navItemsDisplay.map((item) => (
              <div key={item.name} className="border-b border-white/10">
                {item.dropdown ? (
                  <>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.name === "About Us" ? "/about" : item.href || "#"}
                        onClick={() => {
                          if (item.name === "About Us") {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className={`flex-1 py-4 text-base font-medium hover-underline-slide ${
                          isActive(item)
                            ? "text-[#FD7E14]"
                            : activeSubmenu === item.name
                            ? "text-[#FD7E14]"
                            : "text-white/80"
                        }`}
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="p-4 -mr-4"
                        aria-label="Toggle submenu"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            activeSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {activeSubmenu === item.name && (
                      <div className="flex flex-col pb-2 pl-4 text-base text-white/70">
                        {item.dropdown.map((subItem) => {
                          const isEye = subItem.href === "/eye-donation";
                          const isBlood = subItem.href === "/blood-donation";
                          const Icon = isEye ? Eye : isBlood ? Droplet : null;
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                // Smooth scroll to anchor if hash is present
                                if (subItem.href.includes('#')) {
                                  setTimeout(() => {
                                    const hash = subItem.href.split('#')[1];
                                    const element = document.getElementById(hash);
                                    if (element) {
                                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }
                                  }, 100);
                                }
                              }}
                              className="flex items-center gap-2 py-2 transition-colors duration-200 hover:text-white hover-underline-slide"
                            >
                              {Icon && <Icon className="h-4 w-4 shrink-0 text-[#FD7E14]" />}
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-4 text-base font-medium transition-colors duration-200 hover-underline-slide ${
                      isActive(item)
                        ? "text-[#FD7E14]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 space-y-3">
            {user ? (
              <>
                {/* Only show user dashboard, never admin dashboard */}
                {user?.role === "user" && (
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-base font-semibold text-white"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    My Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500/20 px-6 py-3 text-base font-semibold text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : null}
            <a
              href="https://wa.me/919849756785"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FD7E14] px-6 py-3 text-lg font-semibold text-[#ffffff]"
            >
              Reach us
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;
