import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Download as DownloadIcon, Layers, FileText } from "lucide-react";
import { productRepository } from "@/lib/repositories/product-repository";
import { resolveCatalogPath } from "@/lib/catalog-resolver";
import { BreadcrumbBanner, type BreadcrumbItem } from "@/components/catalog/BreadcrumbBanner";
import { SeriesCard } from "@/components/catalog/SeriesCard";
import { ProductGridWithFilter } from "@/components/catalog/ProductGridWithFilter";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SpecTable } from "@/components/product/SpecTable";
import { EnquiryDialog } from "@/components/product/EnquiryDialog";
import { DownloadsSection } from "@/components/product/DownloadsSection";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { generateProductJsonLd } from "@/lib/seo";

interface CatalogPathPageProps {
  params: Promise<{ brand: string; path: string[] }>;
}

export async function generateStaticParams() {
  const brands = await productRepository.getAllBrands();
  const categories = await productRepository.getAllCategories();
  const allSeries = await productRepository.getAllSeries();
  const products = await productRepository.getAllProducts();

  const paths: { brand: string; path: string[] }[] = [];

  for (const brand of brands) {
    const brandCats = categories.filter((c) => c.brandId.toLowerCase() === brand.id.toLowerCase());

    for (const cat of brandCats) {
      // 1. Category level path: /products/[brand]/[catSlug]
      paths.push({
        brand: brand.slug,
        path: [cat.slug],
      });

      // 2. Series level paths: /products/[brand]/[catSlug]/[seriesSlug]
      const catSeries = allSeries.filter((s) => s.categoryId.toLowerCase() === cat.id.toLowerCase());
      for (const ser of catSeries) {
        paths.push({
          brand: brand.slug,
          path: [cat.slug, ser.slug],
        });

        // 3a. Product under series: /products/[brand]/[catSlug]/[seriesSlug]/[prodSlug]
        const serProducts = products.filter(
          (p) => p.seriesId && p.seriesId.toLowerCase() === ser.id.toLowerCase()
        );
        for (const prod of serProducts) {
          paths.push({
            brand: brand.slug,
            path: [cat.slug, ser.slug, prod.slug],
          });
        }
      }

      // 3b. Product directly under category (no series): /products/[brand]/[catSlug]/[prodSlug]
      const directProducts = products.filter(
        (p) =>
          p.categoryId.toLowerCase() === cat.id.toLowerCase() &&
          (!p.seriesId || p.seriesId === "")
      );
      for (const prod of directProducts) {
        paths.push({
          brand: brand.slug,
          path: [cat.slug, prod.slug],
        });
      }
    }

    // 4. Products directly under brand (no category, e.g. Global Vision, GMG, Epson, Valiani)
    const brandDirectProducts = products.filter(
      (p) =>
        p.brandId.toLowerCase() === brand.id.toLowerCase() &&
        (!p.categoryId || p.categoryId === "")
    );
    for (const prod of brandDirectProducts) {
      paths.push({
        brand: brand.slug,
        path: [prod.slug],
      });
    }
  }

  return paths;
}

export async function generateMetadata({
  params,
}: CatalogPathPageProps): Promise<Metadata> {
  const { brand: brandSlug, path: pathSegments } = await params;
  const resolved = await resolveCatalogPath(brandSlug, pathSegments);

  if (!resolved) {
    return { title: "Item Not Found" };
  }

  if (resolved.type === "product") {
    return {
      title: `${resolved.product.name} | ${resolved.brand.name}`,
      description: resolved.product.shortDescription,
      openGraph: {
        title: `${resolved.product.name} | Phoenix Colour Technologies`,
        description: resolved.product.shortDescription,
      },
    };
  }

  if (resolved.type === "series") {
    return {
      title: `${resolved.series.name} | ${resolved.brand.name}`,
      description: resolved.series.description,
    };
  }

  return {
    title: `${resolved.category.name} | ${resolved.brand.name}`,
    description: resolved.category.description,
  };
}

