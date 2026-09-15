export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type StaffRole = "owner" | "admin" | "editor" | "lead_manager";
export type ContentType = "page" | "service" | "industry" | "article" | "case_study" | "legal";
export type ContentStatus = "draft" | "review" | "scheduled" | "published" | "archived";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "spam";
export type LocaleCode = "ar" | "en";

type Table<Row, Insert = Partial<Row>, Update = Partial<Insert>> = { Row: Row; Insert: Insert; Update: Update; Relationships: [] };
type Profile = { id: string; display_name: string; role: StaffRole; is_active: boolean; created_at: string; updated_at: string };
type Entry = { id: string; type: ContentType; status: ContentStatus; author_id: string | null; featured: boolean; claims_verified: boolean; published_at: string | null; scheduled_at: string | null; created_by: string | null; updated_by: string | null; created_at: string; updated_at: string };
type Translation = { id: string; entry_id: string; locale: LocaleCode; slug: string; title: string; excerpt: string; body: Json; seo_title: string | null; seo_description: string | null; social_image_path: string | null; image_alt: string | null; created_at: string; updated_at: string };
type Lead = { id: string; status: LeadStatus; full_name: string; company: string | null; email: string | null; phone: string | null; service_interest: string | null; preferred_contact: string | null; message: string; locale: LocaleCode; consented_at: string; source: string | null; medium: string | null; campaign: string | null; landing_path: string | null; referrer_host: string | null; ip_hash: string | null; user_agent: string | null; assigned_to: string | null; created_at: string; updated_at: string };
type LeadNote = { id: string; lead_id: string; body: string; created_by: string; created_at: string };

export type Database = { public: {
  Tables: {
    profiles: Table<Profile, Pick<Profile, "id" | "display_name"> & Partial<Profile>>;
    content_entries: Table<Entry, Pick<Entry, "type"> & Partial<Entry>>;
    content_translations: Table<Translation, Pick<Translation, "entry_id" | "locale" | "slug" | "title"> & Partial<Translation>>;
    authors: Table<{ id: string; profile_id: string | null; slug: string; name_ar: string; name_en: string; bio_ar: string | null; bio_en: string | null; image_path: string | null; is_public: boolean; created_at: string; updated_at: string }>;
    categories: Table<{ id: string; slug: string; name_ar: string; name_en: string; description_ar: string | null; description_en: string | null; created_at: string }>;
    entry_categories: Table<{ entry_id: string; category_id: string }>;
    faqs: Table<{ id: string; locale: LocaleCode; question: string; answer: string; entry_id: string | null; sort_order: number; is_published: boolean; created_at: string; updated_at: string }>;
    testimonials: Table<{ id: string; locale: LocaleCode; quote: string; attribution: string | null; organization: string | null; verified: boolean; is_published: boolean; sort_order: number; created_at: string }>;
    media_assets: Table<{ id: string; bucket: string; path: string; mime_type: string; byte_size: number; alt_ar: string | null; alt_en: string | null; created_by: string | null; created_at: string }>;
    site_settings: Table<{ id: string; locale: LocaleCode; key: string; value: Json; is_public: boolean; updated_by: string | null; updated_at: string }>;
    leads: Table<Lead, Pick<Lead, "full_name" | "message" | "locale" | "consented_at"> & Partial<Lead>>;
    lead_notes: Table<LeadNote, Pick<LeadNote, "lead_id" | "body" | "created_by"> & Partial<LeadNote>>;
    audit_logs: Table<{ id: number; actor_id: string | null; table_name: string; record_id: string; action: string; before_data: Json | null; after_data: Json | null; created_at: string }>;
  };
  Views: Record<never, never>;
  Functions: { current_staff_role: { Args: Record<PropertyKey, never>; Returns: StaffRole }; is_staff: { Args: { allowed: StaffRole[] }; Returns: boolean } };
  Enums: { staff_role: StaffRole; content_type: ContentType; content_status: ContentStatus; lead_status: LeadStatus; locale_code: LocaleCode };
  CompositeTypes: Record<never, never>;
}; };
