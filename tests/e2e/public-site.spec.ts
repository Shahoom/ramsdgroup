import { expect, test } from "@playwright/test";

test("root resolves to the explicit Arabic locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/ar$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("تحصيل مستحقاتك");
});

test("English navigation and service discovery work", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Recover what is due");
  const menu = page.getByRole("button", { name: "Open menu" });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole("link", { name: "Services", exact: true }).filter({ visible: true }).first().click();
  await expect(page).toHaveURL(/\/en\/services$/);
  await page.locator('main a[href$="/services/commercial-debt-collection"]').first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Commercial debt collection");
});

test("mobile menu exposes primary navigation", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "Mobile-only interaction");
  await page.goto("/ar");
  await page.getByRole("button", { name: "فتح القائمة" }).click();
  await expect(page.getByRole("link", { name: "منهجية العمل", exact: true }).last()).toBeVisible();
});

test("contact form enforces consent and contact validity", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Send request securely" }).click();
  await expect(page.getByLabel("Full name")).toBeFocused();
});
