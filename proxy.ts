import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    // next-auth v5 stores session in auth.js cookies
    const sessionToken =
      request.cookies.get('authjs.session-token')?.value ??
      request.cookies.get('__Secure-authjs.session-token')?.value;

    if (!sessionToken) {
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('authRequired', '1');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/real-questions'],
};
