import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const requestUrl = new URL(req.url);

  if (!session && requestUrl.pathname.includes("/dashboard")) {
    const newUrl = req.nextUrl.clone();

    newUrl.pathname = "/admin-login";

    return NextResponse.redirect(newUrl);
  }

  if (session && requestUrl.pathname === "/admin-login") {
    const newUrl = req.nextUrl.clone();

    newUrl.pathname = "/dashboard";

    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: ["/admin-login", "/dashboard", "/dashboard/:path*"],
};
