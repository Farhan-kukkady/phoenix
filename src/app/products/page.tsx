import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, ExternalLink } from "lucide-react";
import { productRepository } from "@/lib/repositories/product-repository";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";

export const metadata: Metadata = {
  title: "Product Brands & Solutions Catalog",
  description:
    "Explore precision color management, spectrophotometers, workflow automation, and print testing systems from our 21 global partner brands.",
};

export default async function ProductsCatalogPage() {
  const brands = await productRepository.getAllBrands();

  return (
    <>
      <BreadcrumbBanner
        title="Global Technology Partners"
        subtitle="Leading international color science, spectrophotometry, workflow automation, and IoT manufacturing systems."
        items={[{ label: "Home", href: "/" }, { label: "Brands Catalog" }]}
      />

      <section className="section-padding bg-slate-50/50">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Our Brand Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                21 World-Class Manufacturers
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Phoenix Colour Technologies is the authorized distributor, integrator, and service center for premier graphic arts and industrial color brands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="group relative flex flex-col rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Brand Header Banner with Navy/Crimson Accent */}
                <div className="h-28 bg-[rgb(15,23,66)] p-6 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[rgb(196,30,58)/0.3] to-transparent pointer-events-none" />
                  <div className="relative z-10 flex items-center gap-3">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={120}
                      height={40}
                      className="max-h-10 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-[rgb(196,30,58)] transition-colors relative z-10">
                    <Layers className="w-5 h-5" />
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {brand.tagline && (
                      <p className="text-xs font-bold text-[rgb(196,30,58)] mb-2 uppercase tracking-wider">
                        {brand.tagline}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {brand.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/products/${brand.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[rgb(15,23,66)] group-hover:text-[rgb(196,30,58)] transition-colors"
                    >
                      Explore Categories
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {brand.website && (
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                        aria-label={`${brand.name} official website`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
