import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-700 text-mist-50 hover:bg-navy-600 dark:bg-navy-600 dark:hover:bg-navy-500 shadow-elevated",
  gold: "bg-gold-400 text-navy-900 hover:bg-gold-300 shadow-gold-glow",
  outline:
    "border border-navy-700/25 text-foreground hover:border-navy-700/50 hover:bg-surface-2 dark:border-mist-50/20 dark:hover:border-mist-50/40",
  ghost: "text-foreground hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[0.95rem] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  withArrow?: boolean;
};

/**
 * Brand button with a soft hover sheen and optional arrow nudge.
 * `asChild` renders the styles onto a single child element (e.g. a localized <Link>).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild, withArrow, children, ...props },
    ref,
  ) => {
    const classes = cn(
      "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium",
      "transition-[background-color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-out-expo)]",
      "active:scale-[0.97] focus-visible:outline-none",
      variants[variant],
      sizes[size],
      className,
    );

    const inner = (
      <>
        {/* sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative inline-flex items-center gap-[inherit]">
          {children}
          {withArrow && (
            <ArrowUpRight
              className="size-[1.05em] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              strokeWidth={2.25}
            />
          )}
        </span>
      </>
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;
      return React.cloneElement(
        child,
        { className: cn(classes, child.props.className) },
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
          <span className="relative inline-flex items-center gap-[inherit]">
            {child.props.children}
            {withArrow && (
              <ArrowUpRight
                className="size-[1.05em] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                strokeWidth={2.25}
              />
            )}
          </span>
        </>,
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {inner}
      </button>
    );
  },
);
Button.displayName = "Button";
