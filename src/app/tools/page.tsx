import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Calculator,
  SlidersHorizontal,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";

export const metadata: Metadata = {
  title: "Interactive AI Tools & Calculators | Phoenix Colour Technologies",
  description:
    "Explore Phoenix Colour Technologies' interactive industrial tools: The AI Instrument & Substrate Selector and the Press Makeready & Waste ROI Calculator.",
};

export default function ToolsHubPage() {
  return (
    <>
      <BreadcrumbBanner
        title="Interactive Industrial AI Tools"
        subtitle="Empowering print, packaging, and industrial manufacturing plants across the GCC with intelligent diagnostic and financial modeling engines."
        items={[{ label: "Home", href: "/" }, { label: "Tools" }]}
      />

      <section className="section-padding bg-slate-50">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              Digital Decision Engines
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Engineered to Solve Pressroom Challenges
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Whether you are determining which optical geometry is required for non-traditional substrates or calculating equipment payback for executive leadership, our purpose-built tools give you instant, certified clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tool 1 Card: Instrument Selector */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl flex flex-col justify-between hover:border-slate-300 transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[rgb(196,30,58)] flex items-center justify-center">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-[rgb(196,30,58)] text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Diagnostic
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    AI Instrument & Substrate Selector
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Unsure whether your plant needs a 45°:0° handheld (eXact 2), a benchtop d/8° sphere (Ci7800), a multi-angle device (MA-5 QC), or an automated artwork scanner? Run a 3-step diagnostic to get a certified recommendation.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    "Evaluates substrate surface gloss, metallization & texture",
                    "Explains optical geometry in plain English",
                    "Direct links to official X-Rite & GlobalVision specifications",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[rgb(196,30,58)]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/tools/selector"
                  className="btn-primary w-full text-center text-sm py-3.5 shadow-md justify-center"
                >
                  Launch Instrument Selector
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Tool 2 Card: ROI Calculator */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl flex flex-col justify-between hover:border-slate-300 transition-all duration-300">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Financial Modeler
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Makeready & Waste ROI Calculator
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Model your pressroom&apos;s annual cost savings, recovered machine capacity, and scrap reduction. Supports Offset, Flexo, Gravure, and Narrow Web operations with USD ($) and AED (Dirhams) currency toggle.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    "Calculates hours of billable press capacity recovered",
                    "Diverts 150,000+ sheets or meters of substrate scrap annually",
                    "Computes accurate equipment payback timeline in months",
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/tools/roi-calculator"
                  className="btn-primary w-full text-center text-sm py-3.5 bg-emerald-600 hover:bg-emerald-700 shadow-md justify-center"
                >
                  Launch Waste & ROI Calculator
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

