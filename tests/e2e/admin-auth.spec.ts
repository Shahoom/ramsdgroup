import { expect, test } from "@playwright/test";

test("admin is protected and configuration absence is explicit", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByRole("heading", { name: "تسجيل دخول فريق الإدارة" })).toBeVisible();
  await expect(page.getByText("يلزم ربط متغيرات Supabase")).toBeVisible();
});
