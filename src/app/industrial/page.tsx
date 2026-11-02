import type { Metadata } from "next";
import Link from "next/link";
import { Paintbrush, Layers, Shirt, Factory, Check, ArrowRight } from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";
import { productRepository } from "@/lib/repositories/product-repository";
import { ProductCard } from "@/components/catalog/ProductCard";

export const metadata: Metadata = {
  title: "Industrial Manufacturing Solutions | Paints, Plastics, Textiles & IoT",
  description:
    "Spectrophotometric color formulation, benchtop sphere measurement, automated liquid dispensing, and shopfloor IoT intelligence for industrial manufacturing plants.",
};

export default async function IndustrialPage() {
  const allProds = await productRepository.getAllProducts();
  const industrialProds = allProds
    .filter((p) => p.industries?.includes("Paints & Coatings") || p.industries?.includes("Plastics & Polymers") || p.industries?.includes("Industrial Manufacturing"))
    .slice(0, 6);

  return (
    <>
      <BreadcrumbBanner
        title="Industrial Color & Manufacturing Intelligence"
        subtitle="Precision spectrophotometric formulation, automated dispensing systems, and shopfloor IoT connectivity for paints, plastics, textiles, and components."
        items={[{ label: "Home", href: "/" }, { label: "Industrial Solutions" }]}
      />

      {/* Industrial Overview */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
              Industrial Science
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Science-Backed Color for Heavy Industry
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Color in industrial manufacturing is not just aesthetic — it is a critical proxy for raw material purity, thermal degradation, chemical formulation accuracy, and cross-plant batch repeatability. We engineer comprehensive color quality assurance systems from lab formulation to robotic dispensing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              {
                title: "Paints & Coatings",
                desc: "Computer color matching (CCM), metamerism analysis, and automated gravimetric liquid dispensing.",
                icon: Paintbrush,
              },
              {
                title: "Plastics & Masterbatch",
                desc: "Opaque and translucent pellet measurement, pigment load optimization, and ASTM/DIN yellowing indices.",
                icon: Layers,
              },
              {
                title: "Textiles & Apparel",
                desc: "Fabric spectrophotometry, digital lab-dip approvals, and wash-fastness spectral tracking.",
                icon: Shirt,
              },
              {
                title: "IoT Shopfloor Intelligence",
                desc: "Real-time OEE tracking, machine connectivity (OPC-UA/MQTT), and predictive quality control.",
                icon: Factory,
              },
            ].map((ind, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/90 hover:shadow-lg hover:border-[rgb(196,30,58)] transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[rgb(196,30,58)] shadow-sm">
                  <ind.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{ind.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Capabilities Comparison */}
      <section className="section-padding bg-slate-50 border-y border-slate-200/80">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Precision Hardware
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Diffuse Integrating Sphere Technology
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Measuring textured, metallic, pearlescent, or semi-translucent industrial surfaces requires d/8° diffuse sphere geometry to capture true material color without surface sheen interference. Our benchtop and portable sphere spectrophotometers deliver unmatched inter-instrument agreement.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  "Simultaneous SPIN (specular included) and SPEX (specular excluded) analysis",
                  "Reflectance and transmission spectrophotometry in a single footprint",
                  "Inter-instrument agreement of 0.08 ΔEab with global supply chains",
                  "Automated gravimetric ink dispensing down to 0.1 gram tolerance",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-[rgb(15,23,66)] text-white space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Phoenix Proprietary
              </span>
              <h3 className="text-2xl font-bold">Phoenix M.I.S + IoT Telemetry</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Connect your extrusion lines, blow molders, coating ovens, and compounding machinery directly to our cloud telemetry engine. Monitor real-time OEE, temperature stability, and scrap rates from any mobile device.
              </p>
              <Link href="/contact" className="btn-primary w-full justify-center">
                Request an IoT Pilot Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Industrial Products */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                Industrial Instruments
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
                Featured Laboratory & Floor Systems
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
            {industrialProds.map((prod) => (
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
    </>
  );
}
