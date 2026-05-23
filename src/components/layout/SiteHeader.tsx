"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { LinkButton } from "@/components/ui/LinkButton";

export function SiteHeader() {
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="container-zylo flex h-16 items-center justify-between">
        <Link href="/" className="font-black tracking-[0.25em] text-white">
          ZYLO AVENUE
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wide">
          <Link className="text-white/80 hover:text-white" href="/shop">
            SHOP
          </Link>
          <Link className="text-white/80 hover:text-white" href="/admin">
            ADMIN
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LinkButton href="/cart" variant="outline" className="py-2">
            CART <span className="text-white/70">({count})</span>
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
