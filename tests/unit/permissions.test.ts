import { describe, expect, it } from "vitest";

import { can, type Permission, type StaffRole } from "@/lib/auth/permissions";

const expected: Record<StaffRole, Permission[]> = {
  owner: ["content:read", "content:write", "content:publish", "leads:read", "leads:write", "leads:export", "users:manage", "settings:manage"],
  admin: ["content:read", "content:write", "content:publish", "leads:read", "leads:write", "leads:export", "settings:manage"],
  editor: ["content:read", "content:write"],
  lead_manager: ["leads:read", "leads:write"],
};

describe("role permissions", () => {
  it.each(Object.entries(expected) as [StaffRole, Permission[]][])("allows exactly the expected permissions for %s", (role, permissions) => {
    const all: Permission[] = ["content:read", "content:write", "content:publish", "leads:read", "leads:write", "leads:export", "users:manage", "settings:manage"];
    for (const permission of all) expect(can(role, permission)).toBe(permissions.includes(permission));
  });

  it("denies missing roles", () => expect(can(null, "content:read")).toBe(false));
});
