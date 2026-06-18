"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LOCALES = [
  { code: "ar", label: "العربية", short: "ع" },
  { code: "en", label: "English", short: "EN" },
] as const;

/** AR / EN toggle that preserves the current path. Uses `currentColor` so it adapts to its container. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-current/20 p-0.5 text-sm",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => {
        const active = l.code === locale;
        return (
          <Link
            key={l.code}
            href={pathname}
            locale={l.code}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1 font-medium transition-colors",
              active
                ? "bg-current/15 text-current"
                : "text-current/60 hover:text-current",
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
