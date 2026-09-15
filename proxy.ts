import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "@/i18n/routing";
import { readPublicSupabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

const handleI18n = createMiddleware(routing);

async function refreshAdminSession(request: NextRequest) {
  const config = readPublicSupabaseEnv();
  if (!config) return NextResponse.next({ request });
  let response = NextResponse.next({ request });
  const supabase = createServerClient<Database>(config.url, config.publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  await supabase.auth.getClaims();
  return response;
}

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) return refreshAdminSession(request);
  return handleI18n(request);
}

export const config = { matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"] };
