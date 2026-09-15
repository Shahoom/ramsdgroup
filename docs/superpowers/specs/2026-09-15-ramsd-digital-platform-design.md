# RAM Digital Platform Redesign

## 1. Objective

Rebuild the RAM Sustainable Development website as a premium bilingual Arabic/English digital platform that explains the debt-recovery business in depth, converts qualified visitors into leads, publishes authoritative articles, and gives staff one secure administration area for content and lead management. The database and boundaries must support a later CRM project without turning this phase into a CRM.

## 2. Approved Scope

### Included

- Complete visual and content redesign of the public website.
- Arabic and English content with full RTL/LTR support.
- A custom administration area inside the Next.js application.
- Management of pages, services, industries, articles, categories, authors, FAQs, testimonials, case studies, media, navigation, global settings, and SEO fields.
- Lead capture from website forms, lead status, assignment, internal notes, source tracking, consent timestamps, and CSV export.
- Secure staff authentication and role-based access.
- Supabase Postgres, Auth, and Storage integration.
- SEO, local SEO, international SEO, structured data, XML sitemaps, social metadata, and analytics-ready events.
- A content foundation derived from the supplied company profile and the useful verified material in the current site.

### Explicitly deferred

- Full CRM pipelines, tasks, reminders, sales automation, quotations, contracts, invoicing, and debtor/case management.
- Client or debtor portals.
- Payment processing.
- Bulk email or WhatsApp campaigns.
- Automated legal decisions or legal advice.

## 3. Product Positioning

RAM is positioned as a strategic debt-recovery and financial-resolution partner, not a generic collection agency. The core promise is ethical, case-specific recovery that protects financial rights, business reputation, and commercial relationships.

### Proof and operating principles from the company profile

- Established in Oman in 2018, building on regional expertise dating to 2012 across the Gulf and Turkey.
- Case-specific strategy based on debt type, debtor circumstances, client goals, and business context.
- Coverage for banks, SMEs, corporate groups, legal entities, property businesses, healthcare organizations, private investors, and cross-border commercial entities.
- Amicable settlement is preferred before legal escalation.
- Multilingual, confidential, documented, legally compliant communication.
- Regular monitoring and reporting through closure.

Claims such as licence status, recovery rates, client counts, transfer times, and testimonials may appear publicly only when the business supplies evidence or explicitly approves the wording. Unverified claims remain disabled in the CMS.

## 4. Target Audiences

1. Finance managers and credit-control teams seeking commercial invoice recovery.
2. Banks and financial institutions managing loan, cheque, and default portfolios.
3. SME owners protecting cash flow and customer relationships.
4. Corporate groups requiring discreet large-scale recovery.
5. Law firms requiring field execution and enforcement support.
6. Real-estate and property managers recovering rent and service fees.
7. Healthcare providers recovering unpaid medical accounts sensitively.
8. International investors and businesses pursuing cross-border claims.
9. Individuals with documented personal or employment-related financial claims.

## 5. Information Architecture

The canonical production host is `https://www.ramsdgroup.com`. Both languages use explicit prefixes. The root `/` is an `x-default` language gateway that defaults to Arabic while offering English. Existing Arabic URLs redirect permanently to their new `/ar` equivalents.

```text
Language gateway (/)
├── Arabic (/ar)
│   ├── الرئيسية (/ar)
│   ├── من نحن (/ar/about)
│   ├── الخدمات (/ar/services)
│   │   ├── تحصيل الديون التجارية (/ar/services/commercial-debt-collection)
│   │   ├── التسويات الودية (/ar/services/amicable-settlements)
│   │   ├── التحصيل القانوني وتنفيذ الأحكام (/ar/services/legal-debt-recovery)
│   │   ├── التحصيل الدولي (/ar/services/international-collections)
│   │   ├── التحصيل الميداني (/ar/services/field-collection)
│   │   └── استشارات التعافي وإدارة الديون (/ar/services/recovery-advisory)
│   ├── القطاعات (/ar/industries)
│   │   ├── البنوك والمؤسسات المالية
│   │   ├── الشركات الصغيرة والمتوسطة
│   │   ├── المجموعات والشركات القابضة
│   │   ├── مكاتب المحاماة والاستشارات
│   │   ├── العقارات وإدارة الأملاك
│   │   ├── الرعاية الصحية
│   │   └── المستثمرون والأعمال الدولية
│   ├── منهجية العمل (/ar/how-we-work)
│   ├── الامتثال والسرية (/ar/compliance-and-confidentiality)
│   ├── دراسات الحالة (/ar/case-studies)
│   ├── المعرفة (/ar/insights)
│   │   ├── التصنيفات (/ar/insights/category/{slug})
│   │   ├── الكاتب (/ar/insights/author/{slug})
│   │   └── المقال (/ar/insights/{slug})
│   ├── الأسئلة الشائعة (/ar/faq)
│   ├── تواصل معنا (/ar/contact)
│   └── الصفحات القانونية
│       ├── سياسة الخصوصية (/ar/privacy)
│       ├── الشروط والأحكام (/ar/terms)
│       └── إخلاء المسؤولية (/ar/disclaimer)
└── English (/en)
    └── Mirrors every Arabic route with localized slugs and equivalent content
```

