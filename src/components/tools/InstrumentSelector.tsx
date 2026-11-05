"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Factory,
  Target,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Cpu,
  SlidersHorizontal,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface SubstrateOption {
  id: string;
  title: string;
  description: string;
  iconName: string;
  examples: string;
}

interface EnvironmentOption {
  id: string;
  title: string;
  description: string;
  idealFor: string;
}

interface QualityGoalOption {
  id: string;
  title: string;
  description: string;
  keyMetric: string;
}

interface Recommendation {
  productName: string;
  productSlug: string;
  productImage: string;
  geometry: string;
  matchScore: number;
  plainEnglishReason: string;
  whyThisGeometry: string;
  keySpecs: string[];
  standards: string[];
  secondaryAlternative?: {
    name: string;
    slug: string;
    reason: string;
  };
}

const SUBSTRATES: SubstrateOption[] = [
  {
    id: "paper_carton",
    title: "Paper, Paperboard & Folding Carton",
    description: "Standard commercial print, folding boxes, labels, and corrugated board.",
    iconName: "file-text",
    examples: "Offset, flexo, digital press sheets, coated & uncoated stock",
  },
  {
    id: "film_foil",
    title: "Flexible Packaging, Film & Metallic Foil",
    description: "Transparent, opaque, or metallized plastic films, pouches, and foils.",
    iconName: "layers",
    examples: "BOPP, PET, aluminum foil, laminated pouches, shrink sleeves",
  },
  {
    id: "plastic_liquid_raw",
    title: "Plastics, Masterbatch, Inks & Liquids",
    description: "Textured plastic molded parts, raw pellets, masterbatch, liquid inks, and paints.",
    iconName: "flask-conical",
    examples: "Injection molded parts, ink kitchen formulation, chemical pigments",
  },
  {
    id: "effect_pigments",
    title: "Metallic, Pearlescent & Special-Effect Coatings",
    description: "Coatings that change appearance depending on view angle or lighting.",
    iconName: "sparkles",
    examples: "Automotive finishes, luxury cosmetics, pearlescent inks, mica flakes",
  },
  {
    id: "artwork_inspection",
    title: "Printed Packaging Artwork, Labels & Pharma Leaflets",
    description: "Critical text, barcodes, ingredients, Braille, and pixel-level print integrity.",
    iconName: "scan-line",
    examples: "Pharmaceutical cartons, regulatory inserts, multi-language FMCG labels",
  },
];

const ENVIRONMENTS: EnvironmentOption[] = [
  {
    id: "pressroom",
    title: "Pressroom & Fast Production Floor",
    description: "Operator-friendly handheld spot checks, fast ink key adjustments, press makeready.",
    idealFor: "Speed, portability, dust resistance, direct press console mounting",
  },
  {
    id: "qc_lab",
    title: "Quality Control & Formulation Laboratory",
    description: "High-precision benchtop R&D, digital recipe formulation, raw material acceptance.",
    idealFor: "Sub-0.08 Delta E inter-instrument agreement, temperature control, liquids/solids",
  },
  {
    id: "prepress_qa",
    title: "Prepress, Artwork QA & Regulatory Compliance",
    description: "Automated document comparison against approved customer PDF files before and after print.",
    idealFor: "100% text, barcode, Braille, and graphic error detection without human fatigue",
  },
];

