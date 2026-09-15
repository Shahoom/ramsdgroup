import { NextResponse, type NextRequest } from "next/server";
import { leadInputSchema, sanitizeAttribution } from "@/lib/leads/schema";
import { submitLead } from "@/lib/leads/submit";

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json() as Record<string, unknown>;
    if (raw.website) return NextResponse.json({ ok: true }, { status: 202 });
    const parsed = leadInputSchema.safeParse(raw);
    if (!parsed.success) return NextResponse.json({ ok: false, error: "validation", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
    const attribution = sanitizeAttribution(raw);
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const referrer = request.headers.get("referer");
    const result = await submitLead(parsed.data, { ip: forwarded, userAgent: request.headers.get("user-agent"), landingPath: typeof raw.landingPath === "string" ? raw.landingPath : undefined, referrerHost: referrer ? new URL(referrer).host : undefined, ...attribution });
    if (!result.ok) return NextResponse.json({ ok: false, error: result.reason }, { status: 429 });
    return NextResponse.json({ ok: true, id: result.id }, { status: 201 });
  } catch (error) {
    console.error("[lead] submission failed", error);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
}
