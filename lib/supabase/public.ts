import { createClient } from "@supabase/supabase-js";
import { readPublicSupabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export function createSupabasePublicClient() {
  const config = readPublicSupabaseEnv();
  if (!config) return null;
  return createClient<Database>(config.url, config.publishableKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
}
