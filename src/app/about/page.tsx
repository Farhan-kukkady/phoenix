import type { Metadata } from "next";
import Link from "next/link";
import { Target, Handshake, Globe, Lightbulb, Shield, Award, CheckCircle2 } from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";
import siteContent from "@/data/site-content.json";

export const metadata: Metadata = {
  title: "About Phoenix Colour Technologies | Two Decades of Precision",
  description:
    "Founded in Dubai in 2007, Phoenix Colour Technologies brings global color science standards to print and industrial manufacturers across the UAE, Saudi Arabia, GCC, and Africa.",
};

const iconMap: Record<string, React.ElementType> = {
  Target,
  Handshake,
  Globe,
  Lightbulb,
  Shield,
};

export default function AboutPage() {
  const { company, about } = siteContent;

  return (
    <>
      <BreadcrumbBanner
        title="About Phoenix Colour Technologies"
        subtitle="Bringing global color science standards and workflow automation to emerging markets since 2007."
        items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Real Stats Strip */}
      <section className="bg-[rgb(15,23,66)] border-y border-white/10 py-12">
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

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              Our Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {about.headline}
            </h2>
            <div className="prose prose-slate text-slate-600 text-base sm:text-lg leading-relaxed space-y-4 pt-2">
              {about.story.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Award className="w-8 h-8 text-[rgb(196,30,58)] flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">G7 Certified Experts</div>
                  <div className="text-xs text-slate-500">Official Idealliance G7 calibration consultants</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-8 h-8 text-[rgb(15,23,66)] flex-shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">ISO 12647 Compliance</div>
                  <div className="text-xs text-slate-500">Certified process control and audit support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-slate-50 border-y border-slate-200/80">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-[rgb(196,30,58)/0.1] text-[rgb(196,30,58)] flex items-center justify-center font-bold text-xl">
                01
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {about.vision}
              </p>
            </div>

            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-[rgb(15,23,66)/0.1] text-[rgb(15,23,66)] flex items-center justify-center font-bold text-xl">
                02
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {about.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              The operational DNA driving every client partnership, technical specification, and after-sales SLA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {about.values.map((val, idx) => {
              const Icon = iconMap[val.icon] || Target;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:shadow-lg hover:border-[rgb(196,30,58)] transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[rgb(196,30,58)] shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regional Presence */}
      <section className="section-padding bg-[rgb(15,23,66)] text-white">
        <div className="container-wide text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
            Regional Footprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-12">
            Serving UAE, Saudi Arabia, GCC & Africa
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {company.regions.map((reg, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl mb-2">{reg.flag}</div>
                <div className="font-bold text-sm text-white">{reg.name}</div>
                <div className="text-xs text-white/50">{reg.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-gradient-to-r from-[rgb(196,30,58)] to-[rgb(88,28,135)] text-white text-center">
        <div className="container-wide max-w-4xl space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Partner with the Region&apos;s Color Science Authority
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Schedule a diagnostic review of your pressroom, ink room, or industrial manufacturing line with our certified G7 Experts.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-xl"
            >
              Contact Our Engineers
            </Link>
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-transparent border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-all"
            >
              Browse Equipment Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
