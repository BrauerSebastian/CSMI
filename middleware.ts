import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const middleware = withAuth(
  function middleware(req) {
    try {
      if (!req.nextauth.token) {
        const shouldRedirect = !req.url.includes('/landing');

        if (shouldRedirect) {
          return NextResponse.redirect(new URL('/landing', req.url));
        }
      } else if (req.nextauth.token.role !== 'ADMIN') {
        const shouldRedirect = !req.url.includes('/grupos/');

        if (shouldRedirect) {
          const groupId = req.nextauth.token.groupId || '';

          return NextResponse.redirect(new URL(`/grupos/${groupId}/`, req.url));
        }
      }

      return NextResponse.next();
    } catch (error) {
      console.error(error);
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|!landing).*)'],
};
