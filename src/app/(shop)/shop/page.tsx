import { Suspense } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";
import ShopClient from "./ShopClient";

export default function ShopPage() {
  return (
    <SiteFrame>
      <Suspense fallback={<div className="container-zylo py-10 text-sm text-white/60">Loading…</div>}>
        <ShopClient />
      </Suspense>
    </SiteFrame>
  );
}
