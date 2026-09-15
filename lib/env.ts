import { z } from "zod";

type EnvSource = Record<string, string | undefined>;

const publicSupabaseSchema = z.object({
  url: z.url(),
  publishableKey: z.string().min(1),
});

const privateSupabaseSchema = publicSupabaseSchema.extend({
  secretKey: z.string().min(1),
});

const forbiddenPublicSecretNames = [
  "NEXT_PUBLIC_SUPABASE_SECRET_KEY",
  "NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY",
] as const;

export function assertNoPublicSecrets(source: EnvSource = process.env): void {
  const exposedSecret = forbiddenPublicSecretNames.find((name) => source[name]);

  if (exposedSecret) {
    throw new Error(`${exposedSecret} must never be public.`);
  }
}

export function readPublicSupabaseEnv(source: EnvSource = process.env) {
  assertNoPublicSecrets(source);

  const url = source.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = source.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url && !publishableKey) {
    return null;
  }

  return publicSupabaseSchema.parse({ url, publishableKey });
}

export function readPrivateSupabaseEnv(source: EnvSource = process.env) {
  const publicEnv = readPublicSupabaseEnv(source);
  const secretKey = source.SUPABASE_SECRET_KEY?.trim();

  if (!publicEnv && !secretKey) {
    return null;
  }

  return privateSupabaseSchema.parse({ ...publicEnv, secretKey });
}

export function isSupabaseConfigured(source: EnvSource = process.env): boolean {
  return readPublicSupabaseEnv(source) !== null;
}
