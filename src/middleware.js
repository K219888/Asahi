import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  // Protect /ebooks/[slug] route
  if (pathname.startsWith('/ebooks/')) {
  console.log("Middleware user:", user);

    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('has_active_subscription')
      .eq('id', user.id)
      .single();

     console.log("Middleware profile:", profile);

    if (!profile?.has_active_subscription) {
      return NextResponse.redirect(new URL('/pricing', req.url));
    }
  }

  return res;
}

// This tells middleware to only run on /ebooks/*
export const config = {
  matcher: ['/ebooks/:path*'],
}; 