All high-value pages remain within two clicks of the homepage. Services, sectors, articles, and case studies cross-link contextually. Breadcrumbs appear on every non-home public page.

## 6. Navigation

### Header

- Home
- Services mega-menu
- Industries mega-menu
- How We Work
- Insights
- About
- Primary CTA: Request a confidential assessment
- Language switcher

### Footer

- Services
- Industries
- Knowledge and case studies
- Company and contact details
- Privacy, terms, disclaimer, sitemap
- Verified social profiles only

## 7. Public Experience

### Homepage flow

1. Clear promise: professional recovery with discretion and resolution.
2. Two actions: request an assessment and explore services.
3. Trust strip with verified credentials and coverage only.
4. Six service pathways.
5. Industries served.
6. Case-specific methodology visualized as an eight-step recovery path.
7. Amicable-first versus legal escalation explanation.
8. International capability.
9. Compliance and confidentiality commitment.
10. Verified results or case-study cards.
11. Latest insights.
12. FAQ.
13. Confidential assessment form.

### Service-page template

- Search-intent-led H1 and summary.
- Suitable client profiles and problems.
- What the service includes.
- Process and required documents.
- Amicable and legal boundaries.
- Related industries and case studies.
- FAQs and conversion block.

### Industry-page template

- Industry-specific debt scenarios.
- Operational and reputational risks.
- Recommended recovery approach.
- Relevant services, FAQs, and articles.
- Sector-specific confidential assessment form.

### Article template

- Author, credentials, reviewed-by details when legally relevant.
- Published and modified dates.
- Table of contents for long content.
- Key answer summary near the top.
- Structured headings, citations, and related service links.
- Related articles and contextual CTA.

## 8. Visual Direction: Sovereign Resolution

The visual system combines a refined legal-financial editorial tone with the human idea of negotiated resolution.

- Deep ink navy is the dominant field.
- Warm ivory and mineral gray provide reading surfaces.
- Restrained brushed gold and the logo's warm orange provide emphasis.
- A subtle plum accent references the company profile without creating a generic gradient aesthetic.
- Display typography is formal and editorial; body typography is highly legible in Arabic and English.
- Real corporate, Muscat, document, negotiation, and architectural photography replaces generic scales-of-justice imagery wherever possible.
- A single signature motion motif traces a claim from uncertainty to resolution. Motion is purposeful, sparse, and disabled for reduced-motion users.
- Layout uses strong editorial grids, oversized numerals, document-inspired rules, asymmetric compositions, and generous negative space.
- No glassmorphism, excessive gradients, decorative dashboards, or stock-lawyer clichés.

## 9. CMS and Data Model

### Core tables

- `profiles`: staff identity, display name, active state, role.
- `content_entries`: shared lifecycle for pages, services, industries, posts, case studies, and legal pages.
- `content_translations`: localized title, slug, summary, structured body blocks, and SEO fields per entry and locale.
- `authors`: public author identity and credentials.
- `categories`: localized article categories.
- `entry_categories`: article/category relationships.
- `faqs`: localized question/answer records with optional page relationships.
- `testimonials`: verified quote, attribution, approval state, and display order.
- `media_assets`: storage path, alt text per locale, dimensions, type, and focal point.
- `site_settings`: localized global content, navigation, contact facts, verified claims, and social profiles.
- `leads`: form submissions and qualification metadata.
- `lead_notes`: internal notes attached to leads.
- `audit_logs`: actor, action, entity, timestamp, and safe metadata.

### Content lifecycle

`draft → in_review → scheduled → published → archived`

Arabic and English translations have independent completeness checks but publish as one canonical entry only when required fields for both active locales are present. Preview uses signed draft access. Published pages are cacheable and revalidated after approved changes.

### Lead lifecycle

`new → contacted → qualified → proposal_sent → won | lost | spam`

This lifecycle is intentionally simple. A later CRM can add opportunities, activities, tasks, and automation without changing the original lead IDs.

### Roles

- `owner`: every administration action and staff management.
- `admin`: content, leads, settings, and publishing.
- `editor`: create and edit content; publishing requires approval.
- `lead_manager`: view and update leads and notes; cannot edit public content.

Authorization data is stored in protected application metadata and database tables, never user-editable user metadata. Every exposed Supabase table uses Row Level Security. Service-role credentials remain server-only.

