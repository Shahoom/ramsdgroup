import { FileText, Gauge, Images, Inbox, Settings } from "lucide-react";
import Link from "next/link";

const items = [
  ["/admin", "نظرة عامة", Gauge],
  ["/admin/content", "المحتوى والمقالات", FileText],
  ["/admin/leads", "العملاء المحتملون", Inbox],
  ["/admin/media", "الوسائط", Images],
  ["/admin/settings", "الإعدادات", Settings],
] as const;

export function AdminNav() {
  return <nav aria-label="لوحة التحكم" className="space-y-1">{items.map(([href, label, Icon]) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-mist-100/75 transition hover:bg-white/8 hover:text-white"><Icon className="size-4 text-gold-300" />{label}</Link>)}</nav>;
}
