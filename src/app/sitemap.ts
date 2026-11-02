import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { productRepository } from "@/lib/repositories/product-repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/print-packaging`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/industrial`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic Catalog Pages
  const brands = await productRepository.getAllBrands();
  const categories = await productRepository.getAllCategories();
  const allSeries = await productRepository.getAllSeries();
  const products = await productRepository.getAllProducts();

  const brandRoutes: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${baseUrl}/products/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = [];
  for (const brand of brands) {
    const brandCats = categories.filter((c) => c.brandId.toLowerCase() === brand.id.toLowerCase());
    for (const cat of brandCats) {
      categoryRoutes.push({
        url: `${baseUrl}/products/${brand.slug}/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });

      const catSeries = allSeries.filter((s) => s.categoryId.toLowerCase() === cat.id.toLowerCase());
      for (const ser of catSeries) {
        categoryRoutes.push({
          url: `${baseUrl}/products/${brand.slug}/${cat.slug}/${ser.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  }

  const productRoutes: MetadataRoute.Sitemap = [];
  for (const prod of products) {
    const brand = brands.find((b) => b.id.toLowerCase() === prod.brandId.toLowerCase());
    const cat = categories.find((c) => c.id.toLowerCase() === prod.categoryId.toLowerCase());
    const brandSlug = brand?.slug || prod.brandId;

    let path = `${baseUrl}/products/${brandSlug}`;
    if (cat) {
      if (prod.seriesId) {
        path += `/${cat.slug}/${prod.seriesId}/${prod.slug}`;
      } else {
        path += `/${cat.slug}/${prod.slug}`;
      }
    } else {
      path += `/${prod.slug}`;
    }

    productRoutes.push({
      url: path,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  return [...staticRoutes, ...brandRoutes, ...categoryRoutes, ...productRoutes];
}

