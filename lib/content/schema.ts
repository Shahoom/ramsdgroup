import { z } from "zod";

export const localeSchema = z.enum(["ar", "en"]);
export const entryTypeSchema = z.enum(["service", "industry", "article", "case_study", "page", "legal"]);
export const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("rich_text"), heading: z.string().optional(), paragraphs: z.array(z.string()).min(1) }),
  z.object({ type: z.literal("steps"), heading: z.string(), items: z.array(z.object({ title: z.string(), text: z.string() })).min(1) }),
  z.object({ type: z.literal("features"), heading: z.string(), intro: z.string().optional(), items: z.array(z.object({ title: z.string(), text: z.string() })).min(1) }),
  z.object({ type: z.literal("faq"), heading: z.string(), items: z.array(z.object({ question: z.string(), answer: z.string() })).min(1) }),
  z.object({ type: z.literal("callout"), heading: z.string(), text: z.string() }),
  z.object({ type: z.literal("quote"), quote: z.string(), attribution: z.string().optional() }),
]);

export const localizedEntrySchema = z.object({
  id: z.string(),
  type: entryTypeSchema,
  locale: localeSchema,
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  eyebrow: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  blocks: z.array(contentBlockSchema),
  category: z.string().optional(),
  author: z.string().optional(),
});

export type Locale = z.infer<typeof localeSchema>;
export type EntryType = z.infer<typeof entryTypeSchema>;
export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type LocalizedEntry = z.infer<typeof localizedEntrySchema>;
