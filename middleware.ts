import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import clientPromise from "./src/lib/mongodb";

export async function middleware(req: any) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req });

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/api/auth'];
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // If no token and not on public route, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const client = await clientPromise;
  const db = client.db("VOLT_DB");

  try {
    // Check if user has completed profile
    const profile = await db.collection("users_profile").findOne({ 
      userId: token.sub || token.userId 
    });

    // If trying to access profile setup but already has profile, redirect to home
    if (pathname.startsWith('/profile/setup') && profile?.profileComplete) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // If doesn't have complete profile and not on setup page, redirect to setup
    if (!profile?.profileComplete && !pathname.startsWith('/profile/setup')) {
      return NextResponse.redirect(new URL('/profile/setup', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // Fallback to home if there's a database error
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (auth API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};