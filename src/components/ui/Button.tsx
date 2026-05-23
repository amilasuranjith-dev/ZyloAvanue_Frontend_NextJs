import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function buttonClassName({
  className,
  variant = "primary",
  disabled,
}: {
  className?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
    disabled && "opacity-50 pointer-events-none",
    variant === "primary" && "bg-[color:var(--red)] text-black hover:bg-[#ff3d3d]",
    variant === "outline" && "border border-white/15 bg-transparent text-white hover:bg-white/5",
    variant === "ghost" && "bg-transparent text-white hover:bg-white/5",
    className
  );
}

export function Button({ className, variant = "primary", ...props }: Props) {
  const { type = "button" } = props;

  return (
    <button
      type={type}
      className={buttonClassName({ variant, className, disabled: props.disabled })}
      {...props}
    />
  );
}
