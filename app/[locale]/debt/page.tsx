import { permanentRedirect } from "next/navigation";
import type { Locale } from "@/i18n/routing";
export default async function LegacyDebtPage({ params }: { params: Promise<{ locale: Locale }> }) { const { locale } = await params; permanentRedirect(`/${locale}/services`); }
