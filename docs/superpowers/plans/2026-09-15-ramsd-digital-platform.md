# RAM Digital Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a premium bilingual RAM website with a secure custom CMS, article publishing, and lead management, prepared for a later CRM.

**Architecture:** Keep the existing Next.js 16 App Router foundation, replace the public information architecture and visual system, and add Supabase-backed content, authentication, storage, and leads. Public pages render with Server Components through a typed repository; protected admin mutations use authorized Server Actions; the public lead form uses a validated Route Handler.

**Tech Stack:** Next.js 16.2.9, React 19.2.4, TypeScript, Tailwind CSS 4, next-intl 4, Motion, Supabase Postgres/Auth/Storage, Zod, Vitest, Testing Library, Playwright, Resend.

**Spec:** `docs/superpowers/specs/2026-09-15-ramsd-digital-platform-design.md`

## Global Constraints

- Canonical production host is `https://www.ramsdgroup.com`.
- Public content exists in complete Arabic and English variants with explicit `/ar` and `/en` prefixes.
- The root `/` is the `x-default` language gateway; legacy Arabic routes permanently redirect to `/ar` equivalents.
- React Server Components are the default; client components are limited to interaction boundaries.
- Every protected read and mutation verifies staff identity and role in the server-side data-access layer.
- Every exposed Supabase table has Row Level Security.
- Service-role or secret credentials are server-only and never use a `NEXT_PUBLIC_` prefix.
- Public claims, metrics, licences, and testimonials remain hidden unless marked verified.
- CRM automation, debtor files, and case management are not part of this plan.
- Preserve the user's existing `components/ui/SectionHeading.tsx` sizing change.
- Pin dependency resolutions in `package-lock.json`.

---

### Task 1: Project hygiene and deterministic test foundation

**Files:**
- Modify: `.gitignore`
- Modify: `eslint.config.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `tests/unit/smoke.test.ts`

**Interfaces:**
- Produces: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, and `npm run build` commands used by every later task.

- [ ] Remove only AppleDouble `._*` metadata files after verifying each target is inside the repository; add `._*` and `**/._*` to `.gitignore`.
- [ ] Reinstall dependencies on Windows so platform-specific Next.js and Parcel binaries are present.
- [ ] Add exact resolved versions of `@supabase/ssr`, `@supabase/supabase-js`, `zod`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, and `@playwright/test`.
- [ ] Add scripts: `typecheck: tsc --noEmit`, `test: vitest run`, `test:watch: vitest`, and `test:e2e: playwright test`.
- [ ] Write `tests/unit/smoke.test.ts` asserting the test environment can import `SITE` and that the canonical host is `https://www.ramsdgroup.com`.
- [ ] Run the smoke test and confirm it fails while the old host value remains.
- [ ] Update the site constant only enough to make the smoke test pass.
- [ ] Run lint, typecheck, unit tests, and build; retain any source failures for the task that owns them.
- [ ] Commit project hygiene and test tooling.

### Task 2: Environment validation, Supabase clients, and database types

**Files:**
- Modify: `.env.example`
- Create: `lib/env.ts`
- Create: `lib/supabase/browser.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`
- Create: `lib/supabase/types.ts`
- Create: `tests/unit/env.test.ts`

**Interfaces:**
- Produces: `env`, `isSupabaseConfigured()`, `createBrowserClient()`, `createServerClient()`, `createAdminClient()`, and `Database`.