## 10. Administration Experience

### Dashboard

- New leads, leads awaiting action, and lead status distribution.
- Drafts awaiting review and scheduled publications.
- Recent activity.
- Content completeness warnings for Arabic and English.

### Content modules

- Entries list with type, locale completeness, status, author, and updated date.
- Structured block editor with approved sections: rich text, callout, steps, quote, statistics, FAQ, CTA, media, related content, and document download.
- Side-by-side Arabic/English fields where useful.
- SEO preview for title and description.
- Draft preview, revision history, scheduling, and publishing.
- Media library with required alternative text.

### Leads module

- Search, filter, sort, status, assignee, source, service interest, and date.
- Lead detail with original submission, consent, attribution data, notes, and safe status history.
- CSV export limited by role and recorded in the audit log.
- No debtor financial files or sensitive case documents in this phase.

## 11. Lead Capture and Privacy

- Public forms submit to a validated Next.js Route Handler.
- The handler normalizes inputs, verifies consent, applies spam controls and rate limiting, stores the lead, records campaign attribution, and sends a notification email.
- A successful UI state is shown only after durable storage succeeds.
- WhatsApp remains a secondary direct-contact action, not the only submission path.
- Privacy notice and explicit consent are present on every form.
- Sensitive values never appear in URLs, analytics payloads, or logs.
- Retention controls and deletion procedures are documented for administrators.

## 12. SEO and Discovery

- Canonical host: `www.ramsdgroup.com`; all other host variants redirect permanently.
- Explicit `/ar` and `/en` URLs, self-canonical pages, reciprocal hreflang, and `x-default` root.
- Real modification timestamps in sitemaps; separate sitemap indexes for static pages, services, industries, posts, and case studies when volume requires it.
- Unique title, description, H1, URL, OG metadata, and image alternative text per locale.
- Structured data: `Organization`, the most specific applicable `LocalBusiness`, `WebSite`, `WebPage`, `Service`, `Article`, `BreadcrumbList`, and visible `FAQPage` content where eligible.
- No schema claims unsupported by visible content or evidence.
- Topic clusters connect debt-recovery education to relevant commercial service pages.
- Author and reviewer pages strengthen experience, expertise, authority, and trust.
- `robots.txt`, XML sitemap, social cards, and `llms.txt` are generated from published content.
- Analytics events cover CTA clicks, form starts, successful leads, WhatsApp clicks, phone clicks, downloads, language changes, and article engagement without transmitting sensitive form values.

### Initial content pillars

1. Commercial debt collection and cash-flow protection.
2. Amicable settlements and preserving business relationships.
3. Legal recovery and judgment enforcement in Oman.
4. Cross-border recovery and international claims.
5. Credit control, prevention, and sustainable debt management.

## 13. Technical Architecture

- Next.js 16 App Router and React Server Components by default.
- Tailwind CSS 4 with logical properties for RTL/LTR.
- Supabase Postgres, Auth, and Storage.
- `@supabase/ssr` for cookie-based staff sessions.
- A server-side data-access layer verifies identity and role for every protected read and mutation.
- Server Actions perform administration mutations; public lead submission uses a Route Handler.
- Public Server Components query the data source directly rather than calling internal Route Handlers.
- Tagged cache revalidation occurs after publishing.
- Zod validates form, CMS, environment, and structured-block payloads.
- Vitest covers domain logic and server utilities; Playwright covers critical public and admin flows.

## 14. Migration

1. Preserve the current production site while the new platform is developed.
2. Clean macOS metadata files and restore a deterministic Windows-compatible install.
3. Add database migrations and local seed data derived from verified company-profile material.
4. Build the administration foundation and lead capture.
5. Build the bilingual public content system and redesign.
6. Import approved current content and rewrite it for Arabic and English.
7. Create explicit 301 redirects from current routes to their localized replacements.
8. Validate canonical, hreflang, schema, sitemaps, accessibility, performance, and forms in preview.
9. Switch the canonical host and deploy.
10. Submit sitemaps and monitor Search Console, analytics, lead delivery, and crawl errors.

## 15. Quality Gates

- `npm run lint`, type checking, unit tests, production build, and end-to-end tests pass.
- No AppleDouble `._*` files remain or can be recommitted.
- No public page contains visa/travel copy or unverified claims.
- Every published page has Arabic and English content and correct reciprocal alternates.
- Every administration mutation independently verifies role authorization.
- Every exposed database table has tested RLS policies.
- Public forms resist spam, validate consent, and never lose a confirmed lead.
- Key templates meet WCAG 2.2 AA expectations.
- Mobile layouts are verified at 360px, 390px, 768px, and desktop widths.
- Core Web Vitals targets: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1 at the 75th percentile after production data is available.

