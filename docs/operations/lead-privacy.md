# Lead privacy and handling

- The public form asks only for contact details, service interest, and a non-sensitive overview.
- Consent is mandatory and timestamped. Raw IP addresses are never stored; a salted one-way hash supports short-window abuse throttling.
- UTM attribution is allowlisted to source, medium, and campaign. Arbitrary query-string values are discarded.
- A lead is stored before an email notification is attempted. Resend is a notification channel, not the system of record.
- Access is limited to owner, admin, and lead-manager roles under RLS. CSV export is restricted to owner/admin and formula prefixes are neutralized.
- Keep debtor identity documents, account information, evidence, and case files outside the website lead system. A later CRM/case-management project must define its own retention, encryption, access, and deletion policy.
- Review retention quarterly. Fulfil access/correction/deletion requests subject to legal preservation obligations.
