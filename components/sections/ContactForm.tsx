"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Info, Send, CheckCircle2, AlertCircle, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type Field = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<Field, boolean>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const t = useTranslations("contact");
  const tf = useTranslations("contact.form");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Errors>({});
  const formRef = React.useRef<HTMLFormElement>(null);

  function collectValues() {
    if (!formRef.current) return null;
    const data = new FormData(formRef.current);
    return {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      company: String(data.get("company") ?? ""),
    };
  }

  function validate(values: ReturnType<typeof collectValues>) {
    if (!values) return false;
    const nextErrors: Errors = {
      name: !values.name,
      email: !EMAIL_RE.test(values.email),
      subject: !values.subject,
      message: !values.message,
    };
    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  }

  async function onSubmitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = collectValues();
    if (!validate(values) || !values) return;
    if (values.company) { setStatus("success"); return; } // honeypot

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  function onSendWhatsApp() {
    const values = collectValues();
    if (!validate(values) || !values) return;
    const text = [
      `*${values.name}*`,
      values.email ? `Email: ${values.email}` : "",
      values.phone ? `Phone: ${values.phone}` : "",
      `Subject: ${values.subject}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}&text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("success");
    formRef.current?.reset();
  }

  const field =
    "peer w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-transparent focus:border-gold-400";
  const labelCls = "mb-1.5 block text-sm font-medium text-muted";

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 shadow-elevated sm:p-9">
      <h2 className="text-2xl font-bold">{t("formHeading")}</h2>
      <p className="mt-2 text-muted">{t("formSub")}</p>

      <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-gold-400/10 px-4 py-3 text-sm text-gold-700 dark:text-gold-200">
        <Info className="mt-0.5 size-4 shrink-0" />
        {t("notice")}
      </p>

      {status === "success" ? (
        <div
          role="status"
          className="mt-6 flex items-center gap-3 rounded-2xl border border-navy-500/30 bg-navy-500/10 px-5 py-6 text-navy-700 dark:text-navy-200"
        >
          <CheckCircle2 className="size-6 shrink-0" />
          <p className="font-medium">{tf("success")}</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmitEmail} noValidate className="mt-6 space-y-5">
          {/* honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelCls}>
                {tf("name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={errors.name || undefined}
                aria-describedby={errors.name ? "name-err" : undefined}
                className={cn(field, errors.name && "border-red-500 focus:border-red-500")}
              />
              {errors.name && (
                <p id="name-err" className="mt-1.5 text-sm text-red-600">
                  {tf("errors.name")}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelCls}>
                {tf("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                aria-invalid={errors.email || undefined}
                aria-describedby={errors.email ? "email-err" : undefined}
                className={cn(field, errors.email && "border-red-500 focus:border-red-500")}
              />
              {errors.email && (
                <p id="email-err" className="mt-1.5 text-sm text-red-600">
                  {tf("errors.email")}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelCls}>
                {tf("phone")}{" "}
                <span className="font-normal text-muted/70">({tf("optional")})</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                dir="ltr"
                autoComplete="tel"
                className={field}
              />
            </div>

            <div>
              <label htmlFor="subject" className={labelCls}>
                {tf("subject")}
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                aria-invalid={errors.subject || undefined}
                aria-describedby={errors.subject ? "subject-err" : undefined}
                className={cn(field, errors.subject && "border-red-500 focus:border-red-500")}
              />
              {errors.subject && (
                <p id="subject-err" className="mt-1.5 text-sm text-red-600">
                  {tf("errors.subject")}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelCls}>
              {tf("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              aria-invalid={errors.message || undefined}
              aria-describedby={errors.message ? "message-err" : undefined}
              className={cn(field, "resize-y", errors.message && "border-red-500 focus:border-red-500")}
            />
            {errors.message && (
              <p id="message-err" className="mt-1.5 text-sm text-red-600">
                {tf("errors.message")}
              </p>
            )}
          </div>

          {status === "error" && (
            <p role="alert" className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="size-4" />
              {tf("error")}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg" disabled={status === "submitting"} className="flex-1 sm:flex-none">
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  {tf("sending")}
                </>
              ) : (
                <>
                  <Send className="size-[1.05em]" />
                  {tf("submit")}
                </>
              )}
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              disabled={status === "submitting"}
              onClick={onSendWhatsApp}
              className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 sm:flex-none"
            >
              <MessageCircle className="size-[1.05em]" />
              {tf("sendWhatsApp")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