- [ ] Write failing tests proving server secrets reject accidental `NEXT_PUBLIC_` exposure and optional local configuration does not crash public builds.
- [ ] Implement a Zod environment schema for `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, `RESEND_API_KEY`, email settings, and `NEXT_PUBLIC_SITE_URL`.
- [ ] Implement browser and cookie-aware server Supabase factories using current `@supabase/ssr` APIs.
- [ ] Implement a server-only admin client that throws a clear configuration error when a privileged operation is attempted without credentials.
- [ ] Add generated-style database types matching Task 3's schema.
- [ ] Run the environment tests, typecheck, and lint.
- [ ] Commit the typed Supabase foundation.

### Task 3: Secure content and lead database schema

**Files:**
- Create: `supabase/migrations/20260915000100_platform_schema.sql`
- Create: `supabase/seed.sql`
- Create: `tests/contracts/database-policy.test.ts`

**Interfaces:**
- Produces tables `profiles`, `content_entries`, `content_translations`, `authors`, `categories`, `entry_categories`, `faqs`, `testimonials`, `media_assets`, `site_settings`, `leads`, `lead_notes`, and `audit_logs`.
- Produces enums `staff_role`, `content_type`, `content_status`, `lead_status`, and `locale_code`.

- [ ] Write a contract test that parses the migration and fails unless every public table enables RLS, staff roles are explicit, and no authorization policy reads `raw_user_meta_data`.
- [ ] Define UUID primary keys, timestamps, foreign keys, unique localized slugs, content status constraints, and immutable lead attribution fields.
- [ ] Add RLS policies: anonymous users read only published and verified public records; editors manage drafts; admins publish; lead managers access leads; owners manage profiles.
- [ ] Add protected audit logging triggers for content and lead changes.
- [ ] Add Storage policy documentation and bucket expectations for `public-media` and `private-exports` without exposing private exports publicly.
- [ ] Seed bilingual categories, the six services, seven industries, methodology, compliance, privacy shell, and verified company-profile facts; leave unsupported statistics disabled.
- [ ] Run database contract tests.
- [ ] If a Supabase project is already available, apply the migration, generate fresh TypeScript types, and run security/performance advisors; otherwise keep the migration ready for connection without blocking local development.
- [ ] Commit schema, policies, and seed content.

### Task 4: Authentication and protected admin shell

**Files:**
- Modify: `proxy.ts`
- Create: `lib/auth/permissions.ts`
- Create: `lib/auth/session.ts`
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/auth/callback/route.ts`
- Create: `app/admin/(protected)/layout.tsx`
- Create: `app/admin/(protected)/page.tsx`
- Create: `components/admin/AdminShell.tsx`
- Create: `components/admin/AdminNav.tsx`
- Create: `app/admin/actions.ts`
- Create: `tests/unit/permissions.test.ts`

**Interfaces:**
- Produces: `requireUser()`, `requireRole(...roles)`, `can(role, permission)`, `signInAction()`, and `signOutAction()`.

- [ ] Write failing permission-matrix tests for owner, admin, editor, and lead manager.
- [ ] Implement role permissions with deny-by-default behavior.
- [ ] Implement session verification in a server-only data-access layer; use Proxy only for optimistic redirects and locale routing.
- [ ] Build an accessible login screen and signed auth callback.
- [ ] Build the protected admin layout with responsive navigation, keyboard focus, breadcrumbs, and sign-out.
- [ ] Ensure every Server Action calls `requireRole` before reading submitted mutation data.
- [ ] Run permission tests, lint, typecheck, and an unauthenticated route check.
- [ ] Commit admin authentication and shell.

### Task 5: Typed content repository and local fallback

**Files:**
- Create: `lib/content/schema.ts`
- Create: `lib/content/repository.ts`
- Create: `lib/content/supabase-repository.ts`
- Create: `lib/content/fallback-repository.ts`
- Create: `lib/content/seed-content.ts`
- Create: `tests/unit/content-repository.test.ts`

**Interfaces:**
- Produces: `getEntryBySlug(type, locale, slug)`, `listEntries(query)`, `listFeaturedEntries(type, locale, limit)`, `listArticleCategories(locale)`, and `getSiteSettings(locale)`.
- Produces discriminated `ContentBlock` types for rich text, callout, steps, quote, statistics, FAQ, CTA, media, related content, and document download.

- [ ] Write failing repository contract tests shared by the Supabase and fallback implementations.
- [ ] Define Zod schemas for every structured block and localized entry.
- [ ] Convert company-profile facts into bilingual seed content and correct the existing Arabic/English marketing copy without inventing performance claims.
- [ ] Implement a fallback repository so the public site builds and previews without remote credentials.
- [ ] Implement the Supabase repository with published-only public queries and stable result ordering.
- [ ] Run repository tests and typecheck.
- [ ] Commit the public content domain.

### Task 6: Administration content, media, and publishing workflow

**Files:**
- Create: `app/admin/(protected)/content/page.tsx`
- Create: `app/admin/(protected)/content/new/page.tsx`
- Create: `app/admin/(protected)/content/[id]/page.tsx`
- Create: `app/admin/(protected)/content/actions.ts`
- Create: `components/admin/EntryEditor.tsx`
- Create: `components/admin/LocalizedFields.tsx`
- Create: `components/admin/BlockEditor.tsx`
- Create: `components/admin/SeoFields.tsx`
- Create: `app/admin/(protected)/media/page.tsx`
- Create: `app/admin/(protected)/media/actions.ts`
- Create: `app/api/admin/preview/route.ts`
- Create: `tests/unit/content-actions.test.ts`

**Interfaces:**
- Produces authorized create, update, review, schedule, publish, archive, upload, and preview actions.

- [ ] Write failing action tests for invalid locale content, duplicate slugs, editor publish denial, missing image alt text, and invalid scheduling.
- [ ] Implement list filters by type, status, locale completeness, author, and date.
- [ ] Implement side-by-side localized metadata with the structured block editor.
- [ ] Implement SEO title/description counters and search/social preview.
- [ ] Implement media upload metadata and reject public images without Arabic and English alt text.
- [ ] Implement signed draft preview and tagged revalidation after publish/archive.
- [ ] Record content mutations in audit logs.
- [ ] Run action tests, lint, and typecheck.
- [ ] Commit the CMS publishing workflow.