const QUALITY_GOALS: QualityGoalOption[] = [
  {
    id: "delta_e_density",
    title: "Fast Delta E Pass/Fail & Ink Density",
    description: "Verify spot colors (PantoneLIVE / G7), optimize dot gain (TVI), and ensure press consistency.",
    keyMetric: "Delta E00 < 1.5, ISO 12647-2 / G7 Colorspace",
  },
  {
    id: "formulation_gloss",
    title: "Color Formulation & Surface Gloss/Texture Isolation",
    description: "Isolate true color from surface texture or gloss reflection (SPIN / SPEX capability).",
    keyMetric: "Spectrophotometric reflection curve (360 - 750 nm)",
  },
  {
    id: "flake_sparkle",
    title: "Multi-Angle Flop & Sparkle Analysis",
    description: "Measure color travel across multiple viewing angles (15°, 25°, 45°, 75°, 110°).",
    keyMetric: "Color Travel & Flop Index (ASTM E2194 / DIN 6175-2)",
  },
  {
    id: "zero_defect_artwork",
    title: "Zero-Defect Text, Barcode & Graphics Inspection",
    description: "Catch missing punctuation, broken letters, incorrect UPC/QR barcodes, and colour shifts.",
    keyMetric: "ISO/IEC 15415/15416 Barcode Grading & Pixel Difference",
  },
];

