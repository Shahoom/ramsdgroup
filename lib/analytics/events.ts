export type AnalyticsEventName = "cta_click" | "form_start" | "lead_submit" | "whatsapp_click" | "phone_click" | "profile_download" | "language_change" | "article_read";
export type AnalyticsDimensions = { locale?: "ar" | "en"; placement?: string; contentType?: string; contentSlug?: string };

export function buildAnalyticsEvent(name: AnalyticsEventName, dimensions: AnalyticsDimensions = {}) {
  return { name, ...dimensions };
}

export function trackEvent(name: AnalyticsEventName, dimensions: AnalyticsDimensions = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ram:analytics", { detail: buildAnalyticsEvent(name, dimensions) }));
}
