"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { formatMoney } from "@/lib/utils/money";
import { useCartStore } from "@/store/cart";

export function CartSummary() {
  const subtotal = useCartStore((s) => s.subtotalCents());
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <Card>
      <CardHeader>
        <div className="text-xs tracking-[0.25em] text-white/60">SUMMARY</div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Subtotal</span>
          <span className="font-semibold">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Shipping</span>
          <span className="font-semibold">{formatMoney(shipping)}</span>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex justify-between">
          <span className="font-black tracking-wide">TOTAL</span>
          <span className="font-black tracking-wide">{formatMoney(total)}</span>
        </div>
        <LinkButton href="/checkout" className="w-full mt-2">
          Proceed to Checkout
        </LinkButton>
      </CardContent>
    </Card>
  );
}
