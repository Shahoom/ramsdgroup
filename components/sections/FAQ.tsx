import { Plus } from "lucide-react";
import { SectionReveal } from "@/components/motion/SectionReveal";

/**
 * Accessible FAQ accordion built on native <details>/<summary>.
 * Answers stay in the DOM (collapsed), so search crawlers and AI answer engines
 * can extract them. Pair with FAQPage JSON-LD on the page for rich results.
 */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <SectionReveal className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
      {items.map(({ q, a }) => (
        <details key={q} className="group px-6 py-1 open:bg-surface-2/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{q}</span>
            <span
              aria-hidden
              className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-gold-600 transition-transform duration-300 group-open:rotate-45 dark:text-gold-300"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="-mt-1 pb-5 leading-relaxed text-muted">{a}</p>
        </details>
      ))}
    </SectionReveal>
  );
}
