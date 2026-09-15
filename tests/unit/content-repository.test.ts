import { describe, expect, it } from "vitest";

import { getEntryBySlug, listEntries, listRelatedEntries, mergeContentEntries } from "@/lib/content/repository";
import { contentBlockSchema } from "@/lib/content/schema";

describe("content repository", () => {
  it("contains six bilingual services and seven bilingual industries", async () => {
    expect(await listEntries({ type: "service", locale: "ar" })).toHaveLength(6);
    expect(await listEntries({ type: "service", locale: "en" })).toHaveLength(6);
    expect(await listEntries({ type: "industry", locale: "ar" })).toHaveLength(7);
    expect(await listEntries({ type: "industry", locale: "en" })).toHaveLength(7);
  });

  it("resolves a published localized entry and rejects unknown slugs", async () => {
    expect((await getEntryBySlug("service", "ar", "commercial-debt-collection"))?.title).toContain("التجارية");
    expect(await getEntryBySlug("service", "en", "missing")).toBeNull();
  });

  it("keeps every seeded detail page substantial and answer-ready", async () => {
    for (const locale of ["ar", "en"] as const) {
      const services = await listEntries({ type: "service", locale });
      const industries = await listEntries({ type: "industry", locale });
      const articles = await listEntries({ type: "article", locale });

      expect(articles.length).toBeGreaterThanOrEqual(8);

      for (const entry of [...services, ...industries, ...articles]) {
        expect(entry.blocks.length, `${locale}/${entry.type}/${entry.slug}`).toBeGreaterThanOrEqual(5);
        expect(entry.blocks.some((block) => block.type === "features"), `${entry.slug} features`).toBe(true);
        expect(entry.blocks.some((block) => block.type === "faq"), `${entry.slug} faq`).toBe(true);
      }
    }
  });

  it("accepts extractable feature and FAQ content blocks", () => {
    expect(contentBlockSchema.parse({
      type: "features",
      heading: "What the engagement covers",
      intro: "A concise answer that stands on its own.",
      items: [{ title: "Assessment", text: "Review the claim basis and available records." }],
    }).type).toBe("features");

    expect(contentBlockSchema.parse({
      type: "faq",
      heading: "Common questions",
      items: [{ question: "What should I prepare?", answer: "Prepare the agreement, invoices, and communication record." }],
    }).type).toBe("faq");
  });

  it("returns localized related entries without repeating the current page", async () => {
    const current = await getEntryBySlug("article", "ar", "prepare-debt-file");
    expect(current).not.toBeNull();

    const related = await listRelatedEntries(current!, 3);
    expect(related).toHaveLength(3);
    expect(related.every((entry) => entry.locale === "ar" && entry.type === "article")).toBe(true);
    expect(related.some((entry) => entry.slug === "prepare-debt-file")).toBe(false);
  });

  it("lets a CMS entry override its page without hiding other seeded pages", async () => {
    const seeded = await listEntries({ type: "service", locale: "en" });
    const override = { ...seeded[0], title: "CMS title" };
    const merged = mergeContentEntries(seeded, [override]);

    expect(merged).toHaveLength(6);
    expect(merged.find((entry) => entry.slug === override.slug)?.title).toBe("CMS title");
    expect(merged.some((entry) => entry.slug === "recovery-advisory")).toBe(true);
  });
});
