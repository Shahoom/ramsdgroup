import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { listEntries } from "@/lib/content/repository";
import { PageIntro } from "@/components/content/PageIntro";
import { EntryCard } from "@/components/content/EntryCard";
import { Container } from "@/components/ui/Container";

const c = { ar: ["خدمات تحصيل واسترداد متكاملة", "من التقييم والتواصل الودي إلى الإحالة القانونية والتحصيل الدولي، نصمم المسار وفق طبيعة كل مطالبة."], en: ["Integrated debt recovery services", "From assessment and amicable engagement to legal referral and international recovery, each path is shaped around the claim."] } as const;
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return buildMetadata({ locale, path: "/services", title: `${c[locale][0]} | RAM`, description: c[locale][1] }); }
export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; const items = await listEntries({ type: "service", locale }); return <><PageIntro eyebrow={locale === "ar" ? "قدرات رام" : "RAM CAPABILITIES"} title={c[locale][0]} description={c[locale][1]} /><section className="py-20"><Container><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((entry) => <EntryCard key={entry.id} entry={entry} />)}</div></Container></section></>; }
