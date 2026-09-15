import type { ContentBlock } from "@/lib/content/schema";
import { CheckCircle2, Plus } from "lucide-react";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return <div className="space-y-16">{blocks.map((block, index) => {
    if (block.type === "rich_text") return <section key={index}>{block.heading && <h2 className="text-3xl font-bold sm:text-4xl">{block.heading}</h2>}<div className="mt-5 space-y-5 text-lg leading-8 text-muted">{block.paragraphs.map((p) => <p key={p}>{p}</p>)}</div></section>;
    if (block.type === "steps") return <section key={index}><h2 className="text-3xl font-bold sm:text-4xl">{block.heading}</h2><ol className="mt-7 grid gap-4">{block.items.map((item, i) => <li key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 rounded-2xl border bg-surface p-5"><span className="text-2xl font-bold text-gold-500">{String(i + 1).padStart(2, "0")}</span><div><h3 className="font-bold">{item.title}</h3><p className="mt-1 leading-7 text-muted">{item.text}</p></div></li>)}</ol></section>;
    if (block.type === "features") return <section key={index}><h2 className="text-3xl font-bold sm:text-4xl">{block.heading}</h2>{block.intro ? <p className="mt-4 text-lg leading-8 text-muted">{block.intro}</p> : null}<div className="mt-7 grid gap-4 sm:grid-cols-2">{block.items.map((item) => <article key={item.title} className="rounded-2xl border bg-surface p-5"><CheckCircle2 className="size-5 text-gold-600" /><h3 className="mt-4 text-lg font-bold">{item.title}</h3><p className="mt-2 leading-7 text-muted">{item.text}</p></article>)}</div></section>;
    if (block.type === "faq") return <section key={index}><h2 className="text-3xl font-bold sm:text-4xl">{block.heading}</h2><div className="mt-7 space-y-3">{block.items.map((item) => <details key={item.question} className="group rounded-2xl border bg-surface p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold"><span>{item.question}</span><Plus className="size-5 shrink-0 text-gold-600 transition group-open:rotate-45" /></summary><p className="mt-4 border-t pt-4 leading-7 text-muted">{item.answer}</p></details>)}</div></section>;
    if (block.type === "callout") return <aside key={index} className="rounded-[1.75rem] border border-gold-400/30 bg-gold-400/10 p-7"><h2 className="text-xl font-bold">{block.heading}</h2><p className="mt-3 leading-7 text-muted">{block.text}</p></aside>;
    return <blockquote key={index} className="border-s-4 border-gold-400 ps-6 text-2xl">{block.quote}</blockquote>;
  })}</div>;
}
