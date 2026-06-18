"use client";

import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "./Button";
import { LINKS } from "@/lib/site";

type Props = {
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  withIcon?: boolean;
};

export function BookingButton({ label, variant = "gold", size = "md", className, withIcon = true }: Props) {
  const t = useTranslations("common");

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
        {withIcon && <MessageCircle className="size-[1.1em]" strokeWidth={2.25} />}
        {label ?? t("bookShort")}
      </a>
    </Button>
  );
}
