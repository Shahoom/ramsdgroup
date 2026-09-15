import { notFound } from "next/navigation";
import { updateEntryAction } from "@/app/admin/(protected)/content/actions";
import { EntryEditor } from "@/components/admin/EntryEditor";
import { requirePermission } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) { await requirePermission("content:read"); const { id } = await params; const supabase = await createSupabaseServerClient(); const [{ data: entry }, { data: translations }] = await Promise.all([supabase.from("content_entries").select("id, type, status").eq("id", id).maybeSingle(), supabase.from("content_translations").select("locale, slug, title, excerpt, body, seo_title, seo_description").eq("entry_id", id)]); if (!entry) notFound(); const localized = Object.fromEntries((translations ?? []).map((tr) => [tr.locale, tr])); return <><h1 className="text-3xl font-bold">تحرير المحتوى</h1><EntryEditor action={updateEntryAction} entry={{ ...entry, translations: localized }} /></>; }
