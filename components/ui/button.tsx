import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-card)] font-semibold whitespace-nowrap " +
  "transition-[background-color,color,transform,box-shadow] duration-200 ease-[var(--ease-cinema)] " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:bg-ink/80",
  accent: "bg-accent text-ink hover:bg-accent-hover shadow-[0_8px_24px_-12px_var(--color-accent)]",
  secondary: "bg-[#6d6d6e]/70 text-ink hover:bg-[#6d6d6e]/50 backdrop-blur-sm",
  ghost: "text-muted hover:text-ink hover:bg-ink/10",
};

const sizes: Record<Size, string> = {
  md: "px-4 text-sm",
  lg: "px-6 text-base sm:px-7",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function LinkButton({ variant, size, className = "", ...props }: LinkButtonProps) {
  return <Link {...props} className={buttonClass(variant, size, className)} />;
}

type AnchorButtonProps = ComponentProps<"a"> & { variant?: Variant; size?: Size; external?: boolean };

/** For external URLs, downloads and mailto links. */
export function AnchorButton({ variant, size, className = "", external, ...props }: AnchorButtonProps) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={buttonClass(variant, size, className)}
    />
  );
}
