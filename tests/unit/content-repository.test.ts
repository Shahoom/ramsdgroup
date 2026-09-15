import { describe, expect, it } from "vitest";

import { getEntryBySlug, listEntries } from "@/lib/content/repository";

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
});
