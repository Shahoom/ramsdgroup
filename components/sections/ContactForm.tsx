"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

const copy = {
  ar: { title: "اطلب تقييمًا أوليًا", sub: "أرسل ملخصًا غير حساس عن المطالبة، وسيراجع الفريق المعلومات ويتواصل معك.", name: "الاسم الكامل", company: "الشركة", email: "البريد الإلكتروني", phone: "رقم الهاتف", service: "الخدمة المطلوبة", preferred: "وسيلة التواصل المفضلة", message: "ملخص المطالبة", consent: "أوافق على معالجة بياناتي لغرض الرد على هذا الطلب وفق سياسة الخصوصية.", submit: "إرسال الطلب بأمان", success: "وصل طلبك بنجاح. سيتواصل معك فريق رام.", error: "تعذر حفظ الطلب الآن. يمكنك التواصل معنا عبر الهاتف أو واتساب." },
  en: { title: "Request an initial assessment", sub: "Share a non-sensitive overview of the claim and our team will review it and contact you.", name: "Full name", company: "Company", email: "Email", phone: "Phone", service: "Service interest", preferred: "Preferred contact", message: "Claim overview", consent: "I agree to the processing of my data to respond to this request under the privacy policy.", submit: "Send request securely", success: "Your request has been received. The RAM team will contact you.", error: "We could not store your request. Please contact us by phone or WhatsApp." },
} as const;

const services = ["commercial-debt-collection", "amicable-settlements", "legal-debt-recovery", "international-collections", "field-collection", "recovery-advisory"];

export function ContactForm() {
  const locale = useLocale() === "en" ? "en" : "ar";
  const t = copy[locale];
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, consent: data.consent === "on", locale, landingPath: window.location.pathname, utm_source: new URLSearchParams(window.location.search).get("utm_source") || undefined, utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || undefined, utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined }) });
    if (response.ok) { setState("success"); form.reset(); } else setState("error");
  }

  const input = "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-gold-400";
  return <section className="rounded-[2rem] border border-border bg-surface p-6 shadow-elevated sm:p-9"><h2 className="text-2xl font-bold">{t.title}</h2><p className="mt-2 text-muted">{t.sub}</p>{state === "success" ? <div role="status" className="mt-7 flex gap-3 rounded-2xl bg-emerald-500/10 p-5 text-emerald-700 dark:text-emerald-300"><CheckCircle2 />{t.success}</div> : <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2"><input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" /><label>{t.name}<input name="fullName" required minLength={2} className={input} autoComplete="name" /></label><label>{t.company}<input name="company" className={input} autoComplete="organization" /></label><label>{t.email}<input name="email" type="email" className={input} autoComplete="email" dir="ltr" /></label><label>{t.phone}<input name="phone" type="tel" className={input} autoComplete="tel" dir="ltr" /></label><label>{t.service}<select name="serviceInterest" className={input}><option value="">—</option>{services.map((service) => <option key={service} value={service}>{service.replaceAll("-", " ")}</option>)}</select></label><label>{t.preferred}<select name="preferredContact" required className={input}><option value="phone">Phone</option><option value="email">Email</option><option value="whatsapp">WhatsApp</option></select></label><label className="sm:col-span-2">{t.message}<textarea name="message" required minLength={10} maxLength={5000} rows={6} className={input} /></label><label className="flex items-start gap-3 text-sm sm:col-span-2"><input name="consent" type="checkbox" required className="mt-1 size-4 accent-gold-500" />{t.consent}</label>{state === "error" && <p role="alert" className="text-red-600 sm:col-span-2">{t.error}</p>}<button disabled={state === "sending"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-700 px-6 py-3 font-bold text-white disabled:opacity-60 sm:col-span-2 sm:w-fit">{state === "sending" ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}{t.submit}</button></form>}</section>;
}
