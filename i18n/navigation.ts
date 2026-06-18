import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers. Use these instead of `next/link` / `next/navigation`
 * so that links automatically respect the active locale and the `as-needed` prefix
 * (e.g. `<Link href="/travel">` resolves to `/travel` in Arabic and `/en/travel` in English).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
