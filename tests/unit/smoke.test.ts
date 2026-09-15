// @vitest-environment node

import { describe, expect, it } from "vitest";

import { SITE } from "@/lib/site";

describe("platform foundation", () => {
  it("uses the redirected www production host as the single canonical origin", () => {
    expect(SITE.url).toBe("https://www.ramsdgroup.com");
  });
});
