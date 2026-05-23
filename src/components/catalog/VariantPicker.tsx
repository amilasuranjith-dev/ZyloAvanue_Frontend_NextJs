"use client";

import type { ProductVariantDto } from "@/lib/api/types";
import { cn } from "@/lib/utils/cn";

export function VariantPicker({
  variants,
  selectedId,
  onSelect,
}: {
  variants: ProductVariantDto[];
  selectedId: number | null;
  onSelect: (variantId: number) => void;
}) {
  const active = variants.filter((v) => v.active);
  const sizes = Array.from(new Set(active.map((v) => v.size)));
  const colors = Array.from(new Set(active.map((v) => v.color)));

  const selected = active.find((v) => v.id === selectedId) ?? null;

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="text-xs tracking-[0.25em] text-white/60">SIZE</div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const candidate = active.find((v) => v.size === s && (!selected || v.color === selected.color));
            const disabled = !candidate;
            const isActive = candidate?.id === selectedId;
            return (
              <button
                key={s}
                type="button"
                disabled={disabled}
                onClick={() => candidate && onSelect(candidate.id)}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-semibold tracking-wide",
                  isActive ? "border-[color:var(--red)] bg-white/5" : "border-white/10 hover:bg-white/5",
                  disabled && "opacity-40 pointer-events-none"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-2">
        <div className="text-xs tracking-[0.25em] text-white/60">COLOR</div>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const candidate = active.find((v) => v.color === c && (!selected || v.size === selected.size));
            const disabled = !candidate;
            const isActive = candidate?.id === selectedId;
            return (
              <button
                key={c}
                type="button"
                disabled={disabled}
                onClick={() => candidate && onSelect(candidate.id)}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-semibold tracking-wide",
                  isActive ? "border-[color:var(--red)] bg-white/5" : "border-white/10 hover:bg-white/5",
                  disabled && "opacity-40 pointer-events-none"
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
