import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function getSecret(): Uint8Array {
  return new TextEncoder().encode(process.env.SESSION_SECRET ?? '');
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!(await isAuthenticated(request))) {
      const redirectUrl = new URL('/admin/login', request.url);
      redirectUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname === '/admin/login' && (await isAuthenticated(request))) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
