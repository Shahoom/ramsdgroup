import { ArrowUpLeft, CheckCircle2 } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export type PageItem = { title: string; text: string };

export function InformationGrid({ eyebrow, title, description, items, tone = "light" }: { eyebrow: string; title: string; description?: string; items: PageItem[]; tone?: "light" | "soft" | "dark" }) {
  const dark = tone === "dark";
  return <section className={dark ? "bg-navy-950 py-20 text-white" : tone === "soft" ? "border-y bg-surface-2/45 py-20" : "py-20"}>
    <Container>
      <div className="max-w-3xl"><p className={dark ? "text-sm font-bold uppercase tracking-[.16em] text-gold-300" : "text-sm font-bold uppercase tracking-[.16em] text-gold-700"}>{eyebrow}</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">{title}</h2>{description ? <p className={dark ? "mt-5 text-lg leading-8 text-mist-100/70" : "mt-5 text-lg leading-8 text-muted"}>{description}</p> : null}</div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map((item, index) => <article key={item.title} className={dark ? "rounded-3xl border border-white/10 bg-white/5 p-6" : "rounded-3xl border bg-surface p-6 shadow-elevated"}><span className={dark ? "text-sm font-bold text-gold-300" : "text-sm font-bold text-gold-700"}>{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-xl font-bold">{item.title}</h3><p className={dark ? "mt-3 leading-7 text-mist-100/70" : "mt-3 leading-7 text-muted"}>{item.text}</p></article>)}</div>
    </Container>
  </section>;
}

export function SplitNarrative({ eyebrow, title, paragraphs, points }: { eyebrow: string; title: string; paragraphs: string[]; points: string[] }) {
  return <section className="py-20"><Container><div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-sm font-bold uppercase tracking-[.16em] text-gold-700">{eyebrow}</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">{title}</h2><div className="mt-6 space-y-5 text-lg leading-8 text-muted">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div><div className="rounded-[2rem] bg-navy-950 p-7 text-white sm:p-9"><ul className="space-y-5">{points.map((point) => <li key={point} className="flex gap-3 leading-7 text-mist-100/80"><CheckCircle2 className="mt-1 size-5 shrink-0 text-gold-300" />{point}</li>)}</ul></div></div></Container></section>;
}

export function PageCTA({ title, text, action, href = "/contact", secondary, secondaryHref }: { title: string; text: string; action: string; href?: string; secondary?: string; secondaryHref?: string }) {
  return <section className="py-20"><Container><div className="relative overflow-hidden rounded-[2.5rem] bg-gold-400 px-7 py-12 text-navy-950 sm:px-12 lg:flex lg:items-end lg:justify-between lg:gap-12"><div className="absolute -end-20 -top-28 size-72 rounded-full border border-navy-950/10" /><div className="relative max-w-3xl"><h2 className="text-3xl font-bold sm:text-4xl">{title}</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-navy-950/75">{text}</p></div><div className="relative mt-7 flex shrink-0 flex-wrap gap-3 lg:mt-0"><Link href={href} className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-3 font-bold text-white">{action}<ArrowUpLeft className="size-4" /></Link>{secondary && secondaryHref ? <Link href={secondaryHref} className="rounded-full border border-navy-950/25 px-6 py-3 font-bold">{secondary}</Link> : null}</div></div></Container></section>;
}
