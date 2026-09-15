import { describe, expect, it } from "vitest";

import { leadInputSchema, sanitizeAttribution } from "@/lib/leads/schema";

const valid = { fullName: "Test User", email: "test@example.com", phone: "", company: "Acme", serviceInterest: "commercial-debt-collection", preferredContact: "email", message: "Please contact me about an overdue invoice.", locale: "en", consent: true, website: "" };

describe("lead validation", () => {
  it("accepts a valid consented lead", () => expect(leadInputSchema.safeParse(valid).success).toBe(true));
  it("rejects missing consent", () => expect(leadInputSchema.safeParse({ ...valid, consent: false }).success).toBe(false));
  it("rejects malformed contact information", () => expect(leadInputSchema.safeParse({ ...valid, email: "bad" }).success).toBe(false));
  it("rejects oversized messages and honeypot submissions", () => {
    expect(leadInputSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success).toBe(false);
    expect(leadInputSchema.safeParse({ ...valid, website: "bot" }).success).toBe(false);
  });
  it("allowlists attribution and drops sensitive values", () => {
    expect(sanitizeAttribution({ utm_source: "google", email: "private@example.com", utm_campaign: "recovery" })).toEqual({ source: "google", campaign: "recovery" });
  });
});
