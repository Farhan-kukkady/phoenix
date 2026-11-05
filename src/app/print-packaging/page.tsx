import type { Metadata } from "next";
import Link from "next/link";
import { Package, Check, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";
import { productRepository } from "@/lib/repositories/product-repository";
import { ProductCard } from "@/components/catalog/ProductCard";

export const metadata: Metadata = {
  title: "Print & Packaging Solutions | G7 & ISO 12647 Process Standardization",
  description:
    "End-to-end color management, prepress automation, proofing, and spectrophotometric pressroom solutions for commercial printers, label converters, and flexible packaging manufacturers.",
};

export default async function PrintPackagingPage() {
  // Get featured packaging products
  const allProds = await productRepository.getAllProducts();
  const packagingProds = allProds.filter((p) => p.industries?.includes("Print & Packaging")).slice(0, 6);

  return (
    <>
      <BreadcrumbBanner
        title="Print & Packaging Solutions"
        subtitle="Repeatable color accuracy, press make-ready reduction, and closed-loop process control across flexo, gravure, offset, and digital packaging."
        items={[{ label: "Home", href: "/" }, { label: "Print & Packaging" }]}
      />

      {/* Overview & Key Pillars */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Industry Focus
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Zero-Defect Color in Modern Packaging
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Brand owners today demand microscopic color tolerances (Delta E &lt; 1.5) across differing production sites, varied substrates (film, foil, paper, tin), and hybrid printing processes. Phoenix Colour Technologies bridges the gap between global brand expectations and pressroom execution.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "G7 Master Qualification & Calibration",
                  "ISO 12647-2 (Offset) & ISO 12647-6 (Flexo)",
                  "PantoneLIVE Digital Supply Chain Integration",
                  "Closed-Loop Ink Presetting (CIP3 / CIP4)",
                  "Automated Inline & Offline Web Inspection",
                  "Contract Soft & Hard Copy Proofing",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
                    <Check className="w-4 h-4 text-[rgb(196,30,58)] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[rgb(15,23,66)] text-white space-y-6 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[rgb(196,30,58)/0.2] text-[rgb(196,30,58)] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">G7 Master Facility Certification</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Our in-house Idealliance-certified G7 Experts audit your prepress curves, press mechanicals, and ink chemistry to achieve official G7 Master status, recognized by international FMCG brands.
              </p>
              <div className="pt-2">
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Request a G7 Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packaging Sub-Sectors */}
      <section className="section-padding bg-slate-50/60 border-y border-slate-200/80">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              Application Sectors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Specialized Solutions for Every Packaging Segment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Flexible Packaging",
                desc: "Film, foil, and multi-layer laminate converting with non-polarized measurement and solvent-free flexo plate imaging.",
                icon: Package,
              },
              {
                title: "Folding Carton",
                desc: "High-speed sheetfed offset press color bars, automatic track scanning, and crease stiffness QA.",
                icon: Package,
              },
              {
                title: "Labels & Narrow Web",
                desc: "Inline defect detection, 100% web inspection cameras, and UV LED low-migration inks.",
                icon: Cpu,
              },
              {
                title: "Corrugated Packaging",
                desc: "High-graphics post-print and direct flexo standardization on recycled Kraft and coated linerboards.",
                icon: Package,
              },
            ].map((sector, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[rgb(196,30,58)] transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[rgb(196,30,58)] flex items-center justify-center">
                  <sector.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{sector.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packaging Products Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Recommended Instruments
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                Essential Packaging Equipment
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-[rgb(196,30,58)] hover:underline"
            >
              View Full Equipment Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagingProds.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                brandSlug={prod.brandId}
                categorySlug={prod.categoryId}
                seriesSlug={prod.seriesId}
              />
            ))}
          </div>

          {/* Interactive Tools Callout Banner */}
          <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                Interactive Engineering Tools
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Calculate Your Plant’s Annual Waste Savings & Payback
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                Try our Makeready ROI Calculator or run the Substrate Diagnostic to find the exact spectrophotometer for your pressroom.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/tools/roi-calculator" className="btn-primary text-xs px-5 py-3 bg-emerald-600 hover:bg-emerald-700">
                Calculate Press ROI
              </Link>
              <Link href="/tools/selector" className="btn-outline text-xs px-5 py-3 border-white/30 text-white hover:bg-white/10">
                Substrate Selector
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[rgb(15,23,66)] text-white text-center">
        <div className="container-wide max-w-3xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Cut Make-Ready Waste by 30%?
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Connect with our print & packaging engineers in Dubai or Riyadh to review your color reproduction workflow.
          </p>
          <div className="pt-2">
            <Link href="/contact" className="btn-primary">
              Book a Packaging Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
