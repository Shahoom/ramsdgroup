import { ShieldCheck } from "lucide-react";

import { signInAction } from "@/app/admin/actions";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const configured = isSupabaseConfigured();
  return (
    <main className="mesh-navy grid min-h-dvh place-items-center px-5 py-12 text-mist-50" dir="rtl">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/8 p-7 shadow-float backdrop-blur-xl sm:p-10">
        <ShieldCheck className="size-11 text-gold-300" />
        <p className="mt-6 text-sm font-semibold text-gold-300">RAM CONTROL CENTER</p>
        <h1 className="mt-2 text-3xl font-bold">تسجيل دخول فريق الإدارة</h1>
        <p className="mt-3 text-sm text-mist-200/70">وصول محمي لإدارة المحتوى والمقالات والعملاء المحتملين.</p>
        {!configured && <p className="mt-5 rounded-xl bg-amber-300/10 p-3 text-sm text-amber-200">يلزم ربط متغيرات Supabase قبل تسجيل الدخول.</p>}
        {error && <p role="alert" className="mt-5 rounded-xl bg-red-400/10 p-3 text-sm text-red-200">بيانات الدخول غير صحيحة.</p>}
        <form action={signInAction} className="mt-7 space-y-5">
          <label className="block text-sm">البريد الإلكتروني<input required type="email" name="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-left" dir="ltr" /></label>
          <label className="block text-sm">كلمة المرور<input required type="password" name="password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-left" dir="ltr" /></label>
          <button disabled={!configured} className="w-full rounded-xl bg-gold-400 px-5 py-3 font-bold text-navy-950 disabled:opacity-40">دخول آمن</button>
        </form>
      </section>
    </main>
  );
}
