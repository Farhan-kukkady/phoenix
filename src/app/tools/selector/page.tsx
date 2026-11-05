import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";
import { InstrumentSelector } from "@/components/tools/InstrumentSelector";

export const metadata: Metadata = {
  title: "AI Spectrophotometer & Substrate Selector | Phoenix Colour Technologies",
  description:
    "Interactive diagnostic tool to select the exact spectrophotometer, optical geometry (45°:0°, sphere d/8°, multi-angle), or print inspection system for your specific packaging substrate.",
};

export default function SelectorPage() {
  return (
    <>
      <BreadcrumbBanner
        title="AI Instrument & Substrate Selector"
        subtitle="Find the exact spectrophotometer or automated inspection system engineered for your specific substrate, optical geometry, and production floor."
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "Instrument Selector" },
        ]}
      />

      {/* Main Selector Section */}
      <section className="section-padding bg-slate-100/70">
        <div className="container-wide">
          <InstrumentSelector />

          {/* Educational Guide on Optical Geometries */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              Engineering Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 mb-4">
              Understanding Optical Geometries in Color Measurement
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed mb-8">
              Measuring color accurately requires matching the physical illumination and viewing angle of your instrument to your substrate&apos;s surface texture and gloss level. Here is why choosing the proper geometry is critical:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 45°:0° Geometry */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-[rgb(15,23,66)] text-white text-xs font-bold">
                  45°:0° Annular
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Paper, Board & Commercial Print
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Illuminates at 45° and detects at 0° (perpendicular). Closely replicates how the human eye views printed packages under standardized viewing booth lighting. Essential for G7 and ISO 12647 pressroom compliance.
                </p>
                <div className="text-[11px] font-semibold text-[rgb(196,30,58)]">
                  Primary Instrument: X-Rite eXact™ 2 Series
                </div>
              </div>

              {/* Sphere d/8° Geometry */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-[rgb(15,23,66)] text-white text-xs font-bold">
                  Sphere Diffuse / 8°
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Plastics, Liquids & Textured Parts
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Bounces light inside an integrating white sphere cavity, illuminating the sample uniformly from every angle. Distinguishes true colorant recipe from surface texture or gloss (SPIN vs SPEX).
                </p>
                <div className="text-[11px] font-semibold text-[rgb(196,30,58)]">
                  Primary Instrument: X-Rite Ci7800 / Ci64
                </div>
              </div>

              {/* Multi-Angle Geometry */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-[rgb(15,23,66)] text-white text-xs font-bold">
                  Multi-Angle (5 to 12 Angles)
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Metallics & Pearlescent Effects
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Measures the color travel (&ldquo;flop&rdquo;) of effect pigments and mica flakes across multiple viewing angles. Prevents mismatched vehicle panels or cosmetic containers that shift tone under directional light.
                </p>
                <div className="text-[11px] font-semibold text-[rgb(196,30,58)]">
                  Primary Instrument: X-Rite MA-5 QC / MA-T12
                </div>
              </div>
            </div>

            {/* Support CTA */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>All recommendations backed by Phoenix Certified Application Engineers in Dubai.</span>
              </div>
              <Link
                href="/contact"
                className="btn-primary text-xs px-5 py-2.5"
              >
                Schedule an On-Site Substrate Test
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
