# Deployment checklist

## Before deploy

- Run lint, typecheck, unit tests, production build, Playwright, and `npm audit --omit=dev`.
- Apply the Supabase migration to the dedicated RAM project and run its security/performance advisors.
- Configure all variables from `.env.example`; keep `SUPABASE_SECRET_KEY` and `LEAD_HASH_SALT` server-only.
- Create the first Auth user and owner profile. Verify editor, publisher, lead-manager, and export permissions separately.
- Verify Resend domain and sender. Submit one controlled test lead and confirm database storage precedes notification.
- Confirm `www.ramsdgroup.com` is primary and the apex permanently redirects to www.

## Search and presentation

- Check `/ar`, `/en`, `/robots.txt`, `/sitemap.xml`, the generated Open Graph image, canonical, hreflang, and JSON-LD.
- Test 360, 390, 768, and desktop widths; keyboard navigation; focus states; RTL/LTR; reduced motion.
- Connect Search Console/Bing Webmaster Tools after DNS is live and submit the sitemap.

## Backup and rollback

- Enable Supabase database backups appropriate to the selected plan and document restoration ownership.
- Take a migration-aware backup before schema changes.
- Deploy previews first. Promote only the verified commit.
- Roll back the application to the prior deployment if needed. Use forward database migrations; do not destructively reverse production data without a tested backup and explicit approval.
