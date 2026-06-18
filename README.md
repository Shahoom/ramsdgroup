# RAM Sustainable Development — رام للتنمية المستدامة

A modern, fast, fully-animated rebuild of [ramsdgroup.com](https://ramsdgroup.com) — the marketing site for a Muscat-based consulting & debt-collection firm. Arabic-first (RTL) with a full English (LTR) locale.

Built as a production-grade Next.js application: clean, semantic, componentized, accessible, and SEO-complete. Design concept — **"The Gilded Thread"**: deep navy/ink-blue, champagne gold, and cool light-gray (a "trusted advisor" palette), with an animated "thread" motif (the metaphor connecting law & economics) woven through the hero, section dividers, the process timeline, and the ∞ accents on cards.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, Server Components, Turbopack) + TypeScript |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`, logical properties for RTL) |
| Animation | **Motion** (`motion/react`, the successor to Framer Motion) |
| i18n | **next-intl** (Arabic at root, English under `/en`) |
| Icons | **lucide-react** |
| Fonts | **next/font** — IBM Plex Sans Arabic, IBM Plex Sans, Fraunces (self-hosted) |
| Email | **Resend** (contact form) |
| Deploy | **Vercel** |

---

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — only needed to actually send contact email
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (type-checked)
npm run start    # serve the production build
npm run lint     # eslint
```

> **Node:** 20.9+ (developed on Node 22).

---

## Internationalization & routing

- **Arabic (`ar`)** is the default locale, served at the **root** with no prefix: `/`, `/about`, `/travel`, `/debt`, `/contact`.
- **English (`en`)** is served under `/en`: `/en`, `/en/about`, `/en/travel`, `/en/debt`, `/en/contact`.
- `<html lang dir>` is set per-locale (`rtl` for Arabic, `ltr` for English). All layout uses **logical properties** (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) so components mirror automatically.
- The **language switcher** (header + footer) preserves the current path.

Routing is configured in [`i18n/routing.ts`](i18n/routing.ts) and the request handler in [`proxy.ts`](proxy.ts) (Next 16's renamed `middleware`).

---

## Editing content

All copy lives in message catalogs — **never hard-coded in components**:

- [`messages/ar.json`](messages/ar.json) — Arabic (verbatim from the original site)
- [`messages/en.json`](messages/en.json) — English

Structured / repeated data (counter targets, steps, features, benefits, debt types, testimonials — icons, images, links) lives in typed modules in [`lib/content/`](lib/content/index.ts). External links, phone, email, booking, and the company-profile PDF live in [`lib/site.ts`](lib/site.ts).

**To change the homepage stat targets**, edit `STATS` in `lib/content/index.ts` (they animate up to these numbers — placeholder defaults are marked with a `TODO`).

---

## Project structure

```
app/
  [locale]/            # ar (root) + en
    layout.tsx         # <html lang dir>, fonts, providers, JSON-LD, header/footer/FAB
    template.tsx       # page-transition wrapper
    page.tsx           # Home
    project/ debt/ contact/   # inner pages
    opengraph-image.tsx
    not-found.tsx
  api/contact/route.ts # contact form handler (Resend)
  icon.tsx  sitemap.ts  robots.ts  manifest.ts
components/
  ui/        # Button, Container, SectionHeading, Modal, ThemeToggle, BookingButton
  layout/    # Header, Footer, LanguageSwitcher, WhatsAppFab
  motion/    # ThreadBackground, SectionReveal, StatCounter, InfinityGlyph, Magnetic
  sections/  # Hero, PageHero, Stats, ServiceCards, FeatureGrid, ProcessTimeline,
             # Testimonials, CTABanner, ContactForm, MapEmbed, VisionMission, IntroBand
  seo/       # JsonLd
i18n/        # routing, navigation, request config
lib/         # utils, site constants, seo helpers, fonts, content/
messages/    # ar.json, en.json
public/brand public/images   # logo + photography (pulled from the live site)
```

---

## Contact form

`POST /api/contact` validates input (+ honeypot) and sends email via **Resend**.

- **With `RESEND_API_KEY` set** → sends to `CONTACT_TO_EMAIL` (default `info@ramsdgroup.com`) with the visitor's address as reply-to.
- **Without it (local dev)** → logs the payload and returns `{ ok: true, simulated: true }` so the success UI can be exercised. The server console clearly notes that **no email was sent**.

Set `CONTACT_FROM_EMAIL` to an address on a domain you've verified in Resend.

---

## Animation & accessibility

- Every non-essential animation is gated behind **`prefers-reduced-motion`** (component-level via `useReducedMotion`, plus a CSS safety net).
- Animated hero/thread background, scroll reveals, count-up stats, condensing header, drawing process timeline, magnetic cards, ∞ traces, auto-advancing testimonial carousel (pause-on-hover, swipe, keyboard), booking modal (focus-trap), smooth page transitions, dark-mode toggle (persisted, no flash).
- Semantic landmarks, skip link, focus-visible rings, labelled controls, WCAG-AA color contrast.

---

## SEO

Per-locale titles/descriptions, `hreflang` alternates (ar ⇄ en), Open Graph + Twitter cards (generated OG image), JSON-LD `Organization` + `LocalBusiness`, `sitemap.xml`, `robots.txt`, and a web manifest.

> Update the production domain in [`lib/site.ts`](lib/site.ts) (`SITE.url`) before going live so canonical URLs, sitemap, and schema resolve correctly.

---

## Assets & TODOs

The real logo and testimonial photos were pulled from the live site into `public/`:

- `public/brand/logo.png`, `public/brand/logo-footer.png`
- `public/images/testimonial-1.jpeg`, `public/images/testimonial-2.jpeg`

`// TODO` markers in the code flag anything that should be confirmed with the owner (e.g. the homepage stat targets). The OG image and favicon are generated from brand colors in `app/opengraph-image.tsx` and `app/icon.tsx`.

---

## Deploy to Vercel

1. Push to a Git repo and **Import** it in Vercel (Next.js is auto-detected).
2. Add environment variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`) in **Project → Settings → Environment Variables**.
3. Deploy. Set your custom domain and update `SITE.url` in `lib/site.ts`.

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```
