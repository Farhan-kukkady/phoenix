import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  brandSlug: string;
  categorySlug?: string;
  seriesSlug?: string;
}

export function ProductCard({
  product,
  brandSlug,
  categorySlug,
  seriesSlug,
}: ProductCardProps) {
  // Construct canonical path
  const href = seriesSlug && categorySlug
    ? `/products/${brandSlug}/${categorySlug}/${seriesSlug}/${product.slug}`
    : categorySlug
    ? `/products/${brandSlug}/${categorySlug}/${product.slug}`
    : `/products/${brandSlug}/${product.slug}`;

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full bg-slate-50 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
        <div className="relative w-full h-full">
          <Image
            src={product.images[0] || "/images/products/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Model Number Tag */}
        {product.modelNumber && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-slate-900/5 text-slate-600 border border-slate-200/50 backdrop-blur-sm">
            {product.modelNumber}
          </span>
        )}
      </div>

      {/* Card Content (matching ref/Screenshot 2026-11-01 012129.png) */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[rgb(196,30,58)] transition-colors leading-snug">
            <Link href={href} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          {/* Subtitle / Short Description */}
          <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Key Features Bullet List (3 items) */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              {product.keyFeatures.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center mt-0.5 text-slate-700">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span className="line-clamp-2">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA Button with outlined gradient border (matching ref) */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            href={href}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-semibold text-[rgb(15,23,66)] border border-slate-300 hover:border-[rgb(196,30,58)] hover:text-white hover:bg-[rgb(196,30,58)] transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

