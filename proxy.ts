import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /api/real-questions — block unauthenticated requests at the edge
  if (pathname.startsWith('/api/real-questions')) {
    const sessionToken =
      request.cookies.get('authjs.session-token')?.value ??
      request.cookies.get('__Secure-authjs.session-token')?.value ??
      request.cookies.get('next-auth.session-token')?.value ??
      request.cookies.get('__Secure-next-auth.session-token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  // /dashboard — let the server component's auth() call handle the redirect;
  // no edge-level cookie check needed (avoids cookie-name mismatches).

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/real-questions'],
};
