-- RAM bilingual publishing and lead-management platform.
-- Apply through the Supabase migration runner. Never expose the secret key.
create extension if not exists pgcrypto;

create type public.staff_role as enum ('owner', 'admin', 'editor', 'lead_manager');
create type public.content_type as enum ('page', 'service', 'industry', 'article', 'case_study', 'legal');
create type public.content_status as enum ('draft', 'review', 'scheduled', 'published', 'archived');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'closed', 'spam');
create type public.locale_code as enum ('ar', 'en');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role public.staff_role not null default 'editor',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.authors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name_ar text not null,
  name_en text not null,
  bio_ar text,
  bio_en text,
  image_path text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_entries (
  id uuid primary key default gen_random_uuid(),
  type public.content_type not null,
  status public.content_status not null default 'draft',
  author_id uuid references public.authors(id) on delete set null,
  featured boolean not null default false,
  claims_verified boolean not null default false,
  published_at timestamptz,
  scheduled_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint valid_publish_state check (
    (status = 'published' and published_at is not null)
    or status <> 'published'
  ),
  constraint valid_schedule_state check (
    (status = 'scheduled' and scheduled_at is not null)
    or status <> 'scheduled'
  )
);

create table public.content_translations (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.content_entries(id) on delete cascade,
  locale public.locale_code not null,
  slug text not null check (length(slug) between 1 and 160),
  title text not null check (length(title) between 1 and 180),
  excerpt text not null default '',
  body jsonb not null default '[]'::jsonb check (jsonb_typeof(body) = 'array'),
  seo_title text check (char_length(seo_title) <= 70),
  seo_description text check (char_length(seo_description) <= 180),
  social_image_path text,
  image_alt text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (entry_id, locale),
  unique (locale, slug)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ar text not null,
  name_en text not null,
  description_ar text,
  description_en text,
  created_at timestamptz not null default now()
);

create table public.entry_categories (
  entry_id uuid not null references public.content_entries(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  primary key (entry_id, category_id)
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  locale public.locale_code not null,
  question text not null,
  answer text not null,
  entry_id uuid references public.content_entries(id) on delete cascade,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  locale public.locale_code not null,
  quote text not null,
  attribution text,
  organization text,
  verified boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null check (bucket in ('public-media', 'private-exports')),
  path text not null,
  mime_type text not null,
  byte_size bigint not null check (byte_size > 0),
  alt_ar text,
  alt_en text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (bucket, path),
  constraint public_media_has_alt check (
    bucket <> 'public-media' or (nullif(trim(alt_ar), '') is not null and nullif(trim(alt_en), '') is not null)
  )
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  locale public.locale_code not null,
  key text not null,
  value jsonb not null,
  is_public boolean not null default false,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now(),
  unique (locale, key)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  status public.lead_status not null default 'new',
  full_name text not null,
  company text,
  email text,
  phone text,
  service_interest text,
  preferred_contact text check (preferred_contact in ('phone', 'email', 'whatsapp')),
  message text not null,
  locale public.locale_code not null,
  consented_at timestamptz not null,
  source text,
  medium text,
  campaign text,
  landing_path text,
  referrer_host text,
  ip_hash text,
  user_agent text,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lead_contact_required check (email is not null or phone is not null)
);

create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 5000),
  created_by uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  table_name text not null,
  record_id text not null,
  action text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index content_entries_public_idx on public.content_entries(type, status, published_at desc);
create index content_translations_lookup_idx on public.content_translations(locale, slug);
create index leads_created_idx on public.leads(created_at desc);
create index leads_status_idx on public.leads(status, created_at desc);
create index lead_notes_lead_idx on public.lead_notes(lead_id, created_at desc);

create or replace function public.current_staff_role()
returns public.staff_role
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = (select auth.uid()) and is_active = true
$$;

create or replace function public.is_staff(allowed public.staff_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_staff_role() = any(allowed), false)
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated before update on public.profiles for each row execute function public.set_updated_at();
create trigger authors_updated before update on public.authors for each row execute function public.set_updated_at();
create trigger content_entries_updated before update on public.content_entries for each row execute function public.set_updated_at();
create trigger content_translations_updated before update on public.content_translations for each row execute function public.set_updated_at();
create trigger faqs_updated before update on public.faqs for each row execute function public.set_updated_at();
create trigger site_settings_updated before update on public.site_settings for each row execute function public.set_updated_at();
create trigger leads_updated before update on public.leads for each row execute function public.set_updated_at();

create or replace function public.audit_change()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.audit_logs(actor_id, table_name, record_id, action, before_data, after_data)
  values ((select auth.uid()), tg_table_name, coalesce(new.id, old.id)::text, tg_op,
    case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) end,
    case when tg_op in ('INSERT','UPDATE') then to_jsonb(new) end);
  return coalesce(new, old);
end;
$$;

create trigger content_entries_audit after insert or update or delete on public.content_entries for each row execute function public.audit_change();
create trigger content_translations_audit after insert or update or delete on public.content_translations for each row execute function public.audit_change();
create trigger leads_audit after insert or update or delete on public.leads for each row execute function public.audit_change();
create trigger lead_notes_audit after insert or update or delete on public.lead_notes for each row execute function public.audit_change();

