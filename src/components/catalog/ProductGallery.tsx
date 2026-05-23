"use client";

import { cn } from "@/lib/utils/cn";
import type { ProductImageDto } from "@/lib/api/types";
import { useMemo, useState } from "react";

export function ProductGallery({ images }: { images: ProductImageDto[] }) {
  const sorted = useMemo(
    () => [...images].sort((a, b) => (a.primary === b.primary ? a.sortOrder - b.sortOrder : a.primary ? -1 : 1)),
    [images]
  );
  const [active, setActive] = useState(0);
  const main = sorted[active];

  return (
    <div className="grid gap-3">
      <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        {main?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={main.url} alt="Product" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center text-white/30 text-xs tracking-[0.3em]">
            ZYLO
          </div>
        )}
      </div>
      <div className="flex gap-2 overflow-auto">
        {sorted.slice(0, 6).map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(idx)}
            className={cn(
              "h-16 w-16 rounded-xl border overflow-hidden bg-white/5 shrink-0",
              idx === active ? "border-[color:var(--red)]" : "border-white/10"
            )}
          >
            {img.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img.url} alt="Thumb" className="h-full w-full object-cover" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
