import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { listEntries } from "@/lib/content/repository";
import { PageIntro } from "@/components/content/PageIntro";
import { EntryCard } from "@/components/content/EntryCard";
import { Container } from "@/components/ui/Container";
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; const ar = locale === "ar"; return buildMetadata({ locale, path: "/insights", title: ar ? "مقالات تحصيل الديون وإدارة المستحقات | رام" : "Debt Recovery Insights | RAM", description: ar ? "مقالات عملية حول تحصيل الديون التجارية والتسويات وإدارة الذمم المدينة." : "Practical insights on commercial debt collection, settlements, and receivables management." }); }
export default async function InsightsPage({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; const items = await listEntries({ type: "article", locale }); return <><PageIntro eyebrow={locale === "ar" ? "مركز المعرفة" : "KNOWLEDGE HUB"} title={locale === "ar" ? "قرارات استرداد مبنية على فهم أفضل" : "Better-informed recovery decisions"} description={locale === "ar" ? "أدلة ومقالات تساعد فرق الإدارة والمالية والقانونية على تجهيز الملفات واختيار المسار المناسب." : "Guides for management, finance, and legal teams to prepare claims and choose an appropriate path."} /><section className="py-20"><Container><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((entry) => <EntryCard key={entry.id} entry={entry} />)}</div></Container></section></>; }
