import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";
import { ContactForm } from "@/components/contact/ContactForm";
import siteContent from "@/data/site-content.json";

export const metadata: Metadata = {
  title: "Contact Phoenix Colour Technologies | Dubai & Riyadh Offices",
  description:
    "Get in touch with our color management consultants, technical sales teams, and service engineers in Dubai, UAE and Riyadh, Saudi Arabia.",
};

export default function ContactPage() {
  const { contact } = siteContent;

  return (
    <>
      <BreadcrumbBanner
        title="Contact Our Engineering Team"
        subtitle="Serving clients across the United Arab Emirates, Saudi Arabia, the GCC, Africa, and Asia."
        items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <section className="section-padding bg-slate-50/50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Office Locations & Quick Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                  Regional Headquarters
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                  We are here to support your operations
                </h2>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  Whether you need an on-site spectrophotometer calibration, a G7 press finger-print audit, or advice on a new ink dispensing system, our regional teams are ready.
                </p>
              </div>

              {/* Office Cards */}
              <div className="space-y-4">
                {contact.offices.map((office, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">
                        {office.city}, {office.country}
                      </h3>
                      {office.isPrimary && (
                        <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[rgb(196,30,58)/0.1] text-[rgb(196,30,58)]">
                          Headquarters
                        </span>
                      )}
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[rgb(196,30,58)] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed whitespace-pre-line">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[rgb(15,23,66)] flex-shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-[rgb(196,30,58)] font-semibold transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[rgb(15,23,66)] flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-[rgb(196,30,58)] transition-colors">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours & Direct WhatsApp Card */}
              <div className="p-6 rounded-3xl bg-[rgb(15,23,66)] text-white space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span>Support Hours</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Monday – Friday: 8:00 AM – 6:00 PM (GST)<br />
                  Saturday: 9:00 AM – 2:00 PM (Emergency Dispatch)<br />
                  Sunday: Closed
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/97140000000?text=Hello%20Phoenix%20Colour%2C%20I%20have%20an%20enquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat with an Engineer on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Send an Official Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your details below and our technical desk will get back to you within 24 hours.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
