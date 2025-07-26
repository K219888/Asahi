import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/ssr";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/ebooks")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("has_active_subscription")
      .eq("id", user.id)
      .single();

    if (!profile?.has_active_subscription) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/ebooks/:path*"],
};
