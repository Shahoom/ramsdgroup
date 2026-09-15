import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { listEntries } from "@/lib/content/repository";
import { PageIntro } from "@/components/content/PageIntro";
import { EntryCard } from "@/components/content/EntryCard";
import { Container } from "@/components/ui/Container";

const c = { ar: ["خبرة تحصيل تراعي طبيعة قطاعك", "لكل قطاع مستنداته ودورة قراره ومخاطره. نكيف التواصل والمتابعة والتقارير مع هذا السياق."], en: ["Recovery expertise shaped around your sector", "Every sector has distinct documents, decision cycles, and risks. We adapt engagement and reporting to that context."] } as const;
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return buildMetadata({ locale, path: "/industries", title: `${c[locale][0]} | RAM`, description: c[locale][1] }); }
export default async function IndustriesPage({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; const items = await listEntries({ type: "industry", locale }); return <><PageIntro eyebrow={locale === "ar" ? "القطاعات" : "INDUSTRIES"} title={c[locale][0]} description={c[locale][1]} /><section className="py-20"><Container><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((entry) => <EntryCard key={entry.id} entry={entry} />)}</div></Container></section></>; }