export default async function CatalogPathPage({ params }: CatalogPathPageProps) {
  const { brand: brandSlug, path: pathSegments } = await params;
  const resolved = await resolveCatalogPath(brandSlug, pathSegments);

  if (!resolved) {
    notFound();
  }

  const baseBreadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: resolved.brand.name, href: `/products/${resolved.brand.slug}` },
  ];

  // ==========================================
  // CASE 1: CATEGORY VIEW
  // ==========================================
  if (resolved.type === "category") {
    const breadcrumbs: BreadcrumbItem[] = [
      ...baseBreadcrumbs,
      { label: resolved.category.name },
    ];

    if (resolved.category.hasSeries && resolved.series.length > 0) {
      return (
        <>
          <BreadcrumbBanner
            title={resolved.category.name}
            subtitle={resolved.category.description}
            items={breadcrumbs}
          />
          <section className="section-padding bg-slate-50/50">
            <div className="container-wide">
              <div className="mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                  Instrument Ranges
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                  Product Series
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {resolved.series.map((ser) => (
                  <SeriesCard
                    key={ser.id}
                    series={ser}
                    brandSlug={resolved.brand.slug}
                    categorySlug={resolved.category.slug}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      );
    }

    const industries = await productRepository.getUniqueIndustries();
    const applications = await productRepository.getUniqueApplications();
    const tags = await productRepository.getUniqueTags();

    return (
      <>
        <BreadcrumbBanner
          title={resolved.category.name}
          subtitle={resolved.category.description}
          items={breadcrumbs}
        />
        <section className="section-padding bg-slate-50/50">
          <div className="container-wide">
            <ProductGridWithFilter
              products={resolved.products}
              brandSlug={resolved.brand.slug}
              categorySlug={resolved.category.slug}
              industries={industries}
              applications={applications}
              tags={tags}
            />
          </div>
        </section>
      </>
    );
  }

  // ==========================================
  // CASE 2: SERIES VIEW
  // ==========================================
  if (resolved.type === "series") {
    const breadcrumbs: BreadcrumbItem[] = [
      ...baseBreadcrumbs,
      { label: resolved.category.name, href: `/products/${resolved.brand.slug}/${resolved.category.slug}` },
      { label: resolved.series.name },
    ];

    const industries = await productRepository.getUniqueIndustries();
    const applications = await productRepository.getUniqueApplications();
    const tags = await productRepository.getUniqueTags();

    return (
      <>
        <BreadcrumbBanner
          title={resolved.series.name}
          subtitle={resolved.series.description}
          items={breadcrumbs}
        />
        <section className="section-padding bg-slate-50/50">
          <div className="container-wide">
            <ProductGridWithFilter
              products={resolved.products}
              brandSlug={resolved.brand.slug}
              categorySlug={resolved.category.slug}
              seriesSlug={resolved.series.slug}
              industries={industries}
              applications={applications}
              tags={tags}
            />
          </div>
        </section>
      </>
    );
  }

  // ==========================================
  // CASE 3: PRODUCT DETAIL VIEW
  // ==========================================
  const { product, brand, category, series, relatedProducts } = resolved;

  const breadcrumbs: BreadcrumbItem[] = [...baseBreadcrumbs];
  if (category) {
    breadcrumbs.push({
      label: category.name,
      href: `/products/${brand.slug}/${category.slug}`,
    });
  }
  if (series && category) {
    breadcrumbs.push({
      label: series.name,
      href: `/products/${brand.slug}/${category.slug}/${series.slug}`,
    });
  }
  breadcrumbs.push({ label: product.name });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductJsonLd(product, brand)),
        }}
      />
      <BreadcrumbBanner items={breadcrumbs} />

      <article className="py-12 md:py-16 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-6">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* Right: Key Info, CTAs, Features */}
            <div className="lg:col-span-6 space-y-6">
              {product.modelNumber && (
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Model # {product.modelNumber}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {product.keyFeatures && product.keyFeatures.length > 0 && (
                <div className="py-4 border-y border-slate-100">
                  <ul className="space-y-3">
                    {product.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgb(196,30,58)/0.1] text-[rgb(196,30,58)] flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <EnquiryDialog
                  productName={product.name}
                  modelNumber={product.modelNumber}
                />

                {product.downloads && product.downloads.length > 0 && (
                  <a
                    href={product.downloads[0].url}
                    download
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-[rgb(15,23,66)] border border-slate-300 hover:border-[rgb(196,30,58)] hover:text-[rgb(196,30,58)] transition-colors"
                  >
                    <DownloadIcon className="w-4 h-4" />
                    Download Brochure
                  </a>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-slate-400 font-medium">Industries:</span>
                {product.industries?.map((ind) => (
                  <span
                    key={ind}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8">
            <div className="flex items-center gap-8 border-b border-slate-200 mb-12 overflow-x-auto pb-1 text-sm font-bold uppercase tracking-wider">
              <a
                href="#overview"
                className="text-[rgb(196,30,58)] border-b-2 border-[rgb(196,30,58)] pb-3 -mb-[2px] whitespace-nowrap"
              >
                Overview
              </a>
              <a
                href="#specifications"
                className="text-slate-500 hover:text-slate-900 transition-colors pb-3 whitespace-nowrap"
              >
                Specifications
              </a>
              <a
                href="#applications"
                className="text-slate-500 hover:text-slate-900 transition-colors pb-3 whitespace-nowrap"
              >
                Applications & Industries
              </a>
              <a
                href="#downloads"
                className="text-slate-500 hover:text-slate-900 transition-colors pb-3 whitespace-nowrap"
              >
                Downloads
              </a>
            </div>

            <div id="overview" className="scroll-mt-24 space-y-8 mb-20">
              <div className="max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[rgb(196,30,58)] mb-6">
                  Advanced Color Measurement & Intelligent Technology
                </h2>
                <div
                  className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: product.overview }}
                />
              </div>
            </div>

            <div id="specifications" className="scroll-mt-24 mb-20">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                  Technical Parameters
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Product Specifications
                </h2>
              </div>
              <SpecTable specifications={product.specifications} />
            </div>

            <div id="applications" className="scroll-mt-24 mb-20">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                  Production Environments
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Applications & Industries Served
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-slate-200/90 p-6 bg-slate-50/50">
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[rgb(196,30,58)]" />
                    Key Applications
                  </h3>
                  <ul className="space-y-2.5">
                    {product.applications?.map((app, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[rgb(196,30,58)]" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200/90 p-6 bg-slate-50/50">
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[rgb(15,23,66)]" />
                    Target Industries
                  </h3>
                  <ul className="space-y-2.5">
                    {product.industries?.map((ind, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[rgb(15,23,66)]" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div id="downloads" className="scroll-mt-24 mb-20">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                  Documentation & Datasheets
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Downloads & Manuals
                </h2>
              </div>
              <DownloadsSection downloads={product.downloads} />
            </div>

            <RelatedProducts
              products={relatedProducts}
              brandSlug={brand.slug}
            />
          </div>
        </div>
      </article>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-lg flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 truncate">{product.name}</p>
          <p className="text-[10px] text-slate-500 truncate">{brand.name}</p>
        </div>
        <EnquiryDialog
          productName={product.name}
          modelNumber={product.modelNumber}
          triggerButton={
            <button className="btn-primary text-xs px-4 py-2">
              Quote
            </button>
          }
        />
      </div>
    </>
  );
}
