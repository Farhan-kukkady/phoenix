"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Cpu, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideData {
  id: number;
  image: string;
  badge: string;
  headlinePrefix: string;
  rotatingWords: string[];
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
    badge: "PRECISION • PERFORMANCE • INTELLIGENT MANUFACTURING",
    headlinePrefix: "Color Intelligence for",
    rotatingWords: [
      "Intelligent Manufacturing",
      "Zero-Defect Packaging",
      "40% Waste Reduction",
      "G7 Master Printing",
    ],
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
    badge: "G7 & ISO 12647 STANDARDIZATION",
    headlinePrefix: "Predictable Pressrooms with",
    rotatingWords: [
      "38% Faster Makereadies",
      "Closed-Loop Control",
      "PantoneLIVE Precision",
      "Zero Client Rejections",
    ],
    subtext:
      "Cut changeover time, eliminate substrate scrap, and guarantee brand color consistency across flexo, offset, and digital packaging lines.",
    primaryCtaLabel: "Calculate Pressroom ROI",
    primaryCtaHref: "/tools/roi-calculator",
    secondaryCtaLabel: "Print & Packaging Solutions",
    secondaryCtaHref: "/print-packaging",
  },
  {
    id: 3,
    image: "/images/hero/banner-3.webp",
    badge: "LABORATORY FORMULATION & INDUSTRIAL QC",
    headlinePrefix: "Formula Precision for",
    rotatingWords: [
      "Masterbatch & Plastics",
      "Paints & Coatings",
      "Liquid Inks & Dyes",
      "Metallic Effect Flakes",
    ],
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
    badge: "AUTOMATED ARTWORK & BARCODE PROOFREADING",
    headlinePrefix: "Zero Defects Guaranteed with",
    rotatingWords: [
      "Pixel-by-Pixel Inspection",
      "Automated Braille Audit",
      "GS1 Barcode Verification",
      "Regulatory Compliance",
    ],
    subtext:
      "Catch print errors, font drops, missing text, and barcode defects before press production begins with certified GlobalVision inspection software.",
    primaryCtaLabel: "Test Substrate Selector",
    primaryCtaHref: "/tools/selector",
    secondaryCtaLabel: "Consult an Engineer",
    secondaryCtaHref: "/contact",
  },
];

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = HERO_SLIDES[activeSlide];

  // Rotate headline word every 2.8 seconds
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % currentSlide.rotatingWords.length);
    }, 2800);
    return () => clearInterval(wordInterval);
  }, [currentSlide]);

  // Auto-advance background slide every 7 seconds if not hovered
  useEffect(() => {
    if (isPaused) return;
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setWordIndex(0);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, [isPaused]);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setWordIndex(0);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setWordIndex(0);
  }, []);

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center bg-[rgb(15,23,66)] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Phoenix Solutions Showcase"
    >
      {/* =========================================================
          BACKGROUND IMAGERY WITH KEN BURNS CROSSFADE
          ========================================================= */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === activeSlide;
        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none",
              isActive ? "opacity-35" : "opacity-0"
            )}
            aria-hidden={!isActive}
          >
            <div
              className={cn(
                "w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-out",
                isActive ? "scale-105" : "scale-100"
              )}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        );
      })}

      {/* Dark Navy Overlays & Ambient Radial Glows */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[rgb(15,23,66)] via-[rgb(15,23,66)/0.78] to-[rgb(15,23,66)/0.88]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(196,30,58,0.28)_0%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* =========================================================
          MAIN HERO CONTENT
          ========================================================= */}
      <div className="container-wide relative z-10 text-center py-28 sm:py-36">
        {/* Animated Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold text-white/90 mb-8 tracking-wider shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[rgb(196,30,58)] animate-pulse" />
          <span>{currentSlide.badge}</span>
        </div>

        {/* Dynamic Rotating Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] max-w-5xl mx-auto drop-shadow-lg">
          <span>{currentSlide.headlinePrefix} </span>
          <span className="inline-block relative overflow-hidden align-top text-left min-w-[280px] sm:min-w-[420px] lg:min-w-[560px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${activeSlide}-${wordIndex}`}
                initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-amber-300 font-black"
              >
                {currentSlide.rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-base sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-normal">
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

        {/* Quick Launch Pills for the New Tools */}
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

        {/* Founded Marker */}
        <p className="mt-12 text-xs text-white/40 tracking-widest uppercase">
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
              onClick={() => {
                setActiveSlide(i);
                setWordIndex(0);
              }}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none"
              style={{ width: i === activeSlide ? "3rem" : "1.25rem" }}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-full",
                  i === activeSlide ? "bg-[rgb(196,30,58)]" : "bg-white/20"
                )}
              />
              {i === activeSlide && !isPaused && (
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
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

