import type { EntryType, LocalizedEntry, Locale } from "@/lib/content/schema";

type Pair = { slug: string; ar: [string, string]; en: [string, string] };
const publishedAt = "2026-09-15T00:00:00.000Z";

const services: Pair[] = [
  { slug: "commercial-debt-collection", ar: ["تحصيل الديون التجارية", "إدارة احترافية للمستحقات التجارية المتأخرة مع الحفاظ على العلاقة التجارية كلما أمكن."], en: ["Commercial debt collection", "Professional recovery of overdue commercial receivables while preserving viable business relationships."] },
  { slug: "amicable-settlements", ar: ["التسويات الودية", "تفاوض منظم للوصول إلى حلول قابلة للتنفيذ قبل التصعيد القانوني."], en: ["Amicable settlements", "Structured negotiation designed to reach workable resolutions before legal escalation."] },
  { slug: "legal-debt-recovery", ar: ["التحصيل القانوني", "تنسيق مسار المطالبة القانونية والتنفيذ عبر مختصين مرخصين عند تعذر الحل الودي."], en: ["Legal debt recovery", "Coordinated legal recovery and enforcement through licensed specialists when amicable routes are exhausted."] },
  { slug: "international-collections", ar: ["التحصيل الدولي", "متابعة المطالبات العابرة للحدود عبر شبكة عمل إقليمية ودولية منظمة."], en: ["International collections", "Cross-border claim follow-up through a structured regional and international working network."] },
  { slug: "field-collection", ar: ["التحصيل الميداني", "زيارات واتصالات ميدانية مدروسة لدعم التحقق والتواصل وتسريع التسوية."], en: ["Field collection", "Planned field engagement supporting verification, communication, and faster resolution."] },
  { slug: "recovery-advisory", ar: ["استشارات استرداد المستحقات", "مراجعة سياسات الائتمان والتحصيل وبناء إجراءات تقلل التعثر وتحسن القرار."], en: ["Corporate recovery advisory", "Reviewing credit and collection policies to reduce delinquency and improve recovery decisions."] },
];

const industries: Pair[] = [
  { slug: "banks-financial-institutions", ar: ["البنوك والمؤسسات المالية", "إدارة ملفات تتطلب توثيقًا دقيقًا ومسارات تصعيد محكومة."], en: ["Banks & financial institutions", "Recovery work requiring precise documentation and controlled escalation paths."] },
  { slug: "smes", ar: ["الشركات الصغيرة والمتوسطة", "حلول عملية لحماية التدفق النقدي دون استنزاف فرق العمل الداخلية."], en: ["Small & medium enterprises", "Practical recovery support that protects cash flow without draining internal teams."] },
  { slug: "corporate-groups", ar: ["المجموعات والشركات الكبرى", "إدارة محافظ متعددة الأطراف مع تقارير واضحة وأولويات قابلة للقياس."], en: ["Corporate groups", "Multi-party portfolio handling with clear reporting and actionable prioritization."] },
  { slug: "law-firms-consultants", ar: ["مكاتب المحاماة والاستشارات", "دعم تحصيلي وتشغيلي يكمل العمل القانوني والاستشاري."], en: ["Law firms & consultants", "Operational recovery support that complements legal and advisory work."] },
  { slug: "real-estate", ar: ["العقارات وإدارة الأملاك", "متابعة الإيجارات والرسوم والالتزامات المتأخرة ضمن سجل تواصل واضح."], en: ["Real estate & property management", "Follow-up of overdue rent, fees, and obligations with a clear communication record."] },
  { slug: "healthcare", ar: ["الرعاية الصحية", "تحصيل حساس يراعي خصوصية البيانات وطبيعة العلاقة مع الأطراف."], en: ["Healthcare", "Sensitive recovery that respects data privacy and the nature of stakeholder relationships."] },
  { slug: "international-investors", ar: ["المستثمرون والكيانات الدولية", "نقطة تنسيق محلية للمطالبات التجارية المرتبطة بسلطنة عُمان والمنطقة."], en: ["International investors & entities", "A local coordination point for commercial claims connected to Oman and the region."] },
];

