import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/content/PageIntro";
import { LegalArticle } from "@/components/content/LegalArticle";

export default async function Disclaimer({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const ar = locale === "ar";
  const sections = ar ? [
    { title: "معلومات عامة", paragraphs: ["المحتوى المنشور للتعريف والتثقيف العام ولا يمثل استشارة قانونية أو مالية أو محاسبية أو وعدًا بخدمة محددة."] },
    { title: "لا ضمان للنتيجة", paragraphs: ["لا تضمن رام تحصيل مبلغ أو نتيجة أو مدة. تختلف القابلية والمسار بحسب المستندات وعمر المطالبة والملاءة والاستجابة والاختصاص والتكلفة."] },
    { title: "الإجراءات القانونية", paragraphs: ["أي رأي قانوني أو تمثيل قضائي أو إجراء رسمي يقدمه أو ينفذه مختص مرخص في الاختصاص المعني بعد مراجعة الوقائع."] },
    { title: "المحتوى الدولي", paragraphs: ["المعلومات العابرة للحدود لا تفترض أن عقدًا أو حكمًا نافذ تلقائيًا في دولة أخرى. يجب مراجعة القانون والمتطلبات المحلية."] },
    { title: "الأمثلة ودراسات الحالة", paragraphs: ["لا تُنشر نتائج أو أرقام أو هويات عملاء دون تحقق وموافقة. السيناريوهات التعليمية ليست ملفات عملاء أو توقعًا لنتيجة مستقبلية."] },
    { title: "الدقة والتحديث", paragraphs: ["نبذل جهدًا معقولًا لتحديث المعلومات، لكن قد تتغير القوانين والإجراءات والظروف. تحقق من المعلومة قبل اتخاذ قرار يعتمد عليها."] },
    { title: "الروابط الخارجية", paragraphs: ["تُوفر الروابط الخارجية للتسهيل، ولا تعني اعتماد محتوى أو سياسات أو توفر خدمات الطرف الثالث."] },
  ] : [
    { title: "General information", paragraphs: ["Published content is for company information and general education. It is not legal, financial, or accounting advice or a promise of a specific service."] },
    { title: "No outcome guarantee", paragraphs: ["RAM does not guarantee recovery amount, result, or timing. Recoverability and route vary with records, claim age, solvency, response, jurisdiction, and cost."] },
    { title: "Legal procedures", paragraphs: ["Any legal opinion, representation, or formal action is provided or performed by a licensed specialist in the relevant jurisdiction after reviewing facts."] },
    { title: "International content", paragraphs: ["Cross-border information does not assume a contract or judgment is automatically enforceable elsewhere. Local law and requirements need review."] },
    { title: "Examples and case studies", paragraphs: ["Results, figures, or client identity are not published without verification and approval. Educational scenarios are not client matters or predictions of future outcomes."] },
    { title: "Accuracy and updates", paragraphs: ["We make reasonable efforts to update information, but laws, procedures, and circumstances may change. Verify information before relying on it for a decision."] },
    { title: "External links", paragraphs: ["External links are provided for convenience and do not imply endorsement of third-party content, policies, or availability."] },
  ];
  return <><PageIntro eyebrow={ar ? "تنبيه مهني" : "PROFESSIONAL NOTICE"} title={ar ? "إخلاء المسؤولية" : "Disclaimer"} description={ar ? "حدود المعلومات المنشورة وما يجب تقييمه قبل اتخاذ قرار." : "Limits of published information and what requires assessment before a decision."} /><LegalArticle updated={ar ? "آخر تحديث: 15 سبتمبر 2026" : "Last updated: 15 September 2026"} sections={sections} /></>;
}
