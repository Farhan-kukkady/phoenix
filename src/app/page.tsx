import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Award,
  Clock,
  Cpu,
  BarChart3,
  Quote,
  CheckCircle2,
} from "lucide-react";
import siteContent from "@/data/site-content.json";
import { productRepository } from "@/lib/repositories/product-repository";
import { ProductCard } from "@/components/catalog/ProductCard";

export const metadata: Metadata = {
  title: "Phoenix Colour Technologies | Precision, Performance & Intelligent Manufacturing",
  description:
    "Leading color management, spectrophotometry, and workflow automation solutions provider serving UAE, Saudi Arabia, GCC, and Africa since 2007.",
};

export default async function HomePage() {
  const { company, hero, testimonials, industries } = siteContent;
  const allProducts = await productRepository.getAllProducts();

  // Highlight flagship products with real imagery
  const withImages = allProducts.filter((p) => !p.images[0].includes("placeholder"));
  const featuredProducts = withImages.length >= 3 ? withImages.slice(0, 3) : allProducts.slice(0, 3);

  const heroSlide = hero.slides[0];

  return (
    <div className="flex flex-col">
      {/* =========================================================
          HERO SECTION (matching ref/hero-header.png)
          ========================================================= */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center bg-[rgb(15,23,66)] overflow-hidden">
        {/* Full-bleed background with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${heroSlide.image})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgb(15,23,66)] via-[rgb(15,23,66)/0.75] to-[rgb(15,23,66)/0.9]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,30,58,0.25)_0%,transparent_70%)]"
          aria-hidden="true"
        />

        <div className="container-wide relative z-10 text-center py-24 sm:py-32">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold text-white/90 mb-6 tracking-wide shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[rgb(196,30,58)] animate-pulse" />
            <span>Precision • Performance • Intelligent Manufacturing</span>
          </div>

          {/* Gradient Headline (matching ref/hero-header.png) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] max-w-5xl mx-auto drop-shadow-md">
            <span>{heroSlide.headline} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-amber-300">
              {heroSlide.headlineGradient}
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-normal">
            {heroSlide.subtext}
          </p>

          {/* Outlined CTA Button with gradient border (matching ref/hero-header.png) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={heroSlide.ctaHref}
              className="btn-primary text-sm px-8 py-3.5 shadow-xl shadow-red-950/40"
            >
              {heroSlide.ctaLabel}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              href="/contact"
              className="btn-outline text-sm px-8 py-3.5"
            >
              Contact Us
            </Link>
          </div>

          {/* Founded marker */}
          <p className="mt-12 text-xs text-white/40 tracking-widest uppercase">
            Founded in Dubai in 2007 • Serving UAE, Saudi Arabia, GCC & Africa
          </p>
        </div>
      </section>

      {/* =========================================================
          ANIMATED STATS STRIP (Real stats requirement)
          ========================================================= */}
      <section className="bg-[rgb(15,23,66)] border-y border-white/10 py-10">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {company.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-amber-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="text-[11px] text-white/50">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BRAND LOGO STRIP (21 Partners)
          ========================================================= */}
      <section className="py-12 bg-slate-900 border-b border-white/5 overflow-hidden">
        <div className="container-wide text-center mb-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">
            Authorized Distributor & Integration Partner for 21 Global Leaders
          </p>
        </div>
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { name: "X-Rite", slug: "x-rite" },
              { name: "GMG", slug: "gmg" },
              { name: "GlobalVision", slug: "globalvision" },
              { name: "Hybrid Software", slug: "hybrid-software" },
              { name: "Miraclon", slug: "miraclon" },
              { name: "EIZO", slug: "eizo" },
              { name: "Valiani", slug: "valiani" },
              { name: "Pantone", slug: "pantone" },
              { name: "Epson", slug: "epson" },
              { name: "Inkmaker", slug: "inkmaker" },
              { name: "Siegwerk", slug: "siegwerk" },
              { name: "Apex", slug: "apex" },
              { name: "Hanatek", slug: "hanatek" },
            ].map((brand) => (
              <Link
                key={brand.slug}
                href={`/products/${brand.slug}`}
                className="group p-2 rounded-xl transition-all hover:bg-white/5"
                aria-label={brand.name}
              >
                <Image
                  src={`/images/brands/${brand.slug}.webp`}
                  alt={brand.name}
                  width={110}
                  height={32}
                  className="max-h-7 w-auto object-contain opacity-65 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SOLUTIONS BY INDUSTRY
          ========================================================= */}
      <section className="section-padding bg-slate-50">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Industrial Applications
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-1">
                Solutions by Industry
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              Tailored color management, inline process verification, and formulation chemistry for your specific manufacturing medium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.slug}
                className="flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[rgb(196,30,58)] transition-all group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[rgb(15,23,66)/0.06] text-[rgb(15,23,66)] group-hover:bg-[rgb(196,30,58)] group-hover:text-white flex items-center justify-center font-bold transition-colors">
                    <span className="text-sm">0{industries.indexOf(ind) + 1}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[rgb(196,30,58)] transition-colors">
                    {ind.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ind.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {ind.solutions.slice(0, 3).map((sol, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[rgb(196,30,58)] flex-shrink-0" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    href={ind.slug === "print-packaging" ? "/print-packaging" : "/industrial"}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[rgb(15,23,66)] group-hover:text-[rgb(196,30,58)] transition-colors"
                  >
                    View Industry Solutions
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED FLAGSHIP INSTRUMENTS
          ========================================================= */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Equipment Spotlight
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-1">
                Featured Flagship Instruments
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-[rgb(196,30,58)] hover:underline"
            >
              Browse Complete Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                brandSlug={prod.brandId}
                categorySlug={prod.categoryId}
                seriesSlug={prod.seriesId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY PHOENIX COLOUR TECHNOLOGIES
          ========================================================= */}
      <section className="section-padding bg-[rgb(15,23,66)] text-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              The Phoenix Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Why 1,200+ Manufacturers Trust Phoenix
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Not just an equipment vendor — an engineering partner committed to pressroom calibration, measurable ROI, and rapid regional response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Certified G7 & ISO Experts",
                desc: "Idealliance-certified G7 Experts delivering press fingerprinting, curve calibration, and ISO 12647 compliance.",
              },
              {
                icon: Zap,
                title: "12–16 Month ROI Focus",
                desc: "Every automated dispensing system, spectrophotometer, and software module is engineered for fast, measurable return.",
              },
              {
                icon: ShieldCheck,
                title: "Official Brand Distribution",
                desc: "Direct authorized partnership with 21 leading manufacturers ensures factory warranties and genuine OEM components.",
              },
              {
                icon: Clock,
                title: "4-Hour Response SLA",
                desc: "Regional service hubs in Dubai and Riyadh guarantee fast emergency dispatch and loaner instruments to avoid downtime.",
              },
              {
                icon: Cpu,
                title: "IoT Shopfloor Intelligence",
                desc: "Proprietary Phoenix M.I.S + IoT telemetric platform connecting presses and quality control instruments in real time.",
              },
              {
                icon: BarChart3,
                title: "20+ Years Domain Leadership",
                desc: "Founded in Dubai in 2007 with deep roots across the GCC, Africa, and Asia supporting commercial and industrial plants.",
              },
            ].map((adv, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[rgb(196,30,58)] transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[rgb(196,30,58)/0.2] text-[rgb(196,30,58)] flex items-center justify-center">
                  <adv.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{adv.title}</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CLIENT TESTIMONIALS (Demo data)
          ========================================================= */}
      <section className="section-padding bg-slate-50">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What Our Partners Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6 relative flex flex-col justify-between"
              >
                <Quote className="w-8 h-8 text-[rgb(196,30,58)/0.2]" />
                <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{test.author}</div>
                    <div className="text-xs text-slate-500">{test.title}, {test.company}</div>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                    {test.industry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          REGIONAL FOOTPRINT (UAE, KSA, GCC, Africa)
          ========================================================= */}
      <section className="section-padding bg-white border-t border-slate-200/80">
        <div className="container-wide text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
            Global Reach, Local Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-12">
            Active Deployments Across 20+ Countries
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {company.regions.map((reg, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[rgb(196,30,58)] transition-colors"
              >
                <div className="text-3xl mb-2">{reg.flag}</div>
                <div className="font-bold text-sm text-slate-900">{reg.name}</div>
                <div className="text-xs text-slate-500">{reg.city} Desk</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA BANNER
          ========================================================= */}
      <section className="section-padding bg-gradient-to-r from-[rgb(196,30,58)] to-[rgb(88,28,135)] text-white text-center">
        <div className="container-wide max-w-4xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Achieve Repeatable Color & Zero-Waste Manufacturing?
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connect with Phoenix Colour Technologies engineers today for an on-site demonstration or formal quotation.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-xl"
            >
              Request a Consultation
            </Link>
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-transparent border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              Explore 21 Partner Brands
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
