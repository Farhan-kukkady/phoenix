"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  // Close mega menu on outside click
  useEffect(() => {
    if (!megaOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [megaOpen]);

  // Close on Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleProductsEnter = useCallback(() => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  }, []);

  const handleProductsLeave = useCallback(() => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Solid frosted luxury navy navbar everywhere — guarantees 100% high-contrast readability on white and dark backgrounds
  const headerBg = scrolled || megaOpen || mobileOpen
    ? "bg-[rgb(15,23,66)/0.96] backdrop-blur-xl border-b border-white/10 shadow-2xl"
    : "bg-[rgb(15,23,66)/0.92] backdrop-blur-xl border-b border-white/10 shadow-lg";

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          headerBg
        )}
        style={{ height: "var(--header-height)" }}
      >
        <div className="container-wide h-full flex items-center justify-between">
          {/* Left nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Primary left navigation"
          >
            {siteConfig.nav.left.map((item) =>
              "hasMegaMenu" in item && item.hasMegaMenu ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={handleProductsEnter}
                  onMouseLeave={handleProductsLeave}
                >
                  <button
                    className={cn(
                      "nav-link text-white flex items-center gap-1",
                      isActive(item.href) && "opacity-100"
                    )}
                    data-active={isActive(item.href) ? "true" : "false"}
                    onClick={() => setMegaOpen((p) => !p)}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        megaOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "nav-link text-white",
                    isActive(item.href) && "opacity-100"
                  )}
                  data-active={isActive(item.href) ? "true" : "false"}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Centered logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2"
            aria-label="Phoenix Colour Technologies — home"
          >
            <Image
              src="/logo.svg"
              alt="Phoenix Colour Technologies"
              width={180}
              height={48}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Right nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav
              className="flex items-center gap-8"
              aria-label="Primary right navigation"
            >
              {siteConfig.nav.right.map((item) =>
                item.href === "/tools" ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[rgb(196,30,58)] hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-950/40 transition-all hover:scale-105"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                    <span>AI Tools</span>
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "nav-link text-white",
                      isActive(item.href) && "opacity-100"
                    )}
                    data-active={isActive(item.href) ? "true" : "false"}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
            <Link
              href="/search"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href="/search"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="text-white p-1"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega menu (desktop) */}
        {megaOpen && (
          <div
            onMouseEnter={handleProductsEnter}
            onMouseLeave={handleProductsLeave}
          >
            <MegaMenu onClose={() => setMegaOpen(false)} />
          </div>
        )}
      </header>

      {/* Mobile nav drawer */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Spacer for fixed header (only on non-hero pages) */}
      <div className="h-[var(--header-height)]" aria-hidden="true" style={{ display: 'none' }} id="header-spacer" />
    </>
  );
}
