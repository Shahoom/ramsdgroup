import { describe, expect, it } from "vitest";
import { buildMetadata, entryDetailJsonLd, localizedUrl } from "@/lib/seo";

describe("international SEO", () => {
  it("uses explicit prefixes and the www canonical host", () => {
    expect(localizedUrl("ar", "/services")).toBe("https://www.ramsdgroup.com/ar/services");
    expect(localizedUrl("en", "/services")).toBe("https://www.ramsdgroup.com/en/services");
  });
  it("emits reciprocal self-referencing alternates and x-default", () => {
    const meta = buildMetadata({ locale: "ar", path: "/services", title: "خدمات", description: "وصف خدمات تحصيل الديون التجارية في سلطنة عمان." });
    expect(meta.alternates).toEqual({ canonical: "https://www.ramsdgroup.com/ar/services", languages: { ar: "https://www.ramsdgroup.com/ar/services", en: "https://www.ramsdgroup.com/en/services", "x-default": "https://www.ramsdgroup.com/services" } });
  });

  it("builds a detail-page graph from content that is visible on the page", () => {
    const graph = entryDetailJsonLd("en", {
      type: "service",
      slug: "commercial-debt-collection",
      title: "Commercial debt collection",
      excerpt: "Professional recovery of overdue commercial receivables.",
      publishedAt: "2026-09-15T00:00:00.000Z",
      updatedAt: "2026-09-15T00:00:00.000Z",
      blocks: [{
        type: "faq",
        heading: "Questions",
        items: [{ question: "Is legal action always required?", answer: "No. Amicable resolution is considered first." }],
      }],
    });

    expect(graph[0]).toMatchObject({ "@type": "BreadcrumbList" });
    expect(graph[1]).toMatchObject({ "@type": "Service", name: "Commercial debt collection" });
    expect(graph[2]).toMatchObject({ "@type": "FAQPage" });
  });
});
