import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-bold text-gold-gradient sm:text-8xl">404</p>
      <h1 className="mt-6 text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
      <p className="mt-3 max-w-md text-muted">{t("body")}</p>
      <Button asChild className="mt-8">
        <Link href="/">{t("cta")}</Link>
      </Button>
    </Container>
  );
}
