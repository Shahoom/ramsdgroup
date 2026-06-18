"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";

// Subscribe to changes of the `dark` class on <html>.
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

/** Dark-mode toggle. Reads/reflects the html `.dark` class; the no-flash script sets the initial state. */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("common.theme");

  const isDark = React.useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t("toLight") : t("toDark")}
      aria-pressed={isDark}
      suppressHydrationWarning
      className={`grid size-10 place-items-center rounded-full border border-current/25 text-current transition-colors hover:bg-current/10 ${className ?? ""}`}
    >
      <span className="relative grid size-5 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
