"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Cpu, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideData {
  id: number;
  image: string;
  category: string;
  subtext: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/images/hero/banner-1.webp",
    category: "COLOR MEASUREMENT & SPECTROPHOTOMETRY",
    subtext:
      "Transforming pressrooms and industrial manufacturing across the UAE, Saudi Arabia, GCC, and Africa with certified spectrophotometry and workflow automation.",
    primaryCtaLabel: "Launch AI Decision Tools",
    primaryCtaHref: "/tools",
    secondaryCtaLabel: "Browse Products",
    secondaryCtaHref: "/products",
  },
  {
    id: 2,
    image: "/images/hero/banner-2.webp",
    category: "PACKAGING & PRESSROOM STANDARDIZATION",
    subtext:
      "Cut changeover time by up to 38%, eliminate substrate scrap, and guarantee brand color consistency across flexo, offset, and digital packaging lines.",
    primaryCtaLabel: "Calculate Pressroom ROI",
    primaryCtaHref: "/tools/roi-calculator",
    secondaryCtaLabel: "Print & Packaging Solutions",
    secondaryCtaHref: "/print-packaging",
  },
  {
    id: 3,
    image: "/images/hero/banner-3.webp",
    category: "LABORATORY FORMULATION & INDUSTRIAL QC",
    subtext:
      "Reference-grade benchtop integrating spheres and multi-angle spectrophotometers delivering sub-0.08 Delta E inter-instrument agreement worldwide.",
    primaryCtaLabel: "Find Matching Instrument",
    primaryCtaHref: "/tools/selector",
    secondaryCtaLabel: "Industrial Solutions",
    secondaryCtaHref: "/industrial",
  },
  {
    id: 4,
    image: "/images/hero/banner-4.webp",
    category: "AUTOMATED ARTWORK & BARCODE PROOFREADING",
    subtext:
      "Catch print errors, font drops, missing text, and barcode defects before press production begins with certified GlobalVision inspection software.",
    primaryCtaLabel: "Test Substrate Selector",
    primaryCtaHref: "/tools/selector",
    secondaryCtaLabel: "Consult an Engineer",
    secondaryCtaHref: "/contact",
  },
];

const CAPABILITIES = [
  "Zero-Defect Packaging",
  "40% Waste Reduction",
  "G7 Master Printing",
  "Closed-Loop Color Control",
  "Sub-0.08 Delta E Accuracy",
  "Automated Artwork Inspection",
];

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [capIndex, setCapIndex] = useState(0);

  const currentSlide = HERO_SLIDES[activeSlide];

  // Rotate capability spotlight text every 2.6 seconds smoothly
  useEffect(() => {
    const capInterval = setInterval(() => {
      setCapIndex((prev) => (prev + 1) % CAPABILITIES.length);
    }, 2600);
    return () => clearInterval(capInterval);
  }, []);

  // Auto-advance background slide every 4.8 seconds continuously
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4800);
    return () => clearInterval(slideInterval);
  }, []);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center bg-[rgb(15,23,66)] overflow-hidden"
      aria-label="Phoenix Solutions Showcase"
    >
      {/* =========================================================
          BACKGROUND IMAGERY WITH ULTRA-SMOOTH CROSSFADE & KEN BURNS
          ========================================================= */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === activeSlide;
        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none",
              isActive ? "opacity-40 z-0" : "opacity-0 -z-10"
            )}
            aria-hidden={!isActive}
          >
            <div
              className={cn(
                "w-full h-full bg-cover bg-center transition-transform duration-[6000ms] ease-out",
                isActive ? "scale-105" : "scale-100"
              )}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        );
      })}

      {/* Dark Navy Atmospheric Overlays & Ambient Radial Glows */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[rgb(15,23,66)] via-[rgb(15,23,66)/0.78] to-[rgb(15,23,66)/0.88]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,30,58,0.30)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(56,189,248,0.14)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* =========================================================
          MAIN HERO CONTENT
          ========================================================= */}
      <div className="container-wide relative z-10 text-center py-28 sm:py-36">
        {/* Animated Capability Pill Badge (Dynamic rotating capability without shifting layout) */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold text-white mb-8 tracking-wider shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-[rgb(196,30,58)] animate-pulse" />
          <span className="text-rose-300 uppercase tracking-widest text-[11px] font-extrabold">
            LIVE FOCUS:
          </span>
          <span className="inline-block min-w-[210px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={capIndex}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="inline-block text-white font-extrabold"
              >
                {CAPABILITIES[capIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        {/* Rock-Solid, High-Impact Headline (Never shifts or breaks awkwardly across lines) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] max-w-5xl mx-auto drop-shadow-xl">
          <span>Color Intelligence for </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-amber-300">
            Precision Manufacturing
          </span>
        </h1>

        {/* Dynamic Subtext per Industry */}
        <p className="mt-8 text-base sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-normal min-h-[3.5rem] flex items-center justify-center">
          {currentSlide.subtext}
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={currentSlide.primaryCtaHref}
            className="btn-primary text-sm px-8 py-4 shadow-xl shadow-red-950/40 group font-bold"
          >
            <Sparkles className="w-4 h-4 mr-1 text-rose-300" />
            {currentSlide.primaryCtaLabel}
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href={currentSlide.secondaryCtaHref}
            className="btn-outline text-sm px-8 py-4 backdrop-blur-md hover:bg-white/10 text-white font-semibold"
          >
            {currentSlide.secondaryCtaLabel}
          </Link>
        </div>

        {/* Quick Launch Direct Diagnostic Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tools/selector"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium text-white/75 hover:text-white transition-all backdrop-blur-sm"
          >
            <Cpu className="w-3.5 h-3.5 text-rose-400" />
            <span>Which machine do I need? (3-Step Diagnostic) →</span>
          </Link>

          <Link
            href="/tools/roi-calculator"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-medium text-white/75 hover:text-white transition-all backdrop-blur-sm"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Calculate waste savings in AED & USD →</span>
          </Link>
        </div>

        {/* Slide Category Indicator */}
        <div className="mt-8 inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold tracking-widest uppercase text-white/50">
          Showing: {currentSlide.category} ({activeSlide + 1} of {HERO_SLIDES.length})
        </div>

        {/* Founded Marker */}
        <p className="mt-8 text-xs text-white/40 tracking-widest uppercase">
          Founded in Dubai in 2007 • Serving UAE, Saudi Arabia, GCC & Africa
        </p>
      </div>

      {/* =========================================================
          SLIDE INDICATORS & MANUAL CONTROLS
          ========================================================= */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-between container-wide">
        {/* Slide Progress Bars */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveSlide(i)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none cursor-pointer"
              style={{ width: i === activeSlide ? "3.2rem" : "1.25rem" }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-full",
                  i === activeSlide ? "bg-[rgb(196,30,58)]" : "bg-white/20 hover:bg-white/40"
                )}
              />
              {i === activeSlide && (
                <div className="absolute inset-0 bg-white/40 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Next / Previous Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 backdrop-blur-sm cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 backdrop-blur-sm cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
