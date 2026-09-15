import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const migration = fs.readFileSync(
  path.join(process.cwd(), "supabase/migrations/20260915000100_platform_schema.sql"),
  "utf8",
);

const tables = [
  "profiles",
  "content_entries",
  "content_translations",
  "authors",
  "categories",
  "entry_categories",
  "faqs",
  "testimonials",
  "media_assets",
  "site_settings",
  "leads",
  "lead_notes",
  "audit_logs",
];

describe("database security contract", () => {
  it.each(tables)("enables RLS for %s", (table) => {
    expect(migration).toMatch(
      new RegExp(`alter table public\\.${table} enable row level security`, "i"),
    );
  });

  it("defines every staff role and avoids mutable auth metadata", () => {
    for (const role of ["owner", "admin", "editor", "lead_manager"]) {
      expect(migration).toContain(`'${role}'`);
    }
    expect(migration).not.toMatch(/raw_user_meta_data/i);
  });
});