alter table public.profiles enable row level security;
alter table public.content_entries enable row level security;
alter table public.content_translations enable row level security;
alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.entry_categories enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.audit_logs enable row level security;

create policy "published entries are public" on public.content_entries for select using (status = 'published' and published_at <= now());
create policy "staff read entries" on public.content_entries for select to authenticated using (public.is_staff(array['owner','admin','editor']::public.staff_role[]));
create policy "editors create entries" on public.content_entries for insert to authenticated with check (public.is_staff(array['owner','admin','editor']::public.staff_role[]));
create policy "staff update entries" on public.content_entries for update to authenticated using (public.is_staff(array['owner','admin','editor']::public.staff_role[])) with check ((status <> 'published' and public.is_staff(array['owner','admin','editor']::public.staff_role[])) or public.is_staff(array['owner','admin']::public.staff_role[]));
create policy "admins delete entries" on public.content_entries for delete to authenticated using (public.is_staff(array['owner','admin']::public.staff_role[]));

create policy "published translations are public" on public.content_translations for select using (exists (select 1 from public.content_entries e where e.id = entry_id and e.status = 'published' and e.published_at <= now()));
create policy "content staff manage translations" on public.content_translations for all to authenticated using (public.is_staff(array['owner','admin','editor']::public.staff_role[])) with check (public.is_staff(array['owner','admin','editor']::public.staff_role[]));
create policy "public authors" on public.authors for select using (is_public = true);
create policy "content staff manage authors" on public.authors for all to authenticated using (public.is_staff(array['owner','admin','editor']::public.staff_role[])) with check (public.is_staff(array['owner','admin','editor']::public.staff_role[]));
create policy "categories are public" on public.categories for select using (true);
create policy "content staff manage categories" on public.categories for all to authenticated using (public.is_staff(array['owner','admin','editor']::public.staff_role[])) with check (public.is_staff(array['owner','admin','editor']::public.staff_role[]));
create policy "published entry categories public" on public.entry_categories for select using (exists (select 1 from public.content_entries e where e.id = entry_id and e.status = 'published'));
create policy "content staff manage entry categories" on public.entry_categories for all to authenticated using (public.is_staff(array['owner','admin','editor']::public.staff_role[])) with check (public.is_staff(array['owner','admin','editor']::public.staff_role[]));
create policy "published faqs are public" on public.faqs for select using (is_published = true);
create policy "content staff manage faqs" on public.faqs for all to authenticated using (public.is_staff(array['owner','admin','editor']::public.staff_role[])) with check (public.is_staff(array['owner','admin','editor']::public.staff_role[]));
create policy "verified testimonials are public" on public.testimonials for select using (is_published = true and verified = true);
create policy "admins manage testimonials" on public.testimonials for all to authenticated using (public.is_staff(array['owner','admin']::public.staff_role[])) with check (public.is_staff(array['owner','admin']::public.staff_role[]));
create policy "public media metadata" on public.media_assets for select using (bucket = 'public-media');
create policy "content staff manage media" on public.media_assets for all to authenticated using (public.is_staff(array['owner','admin','editor']::public.staff_role[])) with check (public.is_staff(array['owner','admin','editor']::public.staff_role[]));
create policy "public site settings" on public.site_settings for select using (is_public = true);
create policy "admins manage settings" on public.site_settings for all to authenticated using (public.is_staff(array['owner','admin']::public.staff_role[])) with check (public.is_staff(array['owner','admin']::public.staff_role[]));
create policy "lead staff read leads" on public.leads for select to authenticated using (public.is_staff(array['owner','admin','lead_manager']::public.staff_role[]));
create policy "lead staff update leads" on public.leads for update to authenticated using (public.is_staff(array['owner','admin','lead_manager']::public.staff_role[])) with check (public.is_staff(array['owner','admin','lead_manager']::public.staff_role[]));
create policy "lead staff read notes" on public.lead_notes for select to authenticated using (public.is_staff(array['owner','admin','lead_manager']::public.staff_role[]));
create policy "lead staff create notes" on public.lead_notes for insert to authenticated with check (public.is_staff(array['owner','admin','lead_manager']::public.staff_role[]) and created_by = (select auth.uid()));
create policy "owners and admins read audit" on public.audit_logs for select to authenticated using (public.is_staff(array['owner','admin']::public.staff_role[]));
create policy "users read own profile" on public.profiles for select to authenticated using (id = (select auth.uid()) or public.is_staff(array['owner','admin']::public.staff_role[]));
create policy "owners manage profiles" on public.profiles for all to authenticated using (public.is_staff(array['owner']::public.staff_role[])) with check (public.is_staff(array['owner']::public.staff_role[]));

-- Explicit API grants required by new Supabase projects. RLS still governs rows.
grant usage on schema public to anon, authenticated;
grant select on public.content_entries, public.content_translations, public.authors, public.categories, public.entry_categories, public.faqs, public.testimonials, public.media_assets, public.site_settings to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Storage contract:
-- 1. Create public-media as a public bucket and restrict writes to content staff.
-- 2. Create private-exports as a private bucket; access only through short-lived signed URLs.
-- 3. Never add a public SELECT policy for private-exports.
