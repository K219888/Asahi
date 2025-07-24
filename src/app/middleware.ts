import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('has_active_subscription')
    .eq('id', user.id)
    .single();

  if (!profile?.has_active_subscription) {
    return NextResponse.redirect(new URL('/pricing', req.url));
  }

  return res;
}
