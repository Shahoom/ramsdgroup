import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/content/PageIntro";
import { LegalArticle } from "@/components/content/LegalArticle";
import { PageCTA } from "@/components/content/PageSections";

export default async function Privacy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const ar = locale === "ar";
  const sections = ar ? [
    { title: "نطاق هذه السياسة", paragraphs: ["تشرح هذه السياسة كيف يتعامل موقع رام مع بيانات الزائر وطلبات التواصل. قد تخضع ملفات العملاء النشطة لشروط وتعليمات سرية إضافية ضمن التكليف."] },
    { title: "البيانات التي تقدمها", paragraphs: ["قد نجمع الاسم وبيانات الاتصال وموضوع الطلب والمعلومات التي تكتبها طوعًا في النموذج أو ترسلها عبر قنوات التواصل."], items: ["الاسم واسم الشركة", "البريد ورقم الهاتف", "موضوع الرسالة", "معلومات عامة عن المطالبة"] },
    { title: "البيانات التي لا يجب إرسالها عبر النموذج", paragraphs: ["النموذج العام ليس قناة لإرسال العقود أو الهويات أو الحسابات أو المستندات الحساسة. بعد المراجعة الأولية يحدد الفريق وسيلة مناسبة عند الحاجة."], items: ["نسخ الهوية والجواز", "الحسابات البنكية", "العقود والفواتير الكاملة", "بيانات المدينين الحساسة"] },
    { title: "أغراض الاستخدام", paragraphs: ["نستخدم المعلومات للرد على الطلب وفهم نوع الخدمة وتحديد المستندات والخطوة التالية، ولحماية الموقع وتحسين تجربة التواصل."] },
    { title: "الوصول والمشاركة", paragraphs: ["يقتصر الوصول على الأشخاص المخولين المرتبطين بالغرض. لا تُشارك المعلومات مع طرف ثالث دون أساس مناسب، وقد تتم الإحالة إلى مختصين عندما يوافق العميل ويتطلب المسار ذلك."] },
    { title: "الحفظ والحماية", paragraphs: ["تُحفظ المعلومات للمدة اللازمة للغرض والالتزامات ذات الصلة، وتُستخدم ضوابط معقولة للحد من الوصول أو الاستخدام غير المصرح به. لا توجد وسيلة رقمية تضمن أمانًا مطلقًا."] },
    { title: "حقوقك وطلباتك", paragraphs: ["يمكن طلب تصحيح بيانات التواصل أو الاستفسار عن استخدامها أو طلب حذفها عبر بريد الشركة، مع مراعاة أي التزام قانوني أو حاجة مشروعة للاحتفاظ."] },
    { title: "التحديث والتواصل", paragraphs: ["قد تُحدّث السياسة عند تغير الموقع أو الممارسات. للأسئلة المتعلقة بالخصوصية تواصل عبر info@ramsdgroup.com."] },
  ] : [
    { title: "Scope of this policy", paragraphs: ["This policy explains how RAM's website handles visitor and contact-request data. Active client matters may be subject to additional confidentiality terms and instructions."] },
    { title: "Data you provide", paragraphs: ["We may collect your name, contact details, request topic, and information you voluntarily enter in a form or send through contact channels."], items: ["Name and company", "Email and phone", "Message topic", "General claim information"] },
    { title: "Data not to send through the form", paragraphs: ["The public form is not a channel for contracts, identity records, accounts, or sensitive documents. After initial review, the team identifies an appropriate method where needed."], items: ["Identity or passport copies", "Bank-account information", "Full contracts and invoices", "Sensitive debtor data"] },
    { title: "Purposes of use", paragraphs: ["Information is used to respond, understand service fit, identify records and next steps, protect the website, and improve contact experience."] },
    { title: "Access and sharing", paragraphs: ["Access is limited to authorized people connected to the purpose. Information is not shared without an appropriate basis; specialist referral may occur with client approval where the route requires it."] },
    { title: "Retention and security", paragraphs: ["Information is kept for the purpose and relevant obligations, with reasonable controls against unauthorized access or use. No digital method can guarantee absolute security."] },
    { title: "Your requests", paragraphs: ["You may ask to correct contact data, inquire about its use, or request deletion through company email, subject to legal obligations or legitimate retention needs."] },
    { title: "Updates and contact", paragraphs: ["This policy may change as the site or practices change. Privacy questions can be sent to info@ramsdgroup.com."] },
  ];
  return <><PageIntro eyebrow={ar ? "قانوني" : "LEGAL"} title={ar ? "سياسة الخصوصية" : "Privacy policy"} description={ar ? "كيف نجمع بيانات طلبات التواصل ونستخدمها ونحميها، وما الذي لا يجب إرساله عبر القنوات العامة." : "How contact-request data is collected, used, and protected—and what not to send through public channels."} /><LegalArticle updated={ar ? "آخر تحديث: 15 سبتمبر 2026" : "Last updated: 15 September 2026"} sections={sections} /><PageCTA title={ar ? "لديك سؤال متعلق بالخصوصية؟" : "Have a privacy question?"} text={ar ? "تواصل عبر بريد الشركة دون إرفاق مستندات حساسة." : "Contact the company by email without attaching sensitive documents."} action={ar ? "راسل فريق رام" : "Email the RAM team"} href="/contact" /></>;
}
