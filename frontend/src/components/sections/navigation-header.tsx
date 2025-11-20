"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu as MenuIcon, X, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { getUserData, clearAuthData, isAdmin } from "@/lib/auth-storage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

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

  const toggleSubmenu = (itemName: string) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  return (
    <header className="fixed top-4 z-50 flex w-full justify-center px-4">
      <div className="relative flex w-full max-w-[1220px] items-center justify-between rounded-full border border-white/15 bg-[#0f3536] px-6 py-3 shadow-[0_10px_30px_rgba(1,28,42,0.25)] backdrop-blur-sm transition-all duration-500 hover-shadow-pop lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/unnamed.png"
            alt="Chiranjeevi Charitable Trust logo"
            width={400}
            height={80}
            className="h-11 w-auto"
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
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 hover-underline-slide ${
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
                className={`text-sm font-medium transition-colors duration-300 hover-underline-slide ${
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

        {/* Auth Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-[#1a3a3a] text-white text-xs">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-[100px] truncate">{user?.name || "User"}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-[#e5e5e5]">
                <DropdownMenuLabel className="text-[#1a1a1a]">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-[#4a4a4a]">{user?.email}</p>
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
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center rounded-full bg-[#c6ffbf] px-6 py-2.5 text-sm font-semibold text-[#0f3536] btn-hover-bounce btn-shine-effect"
            >
              Sign In
            </Link>
          )}
          <Link
            href="/contact-us"
            className="inline-flex items-center rounded-full bg-[#c6ffbf] px-6 py-2.5 text-sm font-semibold text-[#0f3536] btn-hover-bounce btn-shine-effect"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-full bg-white/10 p-2 text-white transition-colors duration-200 hover:bg-white/20 btn-press-down"
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
                      className={`flex w-full items-center justify-between py-4 text-sm font-medium text-white/80 hover-underline-slide ${
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
                            className="py-2 transition-colors duration-200 hover:text-white hover-underline-slide"
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
                    className={`block py-4 text-sm font-medium transition-colors duration-200 hover-underline-slide ${
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
          <div className="mt-6 space-y-3">
            {user ? (
              <>
                {/* Only show user dashboard, never admin dashboard */}
                {user?.role === "user" && (
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white"
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
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500/20 px-6 py-3 text-sm font-semibold text-white"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-[#c6ffbf] px-6 py-3 text-sm font-semibold text-[#0f3536]"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-[#c6ffbf] px-6 py-3 text-sm font-semibold text-[#0f3536]"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;
