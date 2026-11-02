import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Series } from "@/types";

interface SeriesCardProps {
  series: Series;
  brandSlug: string;
  categorySlug: string;
}

export function SeriesCard({ series, brandSlug, categorySlug }: SeriesCardProps) {
  const href = `/products/${brandSlug}/${categorySlug}/${series.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <Image
          src={series.image}
          alt={series.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Permanent Bottom Gradient + Title for Series Lifestyle Card matching ref/Screenshot 2026-11-01 012049.png */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(15,23,66)/0.92] via-[rgb(15,23,66)/0.3] to-transparent flex flex-col justify-end p-6 text-white group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide leading-snug drop-shadow-sm">
            {series.name}
          </h3>
        </div>

        {/* Hover Overlay with Description + Explore Products button matching ref/Screenshot 2026-11-01 012059.png */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(15,23,66)/0.96] via-[rgb(15,23,66)/0.8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white z-10">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide mb-2 leading-snug drop-shadow-sm">
            {series.name}
          </h3>
          <p className="text-xs sm:text-sm text-white/85 line-clamp-3 mb-4 leading-relaxed">
            {series.description}
          </p>
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[rgb(196,30,58)] text-white shadow-md hover:bg-[rgb(196,30,58)/0.9] transition-all">
              Explore Products
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
