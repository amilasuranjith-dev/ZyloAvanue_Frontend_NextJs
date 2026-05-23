"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatMoney } from "@/lib/utils/money";
import { useCartStore, type CartItem } from "@/store/cart";
import Link from "next/link";

export function CartItemRow({ item }: { item: CartItem }) {
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 items-start border-b border-white/10 py-5">
      <div className="h-24 w-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.productName} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="flex-1">
        <Link href={`/product/${item.productSlug}`} className="font-black tracking-wide uppercase">
          {item.productName}
        </Link>
        <div className="text-white/60 text-sm mt-1">
          {item.size} / {item.color}
        </div>
        <div className="text-white/80 text-sm mt-2">{formatMoney(item.priceCents)}</div>

        <div className="mt-3 flex items-center gap-3">
          <Input
            type="number"
            min={1}
            value={item.qty}
            onChange={(e) => setQty(item.variantId, Number(e.target.value || 1))}
            className="w-24"
          />
          <Button variant="ghost" onClick={() => removeItem(item.variantId)} className="text-white/70">
            Remove
          </Button>
        </div>
      </div>
      <div className="font-black">{formatMoney(item.priceCents * item.qty)}</div>
    </div>
  );
}
