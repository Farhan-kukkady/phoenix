# Phoenix Colour Technologies — Content Intake & Demo Data Guide

This folder contains the intake templates and schemas used to populate and update catalog data and site content across the Phoenix Colour Technologies platform.

---

## 1. Replacing Demo Data

The initial build contains mock/demo data for brands, categories, series, products, and marketing content. Demo entities are clearly flagged and easily replaceable.

### `isDemoData` & `isDemo` Flags
- In `src/data/site-content.json`, top-level `"isDemoData": true` marks corporate copy, statistics, office details, and testimonials as placeholder content. When replacing with client-approved corporate content, switch this to `false`.
- In Brand, Category, and Series objects, `"isDemoData": true` identifies synthetic catalog items.
- In Product objects, `"isDemo": true` indicates mock product specifications, images, and downloads.

When real client or principal data is imported:
1. Set `"isDemo": false` on verified products.
2. Update repository filters or catalog exports to exclude demo records or archive them.

---

## 2. Site Content Configuration (`src/data/site-content.json`)

`src/data/site-content.json` controls company-wide messaging and page content:
- **`company`**: Official legal and trade names, founding year, key regional statistics, and active territories across GCC/MENA/Africa.
- **`about`**: Company backstory, vision, mission, and foundational values.
- **`hero`**: Hero carousel slides on the home page with headlines, gradient accents, CTA buttons, and background images.
- **`testimonials`**: Client endorsements, titles, and company affiliations.
- **`services`**: Service cards detailing consulting, workflow automation, spectrophotometry, IoT intelligence, training, and maintenance.
- **`industries`**: Sector-specific landing cards and solution highlights (Commercial Print, Flexible Packaging, Paints & Coatings, Plastics, Textiles, Industrial Manufacturing).
- **`contact`**: Regional branch offices (Dubai HQ, Riyadh, etc.) with physical addresses, telephone numbers, emails, and WhatsApp handles.
- **`footer`**: Footer navigation structure, legal links, and summary bio.

---

## 3. Catalog Templates & Schemas

Fill out each JSON template when registering a new partner brand, equipment category, machine series, or product.

### Template 1: Brand (`brand-template.json`)
Defines the manufacturer or solution principal (e.g. X-Rite, GMG, Pantone, Miraclon).
- **`id`** (`string`): Unique lowercase identifier (e.g. `"x-rite"`).
- **`slug`** (`string`): URL slug matching `/products/[brand]` (e.g. `"x-rite"`).
- **`name`** (`string`): Full brand display name (e.g. `"X-Rite Pantone"`).
- **`logo`** (`string`): Path relative to `/public` (e.g. `"/images/brands/x-rite.svg"`).
- **`logoAlt`** (`string`, optional): Alternate light/dark variant path.
- **`description`** (`string`): Comprehensive summary of the brand's offerings and industry standing.
- **`website`** (`string`): Official external URL of the manufacturer.
- **`categoryIds`** (`string[]`): Array of associated category IDs.
- **`tagline`** (`string`, optional): Short marketing punchline.
- **`isDemoData`** (`boolean`): Set to `false` for verified real brands.

### Template 2: Category (`category-template.json`)
Defines a product segment within a brand (e.g. Spectrophotometers, Press Room Solutions, Prepress RIP).
- **`id`** (`string`): Unique category ID (e.g. `"x-rite-spectrophotometers"`).
- **`slug`** (`string`): Category URL slug (e.g. `"spectrophotometers"`).
- **`brandId`** (`string`): ID of the owning brand.
- **`name`** (`string`): Display name.
- **`image`** (`string`): Path relative to `/public` (e.g. `"/images/categories/spectro.jpg"`).
- **`description`** (`string`): Overview of equipment and software in this category.
- **`hasSeries`** (`boolean`): Set `true` if products are organized under series/families; otherwise `false`.
- **`seriesIds`** (`string[]`, optional): Array of member series IDs if `hasSeries` is `true`.
- **`isDemoData`** (`boolean`): Set to `false` for live data.

### Template 3: Series (`series-template.json`)
Defines a specific product line or family under a category (e.g. Exact Series, ColorCert Family).
- **`id`** (`string`): Unique series identifier (e.g. `"x-rite-exact-series"`).
- **`slug`** (`string`): Series URL slug (e.g. `"exact-series"`).
- **`categoryId`** (`string`): Owning category ID.
- **`brandId`** (`string`): Owning brand ID.
- **`name`** (`string`): Series name.
- **`image`** (`string`): Representative family image path relative to `/public`.
- **`description`** (`string`): Detailed description of what distinguishes this series.
- **`isDemoData`** (`boolean`): Set to `false` for live data.

### Template 4: Product (`product-template.json`)
Defines an individual equipment model, software package, or consumable instrument.
- **`id`** (`string`): Unique product ID (e.g. `"x-rite-exact-2"`).
- **`slug`** (`string`): Product URL slug (e.g. `"exact-2"`).
- **`brandId`** (`string`): Owning brand ID.
- **`categoryId`** (`string`): Owning category ID.
- **`seriesId`** (`string`, optional): Associated series ID if applicable.
- **`name`** (`string`): Official product title.
- **`modelNumber`** (`string`, optional): Manufacturer SKU or part designation.
- **`shortDescription`** (`string`): Concise 1–2 sentence summary for cards and search snippets.
- **`overview`** (`string`): Rich text formatted as clean HTML (`<p>`, `<ul>`, `<li>`, `<strong>`).
- **`images`** (`string[]`): Array of image paths relative to `/public`. Primary image must be index 0.
- **`keyFeatures`** (`string[]`): Bullet list of key technical highlights and benefits.
- **`specifications`** (`SpecGroup[]`): Grouped technical specifications (e.g. Optics, Geometry, Connectivity, Dimensions).
- **`applications`** (`string[]`): Use cases (e.g. `"Press-side Spot Color Verification"`, `"Ink Formulation"`).
- **`industries`** (`string[]`): Targeted industrial verticals (e.g. `"Commercial Print"`, `"Flexible Packaging"`).
- **`tags`** (`string[]`): Search keywords and filter facets.
- **`downloads`** (`Download[]`): Brochures, manuals, and software drivers.
- **`relatedProductIds`** (`string[]`): IDs of compatible or complementary products.
- **`isDemo`** (`boolean`): Set to `false` for verified live product entries.

---

## 4. Media & Asset Placement

All media referenced in catalog JSON files must reside in `public/`:
- Brand Logos: `public/images/brands/[brand-slug].svg`
- Category Imagery: `public/images/categories/[category-slug].jpg`
- Product Images: `public/images/products/[product-slug]/[filename].webp`
- PDF Downloads: `public/downloads/[filename].pdf`