### Task 7: Durable lead capture and lead administration

**Files:**
- Replace: `app/api/contact/route.ts`
- Replace: `components/sections/ContactForm.tsx`
- Create: `lib/leads/schema.ts`
- Create: `lib/leads/submit.ts`
- Create: `lib/leads/attribution.ts`
- Create: `app/admin/(protected)/leads/page.tsx`
- Create: `app/admin/(protected)/leads/[id]/page.tsx`
- Create: `app/admin/(protected)/leads/actions.ts`
- Create: `app/admin/(protected)/leads/export/route.ts`
- Create: `tests/unit/lead-schema.test.ts`
- Create: `tests/unit/lead-actions.test.ts`

**Interfaces:**
- Produces `LeadInput`, `submitLead(input, context)`, status transitions, note creation, assignment, and role-limited CSV export.

- [ ] Write failing validation tests for missing consent, malformed contact details, oversized messages, honeypot submissions, and sensitive query-string attribution.
- [ ] Implement normalized validation, consent timestamping, server-side attribution allowlisting, and hashed-IP spam throttling without storing raw IP addresses.
- [ ] Store the lead before sending notification email; return success only after durable storage.
- [ ] Implement a public bilingual form with service interest, company, phone/email, preferred contact, privacy consent, error summary, and accessible progress states.
- [ ] Implement lead list filters and lead detail with status, assignee, source, notes, and audit history.
- [ ] Implement CSV export authorization and neutralize spreadsheet-formula prefixes.
- [ ] Keep WhatsApp, phone, and email as secondary tracked contact actions.
- [ ] Run lead tests, lint, and typecheck.
- [ ] Commit lead capture and management.

### Task 8: Locale routes, canonical host, and SEO primitives

**Files:**
- Modify: `i18n/routing.ts`
- Modify: `i18n/navigation.ts`
- Modify: `proxy.ts`
- Replace: `lib/seo.ts`
- Replace: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Modify: `app/manifest.ts`
- Create: `app/page.tsx`
- Create: `components/seo/Breadcrumbs.tsx`
- Create: `lib/seo/schema.ts`
- Create: `tests/unit/seo.test.ts`

**Interfaces:**
- Produces localized URL helpers, metadata builders, breadcrumb data, and Organization/WebSite/WebPage/Service/Article schema builders.

- [ ] Write failing tests for `/ar` and `/en` canonicals, reciprocal self-referencing hreflang, `x-default`, www host consistency, and legacy redirects.
- [ ] Change routing to explicit locale prefixes and implement the accessible language gateway.
- [ ] Add permanent redirects for `/debt`, `/about`, `/contact`, and other legacy Arabic routes.
- [ ] Build metadata helpers that never emit obsolete visa/travel text.
- [ ] Build published-content sitemaps with real modification dates and self-inclusive alternates.
- [ ] Implement visible breadcrumbs and schema that exactly matches visible verified content.
- [ ] Run SEO tests, lint, typecheck, and inspect rendered head output.
- [ ] Commit international SEO and route migration.

### Task 9: New design system, global layout, and homepage

**Files:**
- Replace: `app/globals.css`
- Modify: `lib/fonts.ts`
- Replace: `components/layout/Header.tsx`
- Replace: `components/layout/Footer.tsx`
- Modify: `components/layout/LanguageSwitcher.tsx`
- Replace: `components/sections/Hero.tsx`
- Create: `components/sections/TrustRail.tsx`
- Create: `components/sections/ServiceIndex.tsx`
- Create: `components/sections/IndustryIndex.tsx`
- Create: `components/sections/RecoveryPath.tsx`
- Create: `components/sections/ComplianceStatement.tsx`
- Create: `components/sections/InsightsPreview.tsx`
- Replace: `app/[locale]/page.tsx`
- Create: `tests/components/header.test.tsx`

**Interfaces:**
- Produces the Sovereign Resolution visual tokens and reusable public-site section patterns.

- [ ] Write failing header tests for locale navigation, keyboard-accessible menus, CTA, and active route state.
- [ ] Define color, type, spacing, surface, focus, shadow, and motion tokens with WCAG-safe combinations.
- [ ] Build the new responsive header and mega menus with crawlable links and touch/keyboard support.
- [ ] Build the homepage flow from the approved spec using repository data.
- [ ] Preserve reduced-motion behavior and minimize client hydration.
- [ ] Build the new footer with complete service, industry, content, and legal navigation.
- [ ] Run component tests, lint, typecheck, and responsive visual inspection.
- [ ] Commit the new visual system and homepage.

