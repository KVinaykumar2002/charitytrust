// Token storage utilities

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Save token and user data
export function saveAuthData(token: string, user: UserData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

// Get token
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

// Get user data
export function getUserData(): UserData | null {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
}

// Clear auth data
export function clearAuthData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

// Check if user is admin
export function isAdmin(): boolean {
  const user = getUserData();
  return user?.role === 'admin';
}

