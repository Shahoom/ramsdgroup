import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/content/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { FAQ } from "@/components/sections/FAQ";
import { InformationGrid, PageCTA } from "@/components/content/PageSections";
import { faqJsonLd } from "@/lib/seo";

const qa = {
  ar: [
    ["ما المعلومات اللازمة للتقييم الأولي؟", "ملخص المطالبة والأطراف والمبلغ والعملة وتاريخ الاستحقاق ونوع المستندات المتاحة، دون إرسال بيانات حساسة عبر النموذج العام."],
    ["هل تبدأون بالإجراء القانوني مباشرة؟", "عادة لا. يبدأ المسار بالتقييم والتواصل والتفاوض، ويُقترح التصعيد عندما يلائم الوقائع وبعد مراجعة مختصة."],
    ["هل تتعاملون مع مطالبات خارج عُمان؟", "نعم، يشمل نطاق العمل مطالبات إقليمية ودولية، ويتحدد المسار بعد مراجعة الدول والأطراف والعقد والمستندات."],
    ["كيف تتم حماية معلومات الملف؟", "تُعامل المعلومات على أساس الحاجة للوصول، وتُستخدم قنوات مناسبة للمستندات الحساسة بعد التواصل الأولي."],
    ["هل يضمن التقييم استرداد المبلغ؟", "لا يمكن ضمان النتيجة. يوضح التقييم قابلية الملف والمسارات والعوامل والمخاطر المعروفة."],
    ["ما أنواع الديون التي تتعاملون معها؟", "تشمل الخدمات الديون التجارية والفواتير والمستحقات التعاقدية والتسويات والمتابعة القانونية والدولية والميدانية."],
    ["هل يمكن التعامل مع ملف واحد؟", "يمكن تقييم ملف واحد أو محفظة، ويعتمد نطاق التكليف على القيمة والمستندات ومكان الأطراف والجدوى."],
    ["هل يمكن الحفاظ على العلاقة التجارية؟", "هذا هدف مهم عندما تكون العلاقة قابلة للاستمرار؛ نستخدم تواصلًا واضحًا ومحترمًا وخيارات تسوية مناسبة دون إضعاف الحق."],
    ["ماذا يحدث عند وجود اعتراض على الفاتورة؟", "نطلب تحديد الاعتراض ومستنده، ونفصل الجزء المختلف عليه عن الرصيد غير المختلف عليه، ثم نرفع المسألة للقرار."],
    ["ما الفرق بين التحصيل والتسوية؟", "التحصيل هو المسار الأوسع لاسترداد المطالبة، بينما التسوية اتفاق محدد على طريقة أو قيمة أو جدول للسداد."],
    ["متى تُستخدم الزيارة الميدانية؟", "عندما تضيف هدفًا مشروعًا مثل التحقق أو التسليم أو الاجتماع، وبعد مراجعة الخصوصية والتكلفة والتناسب."],
    ["من يقدم الاستشارة القانونية؟", "تقدم المشورة والتمثيل والإجراءات القضائية بواسطة محامين مرخصين في الاختصاص المعني."],
    ["كيف تصلني التحديثات؟", "يُتفق على شكل التقرير وتكراره، ويشمل الحالة والرصيد والاعتراضات والخطوة التالية والقرارات المطلوبة."],
    ["هل المعلومات في المقالات استشارة قانونية؟", "لا. المحتوى تثقيف عام، ويجب تقييم كل ملف ومستند واختصاص على حدة."],
  ],
  en: [
    ["What is needed for an initial assessment?", "A claim summary, parties, value, currency, due date, and available record types—without sensitive data through the public form."],
    ["Do you start with legal action?", "Usually not. The route starts with assessment, engagement, and negotiation; escalation is proposed when facts support it and after specialist review."],
    ["Do you handle claims outside Oman?", "Yes. Work can include regional and international matters, with the route determined after reviewing countries, parties, contract, and records."],
    ["How is matter information protected?", "Information is handled on a need-to-know basis, with suitable channels for sensitive records after initial contact."],
    ["Does assessment guarantee recovery?", "No result can be guaranteed. Assessment identifies recoverability, routes, factors, and known risks."],
    ["What debt types do you handle?", "Services cover commercial debts, invoices, contractual receivables, settlements, and legal, international, and field follow-up."],
    ["Can you handle a single matter?", "A single matter or portfolio can be assessed; scope depends on value, records, party location, and viability."],
    ["Can the commercial relationship be preserved?", "Where the relationship is viable, we use clear, respectful engagement and suitable options without weakening the claim."],
    ["What happens when an invoice is disputed?", "We request the specific objection and evidence, isolate the disputed element, and raise the issue for a decision."],
    ["What is the difference between recovery and settlement?", "Recovery is the wider route for pursuing a claim; settlement is a specific agreement on value, method, or payment schedule."],
    ["When is a field visit used?", "When it serves a legitimate objective such as verification, delivery, or meeting, after considering privacy, cost, and proportionality."],
    ["Who provides legal advice?", "Licensed lawyers in the relevant jurisdiction provide legal advice, representation, and court action."],
    ["How do I receive updates?", "Report format and cadence are agreed and can include status, balance, disputes, next action, and required decisions."],
    ["Are your articles legal advice?", "No. Content is general education; every matter, record set, and jurisdiction needs individual assessment."],
  ],
} as const;

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const items = qa[locale].map(([q, a]) => ({ q, a })); const ar = locale === "ar";
  return <><JsonLd data={faqJsonLd(items)} /><PageIntro eyebrow="FAQ" title={ar ? "إجابات واضحة قبل بدء التحصيل" : "Clear answers before recovery begins"} description={ar ? "من التقييم والمستندات إلى التسوية والسرية والتصعيد القانوني." : "From assessment and records to settlement, confidentiality, and legal escalation."} /><section className="py-20"><Container><div className="mb-10 max-w-3xl"><h2 className="text-3xl font-bold">{ar ? "الأسئلة الأكثر تكرارًا" : "Frequently asked questions"}</h2><p className="mt-4 text-lg text-muted">{ar ? "الإجابات عامة؛ القرار المناسب يتطلب مراجعة الملف نفسه." : "Answers are general; the appropriate decision requires review of the actual matter."}</p></div><FAQ items={items} /></Container></section><InformationGrid eyebrow={ar ? "قبل التواصل" : "BEFORE CONTACTING US"} title={ar ? "جهّز أربع معلومات أساسية" : "Prepare four essential facts"} items={(ar ? [["من الأطراف؟", "الاسم القانوني للدائن والمدين وصفة كل طرف."], ["ما الرصيد؟", "المبلغ والعملة والاستحقاق وأي دفعات."], ["ما المستند؟", "العقد والفاتورة والتسليم والمراسلات."], ["ما الهدف؟", "السداد أو التسوية أو التقييم أو الإحالة."]] : [["Who are the parties?", "Legal creditor and debtor names and capacities."], ["What is the balance?", "Value, currency, due date, and payments."], ["What are the records?", "Contract, invoice, delivery, and messages."], ["What is the objective?", "Payment, settlement, assessment, or referral."]]).map(([title, text]) => ({ title, text }))} tone="soft" /><PageCTA title={ar ? "ما زال لديك سؤال عن ملف محدد؟" : "Still have a question about a specific matter?"} text={ar ? "شارك المعلومات العامة فقط وسنوضح ما يلزم للتقييم." : "Share general information only and we will explain what is needed for assessment."} action={ar ? "تواصل معنا" : "Contact us"} /></>;
}