### Task 10: Services, industries, methodology, compliance, and about pages

**Files:**
- Create: `app/[locale]/services/page.tsx`
- Create: `app/[locale]/services/[slug]/page.tsx`
- Create: `app/[locale]/industries/page.tsx`
- Create: `app/[locale]/industries/[slug]/page.tsx`
- Create: `app/[locale]/how-we-work/page.tsx`
- Create: `app/[locale]/compliance-and-confidentiality/page.tsx`
- Replace: `app/[locale]/about/page.tsx`
- Create: `components/content/ContentBlocks.tsx`
- Create: `components/content/RelatedEntries.tsx`
- Create: `tests/unit/public-routes.test.ts`

**Interfaces:**
- Consumes the content repository, metadata, structured blocks, and related-entry model.
- Produces dynamic localized service and industry routes with static parameters.

- [ ] Write failing route tests for all six services, seven industries, both locales, and unknown-slug 404 behavior.
- [ ] Implement service and industry hubs.
- [ ] Implement reusable detail templates with breadcrumbs, FAQs, related content, and lead CTAs.
- [ ] Implement the eight-step methodology from evaluation through enforcement and closure.
- [ ] Implement the compliance/confidentiality page without presenting the website as legal advice.
- [ ] Rewrite the About page around chronology, values, regional experience, and verified credentials.
- [ ] Run route tests, lint, typecheck, and build.
- [ ] Commit service and authority pages.

### Task 11: Articles, categories, authors, case studies, FAQ, contact, and legal pages

**Files:**
- Create: `app/[locale]/insights/page.tsx`
- Create: `app/[locale]/insights/[slug]/page.tsx`
- Create: `app/[locale]/insights/category/[slug]/page.tsx`
- Create: `app/[locale]/insights/author/[slug]/page.tsx`
- Create: `app/[locale]/case-studies/page.tsx`
- Create: `app/[locale]/case-studies/[slug]/page.tsx`
- Create: `app/[locale]/faq/page.tsx`
- Replace: `app/[locale]/contact/page.tsx`
- Create: `app/[locale]/privacy/page.tsx`
- Create: `app/[locale]/terms/page.tsx`
- Create: `app/[locale]/disclaimer/page.tsx`
- Create: `components/content/ArticleBody.tsx`
- Create: `components/content/TableOfContents.tsx`
- Create: `tests/unit/article-schema.test.ts`

**Interfaces:**
- Produces indexable article, category, author, case-study, FAQ, contact, and legal templates.

- [ ] Write failing article-schema tests for headline, image, dates, author, publisher, locale, canonical URL, and visible/schema parity.
- [ ] Implement article listing, pagination-ready queries, categories, authors, table of contents, related reading, and Article JSON-LD.
- [ ] Implement case studies with anonymization controls and evidence-gated metrics.
- [ ] Implement the FAQ hub and visible FAQ schema.
- [ ] Implement contact and legal pages with privacy consent language and accurate company facts.
- [ ] Seed an initial bilingual editorial roadmap without publishing unsupported case studies.
- [ ] Run tests, lint, typecheck, and build.
- [ ] Commit the complete public content system.

### Task 12: Analytics contract, accessibility, performance, and release verification

**Files:**
- Create: `lib/analytics/events.ts`
- Create: `components/analytics/TrackableLink.tsx`
- Create: `tests/e2e/public-site.spec.ts`
- Create: `tests/e2e/admin-auth.spec.ts`
- Create: `tests/e2e/lead-form.spec.ts`
- Modify: `README.md`
- Modify: `.env.example`
- Create: `docs/operations/content-workflow.md`
- Create: `docs/operations/lead-privacy.md`
- Create: `docs/operations/deployment-checklist.md`

**Interfaces:**
- Produces privacy-safe event names and the final release checklist.

- [ ] Write event-contract tests proving lead field values never enter analytics payloads.
- [ ] Implement events for CTA, form start, successful lead, WhatsApp, phone, download, language change, and article engagement.
- [ ] Write Playwright journeys for both locales, keyboard navigation, service/article discovery, form validation, successful configured lead storage, admin redirect, and role denial.
- [ ] Run lint, typecheck, all unit tests, production build, and Playwright tests.
- [ ] Inspect mobile widths 360, 390, and 768 pixels plus desktop; fix overflow, focus, contrast, and reduced-motion issues.
- [ ] Validate rendered canonical, hreflang, robots, sitemap, and JSON-LD output.
- [ ] Update README and operating guides with exact setup, Supabase migration, admin invitation, content workflow, backup, privacy, deployment, and rollback steps.
- [ ] Review the final diff without modifying the user's pre-existing SectionHeading change.
- [ ] Commit final verification and operational documentation.

