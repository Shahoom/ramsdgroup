import { z } from "zod";

const optionalEmail = z.union([z.literal(""), z.email()]);
const optionalPhone = z.union([z.literal(""), z.string().min(7).max(30).regex(/^[+()\d\s-]+$/)]);

export const leadInputSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).default(""),
  email: optionalEmail.default(""),
  phone: optionalPhone.default(""),
  serviceInterest: z.string().trim().max(100).default(""),
  preferredContact: z.enum(["phone", "email", "whatsapp"]),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(["ar", "en"]),
  consent: z.literal(true),
  website: z.literal("").default(""),
}).refine((value) => value.email || value.phone, { message: "Email or phone is required", path: ["email"] });

export type LeadInput = z.infer<typeof leadInputSchema>;

export function sanitizeAttribution(input: Record<string, unknown>) {
  const get = (key: string) => typeof input[key] === "string" ? String(input[key]).slice(0, 180) : undefined;
  return Object.fromEntries(Object.entries({ source: get("utm_source"), medium: get("utm_medium"), campaign: get("utm_campaign") }).filter(([, value]) => value));
}
