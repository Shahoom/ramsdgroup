import "server-only";

import { createClient } from "@supabase/supabase-js";

import { readPrivateSupabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export function createSupabaseAdminClient() {
  const config = readPrivateSupabaseEnv();

  if (!config) {
    throw new Error("Supabase private environment variables are not configured.");
  }

  return createClient<Database>(config.url, config.secretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
