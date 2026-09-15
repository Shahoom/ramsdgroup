insert into public.categories (slug, name_ar, name_en, description_ar, description_en) values
  ('debt-recovery', 'تحصيل الديون', 'Debt Recovery', 'إرشادات عملية لتحصيل المستحقات وإدارة الذمم.', 'Practical guidance for receivables and debt recovery.'),
  ('risk-compliance', 'المخاطر والامتثال', 'Risk & Compliance', 'محتوى حول السرية والحوكمة ومسارات التصعيد.', 'Guidance on confidentiality, governance, and escalation.'),
  ('business-advisory', 'استشارات الأعمال', 'Business Advisory', 'تحسين إجراءات الاسترداد واتخاذ القرار.', 'Improving recovery operations and decision-making.')
on conflict (slug) do nothing;

insert into public.site_settings (locale, key, value, is_public) values
  ('ar', 'company_facts', '{"established":"2018","experience_since":"2012","location":"مسقط، سلطنة عُمان","scope":"سلطنة عُمان والمنطقة وخدمات دولية"}', true),
  ('en', 'company_facts', '{"established":"2018","experience_since":"2012","location":"Muscat, Sultanate of Oman","scope":"Oman, the region, and international services"}', true),
  ('ar', 'claims_policy', '{"unsupported_metrics":false,"unverified_testimonials":false}', true),
  ('en', 'claims_policy', '{"unsupported_metrics":false,"unverified_testimonials":false}', true)
on conflict (locale, key) do update set value = excluded.value, is_public = excluded.is_public;
