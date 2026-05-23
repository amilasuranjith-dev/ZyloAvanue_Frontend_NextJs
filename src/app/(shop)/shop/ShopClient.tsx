"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Skeleton } from "@/components/ui/Skeleton";
import { listProducts } from "@/lib/api/catalog";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShopClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const q0 = sp.get("q") ?? "";
  const pageParam = Number(sp.get("page") ?? "0");
  const page0 = Number.isFinite(pageParam) && pageParam >= 0 ? Math.floor(pageParam) : 0;

  const [q, setQ] = useState(q0);

  const queryKey = useMemo(() => ["products", { q: q0, page: page0 }], [q0, page0]);

  const products = useQuery({
    queryKey,
    queryFn: () => listProducts({ q: q0 || undefined, page: page0, size: 12 }),
  });

  function apply() {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    params.set("page", "0");
    router.push(`/shop?${params.toString()}`);
  }

  function setPage(next: number) {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(next));
    router.push(`/shop?${params.toString()}`);
  }

  const header = (
    <>
      <div>
        <div className="text-xs tracking-[0.35em] text-white/60">SHOP</div>
        <h1 className="mt-2 text-3xl font-black tracking-wide">All Products</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Input
          placeholder="Search (tees, hoodies, jackets…)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
        <Button onClick={apply}>Search</Button>
      </div>
    </>
  );

  if (products.isLoading) {
    return (
      <div className="container-zylo py-10 grid gap-6">
        {header}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-[320px]" />
          ))}
        </div>
      </div>
    );
  }

  if (products.isError || !products.data) {
    return (
      <div className="container-zylo py-10 grid gap-6">
        {header}
        <div className="text-sm text-white/60">Failed to load products.</div>
      </div>
    );
  }

  const page = products.data;

  return (
    <div className="container-zylo py-10">
      <div className="flex flex-col gap-6">
        {header}

        {page.content.length === 0 ? (
          <div className="text-sm text-white/60">No products found.</div>
        ) : (
          <>
            <ProductGrid products={page.content} />
            <div className="mt-10 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(0, page0 - 1))}
                disabled={page0 <= 0}
              >
                Prev
              </Button>
              <div className="text-sm text-white/60">
                Page <span className="text-white">{page.number + 1}</span> of{" "}
                <span className="text-white">{page.totalPages}</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setPage(Math.min(page.totalPages - 1, page0 + 1))}
                disabled={page0 >= page.totalPages - 1}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
