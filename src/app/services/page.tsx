import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, Workflow, BarChart3, Cpu, GraduationCap, Wrench, CheckCircle2 } from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";
import siteContent from "@/data/site-content.json";

export const metadata: Metadata = {
  title: "Professional Services & Engineering Solutions",
  description:
    "End-to-end color management consulting, G7 press calibration, workflow automation, spectrophotometer calibration, and shopfloor IoT intelligence services.",
};

const iconMap: Record<string, React.ElementType> = {
  Gauge,
  Workflow,
  BarChart3,
  Cpu,
  GraduationCap,
  Wrench,
};

export default function ServicesPage() {
  const { services } = siteContent;

  return (
    <>
      <BreadcrumbBanner
        title="Professional Engineering Services"
        subtitle="Certified domain expertise delivering measurable ROI in color standardization, pressroom efficiency, and intelligent manufacturing."
        items={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Services Grid */}
      <section className="section-padding bg-slate-50/50">
        <div className="container-wide">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Turnkey Technical Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From single-instrument calibration to factory-wide IoT workflow deployment, our certified engineers deliver complete lifecycle support across the GCC and Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => {
              const Icon = iconMap[svc.icon] || Gauge;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[rgb(196,30,58)] transition-all group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-[rgb(15,23,66)/0.06] text-[rgb(15,23,66)] group-hover:bg-[rgb(196,30,58)] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[rgb(196,30,58)] transition-colors">
                      {svc.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {svc.description}
                    </p>

                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Included Features
                      </h4>
                      <ul className="space-y-2">
                        {svc.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[rgb(196,30,58)] flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-xs font-bold text-[rgb(15,23,66)] group-hover:text-[rgb(196,30,58)] transition-colors"
                    >
                      Book Service Consultation →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SLA & Methodology */}
      <section className="section-padding bg-white border-t border-slate-200/80">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Service Level Agreement
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Rapid Regional Response
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                In print and packaging operations, unscheduled downtime on a high-speed press or an uncalibrated ink dispenser directly translates to severe profit loss. Phoenix Colour Technologies operates local service centers in Dubai and Riyadh stocked with genuine OEM spare parts and certified loaner units.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  "Guaranteed 4-hour remote response for critical production halts",
                  "On-site engineer dispatch across UAE and Saudi Arabia within 24 hours",
                  "Certified annual recalibration with ISO 17025 traceable certificates",
                  "Emergency loaner spectrophotometers during preventive maintenance",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-[rgb(15,23,66)] text-white space-y-6">
              <h3 className="text-2xl font-bold">Annual Maintenance Contract (AMC)</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Protect your color management infrastructure with our comprehensive Annual Maintenance Contracts. Includes semi-annual preventive visits, NetProfiler certification, and operator refreshers.
              </p>
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Preventive Visits</span>
                  <span className="font-semibold">2 Scheduled / Year</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">NetProfiler Calibration</span>
                  <span className="font-semibold">Included</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Emergency Callouts</span>
                  <span className="font-semibold">Unlimited Remote / Priority On-Site</span>
                </div>
              </div>
              <Link href="/contact" className="btn-primary w-full justify-center">
                Inquire About AMC Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
