# RAM Sustainable Development Platform

Premium bilingual website and control center for RAM Sustainable Development. The platform covers commercial debt collection, amicable settlements, legal and international recovery, field collection, and corporate recovery advisory. It deliberately excludes CRM and debtor case management.

## Platform

- Next.js 16.3.5, React 19, TypeScript, Tailwind CSS 4, next-intl.
- Explicit Arabic and English routes under `/ar` and `/en`.
- Supabase Postgres/Auth/Storage schema with RLS, audit logs, publishing roles, and lead management.
- Durable lead capture with consent, allowlisted attribution, hashed-IP throttling, and optional Resend notifications.
- Custom admin at `/admin`: content, bilingual articles, publishing workflow, media rules, leads, notes, status changes, and guarded CSV export.
- SEO: canonical www host, reciprocal hreflang, x-default, metadata, JSON-LD, robots, and a complete localized sitemap.

## Local setup

```bash
npm ci
copy .env.example .env.local
npm run dev
```

The public site builds without Supabase. Lead submission and the protected admin require the environment values in `.env.example`.

## Supabase setup

1. Create a dedicated RAM Supabase project in a suitable region.
2. Apply `supabase/migrations/20260915000100_platform_schema.sql`, then `supabase/seed.sql`.
3. Create Storage buckets `public-media` (public) and `private-exports` (private); enforce the policy contract documented in the migration.
4. Add the project URL, publishable key, and server-only secret key to `.env.local` and deployment settings.
5. Invite a user through Supabase Auth, then insert their `profiles` row with role `owner`. Never grant roles from user-editable metadata.

Example owner profile after the Auth user exists:

```sql
insert into public.profiles (id, display_name, role)
values ('AUTH_USER_UUID', 'RAM Owner', 'owner');
```

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm audit --omit=dev
```

Playwright uses port `3100` and tests both Desktop Chrome and an iPhone-sized Chromium viewport.

## Content and claims

Fallback content in `lib/content/seed-content.ts` is based on the supplied company profile and allows local previews before the database is connected. Unsupported performance statistics, licences, recovery guarantees, testimonials, and case-study outcomes are not published. Add such claims only after documentary verification and approval.

See `docs/operations/` for publishing, privacy, deployment, backup, and rollback procedures.
