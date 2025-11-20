"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUserData, clearAuthData } from "@/lib/auth-storage";
import { verifyToken } from "@/lib/api";
import { requireUser } from "@/middleware/route-guard";
import UserSidebar from "./components/UserSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // STRICT ROUTE GUARD: Additional security layer
      const hasUserAccess = await requireUser();
      if (!hasUserAccess) {
        return; // requireUser handles redirect
      }

      const token = getToken();
      const userData = getUserData();

      if (!token || !userData) {
        clearAuthData();
        router.push("/login");
        return;
      }

      // Verify token with backend - STRICT role checking
      try {
        const result = await verifyToken(token);
        
        if (!result.success) {
          clearAuthData();
          router.push("/login");
          return;
        }
        
        // STRICT RBAC: If admin tries to access user dashboard, redirect to admin
        if (result.data.user.role === 'admin') {
          router.push("/admin/dashboard");
          return;
        }
        
        // STRICT RBAC: Only allow regular users from RegularUser collection
        if (result.data.user.role !== 'user') {
          clearAuthData();
          router.push("/login?message=Access denied. Only user accounts from the RegularUser collection can access this dashboard.");
          return;
        }
        
        // Regular user from RegularUser collection - allow access
        setUser(result.data.user);
        setLoading(false);
      } catch (error) {
        clearAuthData();
        router.push("/login?message=Session expired. Please login again.");
      }
    } catch (error: any) {
      console.error('Auth check error:', error);
      clearAuthData();
      router.push("/login?message=Authentication error. Please login again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9f8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1a3a3a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4a4a4a]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f8f9f8] flex">
      <UserSidebar />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
