"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUserData } from "@/lib/auth-storage";
import {
  LayoutDashboard,
  Heart,
  Calendar,
  User,
  Settings,
  FileText,
  Award,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/donations", label: "My Donations", icon: Heart },
  { href: "/dashboard/events", label: "My Events", icon: Calendar },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#e5e5e5] z-40">
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="p-6 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-[#1a3a3a] text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-sm text-[#1a3a3a]">My Dashboard</h1>
              <p className="text-xs text-[#4a4a4a] truncate max-w-[140px]">
                {user?.name || "User"}
              </p>
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
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-[#1a3a3a] text-white shadow-md"
                    : "text-[#4a4a4a] hover:bg-[#d4f9e6] hover:text-[#1a3a3a]"
                )}
              >
                <Icon size={20} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

