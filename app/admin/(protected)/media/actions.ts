"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requirePermission } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const altSchema = z.string().trim().min(3).max(300);

export async function uploadMediaAction(formData: FormData) {
  const session = await requirePermission("content:write");
  const altAr = altSchema.parse(formData.get("altAr")); const altEn = altSchema.parse(formData.get("altEn")); const file = formData.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/") || file.size <= 0 || file.size > 8_000_000) throw new Error("Upload a valid image smaller than 8 MB.");
  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin"; const path = `${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extension}`;
  const supabase = await createSupabaseServerClient();
  const { error: uploadError } = await supabase.storage.from("public-media").upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false }); if (uploadError) throw uploadError;
  const { error } = await supabase.from("media_assets").insert({ bucket: "public-media", path, mime_type: file.type, byte_size: file.size, alt_ar: altAr, alt_en: altEn, created_by: session.userId }); if (error) throw error;
  revalidatePath("/admin/media");
}
