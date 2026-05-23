"use client";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { useCartStore } from "@/store/cart";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { LinkButton } from "@/components/ui/LinkButton";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  return (
    <SiteFrame>
      <div className="container-zylo py-10">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs tracking-[0.35em] text-white/60">CART</div>
            <h1 className="mt-2 text-3xl font-black tracking-wide">Your Cart</h1>
          </div>
          <LinkButton href="/shop" variant="outline">
            Continue Shopping
          </LinkButton>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 card-zylo p-8">
            <div className="font-black tracking-wide">Cart is empty.</div>
            <div className="text-white/60 text-sm mt-2">
              Add products and come back to checkout.
            </div>
            <div className="mt-6">
              <LinkButton href="/shop">Shop Now</LinkButton>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px] items-start">
            <div className="card-zylo p-5">
              {items.map((i) => (
                <CartItemRow key={i.variantId} item={i} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </div>
    </SiteFrame>
  );
}
