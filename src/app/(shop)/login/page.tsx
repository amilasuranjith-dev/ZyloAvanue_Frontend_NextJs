import { Suspense } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <SiteFrame>
      <Suspense fallback={<div className="container-zylo py-12 text-sm text-white/60">Loading…</div>}>
        <LoginClient />
      </Suspense>
    </SiteFrame>
  );
}
