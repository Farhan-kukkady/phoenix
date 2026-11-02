import { ProductCard } from "@/components/catalog/ProductCard";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
  brandSlug: string;
}

export function RelatedProducts({ products, brandSlug }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-20 pt-16 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
            Complementary Instruments
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Related Products & Systems
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(0, 3).map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            brandSlug={brandSlug}
            categorySlug={prod.categoryId}
            seriesSlug={prod.seriesId}
          />
        ))}
      </div>
    </section>
  );
}

