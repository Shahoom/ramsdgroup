"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { CalendarCheck, ExternalLink } from "lucide-react";
import { Button, type ButtonProps } from "./Button";
import { Modal } from "./Modal";
import { LINKS } from "@/lib/site";

type Props = {
  label?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  withIcon?: boolean;
};

/** Any "احجز موعد" CTA: opens the Google Calendar scheduler inside an accessible modal. */
export function BookingButton({ label, variant = "gold", size = "md", className, withIcon = true }: Props) {
  const t = useTranslations("common");
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        {withIcon && <CalendarCheck className="size-[1.1em]" strokeWidth={2.25} />}
        {label ?? t("bookShort")}
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t("booking.title")}
        description={t("booking.description")}
        closeLabel={t("booking.close")}
      >
        <div className="flex flex-col">
          <iframe
            src={LINKS.booking}
            title={t("booking.title")}
            className="h-[min(72vh,640px)] w-full border-0 bg-white"
            loading="lazy"
          />
          <div className="flex items-center justify-center border-t border-border px-6 py-4">
            <a
              href={LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 underline-offset-4 hover:underline dark:text-gold-300"
            >
              <ExternalLink className="size-4" />
              {t("booking.newTab")}
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}
