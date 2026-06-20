import type { LucideIcon } from "lucide-react";
import {
  MessagesSquare,
  FileCheck2,
  Smile,
  Scale,
  ShieldCheck,
  GraduationCap,
  Wallet,
  Handshake,
  Clock,
  TrendingUp,
  HardHat,
  ReceiptText,
  UserRound,
  FileX2,
  Award,
  Sprout,
} from "lucide-react";

/**
 * Structured, repeating content. Localized TEXT lives in messages/{ar,en}.json;
 * these modules hold the non-text data (icons, images, links, counter targets)
 * plus the message `id` used to look the text up. Edit freely.
 */

/* -------------------------------------------------------------------------- */
/* Home: animated stat counters                                               */
export type Stat = {
  id: "consultations" | "debtFiles" | "happyClients";
  target: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
};

export const STATS: Stat[] = [
  { id: "consultations", target: 1200, prefix: "+", icon: MessagesSquare },
  { id: "debtFiles", target: 430, prefix: "+", icon: FileCheck2 },
  { id: "happyClients", target: 98, suffix: "%", icon: Smile },
];

/* -------------------------------------------------------------------------- */
/* Home: 01 / 02 / 03 process (rendered in order)                             */
export type Step = { id: string; n: string };

export const PROCESS_STEPS: Step[] = [
  { id: "step1", n: "01" },
  { id: "step2", n: "02" },
  { id: "step3", n: "03" },
];

/* -------------------------------------------------------------------------- */
/* Shared item shape (icon + message id)                                      */
export type Item = { id: string; icon: LucideIcon };

/* -------------------------------------------------------------------------- */
/* Debt page                                                                  */
export const DEBT_VALUES: Item[] = [
  { id: "v1", icon: ShieldCheck },
  { id: "v2", icon: Scale },
  { id: "v3", icon: GraduationCap },
];

export const DEBT_BENEFITS: Item[] = [
  { id: "b1", icon: Wallet },
  { id: "b2", icon: Handshake },
  { id: "b3", icon: Clock },
  { id: "b4", icon: TrendingUp },
];

export const DEBT_TYPES: Item[] = [
  { id: "labor", icon: HardHat },
  { id: "invoices", icon: ReceiptText },
  { id: "personal", icon: UserRound },
  { id: "baddebt", icon: FileX2 },
];

export const DEBT_PROCESS_STEPS: Step[] = [
  { id: "step1", n: "01" },
  { id: "step2", n: "02" },
  { id: "step3", n: "03" },
  { id: "step4", n: "04" },
];

/* -------------------------------------------------------------------------- */
/* About page values                                                          */
export const ABOUT_VALUES: Item[] = [
  { id: "v1", icon: Award },
  { id: "v2", icon: Clock },
  { id: "v3", icon: ShieldCheck },
  { id: "v4", icon: Sprout },
];

/* -------------------------------------------------------------------------- */
/* Testimonials (shared on home / debt)                                       */
export type Testimonial = { id: string; image?: string };

export const TESTIMONIALS: Testimonial[] = [
  { id: "1", image: "/images/testimonial-1.jpeg" },
  { id: "2", image: "/images/testimonial-2.jpeg" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
];
