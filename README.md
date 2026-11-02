# Phoenix Colour Technologies — B2B Catalog & Lead Generation Website

A production-grade Next.js B2B catalog and lead-generation platform built for **Phoenix Colour Technologies**, the leading color science and workflow automation partner for the UAE, Saudi Arabia, the GCC, and Africa.

---

## 🏢 About Phoenix Colour Technologies

- **Founded**: Dubai, UAE (2007)
- **Tagline**: *"Precision, performance, and intelligent manufacturing."*
- **Reach**: 1,200+ satisfied clients across 20+ countries in the Middle East, Africa, and Asia
- **Domain Expertise**: 20+ years of industrial color science, G7® calibration, ISO 12647 process standardization, spectrophotometry, automated ink dispensing, and IoT shopfloor intelligence
- **ROI Focus**: Engineered for measurable return on investment within 12–16 months

---

## 🚀 Key Capabilities & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | **Next.js 16** (App Router, React Server Components by default, Partial Prerendering) |
| **Language** | **TypeScript 5** (Strict mode, zero `any`) |
| **Styling** | **Tailwind CSS v4** + Design token CSS variables (`--color-navy`, `--color-crimson`, `--color-violet`, gradients, radii, shadows) |
| **Accessible Primitives** | **Radix UI** (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-accordion`, etc.) |
| **Typography** | **Inter** (`@fontsource/inter`), self-hosted for 100% offline and build reliability |
| **Forms & Validation** | **React Hook Form** + **Zod** schema validation + honeypot anti-spam protection |
| **Lead Generation API** | Next.js Route Handler (`/api/enquiry`) with Nodemailer SMTP transport + console fallback |
| **Catalog Search** | In-memory search (`/api/search`) powered by **MiniSearch** with fuzzy matching and prefix indexing |
| **Data Layer** | Typed JSON seed files behind an interchangeable **Repository pattern** (`ProductRepository`) ready for CMS migration |
| **SEO & Structured Data** | `sitemap.ts`, `robots.ts`, dynamic `generateMetadata`, JSON-LD (Organization, BreadcrumbList, Product) |

---

## 🗂️ Catalog Hierarchy & Architecture

The website features an intuitive 5-tier catalog hierarchy:

```
Brand (21 Global Brands)
  └── Category
        └── (Optional) Series / Range
              └── Product
                    └── Product Detail Page (Gallery, Specs, KPIs, Downloads, Related)
```

### URL Routes

- `/` — Homepage: Hero with outlined gradient CTA, animated real stats, partner logos, industry solutions, featured products, why Phoenix, testimonials, regional presence
- `/about` — Company history, vision, mission, core values, certifications (G7, ISO 12647)
- `/products` — Complete 21-brand portfolio grid
- `/products/[brand]` — Brand landing page with breadcrumb pill and category cards with navy hover overlay
- `/products/[brand]/[...path]` — Catch-all resolver dynamically rendering Category, Series, or Product Detail view
- `/print-packaging` — Specialized packaging solutions (Flexo, Offset, Gravure, Folding Carton, Corrugated, Labels)
- `/industrial` — Industrial manufacturing solutions (Paints & Coatings, Plastics & Polymers, Textiles, IoT Telemetry)
- `/services` — Turnkey consulting, G7 calibration, AMC contracts, repair SLAs
- `/contact` — Regional offices (Dubai & Riyadh), inquiry form, direct WhatsApp
- `/search?q=` — Instant catalog search across products, categories, and brands

---

## 📦 21 Partner Brands Represented

The catalog includes comprehensive seed data for all 21 partner brands:

1. **X-Rite** *(Reference Implementation with full detail pages)*
2. **GMG Color**
3. **GlobalVision**
4. **Hybrid Software**
5. **Phoenix M.I.S + IoT**
6. **Miraclon** (KODAK FLEXCEL)
7. **EIZO**
8. **Valiani**
9. **IGT Testing Systems**
10. **Inkmaker**
11. **Just Normlicht**
12. **Hanatek Instruments**
13. **Siegwerk**
14. **Apex International**
15. **Epson**
16. **Luster LightTech**
17. **Pantone**
18. **EngView Systems**
19. **PrintFactory**
20. **ECO3**
21. **StudioRIP**

---

## 🔄 How to Replace Demo Data

All demo data is cleanly isolated and marked with `"isDemoData": true` and `"isDemo": true`:

1. **Page Copy**: Edit [`src/data/site-content.json`](src/data/site-content.json). Update text for company stats, hero slides, about story, testimonials, and office addresses.
2. **Brands**: Edit [`src/data/brands.json`](src/data/brands.json). Reference the template in [`content-intake/brand-template.json`](content-intake/brand-template.json).
3. **Categories**: Edit [`src/data/categories.json`](src/data/categories.json). Reference [`content-intake/category-template.json`](content-intake/category-template.json).
4. **Series**: Edit [`src/data/series.json`](src/data/series.json). Reference [`content-intake/series-template.json`](content-intake/series-template.json).
5. **Products**: Edit [`src/data/products.json`](src/data/products.json). Reference [`content-intake/product-template.json`](content-intake/product-template.json).
6. **CMS Swapping**: The application accesses all catalog data through [`src/lib/repositories/product-repository.ts`](src/lib/repositories/product-repository.ts). To connect Sanity, Strapi, or Directus, implement `IProductRepository` and swap the exported instance without touching any UI component!

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** v20+ or v22+
- **pnpm** v10+ or v12+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd phoenix

# Install dependencies
pnpm install
```

### Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your environment variables:

```ini
# Optional SMTP configuration for email delivery
SMTP_HOST=smtp.yourcompany.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=leads@yourcompany.com
SMTP_PASS=your-secure-password
SMTP_FROM="Phoenix Colour Technologies <leads@yourcompany.com>"
SMTP_TO=sales@yourcompany.com

# WhatsApp number for Floating FAB and direct chat (no '+' or spaces)
NEXT_PUBLIC_WHATSAPP_NUMBER=97140000000

# Canonical Site URL
NEXT_PUBLIC_SITE_URL=https://www.phoenixcolour.com
```

> **Note**: In demo mode, if SMTP is not configured, form enquiries are safely logged to the server terminal and return an instant success confirmation to the user.

### Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Production Build & Lint

```bash
# Lint check (strict TypeScript and ESLint)
pnpm lint

# Production build (pre-renders all 150+ catalog pages statically)
pnpm build

# Start production server
pnpm start
```

---

## 🚀 Deployment

The project is optimized for deployment on **Vercel**, **AWS Amplify**, or any Node.js container environment:

```bash
# Deploy to Vercel
vercel
```

All dynamic catalog paths (`/products/[brand]/[...path]`) leverage `generateStaticParams` to build 150+ high-performance static HTML pages at deploy time, delivering sub-100ms TTFB across regional edge networks.

---

## 📄 License & Ownership

Copyright © 2007–2026 Phoenix Colour Technologies. All rights reserved.
