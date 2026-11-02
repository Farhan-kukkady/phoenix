import type { Metadata } from "next";
import { Suspense } from "react";
import "@fontsource/inter/index.css";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { ScrollTop } from "@/components/ui/ScrollTop";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { siteConfig } from "@/lib/config";
import { generateOrganizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_AE",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationJsonLd()),
          }}
        />
        <Suspense fallback={<div style={{ height: "var(--header-height, 72px)" }} />}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFab phoneNumber={siteConfig.whatsappNumber} />
        <ScrollTop />
        <ChatWidget />
      </body>
    </html>
  );
}
