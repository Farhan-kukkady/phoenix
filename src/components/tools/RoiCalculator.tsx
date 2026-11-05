"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Layers,
  Leaf,
  CheckCircle2,
  Printer,
  ArrowRight,
  MessageSquare,
  HelpCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

type Currency = "USD" | "AED";

const AED_RATE = 3.6725;

interface PressTypeOption {
  id: string;
  name: string;
  defaultWasteCostUSD: number;
  defaultHourlyRateUSD: number;
  wasteUnit: string;
  wasteSavedPerJob: number;
}

const PRESS_TYPES: PressTypeOption[] = [
  {
    id: "offset",
    name: "Offset Sheetfed (Commercial & Folding Carton)",
    defaultWasteCostUSD: 65,
    defaultHourlyRateUSD: 160,
    wasteUnit: "sheets",
    wasteSavedPerJob: 160,
  },
  {
    id: "flexo",
    name: "Flexo Packaging (Wide Web Film & Corrugated)",
    defaultWasteCostUSD: 85,
    defaultHourlyRateUSD: 180,
    wasteUnit: "meters of film",
    wasteSavedPerJob: 120,
  },
  {
    id: "narrow_web",
    name: "Narrow Web Label Press (Flexo / Hybrid)",
    defaultWasteCostUSD: 45,
    defaultHourlyRateUSD: 120,
    wasteUnit: "meters of label stock",
    wasteSavedPerJob: 90,
  },
  {
    id: "gravure",
    name: "Rotogravure High-Volume Packaging",
    defaultWasteCostUSD: 120,
    defaultHourlyRateUSD: 240,
    wasteUnit: "meters of film/foil",
    wasteSavedPerJob: 220,
  },
];

