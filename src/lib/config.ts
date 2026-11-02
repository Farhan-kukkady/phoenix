export const siteConfig = {
  name: "Phoenix Colour Technologies",
  tagline: "Precision, performance, and intelligent manufacturing.",
  description:
    "Leading color management and workflow automation solutions provider serving the UAE, Saudi Arabia, GCC, and Africa.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.phoenixcolour.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971507544559",
  contact: {
    phone: "+971 50 754 4559",
    email: "sales@phoenixtecsol.com",
    address: "Warehouse 3B Plot No 368-0140 Behind Hyundai Showroom Al Quoz 3, Dubai, UAE",
  },
  social: {
    linkedin: "https://linkedin.com/company/phoenix-colour-technologies",
    twitter: "https://twitter.com/phoenixcolourUAE",
    instagram: "https://instagram.com/phoenixcolourtech",
    youtube: "https://youtube.com/c/phoenixcolourtech",
  },
  nav: {
    left: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products", hasMegaMenu: true },
      { label: "Print & Packaging", href: "/print-packaging" },
    ],
    right: [
      { label: "Industrial", href: "/industrial" },
      { label: "Contact", href: "/contact" },
      { label: "Services", href: "/services" },
    ],
  },
} as const;
