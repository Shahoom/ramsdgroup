import { requirePermission } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function cell(value: unknown) { const safe = String(value ?? "").replaceAll('"', '""'); const neutral = /^[=+\-@]/.test(safe) ? `'${safe}` : safe; return `"${neutral}"`; }

export async function GET() {
  await requirePermission("leads:export"); const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("leads").select("id, full_name, company, email, phone, service_interest, preferred_contact, status, source, medium, campaign, created_at").order("created_at", { ascending: false });
  const headers = ["id", "full_name", "company", "email", "phone", "service_interest", "preferred_contact", "status", "source", "medium", "campaign", "created_at"] as const;
  const csv = [headers.join(","), ...(data ?? []).map((lead) => headers.map((key) => cell(lead[key])).join(","))].join("\r\n");
  return new Response(`\uFEFF${csv}`, { headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="ram-leads-${new Date().toISOString().slice(0, 10)}.csv"`, "cache-control": "no-store" } });
}
