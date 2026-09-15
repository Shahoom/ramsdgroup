import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { listEntries } from "@/lib/content/repository";
import { PageIntro } from "@/components/content/PageIntro";
import { EntryCard } from "@/components/content/EntryCard";
import { InformationGrid, PageCTA, SplitNarrative } from "@/components/content/PageSections";
import { Container } from "@/components/ui/Container";

const copy = {
  ar: {
    title: "خدمات تحصيل واسترداد متكاملة", description: "من التقييم والتواصل الودي إلى الإحالة القانونية والتحصيل الدولي، نصمم المسار وفق طبيعة كل مطالبة.",
    routeTitle: "ليس كل دين يحتاج المسار نفسه",
    routeText: ["تختلف المطالبة التجارية الواضحة عن نزاع الأداء، ويختلف المدين المحلي عن الملف العابر للحدود. لذلك نبدأ بالتقييم قبل اختيار الوسيلة.", "يمكن أن يجمع التكليف بين أكثر من خدمة: تواصل ودي أولًا، ثم خطة سداد أو إحالة قانونية، مع متابعة ميدانية أو دولية عندما تضيف قيمة."],
    routePoints: ["مسار يبدأ بالمستندات والوقائع", "صلاحيات تفاوض وتصعيد متفق عليها", "تواصل مهني موثق", "تقارير توضح الحالة والخطوة التالية", "حماية السرية والعلاقة التجارية كلما أمكن"],
    outputTitle: "ماذا تحصل عليه خلال التكليف؟", outputDesc: "العمل المنظم لا يقتصر على الاتصال؛ بل ينتج عنه سجل وقرارات قابلة للمتابعة.",
    outputs: [["تقييم أولي", "فهم أساس المطالبة وقابليتها والمسار المحتمل."], ["خطة ملف", "أهداف وقنوات ومواعيد ونقاط تصعيد واضحة."], ["سجل متابعة", "توثيق الردود والوعود والاعتراضات والتطورات."], ["تقرير قرار", "ما تحقق وما تعطل وما يحتاج موافقة العميل."]],
    ctaTitle: "لديك فاتورة أو محفظة متأخرة؟", ctaText: "شارك معلومات عامة عن المطالبة لنحدد المستندات المطلوبة والخطوة الأولى المناسبة. لا ترسل ملفات حساسة عبر النموذج العام.",
  },
  en: {
    title: "Integrated debt recovery services", description: "From assessment and amicable engagement to legal referral and international recovery, each path is shaped around the claim.",
    routeTitle: "Not every debt needs the same route",
    routeText: ["A clear commercial receivable differs from a performance dispute, and a local debtor differs from a cross-border matter. We assess before selecting the method.", "An engagement may combine services: amicable contact first, followed by a plan or legal referral, with field or international support where it adds value."],
    routePoints: ["A route grounded in records and facts", "Agreed negotiation and escalation authority", "Documented professional engagement", "Reports showing status and next action", "Confidentiality and relationship protection where possible"],
    outputTitle: "What does an engagement produce?", outputDesc: "Disciplined recovery is more than contact; it creates a record and decisions that can be managed.",
    outputs: [["Initial assessment", "Understand claim basis, recoverability, and likely route."], ["Matter plan", "Clear objectives, channels, timing, and escalation points."], ["Follow-up record", "Document responses, promises, disputes, and developments."], ["Decision report", "Show progress, blockers, and approvals required from the client."]],
    ctaTitle: "Have one overdue invoice or a wider portfolio?", ctaText: "Share general information so we can identify the records required and an appropriate first step. Do not send sensitive files through the public form.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return buildMetadata({ locale, path: "/services", title: `${copy[locale].title} | RAM`, description: copy[locale].description }); }

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const t = copy[locale]; const items = await listEntries({ type: "service", locale });
  return <><PageIntro eyebrow={locale === "ar" ? "قدرات رام" : "RAM CAPABILITIES"} title={t.title} description={t.description} /><section className="py-20"><Container><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((entry) => <EntryCard key={entry.id} entry={entry} />)}</div></Container></section><SplitNarrative eyebrow={locale === "ar" ? "اختيار المسار" : "CHOOSING THE ROUTE"} title={t.routeTitle} paragraphs={[...t.routeText]} points={[...t.routePoints]} /><InformationGrid eyebrow={locale === "ar" ? "مخرجات واضحة" : "CLEAR DELIVERABLES"} title={t.outputTitle} description={t.outputDesc} items={t.outputs.map(([title, text]) => ({ title, text }))} tone="dark" /><PageCTA title={t.ctaTitle} text={t.ctaText} action={locale === "ar" ? "اطلب تقييمًا أوليًا" : "Request an initial assessment"} secondary={locale === "ar" ? "تعرف على منهجيتنا" : "See our method"} secondaryHref="/how-we-work" /></>;
}
