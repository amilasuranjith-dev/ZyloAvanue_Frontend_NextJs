import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

type Variant = "default" | "danger" | "success" | "muted";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        variant === "default" && "bg-white/10 text-white",
        variant === "muted" && "bg-white/5 text-[color:var(--muted)]",
        variant === "danger" && "bg-[color:var(--red2)] text-white",
        variant === "success" && "bg-emerald-500/20 text-emerald-200",
        className
      )}
    >
      {children}
    </span>
  );
}
