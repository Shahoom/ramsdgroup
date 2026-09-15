import { ArrowLeft, CalendarDays, CheckCircle2 } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { LocalizedEntry } from "@/lib/content/schema";
import { Container } from "@/components/ui/Container";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { EntryCard } from "@/components/content/EntryCard";
import { PageIntro } from "@/components/content/PageIntro";

export function EntryDetail({ entry, related = [] }: { entry: LocalizedEntry; related?: LocalizedEntry[] }) {
  const ar = entry.locale === "ar";
  const parent = entry.type === "service" ? "/services" : entry.type === "industry" ? "/industries" : "/insights";
  const parentName = ar
    ? entry.type === "service" ? "الخدمات" : entry.type === "industry" ? "القطاعات" : "مركز المعرفة"
    : entry.type === "service" ? "Services" : entry.type === "industry" ? "Industries" : "Knowledge hub";
  const date = new Intl.DateTimeFormat(ar ? "ar-OM" : "en-GB", { dateStyle: "long" }).format(new Date(entry.updatedAt));

  return <>
    <PageIntro eyebrow={entry.eyebrow ?? "RAM"} title={entry.title} description={entry.excerpt} />
    <section className="border-b bg-surface-2/45">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-5 text-sm text-muted">
        <nav aria-label={ar ? "مسار الصفحة" : "Breadcrumb"} className="flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-gold-700">{ar ? "الرئيسية" : "Home"}</Link><span>/</span>
          <Link href={parent} className="hover:text-gold-700">{parentName}</Link><span>/</span>
          <span className="text-foreground">{entry.title}</span>
        </nav>
        {entry.type === "article" ? <p className="flex items-center gap-2"><CalendarDays className="size-4 text-gold-600" />{ar ? "آخر تحديث:" : "Last updated:"} {date}</p> : null}
      </Container>
    </section>
    <section className="py-20">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="max-w-3xl"><ContentBlocks blocks={entry.blocks} /></article>
          <aside className="space-y-5">
            <div className="sticky top-28 rounded-3xl bg-navy-950 p-6 text-white shadow-2xl">
              <p className="text-sm font-bold text-gold-300">{ar ? "ناقش ملفك بسرية" : "Discuss your matter confidentially"}</p>
              <h2 className="mt-3 text-2xl font-bold">{ar ? "ابدأ بتقييم أولي" : "Start with an initial assessment"}</h2>
              <ul className="mt-5 space-y-3 text-sm text-mist-100/75">
                {[ar ? "مراجعة المعلومات العامة" : "Review of general information", ar ? "تحديد المستندات المطلوبة" : "Identify required records", ar ? "اقتراح الخطوة المناسبة" : "Recommend an appropriate next step"].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-300" />{item}</li>)}
              </ul>
              <p className="mt-5 text-xs leading-6 text-mist-200/65">{ar ? "لا ترسل مستندات أو بيانات حساسة عبر النموذج العام." : "Do not send documents or sensitive information through the public form."}</p>
              <Link href="/contact" className="mt-6 inline-flex rounded-full bg-gold-400 px-5 py-3 font-bold text-navy-950">{ar ? "اطلب تقييم الملف" : "Request a claim assessment"}</Link>
            </div>
          </aside>
        </div>
        <Link href={parent} className="mt-16 inline-flex items-center gap-2 font-bold text-gold-700"><ArrowLeft className="size-4" />{ar ? `العودة إلى ${parentName}` : `Back to ${parentName}`}</Link>
      </Container>
    </section>
    {related.length ? <section className="border-t bg-surface-2/45 py-20"><Container><p className="text-sm font-bold uppercase tracking-[.16em] text-gold-700">{ar ? "استكشف أكثر" : "KEEP EXPLORING"}</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">{ar ? "صفحات مرتبطة بموضوعك" : "Related pages and guides"}</h2><div className="mt-9 grid gap-5 md:grid-cols-3">{related.map((item) => <EntryCard key={item.id} entry={item} />)}</div></Container></section> : null}
  </>;
}
