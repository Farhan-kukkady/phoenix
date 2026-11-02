export interface SpecItem {
  label: string;
  value: string;
  unit?: string;
}

export interface SpecGroup {
  group: string;
  items: SpecItem[];
}

export interface Download {
  label: string;
  type: "brochure" | "datasheet" | "manual" | "software" | "other";
  url: string;
}

export interface Product {
  id: string;
  slug: string;
  brandId: string;
  categoryId: string;
  seriesId?: string;
  name: string;
  modelNumber?: string;
  shortDescription: string;
  overview: string;           // rich text as HTML string
  images: string[];           // paths relative to /public
  keyFeatures: string[];
  specifications: SpecGroup[];
  applications: string[];
  industries: string[];
  tags: string[];
  downloads: Download[];
  relatedProductIds: string[];
  isDemo: boolean;
}
