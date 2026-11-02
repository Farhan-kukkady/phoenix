import type { Brand, Category, Series, Product } from "@/types";
import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";
import seriesData from "@/data/series.json";
import productsData from "@/data/products.json";

export interface SearchFilters {
  industry?: string;
  application?: string;
  tag?: string;
  brandSlug?: string;
}

export interface IProductRepository {
  getAllBrands(): Promise<Brand[]>;
  getBrandBySlug(slug: string): Promise<Brand | null>;
  getBrandById(id: string): Promise<Brand | null>;

  getAllCategories(): Promise<Category[]>;
  getCategoriesByBrand(brandId: string): Promise<Category[]>;
  getCategoryBySlug(brandSlug: string, categorySlug: string): Promise<Category | null>;
  getCategoryById(id: string): Promise<Category | null>;

  getAllSeries(): Promise<Series[]>;
  getSeriesByCategory(categoryId: string): Promise<Series[]>;
  getSeriesBySlug(seriesSlug: string): Promise<Series | null>;

  getAllProducts(): Promise<Product[]>;
  getProductsByBrand(brandId: string): Promise<Product[]>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductsBySeries(seriesId: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getRelatedProducts(productId: string): Promise<Product[]>;

  getUniqueIndustries(): Promise<string[]>;
  getUniqueApplications(): Promise<string[]>;
  getUniqueTags(): Promise<string[]>;

  searchProducts(query: string, filters?: SearchFilters): Promise<Product[]>;
}

export class JsonProductRepository implements IProductRepository {
  private brands: Brand[] = brandsData as Brand[];
  private categories: Category[] = categoriesData as Category[];
  private series: Series[] = seriesData as Series[];
  private products: Product[] = productsData as Product[];

  async getAllBrands(): Promise<Brand[]> {
    return this.brands;
  }

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    return this.brands.find((b) => b.slug.toLowerCase() === slug.toLowerCase()) ?? null;
  }

  async getBrandById(id: string): Promise<Brand | null> {
    return this.brands.find((b) => b.id.toLowerCase() === id.toLowerCase()) ?? null;
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getCategoriesByBrand(brandId: string): Promise<Category[]> {
    return this.categories.filter((c) => c.brandId.toLowerCase() === brandId.toLowerCase());
  }

  async getCategoryBySlug(brandSlug: string, categorySlug: string): Promise<Category | null> {
    const brand = await this.getBrandBySlug(brandSlug);
    if (!brand) return null;
    return (
      this.categories.find(
        (c) =>
          c.brandId.toLowerCase() === brand.id.toLowerCase() &&
          c.slug.toLowerCase() === categorySlug.toLowerCase()
      ) ?? null
    );
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categories.find((c) => c.id.toLowerCase() === id.toLowerCase()) ?? null;
  }

  async getAllSeries(): Promise<Series[]> {
    return this.series;
  }

  async getSeriesByCategory(categoryId: string): Promise<Series[]> {
    return this.series.filter((s) => s.categoryId.toLowerCase() === categoryId.toLowerCase());
  }

  async getSeriesBySlug(seriesSlug: string): Promise<Series | null> {
    return this.series.find((s) => s.slug.toLowerCase() === seriesSlug.toLowerCase()) ?? null;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductsByBrand(brandId: string): Promise<Product[]> {
    return this.products.filter((p) => p.brandId.toLowerCase() === brandId.toLowerCase());
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return this.products.filter((p) => p.categoryId.toLowerCase() === categoryId.toLowerCase());
  }

  async getProductsBySeries(seriesId: string): Promise<Product[]> {
    return this.products.filter(
      (p) => p.seriesId && p.seriesId.toLowerCase() === seriesId.toLowerCase()
    );
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return this.products.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) ?? null;
  }

  async getRelatedProducts(productId: string): Promise<Product[]> {
    const current = this.products.find((p) => p.id === productId);
    if (!current) return [];

    if (current.relatedProductIds && current.relatedProductIds.length > 0) {
      const explicit = this.products.filter((p) => current.relatedProductIds.includes(p.id));
      if (explicit.length > 0) return explicit;
    }

    // Fallback to same category or brand
    return this.products
      .filter((p) => p.id !== current.id && (p.categoryId === current.categoryId || p.brandId === current.brandId))
      .slice(0, 3);
  }

  async getUniqueIndustries(): Promise<string[]> {
    const set = new Set<string>();
    this.products.forEach((p) => p.industries?.forEach((ind) => set.add(ind)));
    return Array.from(set).sort();
  }

  async getUniqueApplications(): Promise<string[]> {
    const set = new Set<string>();
    this.products.forEach((p) => p.applications?.forEach((app) => set.add(app)));
    return Array.from(set).sort();
  }

  async getUniqueTags(): Promise<string[]> {
    const set = new Set<string>();
    this.products.forEach((p) => p.tags?.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }

  async searchProducts(query: string, filters?: SearchFilters): Promise<Product[]> {
    const q = query.trim().toLowerCase();

    return this.products.filter((p) => {
      // Query match
      if (q) {
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = p.shortDescription.toLowerCase().includes(q);
        const inModel = p.modelNumber?.toLowerCase().includes(q);
        const inTags = p.tags?.some((t) => t.toLowerCase().includes(q));
        const inApps = p.applications?.some((a) => a.toLowerCase().includes(q));
        if (!inName && !inDesc && !inModel && !inTags && !inApps) return false;
      }

      // Filter matches
      if (filters?.industry && !p.industries?.includes(filters.industry)) {
        return false;
      }
      if (filters?.application && !p.applications?.includes(filters.application)) {
        return false;
      }
      if (filters?.tag && !p.tags?.includes(filters.tag)) {
        return false;
      }
      if (filters?.brandSlug && p.brandId.toLowerCase() !== filters.brandSlug.toLowerCase()) {
        return false;
      }

      return true;
    });
  }
}

// Singleton repository export
export const productRepository: IProductRepository = new JsonProductRepository();

