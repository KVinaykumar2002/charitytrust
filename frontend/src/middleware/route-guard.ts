/**
 * Route Guard Utilities
 * Additional security layer to prevent unauthorized access
 */

import { getToken, getUserData, clearAuthData } from "@/lib/auth-storage";
import { verifyToken } from "@/lib/api";

/**
 * Check if user is admin - STRICT verification
 * Verifies both localStorage and backend token
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const token = getToken();
    const userData = getUserData();

    if (!token || !userData) {
      return false;
    }

    // Check localStorage first
    if (userData.role !== 'admin') {
      return false;
    }

    // Verify with backend - STRICT check
    const result = await verifyToken(token);
    if (!result.success || result.data.user.role !== 'admin') {
      clearAuthData();
      return false;
    }

    return true;
  } catch (error) {
    clearAuthData();
    return false;
  }
}

/**
 * Check if user is regular user - STRICT verification
 * Verifies both localStorage and backend token
 */
export async function isUser(): Promise<boolean> {
  try {
    const token = getToken();
    const userData = getUserData();

    if (!token || !userData) {
      return false;
    }

    // Check localStorage first
    if (userData.role !== 'user') {
      return false;
    }

    // Verify with backend - STRICT check
    const result = await verifyToken(token);
    if (!result.success || result.data.user.role !== 'user') {
      clearAuthData();
      return false;
    }

    return true;
  } catch (error) {
    clearAuthData();
    return false;
  }
}

/**
 * Block admin route access for non-admins
 * Use this in admin pages/components
 */
export async function requireAdmin(): Promise<boolean> {
  const isAdminUser = await isAdmin();
  if (!isAdminUser) {
    clearAuthData();
    window.location.href = '/login?message=Access denied. Admin privileges required.';
    return false;
  }
  return true;
}

/**
 * Block user route access for admins
 * Use this in user pages/components
 */
export async function requireUser(): Promise<boolean> {
  const isRegularUser = await isUser();
  if (!isRegularUser) {
    // If admin tries to access user route, redirect to admin dashboard
    const userData = getUserData();
    if (userData?.role === 'admin') {
      window.location.href = '/admin/dashboard';
      return false;
    }
    clearAuthData();
    window.location.href = '/login?message=Access denied. Please login as a user.';
    return false;
  }
  return true;
}

