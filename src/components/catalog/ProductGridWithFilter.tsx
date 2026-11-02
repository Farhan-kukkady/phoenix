"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ProductFilter } from "@/components/catalog/ProductFilter";
import type { Product } from "@/types";

interface ProductGridWithFilterProps {
  products: Product[];
  brandSlug: string;
  categorySlug?: string;
  seriesSlug?: string;
  industries: string[];
  applications: string[];
  tags: string[];
}

function FilteredProductGridInner({
  products,
  brandSlug,
  categorySlug,
  seriesSlug,
  industries,
  applications,
  tags,
}: ProductGridWithFilterProps) {
  const searchParams = useSearchParams();

  const currentIndustry = searchParams.get("industry") || "";
  const currentApp = searchParams.get("application") || "";
  const currentTag = searchParams.get("tag") || "";
  const currentSort = searchParams.get("sort") || "name-asc";

  let filtered = [...products];

  if (currentIndustry) {
    filtered = filtered.filter((p) => p.industries?.includes(currentIndustry));
  }
  if (currentApp) {
    filtered = filtered.filter((p) => p.applications?.includes(currentApp));
  }
  if (currentTag) {
    filtered = filtered.filter((p) => p.tags?.includes(currentTag));
  }

  if (currentSort === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      <ProductFilter
        industries={industries}
        applications={applications}
        tags={tags}
        totalCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              brandSlug={brandSlug}
              categorySlug={categorySlug}
              seriesSlug={seriesSlug}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 text-sm">
            No instruments match the selected filter criteria.
          </p>
        </div>
      )}
    </>
  );
}

export function ProductGridWithFilter(props: ProductGridWithFilterProps) {
  return (
    <Suspense fallback={<div className="h-48 flex items-center justify-center text-slate-400">Loading catalog filters...</div>}>
      <FilteredProductGridInner {...props} />
    </Suspense>
  );
}

