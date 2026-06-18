import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  company?: string; // honeypot
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: pretend success for bots.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !subject || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  // Use an address on a domain you've verified in Resend. Defaults to Resend's sandbox sender.
  const from = process.env.CONTACT_FROM_EMAIL || "RAM Website <onboarding@resend.dev>";

  // Dev fallback: no API key configured → log and report a (clearly-flagged) simulated send,
  // so the form UX can be exercised locally. See README "Contact form".
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — message NOT sent. Payload:",
      { name, email, phone, subject },
    );
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[ramsdgroup.com] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nSubject: ${subject}\n\n${message}`,
      html: `
        <h2>New inquiry from ramsdgroup.com</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
