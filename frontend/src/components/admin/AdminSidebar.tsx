"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearAuthData, getUserData } from "@/lib/auth-storage";
import {
  LayoutDashboard,
  FolderKanban,
  Calendar,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero-images", label: "Hero Images", icon: ImageIcon },
  { href: "/admin/programs", label: "Programs", icon: FolderKanban },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  const handleSignOut = () => {
    clearAuthData();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1a3a3a] text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-white border-r border-[#e5e5e5] z-40 transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#e5e5e5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1a3a3a] flex items-center justify-center">
                <Image
                  src="/navbar_logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg text-[#1a3a3a]">Admin Panel</h1>
                <p className="text-xs text-[#4a4a4a]">Charity Trust</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-[#1a3a3a] text-white shadow-md"
                      : "text-[#4a4a4a] hover:bg-[#d4f9e6] hover:text-[#1a3a3a]"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-[#e5e5e5]">
            <div className="mb-3 px-4">
              <p className="text-sm font-medium text-[#1a1a1a]">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-[#4a4a4a] truncate">
                {user?.email}
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="w-full justify-start gap-3 text-[#4a4a4a] hover:bg-[#d4f9e6] hover:text-[#1a3a3a]"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

