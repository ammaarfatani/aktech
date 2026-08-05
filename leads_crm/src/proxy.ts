import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy Middleware for Route Protection and Session Verification.
 *
 * KEY DESIGN DECISION: The proxy does NOT redirect /login → /dashboard
 * when a session cookie exists. That would create a redirect loop if the
 * client-side AuthProvider hasn't resolved the user yet (user=null while
 * loading) — the dashboard layout would push back to /login, and the
 * proxy would bounce it right back.
 *
 * Instead, the login page itself handles the "already logged in" case
 * via the AuthProvider user state.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('ak_session')?.value;

  // Always allow: login page, auth API routes, static assets
  if (
    pathname === '/login' ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // All other API routes require a session cookie
  if (pathname.startsWith('/api/')) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // No session cookie on a protected page → redirect to /login
  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Session exists → decode and validate
  try {
    const payload = JSON.parse(Buffer.from(session, 'base64').toString('utf-8'));

    // Inactive account → clear cookie and send to login
    if (!payload.active) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('error', 'inactive');
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('ak_session');
      return response;
    }

    // Handle legacy /dashboard/admin URLs
    if (pathname.startsWith('/dashboard/admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Allow through with role header
    const response = NextResponse.next();
    response.headers.set('x-user-role', payload.role);
    return response;
  } catch {
    // Corrupt cookie → clear it and redirect to login
    const loginUrl = new URL('/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('ak_session');
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