export function RoiCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [pressCount, setPressCount] = useState<number>(3);
  const [pressTypeId, setPressTypeId] = useState<string>("offset");
  const [jobsPerDay, setJobsPerDay] = useState<number>(4);
  const [wasteCost, setWasteCost] = useState<number>(65);
  const [hourlyRate, setHourlyRate] = useState<number>(160);

  const selectedPress =
    PRESS_TYPES.find((p) => p.id === pressTypeId) || PRESS_TYPES[0];

  // Currency multiplier
  const rateMultiplier = currency === "AED" ? AED_RATE : 1;
  const currencySymbol = currency === "USD" ? "$" : "AED ";

  // Working days per year
  const WORKDAYS_PER_YEAR = 260;

  // Total annual jobs across all presses
  const totalJobsAnnual = pressCount * jobsPerDay * WORKDAYS_PER_YEAR;

  // Benchmarked savings from X-Rite / GMG / ISO 12647 installations
  const makereadyMinsSavedPerJob = 16; // avg minutes saved per makeready
  const wasteReductionPercent = 0.40; // 40% reduction in setup scrap sheets/meters

  // Cost converted to USD for base calculation
  const wasteCostUSD = currency === "AED" ? wasteCost / AED_RATE : wasteCost;
  const hourlyRateUSD = currency === "AED" ? hourlyRate / AED_RATE : hourlyRate;

  // Annual Calculations
  const annualWasteSavingsUSD =
    totalJobsAnnual * wasteCostUSD * wasteReductionPercent;

  const annualHoursSaved = Math.round(
    (totalJobsAnnual * makereadyMinsSavedPerJob) / 60
  );

  const annualCapacityValueUSD = annualHoursSaved * hourlyRateUSD;

  // Total Net Annual Economic Value
  const totalAnnualSavingsUSD = annualWasteSavingsUSD + annualCapacityValueUSD;
  const totalAnnualSavingsCurrent = totalAnnualSavingsUSD * rateMultiplier;

  // Total substrate saved
  const annualUnitsSaved = totalJobsAnnual * selectedPress.wasteSavedPerJob;

  // Hardware + Software typical investment per press (~$17,500 USD)
  const estimatedInvestmentUSD = pressCount * 17500;
  const monthlySavingsUSD = totalAnnualSavingsUSD / 12;
  const paybackMonths =
    monthlySavingsUSD > 0
      ? Math.max(1.2, Number((estimatedInvestmentUSD / monthlySavingsUSD).toFixed(1)))
      : 0;

  // Handler for press type change to update suggested costs
  const handlePressTypeChange = (newTypeId: string) => {
    setPressTypeId(newTypeId);
    const found = PRESS_TYPES.find((p) => p.id === newTypeId);
    if (found) {
      if (currency === "USD") {
        setWasteCost(found.defaultWasteCostUSD);
        setHourlyRate(found.defaultHourlyRateUSD);
      } else {
        setWasteCost(Math.round(found.defaultWasteCostUSD * AED_RATE));
        setHourlyRate(Math.round(found.defaultHourlyRateUSD * AED_RATE));
      }
    }
  };

  // Switch currency cleanly
  const toggleCurrency = (newCurr: Currency) => {
    if (newCurr === currency) return;
    if (newCurr === "AED") {
      setWasteCost(Math.round(wasteCost * AED_RATE));
      setHourlyRate(Math.round(hourlyRate * AED_RATE));
    } else {
      setWasteCost(Math.round(wasteCost / AED_RATE));
      setHourlyRate(Math.round(hourlyRate / AED_RATE));
    }
    setCurrency(newCurr);
  };

  // WhatsApp prefilled message
  const whatsappMessage = encodeURIComponent(
    `Hello Phoenix Team, I used your Makeready ROI Calculator on the website. With ${pressCount} ${selectedPress.name} running ${jobsPerDay} jobs/day, our estimated annual savings is ${currencySymbol}${Math.round(
      totalAnnualSavingsCurrent
    ).toLocaleString()} with a ${paybackMonths}-month payback. We would like to schedule an on-site plant verification in UAE/GCC.`
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden">
      {/* Header bar */}
      <div className="bg-[rgb(15,23,66)] p-6 sm:p-8 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-300 mb-2 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Industrial Profitability Modeler</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Makeready & Waste ROI Calculator
          </h2>
          <p className="text-sm text-white/70 mt-1 max-w-xl">
            Model your plant’s annual financial return from closed-loop color measurement (eXact 2 + ColorCert + GMG ColorServer).
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => toggleCurrency("USD")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              currency === "USD"
                ? "bg-[rgb(196,30,58)] text-white shadow-sm"
                : "text-white/70 hover:text-white"
            )}
          >
            USD ($)
          </button>
          <button
            type="button"
            onClick={() => toggleCurrency("AED")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              currency === "AED"
                ? "bg-[rgb(196,30,58)] text-white shadow-sm"
                : "text-white/70 hover:text-white"
            )}
          >
            AED (Dirhams)
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* =========================================================
            LEFT COLUMN: CONTROLS & SLIDERS
            ========================================================= */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[rgb(196,30,58)]" />
              Pressroom Operational Variables
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              260 Production Days/Yr
            </span>
          </div>

          {/* Press Type Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              1. Press & Converting Technology
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESS_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handlePressTypeChange(type.id)}
                  className={cn(
                    "p-3 rounded-xl border text-left text-xs font-semibold transition-all",
                    pressTypeId === type.id
                      ? "border-[rgb(196,30,58)] bg-rose-50/50 text-[rgb(15,23,66)] font-bold shadow-sm ring-1 ring-[rgb(196,30,58)]"
                      : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Slider: Number of Presses */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-800">
                Number of Operating Presses
              </label>
              <span className="px-3 py-1 rounded-lg bg-[rgb(15,23,66)] text-white text-sm font-black">
                {pressCount} {pressCount === 1 ? "Press" : "Presses"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              step={1}
              value={pressCount}
              onChange={(e) => setPressCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[rgb(196,30,58)]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>1 machine</span>
              <span>6 machines</span>
              <span>12+ machines</span>
            </div>
          </div>

          {/* Slider: Makereadies / Jobs per Day per Press */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-800">
                Job Changeovers / Makereadies per Day
              </label>
              <span className="px-3 py-1 rounded-lg bg-[rgb(15,23,66)] text-white text-sm font-black">
                {jobsPerDay} {jobsPerDay === 1 ? "Job/Day" : "Jobs/Day"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={jobsPerDay}
              onChange={(e) => setJobsPerDay(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[rgb(196,30,58)]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>1 job (Long runs)</span>
              <span>5 jobs (Mixed)</span>
              <span>10 jobs (Short runs)</span>
            </div>
          </div>

          {/* Slider: Substrate Waste Cost per Makeready */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-bold text-slate-800 block">
                  Substrate & Ink Waste per Makeready
                </label>
                <span className="text-[11px] text-slate-500">
                  Paper, film, foil, ink destroyed before color OK
                </span>
              </div>
              <span className="px-3 py-1 rounded-lg bg-[rgb(15,23,66)] text-white text-sm font-black">
                {currencySymbol}
                {wasteCost}
              </span>
            </div>
            <input
              type="range"
              min={currency === "USD" ? 20 : 75}
              max={currency === "USD" ? 300 : 1100}
              step={currency === "USD" ? 5 : 20}
              value={wasteCost}
              onChange={(e) => setWasteCost(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[rgb(196,30,58)]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>
                {currencySymbol}
                {currency === "USD" ? 20 : 75} (Standard Paper)
              </span>
              <span>
                {currencySymbol}
                {currency === "USD" ? 300 : 1100} (Specialty Foil/Film)
              </span>
            </div>
          </div>

          {/* Slider: Hourly Press Machine Rate */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex justify-between items-center">
              <div>
                <label className="text-sm font-bold text-slate-800 block">
                  Press Hourly Rate (Machine + Crew)
                </label>
                <span className="text-[11px] text-slate-500">
                  Internal hourly billing rate for press downtime
                </span>
              </div>
              <span className="px-3 py-1 rounded-lg bg-[rgb(15,23,66)] text-white text-sm font-black">
                {currencySymbol}
                {hourlyRate}/hr
              </span>
            </div>
            <input
              type="range"
              min={currency === "USD" ? 50 : 180}
              max={currency === "USD" ? 450 : 1650}
              step={currency === "USD" ? 10 : 40}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[rgb(196,30,58)]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>
                {currencySymbol}
                {currency === "USD" ? 50 : 180}/hr
              </span>
              <span>
                {currencySymbol}
                {currency === "USD" ? 450 : 1650}/hr
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: REAL-TIME RETURN & REPORT
            ========================================================= */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Main Hero Metric: Annual Savings */}
          <div className="bg-gradient-to-br from-[rgb(15,23,66)] to-[rgb(24,37,102)] p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(196,30,58,0.35)_0%,transparent_70%)] pointer-events-none" />

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Total Projected Annual Profit Recovery
            </span>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                {currencySymbol}
                {Math.round(totalAnnualSavingsCurrent).toLocaleString()}
              </span>
              <span className="text-white/60 text-sm font-semibold">/ year</span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
              Based on eliminating {makereadyMinsSavedPerJob} minutes of trial-and-error ink adjustment per job and cutting substrate waste by 40%.
            </p>

            {/* Payback badge */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/70">
                  Estimated Equipment Payback:
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-400/30">
                  ~{paybackMonths} Months
                </span>
              </div>
              <span className="text-[11px] text-white/40">
                {totalJobsAnnual.toLocaleString()} Total Makereadies/Yr
              </span>
            </div>
          </div>

          {/* 3 Secondary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Hours Saved */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs text-slate-500 font-semibold block">
                Recovered Capacity
              </span>
              <span className="text-xl font-black text-slate-900 block mt-0.5">
                {annualHoursSaved.toLocaleString()} hrs
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Extra billable press uptime
              </span>
            </div>

            {/* Substrate Saved */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs text-slate-500 font-semibold block">
                Substrate Saved
              </span>
              <span className="text-xl font-black text-slate-900 block mt-0.5">
                {annualUnitsSaved.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block capitalize">
                {selectedPress.wasteUnit} diverted
              </span>
            </div>

            {/* Waste Cost Saved */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-[rgb(196,30,58)] flex items-center justify-center mb-2">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="text-xs text-slate-500 font-semibold block">
                Direct Scrap Saved
              </span>
              <span className="text-xl font-black text-slate-900 block mt-0.5">
                {currencySymbol}
                {Math.round(annualWasteSavingsUSD * rateMultiplier).toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Raw material bottom-line
              </span>
            </div>
          </div>

          {/* Visual Makeready Comparison */}
          <div className="p-5 rounded-2xl bg-slate-100/80 border border-slate-200/90 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Makeready Benchmarks: Traditional vs. Phoenix Automated
            </span>

            {/* Traditional */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Traditional Visual / Density Pressroom</span>
                <span className="text-rose-600 font-bold">42 mins / job</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-full" />
              </div>
            </div>

            {/* Phoenix Closed Loop */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>With Phoenix eXact 2 + ColorCert Closed-Loop</span>
                <span className="text-emerald-700 font-bold">
                  26 mins / job (-38%)
                </span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[62%]" />
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/10 flex-1 justify-center"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Validate ROI with an Engineer (WhatsApp)
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="btn-outline text-sm px-5 py-3.5 border-slate-300 text-slate-700 hover:bg-slate-100"
              title="Print executive summary for management review"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print ROI Summary
            </button>
          </div>
        </div>
      </div>

      {/* Footer methodology disclaimer */}
      <div className="bg-slate-50 px-6 sm:px-10 py-4 border-t border-slate-200 text-slate-500 text-[11px] leading-relaxed flex flex-wrap items-center justify-between gap-2">
        <p>
          *Calculation models are derived from Idealliance G7®, ISO 12647-2, and X-Rite Pantone global pressroom benchmark datasets. Actual savings may vary depending on press age, substrate mix, and operator training.
        </p>
        <Link
          href="/contact"
          className="font-semibold text-slate-700 hover:text-[rgb(196,30,58)] underline"
        >
          Request an On-Site Press Audit in Dubai & GCC →
        </Link>
      </div>
    </div>
  );
}

