"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-white/10 bg-white/5">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-black tracking-[0.25em]">
            ZYLO AVENUE
          </Link>
          <div className="text-xs text-white/50 mt-2">ADMIN PANEL</div>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm font-semibold tracking-wide",
                  active ? "bg-[color:var(--red)] text-black" : "text-white/80 hover:bg-white/5"
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-white/10">
          <Button variant="outline" className="w-full" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>
      <main className="p-5 sm:p-8">
        <div className="container-zylo px-0 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