const articles: Pair[] = [
  { slug: "amicable-vs-legal-recovery", ar: ["متى نختار التسوية الودية ومتى ننتقل للتحصيل القانوني؟", "إطار قرار عملي يوازن بين سرعة الاسترداد وقوة الملف واستمرارية العلاقة التجارية."], en: ["Amicable or legal recovery: when to use each path", "A practical decision framework balancing recovery speed, claim strength, and the commercial relationship."] },
  { slug: "prepare-debt-file", ar: ["كيف تجهّز ملف مطالبة قابلًا للتحصيل؟", "قائمة عملية للمستندات والسجلات التي تساعد على تقييم المطالبة والتحرك بكفاءة."], en: ["How to prepare a recoverable claim file", "A practical checklist of documents and records that enable sound assessment and efficient action."] },
  { slug: "receivables-warning-signs", ar: ["إشارات مبكرة لتعثّر الذمم المدينة", "علامات تشغيلية ومالية تساعد فرق الإدارة على التدخل قبل أن تتحول الفاتورة إلى نزاع."], en: ["Early warning signs in accounts receivable", "Operational and financial signals that help teams act before an invoice becomes a dispute."] },
];

function expand(type: EntryType, pairs: Pair[]): LocalizedEntry[] {
  return pairs.flatMap((pair, index) => (["ar", "en"] as Locale[]).map((locale) => {
    const [title, excerpt] = pair[locale];
    const service = type === "service";
    const industry = type === "industry";
    return {
      id: `${type}-${index + 1}-${locale}`,
      type,
      locale,
      slug: pair.slug,
      title,
      excerpt,
      eyebrow: service ? (locale === "ar" ? "خدمة متخصصة" : "Specialist service") : industry ? (locale === "ar" ? "خبرة قطاعية" : "Sector expertise") : (locale === "ar" ? "من مركز المعرفة" : "From the knowledge hub"),
      publishedAt,
      updatedAt: publishedAt,
      author: type === "article" ? (locale === "ar" ? "فريق رام الاستشاري" : "RAM Advisory Team") : undefined,
      category: type === "article" ? "debt-recovery" : undefined,
      blocks: [
        { type: "rich_text" as const, heading: locale === "ar" ? "نظرة عامة" : "Overview", paragraphs: [excerpt, locale === "ar" ? "نبدأ بفهم المستندات والأطراف والأهداف التجارية، ثم نحدد مسارًا مناسبًا ومدروسًا لكل ملف." : "We begin by understanding the documents, parties, and commercial objectives, then define a deliberate path for each matter."] },
        ...(service ? [{ type: "steps" as const, heading: locale === "ar" ? "كيف نتعامل مع المهمة" : "How we handle the engagement", items: locale === "ar" ? [{ title: "التقييم", text: "مراجعة المستندات وقابلية المطالبة للتحصيل." }, { title: "التواصل", text: "تواصل مهني موثق مع الطرف المدين." }, { title: "التسوية أو التصعيد", text: "اتفاق قابل للتنفيذ أو إحالة مدروسة للمسار القانوني." }] : [{ title: "Assessment", text: "Reviewing documentation and recoverability." }, { title: "Engagement", text: "Professional, documented debtor communication." }, { title: "Resolution or escalation", text: "A workable settlement or considered legal referral." }] }] : []),
        { type: "callout" as const, heading: locale === "ar" ? "السرية أولًا" : "Confidentiality first", text: locale === "ar" ? "نتعامل مع معلومات المطالبات وفق مبدأ الحد الأدنى اللازم من الوصول والتوثيق." : "Claim information is handled on a need-to-know and documented basis." },
      ],
    };
  }));
}

export const seedEntries: LocalizedEntry[] = [...expand("service", services), ...expand("industry", industries), ...expand("article", articles)];
