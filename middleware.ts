import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['mk', 'sq'],
  defaultLocale: 'mk'
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/mk', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(mk|sq)/:path*']
};
