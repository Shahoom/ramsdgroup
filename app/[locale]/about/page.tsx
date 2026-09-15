import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/content/PageIntro";
import { InformationGrid, PageCTA, SplitNarrative } from "@/components/content/PageSections";

const copy = {
  ar: {
    title: "خبرة إقليمية، حضور محلي، ومنهج واضح", description: "تأسس قسم تحصيل الديون في رام بسلطنة عُمان عام 2018، مستندًا إلى خبرة في المجال منذ 2012 عبر الخليج وتركيا.",
    storyTitle: "من خبرة التحصيل إلى شريك للاسترداد المنظم", story: ["تقدم رام للتنمية المستدامة حلول تحصيل أخلاقية وفعالة وسليمة من الناحية الإجرائية، مصممة بحسب طبيعة الدين وظروف المدين والسياق التجاري للعميل.", "من مقرنا في مسقط نخدم البنوك والمؤسسات المالية والشركات الصغيرة والمتوسطة والمجموعات الكبرى والمكاتب المهنية والعقار والرعاية الصحية والمستثمرين الدوليين."],
    facts: ["خبرة في التحصيل منذ 2012", "تأسيس قسم تحصيل الديون في عُمان عام 2018", "فريق متعدد اللغات", "عمل محلي وإقليمي ودولي", "استراتيجيات مخصصة لكل ملف"],
    purposeTitle: "لماذا توجد رام؟", purposeDesc: "نؤمن أن استعادة الحقوق المالية خطوة أساسية لحماية التدفق النقدي واستدامة الأعمال.",
    purpose: [["رسالتنا", "حل النزاعات بكفاءة وحماية المصالح المالية والعلاقات التجارية كلما كان ذلك ممكنًا."], ["رؤيتنا", "أن يكون التحصيل خدمة مهنية منظمة تدعم الثقة والاستدامة، لا مجرد ضغط لاسترداد مبلغ."], ["نهجنا", "نفهم الملف أولًا، ثم نختار التواصل والتفاوض والتصعيد المتناسب مع الوقائع."], ["مسؤوليتنا", "تواصل محترم، سرية، شفافية في التقارير، وعدم تقديم وعود غير قابلة للضمان."]],
    edgeTitle: "شريك استراتيجي، لا مجرد جهة متابعة", edge: [["استراتيجية خاصة بالملف", "تختلف الخطة بحسب الدين والمدين وأهداف العميل."], ["معرفة محلية وامتداد إقليمي", "تنسيق من مسقط مع قدرة على متابعة ملفات عبر الحدود."], ["فريق متعدد اللغات", "تواصل يقلل الالتباس ويدعم الأطراف الدولية."], ["تقارير منظمة", "حالة وخطوة تالية وقرارات مطلوبة بدل رسائل متفرقة."]],
  },
  en: {
    title: "Regional experience, local presence, and a clear method", description: "RAM's debt collection department was established in Oman in 2018, building on recovery experience since 2012 across the Gulf and Türkiye.",
    storyTitle: "From recovery experience to a structured resolution partner", story: ["RAM Sustainable Development provides ethical, effective, and procedurally sound recovery solutions shaped around the debt, debtor circumstances, and each client's commercial context.", "From Muscat, we serve banks, financial institutions, SMEs, corporate groups, professional firms, real estate, healthcare, and international investors."],
    facts: ["Recovery experience since 2012", "Debt collection department established in Oman in 2018", "Multilingual team", "Local, regional, and international scope", "Case-specific strategies"],
    purposeTitle: "Why does RAM exist?", purposeDesc: "We believe restoring financial rights is an essential step in protecting cash flow and sustainable business growth.",
    purpose: [["Our mission", "Resolve disputes efficiently and protect financial interests and viable commercial relationships."], ["Our vision", "Treat recovery as a structured professional service supporting trust and sustainability, not pressure alone."], ["Our approach", "Understand the matter first, then select engagement, negotiation, and escalation proportionate to the facts."], ["Our responsibility", "Respectful communication, confidentiality, transparent reporting, and no unsupported promises."]],
    edgeTitle: "A strategic partner, not merely a follow-up provider", edge: [["Matter-specific strategy", "The plan changes with the debt, debtor, and client objective."], ["Local knowledge, regional reach", "Muscat coordination with the ability to support cross-border matters."], ["Multilingual team", "Communication that reduces ambiguity for international parties."], ["Structured reporting", "Status, next action, and decisions required instead of fragmented messages."]],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { const { locale } = await params; return buildMetadata({ locale, path: "/about", title: locale === "ar" ? "عن رام للتنمية المستدامة" : "About RAM Sustainable Development", description: copy[locale].description }); }

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const t = copy[locale]; const ar = locale === "ar";
  return <><PageIntro eyebrow={ar ? "عن رام" : "ABOUT RAM"} title={t.title} description={t.description} /><SplitNarrative eyebrow={ar ? "قصتنا" : "OUR STORY"} title={t.storyTitle} paragraphs={[...t.story]} points={[...t.facts]} /><InformationGrid eyebrow={ar ? "الرؤية والرسالة" : "VISION & MISSION"} title={t.purposeTitle} description={t.purposeDesc} items={t.purpose.map(([title, text]) => ({ title, text }))} tone="dark" /><InformationGrid eyebrow={ar ? "ميزتنا" : "OUR EDGE"} title={t.edgeTitle} items={t.edge.map(([title, text]) => ({ title, text }))} /><PageCTA title={ar ? "دعنا نفهم ملفك قبل أن نقترح الحل" : "Let us understand the matter before proposing the route"} text={ar ? "ابدأ بمعلومات عامة عن الأطراف والمبلغ والمستندات المتاحة، وسنوضح ما يلزم للتقييم." : "Start with general information about parties, value, and available records, and we will explain what is needed for assessment."} action={ar ? "تواصل مع فريق رام" : "Contact the RAM team"} secondary={ar ? "استكشف خدماتنا" : "Explore our services"} secondaryHref="/services" /></>;
}
