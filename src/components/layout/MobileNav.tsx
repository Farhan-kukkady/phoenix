"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALL_NAV = [...siteConfig.nav.left, ...siteConfig.nav.right];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-80 bg-[rgb(15,23,66)] lg:hidden",
          "transition-transform duration-300 ease-in-out shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="p-5 space-y-1" aria-label="Mobile navigation">
          {ALL_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between text-white/80 hover:text-white hover:bg-white/8 px-4 py-3 rounded-lg transition-colors group"
            >
              <span className="font-medium">{item.label}</span>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="p-5 border-t border-white/10 mt-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="btn-primary w-full justify-center"
          >
            Request a Quote
          </Link>
          <p className="text-white/40 text-xs text-center mt-4">
            {siteConfig.contact.phone}
          </p>
        </div>
      </div>
    </>
  );
}
