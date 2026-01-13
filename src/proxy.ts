import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  // Initialize response to modify headers later
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the pathname from the URL
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin route
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';

  // If accessing an admin route without being logged in, redirect to login
  if (isAdminRoute && !user) {
    const redirectUrl = new URL('/admin/login', request.url);
    redirectUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If accessing login page while logged in, redirect to admin dashboard
  if (pathname === '/admin/login' && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
