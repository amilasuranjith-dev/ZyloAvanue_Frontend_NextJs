"use client";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProduct, listProducts } from "@/lib/api/catalog";
import { ProductGallery } from "@/components/catalog/ProductGallery";
import { VariantPicker } from "@/components/catalog/VariantPicker";
import { Button } from "@/components/ui/Button";
import { formatMoney } from "@/lib/utils/money";
import { useCartStore } from "@/store/cart";
import { ProductGrid } from "@/components/catalog/ProductGrid";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const product = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),
  });

  const related = useQuery({
    queryKey: ["products", "related"],
    queryFn: () => listProducts({ page: 0, size: 4 }),
  });

  const addItem = useCartStore((s) => s.addItem);
  const [variantId, setVariantId] = useState<number | null>(null);

  const selected = useMemo(() => {
    const v = product.data?.variants.find((x) => x.id === variantId) ?? null;
    return v;
  }, [product.data?.variants, variantId]);

  const primaryImg = product.data?.images.find((i) => i.primary)?.url ?? product.data?.images?.[0]?.url ?? null;

  if (product.isLoading) {
    return (
      <SiteFrame>
        <div className="container-zylo py-10 text-sm text-white/60">Loading…</div>
      </SiteFrame>
    );
  }

  if (product.isError || !product.data) {
    return (
      <SiteFrame>
        <div className="container-zylo py-10 text-sm text-white/60">
          Failed to load product.
        </div>
      </SiteFrame>
    );
  }

  const p = product.data;

  return (
    <SiteFrame>
      <div className="container-zylo py-10">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <ProductGallery images={p.images} />

          <div className="grid gap-6">
            <div>
              <div className="text-xs tracking-[0.35em] text-white/60">PRODUCT</div>
              <h1 className="mt-2 text-3xl font-black tracking-wide uppercase">
                {p.name}
              </h1>
              <div className="mt-3 text-white/70">{p.description ?? ""}</div>
            </div>

            <VariantPicker
              variants={p.variants}
              selectedId={variantId}
              onSelect={setVariantId}
            />

            <div className="card-zylo p-5 grid gap-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">Price</div>
                <div className="font-black">
                  {selected ? formatMoney(selected.priceCents) : "Select a variant"}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">Stock</div>
                <div className="font-semibold">
                  {selected
                    ? selected.stockQty > 0
                      ? `${selected.stockQty} available`
                      : "Out of stock"
                    : "—"}
                </div>
              </div>

              <Button
                disabled={!selected || selected.stockQty <= 0}
                onClick={() => {
                  if (!selected) return;
                  addItem({
                    variantId: selected.id,
                    productSlug: p.slug,
                    productName: p.name,
                    imageUrl: primaryImg,
                    size: selected.size,
                    color: selected.color,
                    priceCents: selected.priceCents,
                    qty: 1,
                    stockQty: selected.stockQty,
                  });
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-xs tracking-[0.35em] text-white/60">RELATED</div>
          <h2 className="mt-2 text-2xl font-black tracking-wide">You may like</h2>
          <div className="mt-6">
            {related.data ? <ProductGrid products={related.data.content} /> : null}
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
