import { createSupabasePublicClient } from "@/lib/supabase/public";
import { localizedEntrySchema, type EntryType, type LocalizedEntry, type Locale } from "@/lib/content/schema";

export async function listPublishedEntries(type: EntryType | undefined, locale: Locale): Promise<LocalizedEntry[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];
  let entryQuery = supabase.from("content_entries").select("id, type, published_at, updated_at").eq("status", "published").order("published_at", { ascending: false });
  if (type) entryQuery = entryQuery.eq("type", type);
  const { data: entries, error } = await entryQuery;
  if (error || !entries?.length) return [];
  const { data: translations, error: translationError } = await supabase.from("content_translations").select("entry_id, locale, slug, title, excerpt, body").eq("locale", locale).in("entry_id", entries.map((entry) => entry.id));
  if (translationError || !translations) return [];
  const translationsByEntry = new Map(translations.map((translation) => [translation.entry_id, translation]));
  return entries.flatMap((entry) => {
    const translation = translationsByEntry.get(entry.id); if (!translation) return [];
    const parsed = localizedEntrySchema.safeParse({ id: entry.id, type: entry.type, locale, slug: translation.slug, title: translation.title, excerpt: translation.excerpt, publishedAt: entry.published_at, updatedAt: entry.updated_at, blocks: translation.body, eyebrow: undefined });
    return parsed.success ? [parsed.data] : [];
  });
}
