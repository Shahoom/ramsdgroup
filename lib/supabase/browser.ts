"use client";

import { createBrowserClient } from "@supabase/ssr";

import { readPublicSupabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export function createSupabaseBrowserClient() {
  const config = readPublicSupabaseEnv();

  if (!config) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  return createBrowserClient<Database>(config.url, config.publishableKey);
}
