"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { listCategories, listProducts } from "@/lib/api/catalog";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { LinkButton } from "@/components/ui/LinkButton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Home() {
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
  });

  const featured = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => listProducts({ page: 0, size: 8 }),
  });

  const arrivals = useQuery({
    queryKey: ["products", "arrivals"],
    queryFn: () => listProducts({ page: 0, size: 8 }),
  });

  return (
    <SiteFrame>
      <section className="border-b border-white/10">
        <div className="container-zylo py-16 sm:py-24 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <div className="text-xs tracking-[0.35em] text-white/60">PREMIUM STREETWEAR</div>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black leading-[0.95] tracking-tight">
              ZYLO AVENUE
              <span className="block text-[color:var(--red)]">DROP READY</span>
            </h1>
            <p className="mt-5 text-white/70 max-w-xl">
              Dark. Bold. Built for the street. Shop the latest ZYLO AVENUE essentials.
            </p>
            <div className="mt-8 flex gap-3">
              <LinkButton href="/shop">Shop Now</LinkButton>
              <LinkButton href="/shop?q=hoodie" variant="outline">
                Explore Hoodies
              </LinkButton>
            </div>
          </div>
          <div className="card-zylo p-6 sm:p-8">
            <div className="text-xs tracking-[0.35em] text-white/60">PROMO</div>
            <div className="mt-3 text-xl font-black">BLACKOUT WEEK</div>
            <div className="mt-2 text-white/70 text-sm">
              Limited stock. No noise. Just heat.
            </div>
            <div className="mt-6 h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-[color:var(--red)]/10" />
          </div>
        </div>
      </section>

      <section className="container-zylo py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.35em] text-white/60">FEATURED</div>
            <h2 className="mt-2 text-2xl font-black tracking-wide">Top Picks</h2>
          </div>
          <Link className="text-sm font-semibold text-white/70 hover:text-white" href="/shop">
            View all
          </Link>
        </div>

        <div className="mt-6">
          {featured.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-[320px]" />
              ))}
            </div>
          ) : featured.isError ? (
            <div className="text-sm text-white/60">Failed to load products.</div>
          ) : (
            <ProductGrid products={featured.data!.content} />
          )}
        </div>
      </section>

      <section className="container-zylo py-12">
        <div className="text-xs tracking-[0.35em] text-white/60">CATEGORIES</div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))
            : categories.data?.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop?q=${encodeURIComponent(c.name)}`}
                  className="card-zylo p-6 hover:border-white/20 transition"
                >
                  <div className="text-xs tracking-[0.35em] text-white/60">CATEGORY</div>
                  <div className="mt-2 text-xl font-black tracking-wide uppercase">
                    {c.name}
                  </div>
                </Link>
              ))}
        </div>
      </section>

      <section className="container-zylo py-12">
        <div className="text-xs tracking-[0.35em] text-white/60">NEW ARRIVALS</div>
        <h2 className="mt-2 text-2xl font-black tracking-wide">Fresh Drops</h2>
        <div className="mt-6">
          {arrivals.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-[320px]" />
              ))}
            </div>
          ) : arrivals.isError ? (
            <div className="text-sm text-white/60">Failed to load products.</div>
          ) : (
            <ProductGrid products={arrivals.data!.content} />
          )}
        </div>
      </section>
    </SiteFrame>
  );
}
