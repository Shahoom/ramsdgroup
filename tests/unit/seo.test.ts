import { describe, expect, it } from "vitest";
import { buildMetadata, localizedUrl } from "@/lib/seo";

describe("international SEO", () => {
  it("uses explicit prefixes and the www canonical host", () => {
    expect(localizedUrl("ar", "/services")).toBe("https://www.ramsdgroup.com/ar/services");
    expect(localizedUrl("en", "/services")).toBe("https://www.ramsdgroup.com/en/services");
  });
  it("emits reciprocal self-referencing alternates and x-default", () => {
    const meta = buildMetadata({ locale: "ar", path: "/services", title: "خدمات", description: "وصف خدمات تحصيل الديون التجارية في سلطنة عمان." });
    expect(meta.alternates).toEqual({ canonical: "https://www.ramsdgroup.com/ar/services", languages: { ar: "https://www.ramsdgroup.com/ar/services", en: "https://www.ramsdgroup.com/en/services", "x-default": "https://www.ramsdgroup.com/services" } });
  });
});
