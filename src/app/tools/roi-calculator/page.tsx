import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, Factory, Award } from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";
import { RoiCalculator } from "@/components/tools/RoiCalculator";

export const metadata: Metadata = {
  title: "Press Makeready & Waste ROI Calculator | Phoenix Colour Technologies",
  description:
    "Interactive print plant financial modeler: Calculate your annual substrate scrap savings, recovered press capacity hours, and equipment payback period with Phoenix closed-loop color solutions.",
};

export default function RoiCalculatorPage() {
  return (
    <>
      <BreadcrumbBanner
        title="AI Makeready & Waste ROI Calculator"
        subtitle="Model your packaging plant's financial return from closed-loop color measurement, automated ink presetting, and reduced job changeover waste."
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: "ROI Calculator" },
        ]}
      />

      {/* Main ROI Calculator Section */}
      <section className="section-padding bg-slate-100/70">
        <div className="container-wide">
          <RoiCalculator />

          {/* Industry Benchmarks & Case Study Highlights */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[rgb(196,30,58)] flex items-center justify-center">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Where Do The Savings Come From?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Conventional offset and flexo press operators spend 35–55 minutes per job pulling press sheets, manually adjusting ink fountain keys, and second-guessing color under fluctuating room light.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                With an integrated eXact 2 connected to ColorCert, ink density adjustments are prescribed digitally on the first pull—achieving G7 gray balance and customer Delta E targets in under 15 minutes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Substrate Scrap Elimination
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                With raw paperboard and barrier films escalating in price, running 300 to 500 scrap sheets per makeready destroys profitability.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Phoenix customers routinely document a 40% reduction in makeready waste sheets, saving an average of 150,000+ sheets or 120,000 meters of film per press line every year.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Customer Audit Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero client rejections. Providing digital ColorCert scorecards to multinational brand owners (Nestlé, Unilever, P&amp;G) proves your pressrun complied with ISO 12647 tolerances before delivery.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-bold text-[rgb(196,30,58)] hover:underline"
                >
                  Book an On-Site Plant Audit in Dubai →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

