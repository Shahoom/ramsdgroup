import type { LucideIcon } from "lucide-react";
import {
  MessagesSquare,
  Building2,
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
  PlaneTakeoff,
  Stamp,
  FilePen,
  CalendarClock,
  Hotel,
  Signal,
  Camera,
  Printer,
  Briefcase,
  Sparkles,
  Landmark,
  Globe2,
  Award,
  Layers,
  Target,
  Sprout,
} from "lucide-react";

/**
 * Structured, repeating content. Localized TEXT lives in messages/{ar,en}.json;
 * these modules hold the non-text data (icons, images, links, counter targets)
 * plus the message `id` used to look the text up. Edit freely.
 */

/* -------------------------------------------------------------------------- */
/* Home: animated stat counters                                               */
/* TODO: confirm real target figures with the owner — these are editable defaults. */
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
/* Home: the two primary service cards                                        */
export type PrimaryService = {
  id: "travel" | "debt";
  href: "/travel" | "/debt";
  icon: LucideIcon;
};

export const PRIMARY_SERVICES: PrimaryService[] = [
  { id: "travel", href: "/travel", icon: PlaneTakeoff },
  { id: "debt", href: "/debt", icon: Scale },
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
/* Visas page                                                                 */
export const VISA_DESTINATIONS: Item[] = [
  { id: "saudi", icon: Landmark },
  { id: "schengen", icon: Globe2 },
];

/** "Simplify Your Visa Application" — concierge services (mirrors the banner). */
export const VISA_SERVICES: Item[] = [
  { id: "visaAssistance", icon: Stamp },
  { id: "formFilling", icon: FilePen },
  { id: "appointment", icon: CalendarClock },
  { id: "documents", icon: FileCheck2 },
  { id: "insurance", icon: ShieldCheck },
  { id: "flight", icon: PlaneTakeoff },
  { id: "hotel", icon: Hotel },
  { id: "telecom", icon: Signal },
  { id: "photograph", icon: Camera },
  { id: "photocopy", icon: Printer },
  { id: "corporate", icon: Briefcase },
  { id: "more", icon: Sparkles },
];

export const VISA_PROCESS: Step[] = [
  { id: "step1", n: "01" },
  { id: "step2", n: "02" },
  { id: "step3", n: "03" },
  { id: "step4", n: "04" },
];

export const VISA_WHY: Item[] = [
  { id: "expertise", icon: Award },
  { id: "endToEnd", icon: Layers },
  { id: "accuracy", icon: Target },
];

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

/* -------------------------------------------------------------------------- */
/* About page values                                                          */
export const ABOUT_VALUES: Item[] = [
  { id: "v1", icon: Award },
  { id: "v2", icon: Clock },
  { id: "v3", icon: ShieldCheck },
  { id: "v4", icon: Sprout },
];

/* -------------------------------------------------------------------------- */
/* Testimonials (shared on home / travel / debt)                              */
export type Testimonial = { id: string; image?: string };

export const TESTIMONIALS: Testimonial[] = [
  { id: "1", image: "/images/testimonial-1.jpeg" },
  { id: "2", image: "/images/testimonial-2.jpeg" },
  { id: "3" }, // initials-avatar fallback (no photo)
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
];
