"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requirePermission } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const statusSchema = z.enum(["new", "contacted", "qualified", "closed", "spam"]);

export async function updateLeadStatus(formData: FormData) {
  await requirePermission("leads:write");
  const id = z.uuid().parse(formData.get("id"));
  const status = statusSchema.parse(formData.get("status"));
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) throw error;
  revalidatePath(`/admin/leads/${id}`); revalidatePath("/admin/leads");
}

export async function addLeadNote(formData: FormData) {
  const session = await requirePermission("leads:write");
  const leadId = z.uuid().parse(formData.get("leadId"));
  const body = z.string().trim().min(1).max(5000).parse(formData.get("body"));
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("lead_notes").insert({ lead_id: leadId, body, created_by: session.userId });
  if (error) throw error;
  revalidatePath(`/admin/leads/${leadId}`);
}
