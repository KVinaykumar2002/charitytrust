"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUserData, clearAuthData } from "@/lib/auth-storage";
import { verifyToken } from "@/lib/api";
import { requireAdmin } from "@/middleware/route-guard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
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
      const hasAdminAccess = await requireAdmin();
      if (!hasAdminAccess) {
        return; // requireAdmin handles redirect
      }

      const token = getToken();
      const userData = getUserData();

      if (!token || !userData) {
        clearAuthData();
        router.push("/login?message=Please login to access admin panel");
        return;
      }

      // STRICT RBAC: Only allow admin role from Admin collection
      if (userData.role !== 'admin') {
        clearAuthData();
        router.push("/login?message=Access denied. Only admin accounts from the Admin collection can access this dashboard.");
        return;
      }

      // Verify token with backend - STRICT verification required
      try {
        const result = await verifyToken(token);
        
        if (!result.success || result.data.user.role !== 'admin') {
          clearAuthData();
          router.push("/login?message=Access denied. Admin privileges required. Your account must be in the Admin collection.");
          return;
        }
        
        // TRIPLE-CHECK: Backend must confirm admin role from Admin collection
        if (result.data.user.role === 'admin') {
          setUser(result.data.user);
          setLoading(false);
        } else {
          clearAuthData();
          router.push("/login?message=Access denied. Admin privileges required.");
        }
      } catch (error) {
        // Token verification failed - deny access
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

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9f8]">
        <div className="text-center">
          <p className="text-[#4a4a4a]">Access denied. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9f8] flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 w-full max-w-full overflow-x-hidden">
        <div className="w-full min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