export function InstrumentSelector() {
  const [step, setStep] = useState<number>(1);
  const [substrate, setSubstrate] = useState<string>("paper_carton");
  const [environment, setEnvironment] = useState<string>("pressroom");
  const [goal, setGoal] = useState<string>("delta_e_density");
  const [showResult, setShowResult] = useState<boolean>(false);

  // Compute recommendation based on selections
  const computeRecommendation = (): Recommendation => {
    // 1. Artwork / Prepress / Proofreading
    if (substrate === "artwork_inspection" || goal === "zero_defect_artwork" || environment === "prepress_qa") {
      return {
        productName: "GlobalVision Print & Graphics Inspection System",
        productSlug: "globalvision-print-inspection-software",
        productImage: "/images/products/Sub_Category_Listing.webp",
        geometry: "Automated Pixel-by-Pixel Multi-Channel Optical Scanner",
        matchScore: 99,
        plainEnglishReason:
          "For printed packaging, pharmaceutical leaflets, and regulatory cartons, physical spectrophotometers cannot catch typographical errors, misregistered text, or unreadable barcodes. GlobalVision inspects 100% of the sheet against approved digital artwork in seconds.",
        whyThisGeometry:
          "High-resolution digital optical comparison detects differences down to 31 microns, decoding GS1 barcodes, Braille height, and multilingual text automatically.",
        keySpecs: [
          "Automated pixel-to-pixel comparison against customer approved PDF",
          "GS1 & ISO/IEC 15415/15416 Barcode grading",
          "Automated Braille translation & height verification",
          "21 CFR Part 11 and Annex 11 pharmaceutical compliance audit trail",
        ],
        standards: ["ISO 9001", "21 CFR Part 11", "Annex 11", "GS1 Quality Standards"],
      };
    }

    // 2. Multi-Angle / Effect Pigments
    if (substrate === "effect_pigments" || goal === "flake_sparkle") {
      return {
        productName: "X-Rite MA-5 QC Multi-Angle Spectrophotometer",
        productSlug: "ma-5-qc-multi-angle-spectrophotometer",
        productImage: "/images/products/Rectangle_10239.webp",
        geometry: "5-Angle Directional Spectrophotometer (45° illumination, 15°/25°/45°/75°/110° detection)",
        matchScore: 98,
        plainEnglishReason:
          "Metallic and pearlescent pigments contain microscopic flakes that reflect light differently at varying angles. A standard single-angle device only sees one reflection, leading to false approvals. The MA-5 QC captures the full color travel curve.",
        whyThisGeometry:
          "Equipped with 5 directional receiver optics aligned to ASTM standards, this instrument measures face, flop, and travel in under 2.5 seconds with tip-before-contact protection.",
        keySpecs: [
          "5 measurement angles: 15°, 25°, 45°, 75°, 110°",
          "Fast measurement cycle under 2.5 seconds",
          "LED indicator optics for precise positioning",
          "Compact 0.6 kg lightweight handheld design",
        ],
        standards: ["ASTM E2194", "ASTM E2539", "DIN 6175-2", "SAE J1545"],
        secondaryAlternative: {
          name: "X-Rite MA-T12 (12-Angle with Sparkle & Grain Camera)",
          slug: "ma-t12",
          reason: "For R&D labs requiring microscopic flake grain and sparkle characterization.",
        },
      };
    }

    // 3. Laboratory / Plastics / Masterbatch / Liquid Inks / Formulation
    if (
      substrate === "plastic_liquid_raw" ||
      environment === "qc_lab" ||
      goal === "formulation_gloss"
    ) {
      return {
        productName: "X-Rite Ci7800 Sphere Benchtop Spectrophotometer",
        productSlug: "ci7800-sphere-benchtop-spectrophotometer",
        productImage: "/images/products/product-listing-img3.webp",
        geometry: "Diffuse / 8° Sphere (d/8°) with Simultaneous SPIN / SPEX Measurement",
        matchScore: 99,
        plainEnglishReason:
          "Textured plastics, liquids, and masterbatch pellets scatter light unpredictably. A diffuse d/8° sphere bounces light inside an integrating cavity, illuminating the sample from all angles so surface imperfections do not distort the true color reading.",
        whyThisGeometry:
          "Simultaneous Specular Included (SPIN) and Specular Excluded (SPEX) enables the formulation software to distinguish between surface gloss differences and true colorant pigment recipe variations.",
        keySpecs: [
          "Ultra-tight inter-instrument agreement: ΔE*ab ≤ 0.08 average",
          "Simultaneous SPIN and SPEX reflectance & transmittance",
          "Automated aperture recognition with internal digital camera preview",
          "Embedded humidity & temperature sensors for calibration integrity",
        ],
        standards: ["ASTM D2244", "ISO 7724", "DIN 5033", "CIE No. 15"],
        secondaryAlternative: {
          name: "X-Rite Ci64 Handheld Sphere",
          slug: "ci64-handheld-spectrophotometer",
          reason: "If you require a portable d/8° sphere to measure large molded parts on the production floor.",
        },
      };
    }

    // 4. Flexible packaging, metallic foils, plastic films
    if (substrate === "film_foil") {
      return {
        productName: "X-Rite eXact™ 2 Plus Portable Spectrophotometer",
        productSlug: "exact-2-plus-portable-spectrophotometer",
        productImage: "/images/products/Rectangle_103__5_91.webp",
        geometry: "45°:0° Annular Optical Geometry with Switchable M0, M1, M2 & M3 Polarization",
        matchScore: 98,
        plainEnglishReason:
          "Measuring wet ink or high-gloss metallic foil causes harsh glare that blinded legacy instruments. The eXact 2 Plus features switchable M3 polarization filters that remove surface reflections, ensuring spot colors on metallic foil match brand expectations.",
        whyThisGeometry:
          "Mantis™ Digital Loupe high-resolution video targeting lets press operators zoom in on micro-patches (down to 1.5mm) without touching wet substrate surfaces, eliminating ink smears.",
        keySpecs: [
          "M0, M1, M2 and M3 (Polarization Filter) in a single measurement",
          "Mantis™ digital loupe with 10x digital zoom for pinpoint accuracy",
          "Direct Wi-Fi integration with PantoneLIVE and ColorCert pressroom QA",
          "Non-contact protected measuring aperture prevents ink contamination",
        ],
        standards: ["ISO 13655:2017 (M0/M1/M2/M3)", "ISO 12647-2", "G7 Master", "PantoneLIVE"],
        secondaryAlternative: {
          name: "X-Rite eXact™ 2 Xp",
          slug: "exact-2-xp-portable-spectrophotometer",
          reason: "Optimized specifically for flexible film converters with specialized film target wheels.",
        },
      };
    }

    // 5. Default / Paper, Paperboard & Folding Carton
    return {
      productName: "X-Rite eXact™ 2 Portable Spectrophotometer",
      productSlug: "exact-2-plus-portable-spectrophotometer",
      productImage: "/images/products/exact-2-04-new.webp",
      geometry: "45°:0° Ring Illumination with Mantis™ Digital Loupe Targeting",
      matchScore: 97,
      plainEnglishReason:
        "For paperboard and commercial folding cartons, the 45°:0° geometry matches how the human eye perceives print under standard lighting (ISO 3664). It delivers instantaneous ink density, dot gain (TVI), and Delta E00 tolerances right at the press console.",
      whyThisGeometry:
        "Annular 45°:0° ring illumination ensures measurement directionality independence, giving repeatable readings regardless of paper grain direction.",
      keySpecs: [
        "ISO 13655 M1 Part 1 compliance for optical brightening agents (OBAs)",
        "Tilt-and-swivel high-brightness touch display",
        "Direct connection to NetProfiler for fleet-wide verification",
        "Instant visual G7 Gray Balance and ink key adjustment guidance",
      ],
      standards: ["ISO 12647-2", "ISO 13655 (M0/M1/M2)", "G7 Idealliance", "PantoneLIVE"],
    };
  };

  const recommendation = computeRecommendation();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setShowResult(false);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Phoenix Team, I used your AI Instrument Selector on the website. Based on my substrate (${SUBSTRATES.find((s) => s.id === substrate)?.title}), environment (${ENVIRONMENTS.find((e) => e.id === environment)?.title}), and goal, it recommended the ${recommendation.productName}. Could you provide technical consultation and a formal quotation?`
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden">
      {/* Header bar */}
      <div className="bg-[rgb(15,23,66)] p-6 sm:p-8 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-rose-300 mb-2 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Instrument & Substrate Selector
          </h2>
          <p className="text-sm text-white/70 mt-1 max-w-xl">
            Answer 3 quick questions about your substrate and production setup. Our optical diagnostic engine matches your plant to the certified spectrophotometer.
          </p>
        </div>

        {/* Step indicator */}
        {!showResult && (
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Step {step} of 3
            </span>
            <div className="flex gap-1.5 ml-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    s === step
                      ? "bg-[rgb(196,30,58)] w-6"
                      : s < step
                      ? "bg-emerald-400"
                      : "bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main interactive area */}
      <div className="p-6 sm:p-10">
        {!showResult ? (
          <div>
            <AnimatePresence mode="wait">
              {/* Step 1: Substrate */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="space-y-6"
                >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[rgb(196,30,58)] text-white text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    What primary substrate or material do you measure?
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Optical geometry (45°:0° vs Sphere d/8° vs Multi-Angle) is determined by surface reflectivity and opacity.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SUBSTRATES.map((item) => {
                    const isSelected = substrate === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSubstrate(item.id)}
                        className={cn(
                          "cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 text-left relative flex flex-col justify-between",
                          isSelected
                            ? "border-[rgb(196,30,58)] bg-rose-50/40 shadow-md shadow-rose-900/5 ring-2 ring-[rgb(196,30,58)/0.2]"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-base font-bold text-slate-900">
                              {item.title}
                            </span>
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                                isSelected
                                  ? "border-[rgb(196,30,58)] bg-[rgb(196,30,58)] text-white"
                                  : "border-slate-300"
                              )}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                          <span className="text-slate-600 font-semibold">Examples:</span> {item.examples}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Environment */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[rgb(196,30,58)] text-white text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    Where will this system primarily be deployed?
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Physical form factor (rugged handheld vs climate-controlled benchtop) depends on speed and operator workflow.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ENVIRONMENTS.map((item) => {
                    const isSelected = environment === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setEnvironment(item.id)}
                        className={cn(
                          "cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 text-left relative flex flex-col justify-between",
                          isSelected
                            ? "border-[rgb(196,30,58)] bg-rose-50/40 shadow-md shadow-rose-900/5 ring-2 ring-[rgb(196,30,58)/0.2]"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-base font-bold text-slate-900">
                              {item.title}
                            </span>
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                                isSelected
                                  ? "border-[rgb(196,30,58)] bg-[rgb(196,30,58)] text-white"
                                  : "border-slate-300"
                              )}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                          <span className="text-slate-600 font-semibold">Workflow:</span> {item.idealFor}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: Quality Objective */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[rgb(196,30,58)] text-white text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    What is your primary quality or operational target?
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Select the key metric your plant needs to guarantee to clients and brand auditors.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUALITY_GOALS.map((item) => {
                    const isSelected = goal === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setGoal(item.id)}
                        className={cn(
                          "cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 text-left relative flex flex-col justify-between",
                          isSelected
                            ? "border-[rgb(196,30,58)] bg-rose-50/40 shadow-md shadow-rose-900/5 ring-2 ring-[rgb(196,30,58)/0.2]"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        )}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-base font-bold text-slate-900">
                              {item.title}
                            </span>
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                                isSelected
                                  ? "border-[rgb(196,30,58)] bg-[rgb(196,30,58)] text-white"
                                  : "border-slate-300"
                              )}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                          <span className="text-slate-600 font-semibold">Key Benchmark:</span> {item.keyMetric}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
            </AnimatePresence>

            {/* Stepper Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  ← Previous Step
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary text-sm px-7 py-3 shadow-lg shadow-rose-900/20"
              >
                {step === 3 ? "Generate Official Recommendation" : "Continue to Next Step"}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================
             RESULT SCREEN
             ========================================================= */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Top match notification */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Phoenix AI Diagnostic Complete
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold text-[11px]">
                      {recommendation.matchScore}% Compatibility
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-700 mt-0.5">
                    Engineered match based on your substrate optical reflection profile.
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Diagnostic
              </button>
            </div>

            {/* Recommendation Hero Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
              {/* Product Image & Geometry Badge */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-white border border-slate-200/80 p-4 shadow-sm flex items-center justify-center overflow-hidden">
                  <Image
                    src={recommendation.productImage}
                    alt={recommendation.productName}
                    fill
                    className="object-contain p-4 transition-transform hover:scale-105 duration-300"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(15,23,66)] text-white text-[11px] font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-rose-400" />
                  <span>{recommendation.geometry}</span>
                </div>
              </div>

              {/* Product details and Plain English Explanation */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[rgb(196,30,58)]">
                  Primary Recommendation
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {recommendation.productName}
                </h3>

                {/* Plain-English explanation */}
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-sm leading-relaxed text-slate-700">
                  <strong className="text-slate-900 block mb-1">
                    Why this instrument is required for your setup:
                  </strong>
                  {recommendation.plainEnglishReason}
                </div>

                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Optical Geometry Science: </strong>
                  {recommendation.whyThisGeometry}
                </div>

                {/* Standards Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {recommendation.standards.map((std, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-200/80 text-slate-700 text-[11px] font-semibold"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Specifications Grid */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                Key Technical Specifications & Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendation.keySpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary alternative if applicable */}
            {recommendation.secondaryAlternative && (
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ALT
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                    Alternative / Specialized Option:
                  </span>
                  <p className="text-sm font-semibold text-slate-900">
                    <Link
                      href={`/products/${recommendation.secondaryAlternative.slug}`}
                      className="underline decoration-amber-500 hover:text-[rgb(196,30,58)]"
                    >
                      {recommendation.secondaryAlternative.name}
                    </Link>
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {recommendation.secondaryAlternative.reason}
                  </p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/products/${recommendation.productSlug}`}
                  className="btn-outline text-sm px-6 py-3 border-slate-300 text-slate-800 hover:bg-slate-100"
                >
                  View Full Product Specs
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-6 py-3 bg-emerald-600 hover:bg-emerald-700 shadow-md"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request Official Quote & Demo
                </a>
              </div>

              <Link
                href="/contact"
                className="text-xs font-semibold text-slate-600 hover:text-[rgb(196,30,58)] underline underline-offset-4"
              >
                Or Book an On-Site Engineering Audit in UAE & GCC →
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

