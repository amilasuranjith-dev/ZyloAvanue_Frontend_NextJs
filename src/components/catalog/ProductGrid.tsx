import type { ProductSummaryDto } from "@/lib/api/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: ProductSummaryDto[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  );
}
