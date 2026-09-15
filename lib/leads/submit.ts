import "server-only";

import { createHash } from "node:crypto";
import { Resend } from "resend";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SITE } from "@/lib/site";
import type { LeadInput } from "@/lib/leads/schema";

type Context = { ip: string; userAgent: string | null; landingPath?: string; referrerHost?: string; source?: string; medium?: string; campaign?: string };

export async function submitLead(input: LeadInput, context: Context) {
  const supabase = createSupabaseAdminClient();
  const salt = process.env.LEAD_HASH_SALT || process.env.SUPABASE_SECRET_KEY || "ram-lead-throttle";
  const ipHash = createHash("sha256").update(`${salt}:${context.ip}`).digest("hex");
  const since = new Date(Date.now() - 10 * 60_000).toISOString();
  const { count } = await supabase.from("leads").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
  if ((count ?? 0) >= 5) return { ok: false as const, reason: "rate_limited" as const };

  const { data: lead, error } = await supabase.from("leads").insert({
    full_name: input.fullName,
    company: input.company || null,
    email: input.email || null,
    phone: input.phone || null,
    service_interest: input.serviceInterest || null,
    preferred_contact: input.preferredContact,
    message: input.message,
    locale: input.locale,
    consented_at: new Date().toISOString(),
    source: context.source || null,
    medium: context.medium || null,
    campaign: context.campaign || null,
    landing_path: context.landingPath?.slice(0, 300) || null,
    referrer_host: context.referrerHost?.slice(0, 180) || null,
    ip_hash: ipHash,
    user_agent: context.userAgent?.slice(0, 500) || null,
  }).select("id").single();
  if (error || !lead) throw new Error("Lead storage failed");

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "RAM Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL || SITE.email,
      replyTo: input.email || undefined,
      subject: `[RAM Lead] ${input.fullName} — ${input.serviceInterest || "General inquiry"}`,
      text: `Lead ID: ${lead.id}\nName: ${input.fullName}\nCompany: ${input.company || "—"}\nEmail: ${input.email || "—"}\nPhone: ${input.phone || "—"}\nPreferred: ${input.preferredContact}\n\n${input.message}`,
    });
  }
  return { ok: true as const, id: lead.id };
}
