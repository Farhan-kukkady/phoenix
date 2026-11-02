import { productRepository } from "@/lib/repositories/product-repository";
import type { Brand, Category, Series, Product } from "@/types";

export type ResolvedCatalogItem =
  | {
      type: "category";
      brand: Brand;
      category: Category;
      series: Series[];
      products: Product[];
    }
  | {
      type: "series";
      brand: Brand;
      category: Category;
      series: Series;
      products: Product[];
    }
  | {
      type: "product";
      brand: Brand;
      category?: Category;
      series?: Series;
      product: Product;
      relatedProducts: Product[];
    };

export async function resolveCatalogPath(
  brandSlug: string,
  pathSegments: string[]
): Promise<ResolvedCatalogItem | null> {
  const brand = await productRepository.getBrandBySlug(brandSlug);
  if (!brand || !pathSegments || pathSegments.length === 0) {
    return null;
  }

  // Segment counts:
  // 1 segment: could be a category OR a product
  if (pathSegments.length === 1) {
    const slug = pathSegments[0];

    // Check if it's a category
    const category = await productRepository.getCategoryBySlug(brandSlug, slug);
    if (category) {
      const series = await productRepository.getSeriesByCategory(category.id);
      let products = await productRepository.getProductsByCategory(category.id);
      if (products.length === 0 && series.length > 0) {
        const allSerProds = await Promise.all(
          series.map((s) => productRepository.getProductsBySeries(s.id))
        );
        products = allSerProds.flat();
      }
      return {
        type: "category",
        brand,
        category,
        series,
        products,
      };
    }

    // Check if it's a direct product
    const product = await productRepository.getProductBySlug(slug);
    if (product && product.brandId.toLowerCase() === brand.id.toLowerCase()) {
      const related = await productRepository.getRelatedProducts(product.id);
      const cat = product.categoryId ? await productRepository.getCategoryById(product.categoryId) : undefined;
      return {
        type: "product",
        brand,
        category: cat ?? undefined,
        product,
        relatedProducts: related,
      };
    }

    return null;
  }

  // 2 segments:
  // [categorySlug, seriesSlug] OR [categorySlug, productSlug]
  if (pathSegments.length === 2) {
    const [catSlug, secondSlug] = pathSegments;
    const category = await productRepository.getCategoryBySlug(brandSlug, catSlug);
    if (!category) return null;

    // Check if second slug is a series
    const series = await productRepository.getSeriesBySlug(secondSlug);
    if (series && series.categoryId.toLowerCase() === category.id.toLowerCase()) {
      const products = await productRepository.getProductsBySeries(series.id);
      return {
        type: "series",
        brand,
        category,
        series,
        products,
      };
    }

    // Check if second slug is a product
    const product = await productRepository.getProductBySlug(secondSlug);
    if (
      product &&
      product.brandId.toLowerCase() === brand.id.toLowerCase() &&
      product.categoryId.toLowerCase() === category.id.toLowerCase()
    ) {
      const related = await productRepository.getRelatedProducts(product.id);
      const ser = product.seriesId ? (await productRepository.getAllSeries()).find((s) => s.id === product.seriesId) : undefined;
      return {
        type: "product",
        brand,
        category,
        series: ser,
        product,
        relatedProducts: related,
      };
    }

    return null;
  }

  // 3 segments: [categorySlug, seriesSlug, productSlug]
  if (pathSegments.length === 3) {
    const [catSlug, seriesSlug, prodSlug] = pathSegments;
    const category = await productRepository.getCategoryBySlug(brandSlug, catSlug);
    if (!category) return null;

    const series = await productRepository.getSeriesBySlug(seriesSlug);
    if (!series || series.categoryId.toLowerCase() !== category.id.toLowerCase()) {
      return null;
    }

    const product = await productRepository.getProductBySlug(prodSlug);
    if (
      product &&
      product.brandId.toLowerCase() === brand.id.toLowerCase() &&
      product.categoryId.toLowerCase() === category.id.toLowerCase() &&
      product.seriesId?.toLowerCase() === series.id.toLowerCase()
    ) {
      const related = await productRepository.getRelatedProducts(product.id);
      return {
        type: "product",
        brand,
        category,
        series,
        product,
        relatedProducts: related,
      };
    }

    return null;
  }

  return null;
}

