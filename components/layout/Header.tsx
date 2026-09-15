"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Menu, MessageSquareText, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Container } from "@/components/ui/Container";

const labels = {
  ar: { home: "الرئيسية", services: "الخدمات", industries: "القطاعات", howWeWork: "منهجية العمل", insights: "المعرفة", about: "عن رام", contact: "تواصل معنا", menu: "فتح القائمة", close: "إغلاق القائمة", cta: "اطلب تقييمًا" },
  en: { home: "Home", services: "Services", industries: "Industries", howWeWork: "How we work", insights: "Insights", about: "About", contact: "Contact", menu: "Open menu", close: "Close menu", cta: "Request assessment" },
} as const;

export function Header() {
  const locale = useLocale() === "en" ? "en" : "ar"; const t = labels[locale]; const pathname = usePathname(); const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/90 text-white backdrop-blur-xl"><Container className="flex h-20 items-center justify-between gap-4"><Link href="/" aria-label="RAM Sustainable Development" className="shrink-0"><Image src="/brand/logo-footer.png" width={210} height={62} alt="RAM Sustainable Development" priority className="h-12 w-auto object-contain brightness-0 invert" /></Link><nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">{NAV_ITEMS.map((item) => <Link key={item.key} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={cn("rounded-full px-3.5 py-2 text-sm text-mist-100/75 transition hover:bg-white/8 hover:text-white", pathname === item.href && "bg-white/8 text-gold-300")}>{t[item.key]}</Link>)}</nav><div className="hidden items-center gap-3 xl:flex"><LanguageSwitcher /><Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-navy-950"><MessageSquareText className="size-4" />{t.cta}</Link></div><button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? t.close : t.menu} className="grid size-11 place-items-center xl:hidden">{open ? <X /> : <Menu />}</button></Container>{open && <div className="border-t border-white/10 bg-navy-950 px-5 pb-7 xl:hidden"><nav className="mx-auto max-w-7xl py-3">{NAV_ITEMS.map((item) => <Link key={item.key} href={item.href} onClick={() => setOpen(false)} className="block border-b border-white/8 py-3.5 text-lg">{t[item.key]}</Link>)}</nav><div className="mx-auto mt-4 flex max-w-7xl items-center justify-between"><LanguageSwitcher /><Link href="/contact" onClick={() => setOpen(false)} className="rounded-full bg-gold-400 px-5 py-2.5 font-bold text-navy-950">{t.cta}</Link></div></div>}</header>;
}
