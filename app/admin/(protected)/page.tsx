import { FileText, Inbox, TrendingUp, Users } from "lucide-react";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AdminDashboard() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const [{ count: leads }, { count: newLeads }, { count: content }, { count: published }] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("content_entries").select("id", { count: "exact", head: true }),
    supabase.from("content_entries").select("id", { count: "exact", head: true }).eq("status", "published"),
  ]);
  const cards = [["كل العملاء", leads ?? 0, Users], ["عملاء جدد", newLeads ?? 0, Inbox], ["كل المحتوى", content ?? 0, FileText], ["منشور", published ?? 0, TrendingUp]] as const;
  return <><h1 className="text-3xl font-bold">نظرة عامة</h1><p className="mt-2 text-slate-500">الموقع والمحتوى والعملاء المحتملون في مكان واحد.</p><div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, Icon]) => <article key={label} className="rounded-2xl border bg-white p-6 shadow-sm"><Icon className="size-6 text-gold-600" /><p className="mt-5 text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p></article>)}</div></>;
}
