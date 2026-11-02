import { siteConfig } from "@/lib/config";
import type { Product, Brand } from "@/types";

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    foundingDate: "2007",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 205, Business Bay Tower",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        contactType: "customer service",
        areaServed: ["AE", "SA", "GCC", "Africa"],
        availableLanguage: ["English", "Arabic"],
      },
    ],
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ],
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateProductJsonLd(product: Product, brand?: Brand) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.startsWith("http") ? img : `${siteConfig.url}${img}`
    ),
    description: product.shortDescription,
    model: product.modelNumber,
    brand: {
      "@type": "Brand",
      name: brand?.name || product.brandId,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: "0",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceType: "https://schema.org/InvoicePrice",
        description: "Official quotation upon request",
      },
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };
}

