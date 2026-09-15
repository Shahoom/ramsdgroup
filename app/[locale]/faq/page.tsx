import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/content/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { faqJsonLd } from "@/lib/seo";

const qa = {
  ar: [["ما المعلومات اللازمة لبدء التقييم؟", "ملخص عن المطالبة، الأطراف، المبلغ التقريبي، تاريخ الاستحقاق، ونوع المستندات المتاحة دون إرسال بيانات حساسة عبر النموذج العام."], ["هل تبدأون بالإجراء القانوني مباشرة؟", "لا. يبدأ المسار عادة بالتقييم والتواصل والتفاوض، ويُقترح التصعيد القانوني عندما يلائم طبيعة الملف."], ["هل تتعاملون مع مطالبات خارج عُمان؟", "نعم، يشمل نطاق الخبرة والعمل مطالبات إقليمية ودولية ويُحدد المسار بعد مراجعة الدولة والأطراف والمستندات."], ["كيف تتم حماية معلومات الملف؟", "تُعامل المعلومات على أساس الحاجة للوصول، وتُستخدم قنوات مخصصة للمستندات الحساسة بعد التواصل الأولي."], ["هل يضمن التقييم استرداد المبلغ؟", "لا يمكن ضمان نتيجة التحصيل. يوضح التقييم الأولي قابلية الملف والمسارات المتاحة والمخاطر المعروفة."]],
  en: [["What is needed for an initial assessment?", "A claim summary, parties, approximate value, due date, and available document types—without sending sensitive data through the public form."], ["Do you start with legal action?", "No. The usual path begins with assessment, engagement, and negotiation. Legal escalation is proposed only when appropriate."], ["Do you handle claims outside Oman?", "Yes. RAM's experience includes regional and international matters; the route depends on jurisdiction, parties, and documents."], ["How is claim information protected?", "Information is handled on a need-to-know basis, with dedicated channels used for sensitive documents after initial contact."], ["Does an assessment guarantee recovery?", "No recovery outcome can be guaranteed. The assessment identifies recoverability, available routes, and known risks."]],
} as const;

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const items = qa[locale];
  return <><JsonLd data={faqJsonLd(items.map(([q, a]) => ({ q, a })))} /><PageIntro eyebrow="FAQ" title={locale === "ar" ? "أسئلة شائعة عن تحصيل الديون" : "Frequently asked questions about debt recovery"} description={locale === "ar" ? "إجابات واضحة تساعدك قبل بدء التقييم." : "Clear answers to help before an initial assessment."} /><section className="py-20"><Container className="max-w-4xl"><div className="space-y-4">{items.map(([q, a]) => <details key={q} className="group rounded-2xl border bg-surface p-6"><summary className="cursor-pointer list-none text-lg font-bold">{q}</summary><p className="mt-4 border-t pt-4 text-muted">{a}</p></details>)}</div></Container></section></>;
}
