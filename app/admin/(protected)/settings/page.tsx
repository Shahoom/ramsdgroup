import { requirePermission } from "@/lib/auth/session";
export default async function SettingsPage() { await requirePermission("settings:manage"); return <><h1 className="text-3xl font-bold">إعدادات الموقع</h1><div className="mt-8 rounded-2xl border bg-white p-8"><p>الإعدادات العامة والبيانات القانونية محفوظة في جدول site_settings وتخضع لسجل التدقيق.</p></div></>; }
