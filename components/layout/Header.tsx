"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS, LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = React.useState(false);

  // Subscribe to scroll position via an external store (no setState-in-effect).
  const scrolled = React.useSyncExternalStore(
    (cb) => {
      window.addEventListener("scroll", cb, { passive: true });
      return () => window.removeEventListener("scroll", cb);
    },
    () => window.scrollY > 24,
    () => false,
  );

  // Close the mobile menu whenever the route changes (render-time reset, not an effect).
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const logoLight = !scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500",
          scrolled
            ? "border-b border-border bg-surface/80 text-foreground shadow-elevated backdrop-blur-xl"
            : "bg-transparent text-mist-50",
        )}
      >
        <Container className="flex items-center justify-between gap-4 py-3 lg:py-4">
          {/* Logo */}
          <Link href="/" aria-label={t("brandAlt")} className="relative z-10 shrink-0">
            <Image
              src="/brand/logo.png"
              alt={t("brandAlt")}
              width={248}
              height={70}
              priority
              className={cn(
                "h-12 w-auto object-contain drop-shadow-sm transition-[filter,height] duration-500 sm:h-16",
                logoLight && "brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]",
              )}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.95rem] font-medium text-current/85 transition-colors hover:text-current",
                    active && "text-current",
                  )}
                >
                  {t(item.key)}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-current/25 px-4 py-2 text-sm font-medium transition-colors hover:bg-current/10"
            >
              <MessageCircle className="size-4" />
              {t("liveReply")}
            </a>
          </div>

          {/* Mobile toggle — sits above the drawer (z-50 header > z-40 drawer) */}
          <button
            type="button"
            className="relative z-10 grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span className="relative block h-4 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
                  open && "top-1/2 -translate-y-1/2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
                  open && "bottom-1/2 translate-y-1/2 -rotate-45",
                )}
              />
            </span>
          </button>
        </Container>
      </header>

      {/* Mobile drawer — rendered outside <header> so it's never clipped by the header's
          stacking/containing context (Safari creates a containing block for position:fixed
          children when backdrop-filter is active on the parent). z-40 keeps it below the
          header (z-50) so the hamburger / X button stays clickable. */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mesh-navy fixed inset-0 z-40 flex flex-col text-mist-50 lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: "0%" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex-1 overflow-auto px-6 pb-10 pt-28">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block border-b border-mist-50/10 py-4 font-display text-2xl",
                        pathname === item.href ? "text-gold-300" : "text-mist-50",
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <a
                href={LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white"
              >
                <MessageCircle className="size-5" />
                {t("liveReply")}
              </a>

              <div className="mt-10 flex items-center gap-3">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
