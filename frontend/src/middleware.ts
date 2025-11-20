import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Note: Middleware runs on the server and cannot access localStorage
  // The admin layout component handles authentication and role checking
  // This middleware allows the request through - the layout will block non-admins
  
  const { pathname } = request.nextUrl;

  // Allow the request - the admin layout will verify authentication and role
  // If user is not admin, the layout will redirect to login
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
  ],
};

