import { NextRequest, NextResponse } from "next/server";
import MiniSearch from "minisearch";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";
import categoriesData from "@/data/categories.json";
import type { Product } from "@/types";

// In-memory catalog search index
interface SearchDoc {
  id: string;
  type: "product" | "brand" | "category";
  title: string;
  description: string;
  slug: string;
  brandSlug: string;
  url: string;
  categoryName?: string;
  modelNumber?: string;
}

const docs: SearchDoc[] = [];

// Index products
(productsData as unknown as Product[]).forEach((p) => {
  const brand = brandsData.find((b) => b.id.toLowerCase() === p.brandId.toLowerCase());
  const cat = categoriesData.find((c) => c.id.toLowerCase() === p.categoryId.toLowerCase());

  let url = `/products/${brand?.slug || p.brandId}`;
  if (cat) {
    if (p.seriesId) {
      url += `/${cat.slug}/${p.seriesId}/${p.slug}`;
    } else {
      url += `/${cat.slug}/${p.slug}`;
    }
  } else {
    url += `/${p.slug}`;
  }

  docs.push({
    id: `prod-${p.id}`,
    type: "product",
    title: p.name,
    description: `${p.shortDescription} ${p.applications?.join(" ") || ""} ${p.tags?.join(" ") || ""}`,
    slug: p.slug,
    brandSlug: brand?.slug || p.brandId,
    categoryName: cat?.name,
    modelNumber: p.modelNumber,
    url,
  });
});

// Index brands
brandsData.forEach((b) => {
  docs.push({
    id: `brand-${b.id}`,
    type: "brand",
    title: b.name,
    description: `${b.tagline || ""} ${b.description}`,
    slug: b.slug,
    brandSlug: b.slug,
    url: `/products/${b.slug}`,
  });
});

// Index categories
categoriesData.forEach((c) => {
  const brand = brandsData.find((b) => b.id.toLowerCase() === c.brandId.toLowerCase());
  docs.push({
    id: `cat-${c.id}`,
    type: "category",
    title: c.name,
    description: c.description,
    slug: c.slug,
    brandSlug: brand?.slug || c.brandId,
    url: `/products/${brand?.slug || c.brandId}/${c.slug}`,
  });
});

const miniSearch = new MiniSearch<SearchDoc>({
  fields: ["title", "description", "modelNumber", "categoryName"],
  storeFields: ["id", "type", "title", "description", "url", "modelNumber", "categoryName", "brandSlug"],
  searchOptions: {
    boost: { title: 3, modelNumber: 2.5, categoryName: 1.5 },
    fuzzy: 0.2,
    prefix: true,
  },
});

miniSearch.addAll(docs);

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim() || "";

  if (!query) {
    return NextResponse.json({ query: "", total: 0, results: [] });
  }

  const searchResults = miniSearch.search(query);

  const formatted = searchResults.slice(0, 30).map((res) => ({
    id: res.id,
    type: res.type,
    title: res.title,
    description: res.description,
    url: res.url,
    modelNumber: res.modelNumber,
    categoryName: res.categoryName,
    brandSlug: res.brandSlug,
    score: res.score,
  }));

  return NextResponse.json({
    query,
    total: formatted.length,
    results: formatted,
  });
}
