export type StaffRole = "owner" | "admin" | "editor" | "lead_manager";

export type Permission =
  | "content:read"
  | "content:write"
  | "content:publish"
  | "leads:read"
  | "leads:write"
  | "leads:export"
  | "users:manage"
  | "settings:manage";

const permissions: Record<StaffRole, ReadonlySet<Permission>> = {
  owner: new Set(["content:read", "content:write", "content:publish", "leads:read", "leads:write", "leads:export", "users:manage", "settings:manage"]),
  admin: new Set(["content:read", "content:write", "content:publish", "leads:read", "leads:write", "leads:export", "settings:manage"]),
  editor: new Set(["content:read", "content:write"]),
  lead_manager: new Set(["leads:read", "leads:write"]),
};

export function can(role: StaffRole | null | undefined, permission: Permission) {
  return role ? permissions[role]?.has(permission) ?? false : false;
}
