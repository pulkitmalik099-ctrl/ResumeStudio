import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Redirect to login if not authenticated
    if (
      !req.nextauth.token &&
      (req.nextUrl.pathname.startsWith('/dashboard') ||
        req.nextUrl.pathname.startsWith('/builder') ||
        req.nextUrl.pathname.startsWith('/templates'))
    ) {
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${req.nextUrl.pathname}`, req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/builder/:path*', '/api/resumes/:path*'],
};
