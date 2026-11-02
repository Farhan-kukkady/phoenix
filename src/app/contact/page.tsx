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
                    href={`https://wa.me/${contact.whatsapp ? contact.whatsapp.replace(/[^0-9]/g, "") : "971507544559"}?text=Hello%20Phoenix%2C%20I%20have%20an%20enquiry.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs transition-all shadow-md hover:shadow-lg"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32" />
                    </svg>
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
