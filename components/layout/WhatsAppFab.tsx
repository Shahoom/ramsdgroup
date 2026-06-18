"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { LINKS } from "@/lib/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.498 14.382c-.301-.15-1.767-.872-2.04-.972-.273-.099-.472-.148-.67.15-.197.297-.767.97-.94 1.167-.174.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/** Persistent floating WhatsApp quick-contact button with a gentle pulse. */
export function WhatsAppFab() {
  const t = useTranslations("nav");
  const reduce = useReducedMotion();
  const label = t("liveReply");

  return (
    <motion.a
      href={LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group fixed bottom-5 end-5 z-50 inline-flex items-center sm:bottom-7 sm:end-7"
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* expanding label */}
      <span className="me-0 max-w-0 overflow-hidden whitespace-nowrap rounded-full text-sm font-medium text-navy-900 opacity-0 transition-all duration-300 group-hover:me-2 group-hover:max-w-[14rem] group-hover:opacity-100">
        <span className="rounded-full bg-surface px-4 py-2 shadow-elevated ring-1 ring-navy-900/10 dark:text-foreground">
          {label}
        </span>
      </span>

      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform duration-300 group-hover:scale-105">
        {!reduce && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 [animation-duration:2.5s]" />
        )}
        <WhatsAppIcon className="relative size-7" />
      </span>
    </motion.a>
  );
}
