"use client";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { useParams } from "next/navigation";
import { LinkButton } from "@/components/ui/LinkButton";

export default function OrderSuccessPage() {
  const params = useParams<{ orderNumber: string }>();
  const orderNumber = Array.isArray(params.orderNumber) ? params.orderNumber[0] : params.orderNumber;

  return (
    <SiteFrame>
      <div className="container-zylo py-16">
        <div className="card-zylo p-10">
          <div className="text-xs tracking-[0.35em] text-white/60">ORDER CONFIRMED</div>
          <h1 className="mt-3 text-3xl font-black tracking-wide">SUCCESS</h1>
          <div className="mt-4 text-white/70">
            Your order number is{" "}
            <span className="font-black text-white">{orderNumber}</span>
          </div>
          <div className="mt-2 text-white/60 text-sm">
            Payment is not enabled yet. Our team will contact you to confirm dispatch.
          </div>

          <div className="mt-8 flex gap-3">
            <LinkButton href="/shop">Back to Shop</LinkButton>
            <LinkButton href="/cart" variant="outline">
              View Cart
            </LinkButton>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
