import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { ProductSummaryDto } from "@/lib/api/types";
import { formatMoney } from "@/lib/utils/money";

export function ProductCard({ p }: { p: ProductSummaryDto }) {
  const price = p.minPriceCents != null ? formatMoney(p.minPriceCents) : "—";

  return (
    <Link href={`/product/${p.slug}`} className="group">
      <Card className="overflow-hidden hover:border-white/20 transition">
        <div className="aspect-[4/5] bg-white/5 relative">
          {/* For now use a div; swap to next/image when you have real images */}
          {p.primaryImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.primaryImageUrl}
              alt={p.name}
              className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-white/30 text-xs tracking-[0.3em]">
              ZYLO
            </div>
          )}
          <div className="absolute left-3 top-3 flex gap-2">
            {!p.inStock && <Badge variant="danger">OUT</Badge>}
          </div>
        </div>
        <CardContent className="flex flex-col gap-2">
          <div className="text-sm font-black tracking-wide uppercase line-clamp-2">
            {p.name}
          </div>
          <div className="text-white/70 text-sm">{price}</div>
        </CardContent>
      </Card>
    </Link>
  );
}
