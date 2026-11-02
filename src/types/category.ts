export interface Category {
  id: string;
  slug: string;
  brandId: string;
  name: string;
  image: string;
  description: string;
  hasSeries: boolean;
  seriesIds?: string[];
  isDemoData?: boolean;
}
