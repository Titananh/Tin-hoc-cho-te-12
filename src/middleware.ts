import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect authenticated users away from auth pages
    const authPaths = ['/login', '/register'];
    if (token && authPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Protect admin routes - require admin role
    if (pathname.startsWith('/admin')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Auth pages are accessible to everyone (redirect handled in middleware function)
        const authPaths = ['/login', '/register'];
        if (authPaths.some((path) => pathname.startsWith(path))) {
          return true;
        }

        // Protected routes that require authentication
        const protectedPaths = ['/dashboard', '/learn', '/profile', '/lessons', '/exercises', '/admin'];
        const isProtectedRoute = protectedPaths.some((path) =>
          pathname.startsWith(path)
        );

        if (isProtectedRoute) {
          return !!token;
        }

        // Allow access to all other routes
        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

// Configure which routes the middleware applies to
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/learn/:path*',
    '/profile/:path*',
    '/lessons/:path*',
    '/exercises/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
};
