import { describe, expect, it } from "vitest";
import { buildAnalyticsEvent } from "@/lib/analytics/events";

describe("analytics privacy contract", () => {
  it("only accepts non-sensitive event dimensions", () => {
    const event = buildAnalyticsEvent("lead_submit", { locale: "ar", placement: "contact-page" });
    expect(event).toEqual({ name: "lead_submit", locale: "ar", placement: "contact-page" });
    for (const field of ["email", "phone", "message", "fullName"]) {
      expect(event).not.toHaveProperty(field);
    }
  });
});
