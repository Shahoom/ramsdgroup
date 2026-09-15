// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  assertNoPublicSecrets,
  isSupabaseConfigured,
  readPublicSupabaseEnv,
} from "@/lib/env";

describe("Supabase environment contract", () => {
  it("keeps the public website buildable when remote Supabase is not configured", () => {
    expect(readPublicSupabaseEnv({})).toBeNull();
    expect(isSupabaseConfigured({})).toBe(false);
  });

  it("accepts a valid project URL and publishable key together", () => {
    const source = {
      NEXT_PUBLIC_SUPABASE_URL: "https://ram-example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
    };

    expect(readPublicSupabaseEnv(source)).toEqual({
      url: "https://ram-example.supabase.co",
      publishableKey: "sb_publishable_example",
    });
    expect(isSupabaseConfigured(source)).toBe(true);
  });

  it("rejects privileged Supabase keys exposed through a public variable", () => {
    expect(() =>
      assertNoPublicSecrets({
        NEXT_PUBLIC_SUPABASE_SECRET_KEY: "sb_secret_example",
      }),
    ).toThrow(/must never be public/i);
  });
});
