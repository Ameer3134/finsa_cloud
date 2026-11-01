import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

// Pick a look with variant="primary" | "outline" | "accent".
type Variant = "primary" | "outline" | "accent";

const looks: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  outline: "border border-brand-500 text-brand-500 hover:bg-brand-50",
  accent: "bg-accent-500 text-brand-900 hover:bg-accent-500/80",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `inline-flex cursor-pointer items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${looks[variant]} ${extra}`;
}

// <Button> is a real button (for forms and clicks).
export function Button({ variant, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}

// <ButtonLink> looks the same but goes to another page.
export function ButtonLink({ variant, className, ...props }: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
