import Link from "next/link";

import { requirePermission } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requirePermission("leads:read");
  const { status } = await searchParams;
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("leads").select("id, full_name, company, email, phone, service_interest, status, locale, created_at").order("created_at", { ascending: false }).limit(100);
  if (["new", "contacted", "qualified", "closed", "spam"].includes(status ?? "")) query = query.eq("status", status as "new" | "contacted" | "qualified" | "closed" | "spam");
  const { data: leads } = await query;
  return <><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold">العملاء المحتملون</h1><p className="mt-2 text-slate-500">طلبات الموقع محفوظة ومرتبة من الأحدث.</p></div><Link href="/admin/leads/export" className="rounded-xl bg-navy-800 px-5 py-2.5 text-sm font-bold text-white">تصدير CSV</Link></div><div className="mt-6 flex flex-wrap gap-2">{["all", "new", "contacted", "qualified", "closed", "spam"].map((item) => <Link key={item} href={item === "all" ? "/admin/leads" : `/admin/leads?status=${item}`} className="rounded-full border bg-white px-4 py-2 text-sm">{item}</Link>)}</div><div className="mt-6 overflow-x-auto rounded-2xl border bg-white"><table className="w-full min-w-[800px] text-right text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-4">الاسم</th><th>التواصل</th><th>الاهتمام</th><th>الحالة</th><th>التاريخ</th></tr></thead><tbody>{leads?.map((lead) => <tr key={lead.id} className="border-t"><td className="p-4"><Link href={`/admin/leads/${lead.id}`} className="font-bold hover:text-gold-700">{lead.full_name}</Link><p className="text-slate-500">{lead.company}</p></td><td dir="ltr" className="text-right">{lead.email || lead.phone}</td><td>{lead.service_interest || "—"}</td><td><span className="rounded-full bg-slate-100 px-3 py-1">{lead.status}</span></td><td>{new Intl.DateTimeFormat("ar-OM", { dateStyle: "medium" }).format(new Date(lead.created_at))}</td></tr>)}</tbody></table>{!leads?.length && <p className="p-8 text-center text-slate-500">لا توجد طلبات مطابقة.</p>}</div></>;
}
