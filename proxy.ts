import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the `middleware` file convention to `proxy`. The next-intl
// handler is just a default-exported request function, which satisfies it.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - /api, /_next, /_vercel (internal)
  // - anything containing a dot (static files, e.g. /logo.png)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
