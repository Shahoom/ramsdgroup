import * as React from "react";
import { cn } from "@/lib/utils";

/** Centered max-width wrapper with responsive gutters. */
export function Container({
  className,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}
      {...props}
    />
  );
}
