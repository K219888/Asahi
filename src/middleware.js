import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(req) {
  const res = NextResponse.next();

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // ✅ Service role key ignores RLS
  );

  // You still need the user session from Supabase helper
  // or however you track your session (cookie, JWT, etc.)
  const accessToken = req.cookies.get("sb-access-token")?.value; // Example name
  let user = null;

  if (accessToken) {
    // Validate token and get user
    const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
    if (!error) user = data.user;
  }

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/ebooks")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("has_active_subscription")
      .eq("id", user.id)
      .single();

    if (error || !profile?.has_active_subscription) {
      return NextResponse.redirect(new URL("/pricing", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/ebooks/:path*"],
};
