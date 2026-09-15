import Link from "next/link";
import { signOutAction } from "@/app/admin/actions";
import type { StaffRole } from "@/lib/auth/permissions";
import { AdminNav } from "@/components/admin/AdminNav";

export function AdminShell({ children, user }: { children: React.ReactNode; user: { displayName: string; role: StaffRole } }) {
  return <div className="min-h-dvh bg-[#f4f6fa] text-ink" dir="rtl"><aside className="fixed inset-y-0 right-0 hidden w-72 flex-col bg-navy-950 p-6 text-white lg:flex"><Link href="/admin" className="text-xl font-bold">RAM <span className="text-gold-300">CONTROL</span></Link><div className="mt-10 flex-1"><AdminNav /></div><div className="border-t border-white/10 pt-5 text-sm"><p className="font-semibold">{user.displayName}</p><p className="text-mist-300">{user.role}</p><form action={signOutAction}><button className="mt-4 text-red-200 hover:text-red-100">تسجيل الخروج</button></form></div></aside><div className="lg:mr-72"><header className="flex items-center justify-between border-b bg-white px-5 py-4 lg:px-10"><div><p className="text-xs font-bold text-gold-700">RAM CONTROL CENTER</p><p className="font-semibold">لوحة إدارة الموقع</p></div><Link href="/ar" className="rounded-full border px-4 py-2 text-sm">عرض الموقع</Link></header><div className="border-b bg-navy-950 p-3 text-white lg:hidden"><AdminNav /></div><main className="p-5 lg:p-10">{children}</main></div></div>;
}
