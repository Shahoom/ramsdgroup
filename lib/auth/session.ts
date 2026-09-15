import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { can, type Permission, type StaffRole } from "@/lib/auth/permissions";
import { isSupabaseConfigured } from "@/lib/env";

export const getStaffSession = cache(async () => {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  const { data: claimsData, error } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (error || !userId) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, role, is_active")
    .eq("id", userId)
    .eq("is_active", true)
    .maybeSingle();

  if (!profile) return null;
  return { userId, displayName: profile.display_name, role: profile.role as StaffRole };
});

export async function requireUser() {
  const session = await getStaffSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function requirePermission(permission: Permission) {
  const session = await requireUser();
  if (!can(session.role, permission)) redirect("/admin?denied=1");
  return session;
}

export async function requireRole(...roles: StaffRole[]) {
  const session = await requireUser();
  if (!roles.includes(session.role)) redirect("/admin?denied=1");
  return session;
}
