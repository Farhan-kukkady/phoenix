import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbBannerProps {
  title?: string;
  subtitle?: string;
  items: BreadcrumbItem[];
  bgImage?: string;
}

export function BreadcrumbBanner({
  title,
  subtitle,
  items,
  bgImage = "/images/hero/color-measurement.jpg",
}: BreadcrumbBannerProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-[rgb(15,23,66)] overflow-hidden">
      {/* Background Image with Dark Navy Gradients */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgb(15,23,66)/0.9] via-[rgb(15,23,66)/0.8] to-[rgb(15,23,66)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,30,58,0.15)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10 text-center">
        {/* Title if provided */}
        {title && (
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 max-w-4xl mx-auto">
            {title}
          </h1>
        )}

        {/* Subtitle if provided */}
        {subtitle && (
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb Pill (matching ref/brand-page-banner.png) */}
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-white/80 shadow-lg shadow-black/20"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span key={index} className="inline-flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-white font-semibold" : ""}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" aria-hidden="true" />
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

