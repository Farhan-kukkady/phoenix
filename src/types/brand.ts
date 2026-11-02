export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo: string;           // path relative to /public
  logoAlt?: string;       // dark/light variant
  description: string;
  website: string;
  categoryIds: string[];
  tagline?: string;
  isDemoData?: boolean;
}
