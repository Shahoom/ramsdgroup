import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/content/PageIntro";
import { InformationGrid, PageCTA, SplitNarrative } from "@/components/content/PageSections";

const copy = {
  ar: {
    title: "خبرة موثقة من دون كشف معلومات العملاء", description: "لن ننشر أرقامًا أو نتائج أو أسماء إلا بعد التحقق والموافقة. وحتى ذلك الوقت نعرض أنواع المهام التي يدعمها فريق رام دون نسبها لعميل محدد.",
    scenariosTitle: "ثلاثة أنماط تكليف شائعة", scenarios: [["محفظة فواتير تجارية", "تقسيم عدة مدينين، ترتيب الأولويات، توحيد المتابعة، ورفع النزاعات والعروض للقرار."], ["مطالبة عابرة للحدود", "مراجعة الأطراف والعقد والاختصاص والعملة، ثم تنسيق التواصل أو الإحالة المحلية."], ["أرصدة عقارية متأخرة", "تسوية الإيجارات والرسوم والدفعات والتأمين قبل التواصل وخيارات السداد."]],
    standardsTitle: "ما الذي يجعل دراسة الحالة قابلة للنشر؟", standards: ["موافقة العميل على النشر", "إخفاء الهوية والبيانات الحساسة", "التحقق من كل تاريخ ورقم ونتيجة", "شرح السياق دون تضليل أو تعميم", "توضيح أن النتائج السابقة لا تضمن نتائج مستقبلية"],
    evidenceTitle: "بنية دراسة الحالة المعتمدة", evidence: [["الوضع الأولي", "نوع المطالبة والسياق والعائق دون كشف هوية."], ["المسار", "ما الذي تم تقييمه وكيف اتخذت نقاط القرار."], ["النتيجة الموثقة", "ما يمكن إثباته فقط وبالموافقة اللازمة."], ["الدروس", "ما الذي يمكن تطبيقه دون الادعاء أن كل ملف مماثل."]],
  },
  en: {
    title: "Documented experience without exposing client information", description: "We will not publish figures, outcomes, or names without verification and approval. Until then, we explain engagement types without presenting them as named client cases.",
    scenariosTitle: "Three common engagement patterns", scenarios: [["Commercial invoice portfolio", "Segment several debtors, prioritize, standardize follow-up, and raise disputes and offers for decisions."], ["Cross-border commercial claim", "Review parties, contract, jurisdiction, and currency, then coordinate engagement or local referral."], ["Overdue property balances", "Reconcile rent, charges, payments, and deposit before engagement and payment options."]],
    standardsTitle: "What makes a case study publishable?", standards: ["Client approval for publication", "Identity and sensitive-data anonymization", "Verification of every date, figure, and outcome", "Enough context to avoid misleading generalization", "A clear statement that prior outcomes do not guarantee future results"],
    evidenceTitle: "The approved case-study structure", evidence: [["Starting position", "Claim type, context, and blocker without exposing identity."], ["Route", "What was assessed and how decision points were handled."], ["Verified outcome", "Only what can be substantiated and approved."], ["Lessons", "What may be applied without claiming every matter is alike."]],
  },
} as const;

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const t = copy[locale]; const ar = locale === "ar";
  return <><PageIntro eyebrow={ar ? "دراسات الحالة" : "CASE STUDIES"} title={t.title} description={t.description} /><InformationGrid eyebrow={ar ? "سيناريوهات، لا شهادات مختلقة" : "SCENARIOS, NOT FABRICATED CLAIMS"} title={t.scenariosTitle} items={t.scenarios.map(([title, text]) => ({ title, text }))} /><SplitNarrative eyebrow={ar ? "معيار التحقق" : "VERIFICATION STANDARD"} title={t.standardsTitle} paragraphs={[ar ? "يحمي هذا النهج العميل والقارئ وسمعة رام. القيمة تأتي من الوقائع القابلة للإثبات، لا من أرقام تسويقية بلا مصدر." : "This approach protects the client, reader, and RAM's reputation. Value comes from facts that can be substantiated, not unsupported marketing figures."]} points={[...t.standards]} /><InformationGrid eyebrow={ar ? "قالب النشر" : "PUBLICATION FORMAT"} title={t.evidenceTitle} items={t.evidence.map(([title, text]) => ({ title, text }))} tone="soft" /><PageCTA title={ar ? "لديك حالة تريد تقييمها؟" : "Have a matter you want assessed?"} text={ar ? "لن ننشر معلوماتها. ابدأ بملخص عام وسنوضح قناة مشاركة المستندات والخطوة المناسبة." : "We will not publish its information. Start with a general summary and we will explain the document channel and suitable next step."} action={ar ? "اطلب تقييمًا سريًا" : "Request a confidential assessment"} /></>;
}
