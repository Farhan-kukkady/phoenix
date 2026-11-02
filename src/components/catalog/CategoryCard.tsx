import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  brandSlug: string;
}

export function CategoryCard({ category, brandSlug }: CategoryCardProps) {
  const href = `/products/${brandSlug}/${category.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image container on clean light background matching ref/Screenshot 2026-11-01 012006.png */}
      <div className="relative aspect-[4/3] w-full bg-[#f6f7f9] p-6 flex items-center justify-center overflow-hidden border-b border-slate-100">
        <div className="relative w-full h-full">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Hover Navy Gradient Overlay (matching ref/category-cards-hover.png) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(15,23,66)/0.96] via-[rgb(15,23,66)/0.78] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white z-10 pointer-events-none group-hover:pointer-events-auto">
          <h3 className="text-xl font-bold mb-2 leading-snug drop-shadow-sm">
            {category.name}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 line-clamp-3 mb-4 leading-relaxed">
            {category.description}
          </p>
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white/15 border border-white/30 backdrop-blur-sm group-hover:bg-[rgb(196,30,58)] group-hover:border-[rgb(196,30,58)] transition-all">
              Explore Products
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Default State Bottom Label (matching ref/category-cards-default.png & ref/Screenshot 2026-11-01 012006.png) */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[rgb(196,30,58)] transition-colors leading-snug">
            {category.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2">
            {category.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-[rgb(15,23,66)]">
          <span>{category.hasSeries ? "View Series Range" : "View Products"}</span>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[rgb(196,30,58)] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
