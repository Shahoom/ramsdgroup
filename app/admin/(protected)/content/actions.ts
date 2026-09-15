"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requirePermission } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const entrySchema = z.object({ type: z.enum(["page", "service", "industry", "article", "case_study", "legal"]), status: z.enum(["draft", "review", "published", "archived"]), slugAr: z.string().trim().min(1).max(160), slugEn: z.string().trim().min(1).max(160), titleAr: z.string().trim().min(1).max(180), titleEn: z.string().trim().min(1).max(180), excerptAr: z.string().trim().min(1).max(500), excerptEn: z.string().trim().min(1).max(500), bodyAr: z.string().trim().min(1).max(30000), bodyEn: z.string().trim().min(1).max(30000), seoTitleAr: z.string().trim().max(70), seoTitleEn: z.string().trim().max(70), seoDescriptionAr: z.string().trim().max(180), seoDescriptionEn: z.string().trim().max(180) });

function values(formData: FormData) { return entrySchema.parse(Object.fromEntries(formData)); }
function translation(entryId: string, locale: "ar" | "en", data: z.infer<typeof entrySchema>) { const suffix = locale === "ar" ? "Ar" : "En"; return { entry_id: entryId, locale, slug: data[`slug${suffix}`], title: data[`title${suffix}`], excerpt: data[`excerpt${suffix}`], body: [{ type: "rich_text", paragraphs: data[`body${suffix}`].split(/\n\s*\n/).filter(Boolean) }], seo_title: data[`seoTitle${suffix}`] || null, seo_description: data[`seoDescription${suffix}`] || null }; }

export async function createEntryAction(formData: FormData) {
  const session = await requirePermission("content:write"); const data = values(formData); if (data.status === "published") await requirePermission("content:publish");
  const supabase = await createSupabaseServerClient(); const now = new Date().toISOString();
  const { data: entry, error } = await supabase.from("content_entries").insert({ type: data.type, status: data.status, published_at: data.status === "published" ? now : null, created_by: session.userId, updated_by: session.userId }).select("id").single();
  if (error || !entry) throw error ?? new Error("Entry creation failed");
  const { error: translationError } = await supabase.from("content_translations").insert([translation(entry.id, "ar", data), translation(entry.id, "en", data)]);
  if (translationError) throw translationError;
  revalidatePath("/admin/content"); revalidatePath("/ar", "layout"); revalidatePath("/en", "layout"); redirect(`/admin/content/${entry.id}`);
}

export async function updateEntryAction(formData: FormData) {
  const session = await requirePermission("content:write"); const id = z.uuid().parse(formData.get("id")); const data = values(formData); if (data.status === "published") await requirePermission("content:publish");
  const supabase = await createSupabaseServerClient(); const now = new Date().toISOString();
  const { error } = await supabase.from("content_entries").update({ type: data.type, status: data.status, published_at: data.status === "published" ? now : null, updated_by: session.userId }).eq("id", id); if (error) throw error;
  for (const locale of ["ar", "en"] as const) { const row = translation(id, locale, data); const { error: translationError } = await supabase.from("content_translations").update(row).eq("entry_id", id).eq("locale", locale); if (translationError) throw translationError; }
  revalidatePath(`/admin/content/${id}`); revalidatePath("/admin/content"); revalidatePath("/ar", "layout"); revalidatePath("/en", "layout");
}
