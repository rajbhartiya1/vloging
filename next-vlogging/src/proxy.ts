import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const authCookie = request.cookies.get('vloghub_auth');
  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register') ||
    request.nextUrl.pathname.startsWith('/forgot-password') ||
    request.nextUrl.pathname.startsWith('/reset-password');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
  const isPublicAsset = request.nextUrl.pathname.startsWith('/assets/') || request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg)$/);

  // If the user isn't authenticated and isn't trying to reach an auth page, redirect to login
  if (!authCookie && !isAuthPage && !isApiRoute && !isPublicAsset) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is authenticated and trying to reach an auth page, redirect to home
  if (authCookie && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};