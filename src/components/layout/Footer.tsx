import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import siteContent from "@/data/site-content.json";

const { footer, contact } = siteContent;

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[rgb(15,23,66)] text-white/80">
      {/* Main footer */}
      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Phoenix Colour Technologies home">
              <Image
                src="/logo.svg"
                alt="Phoenix Colour Technologies"
                width={160}
                height={42}
                className="h-10 w-auto mb-5 brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/60 mb-6 max-w-sm">
              {footer.description}
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: siteConfig.social.twitter, icon: Twitter, label: "Twitter" },
                { href: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
                { href: siteConfig.social.youtube, icon: Youtube, label: "YouTube" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footer.links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Solutions
            </h3>
            <ul className="space-y-3">
              {footer.links.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">
                  {contact.offices[0].address.replace(/\n/g, ", ")}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/40 flex-shrink-0" />
                <a
                  href={`tel:${contact.offices[0].phone.replace(/\s/g, "")}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {contact.offices[0].phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/40 flex-shrink-0" />
                <a
                  href={`mailto:${contact.offices[0].email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {contact.offices[0].email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {currentYear} Phoenix Colour Technologies. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
