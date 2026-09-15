import type { Locale } from "@/i18n/routing";
import { PageIntro } from "@/components/content/PageIntro";
import { LegalArticle } from "@/components/content/LegalArticle";

export default async function Terms({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params; const ar = locale === "ar";
  const sections = ar ? [
    { title: "قبول الشروط", paragraphs: ["باستخدام الموقع فإنك توافق على هذه الشروط ضمن الحدود التي يسمح بها القانون. إذا لم توافق، توقف عن استخدام الموقع ونماذجه."] },
    { title: "غرض الموقع", paragraphs: ["يوفر الموقع معلومات عامة عن رام وخدمات التحصيل والقطاعات والمنهجية وطريقة التواصل. لا يحل المحتوى محل تقييم ملف محدد."] },
    { title: "طلبات التواصل", paragraphs: ["إرسال النموذج لا ينشئ علاقة تعاقدية أو علاقة محامٍ وموكل أو التزامًا بقبول الملف. يبدأ أي تكليف بعد مراجعة واتفاق واضحين."] },
    { title: "مسؤولية المستخدم", paragraphs: ["يجب أن تكون المعلومات المقدمة صحيحة ومشروعة، وألا ترسل بيانات لا تملك حق مشاركتها. لا تستخدم النموذج لإرسال مستندات حساسة."] },
    { title: "الاستخدام المقبول", paragraphs: ["لا يجوز إساءة استخدام الموقع أو محاولة الوصول غير المصرح به أو تعطيل الخدمة أو إرسال محتوى ضار أو انتحال هوية طرف آخر."] },
    { title: "الملكية الفكرية", paragraphs: ["محتوى الموقع وهوية رام وتصميمه محمية بحسب الحقوق المطبقة. يسمح بالاقتباس المحدود مع الإشارة للمصدر، ولا يسمح بإعادة النشر التجاري دون موافقة."] },
    { title: "الروابط الخارجية", paragraphs: ["قد يقود الموقع إلى خرائط أو واتساب أو تقويم أو قنوات خارجية تخضع لسياساتها الخاصة. لا تتحكم رام في خدمات الطرف الثالث."] },
    { title: "التوفر والتغيير", paragraphs: ["قد تُحدّث الصفحات أو تتوقف بعض الوظائف مؤقتًا للصيانة أو لأسباب تقنية. قد تتغير هذه الشروط ويظهر تاريخ التحديث في الصفحة."] },
  ] : [
    { title: "Acceptance", paragraphs: ["By using the website, you accept these terms to the extent permitted by law. If you do not agree, stop using the site and its forms."] },
    { title: "Website purpose", paragraphs: ["The site provides general information about RAM, recovery services, sectors, methodology, and contact. It does not replace assessment of a specific matter."] },
    { title: "Contact requests", paragraphs: ["Submitting a form does not create a contract, lawyer-client relationship, or obligation to accept a matter. An engagement begins only after review and clear agreement."] },
    { title: "User responsibility", paragraphs: ["Information provided must be accurate and lawful, and you must have a right to share it. Do not use the form to send sensitive records."] },
    { title: "Acceptable use", paragraphs: ["You may not misuse the site, attempt unauthorized access, disrupt service, submit harmful content, or impersonate another person."] },
    { title: "Intellectual property", paragraphs: ["Site content, RAM identity, and design are protected under applicable rights. Limited quotation with attribution is allowed; commercial republication requires approval."] },
    { title: "External links", paragraphs: ["The site may link to maps, WhatsApp, calendars, or other services governed by their own policies. RAM does not control third-party services."] },
    { title: "Availability and change", paragraphs: ["Pages may be updated and functions may be temporarily unavailable for maintenance or technical reasons. Terms may change and the update date is shown here."] },
  ];
  return <><PageIntro eyebrow={ar ? "قانوني" : "LEGAL"} title={ar ? "شروط استخدام الموقع" : "Website terms"} description={ar ? "القواعد العامة للوصول إلى محتوى رام واستخدام النماذج والروابط." : "General rules for accessing RAM content and using forms and links."} /><LegalArticle updated={ar ? "آخر تحديث: 15 سبتمبر 2026" : "Last updated: 15 September 2026"} sections={sections} /></>;
}
