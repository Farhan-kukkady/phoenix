import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productRepository } from "@/lib/repositories/product-repository";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { ProductGridWithFilter } from "@/components/catalog/ProductGridWithFilter";

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  const brands = await productRepository.getAllBrands();
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = await productRepository.getBrandBySlug(brandSlug);

  if (!brand) {
    return { title: "Brand Not Found" };
  }

  return {
    title: `${brand.name} Products & Solutions`,
    description: brand.description,
    openGraph: {
      title: `${brand.name} | Phoenix Colour Technologies`,
      description: brand.description,
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: brandSlug } = await params;
  const brand = await productRepository.getBrandBySlug(brandSlug);

  if (!brand) {
    notFound();
  }

  const categories = await productRepository.getCategoriesByBrand(brand.id);
  const products = await productRepository.getProductsByBrand(brand.id);

  const hasCategories = categories.length > 0;

  return (
    <>
      {/* Brand Page Banner */}
      <BreadcrumbBanner
        title={brand.name}
        subtitle={brand.tagline || brand.description}
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: brand.name },
        ]}
      />

      <section className="section-padding bg-slate-50/40">
        <div className="container-wide">
          {hasCategories ? (
            <>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                    Equipment & Solutions
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                    Product Categories
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                  Select a category below to explore individual models, specifications, and technical brochures.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    brandSlug={brand.slug}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                    Official Solutions
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                    {brand.name} Products
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                  Explore precision instruments and software solutions from {brand.name}.
                </p>
              </div>

              {products.length > 0 ? (
                <ProductGridWithFilter
                  products={products}
                  brandSlug={brand.slug}
                  industries={await productRepository.getUniqueIndustries()}
                  applications={await productRepository.getUniqueApplications()}
                  tags={await productRepository.getUniqueTags()}
                />
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <p className="text-slate-500 text-sm">
                    Products for {brand.name} are currently being updated.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
