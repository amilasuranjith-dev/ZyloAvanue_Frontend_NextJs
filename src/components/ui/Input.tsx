import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white",
        "placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
        className
      )}
      {...props}
    />
  );
}
