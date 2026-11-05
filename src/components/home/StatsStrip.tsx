"use client";

import { SlotCounter } from "@/components/ui/SlotCounter";
import siteContent from "@/data/site-content.json";

export function StatsStrip() {
  const { company } = siteContent;

  return (
    <section className="bg-[rgb(15,23,66)] border-y border-white/10 py-12 relative overflow-hidden">
      {/* Subtle ambient gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,30,58,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
          {company.stats.map((stat, idx) => {
            // Parse prefix/suffix for clean slot machine spinning
            let val = stat.value;
            let suffix = "";
            let prefix = "";

            if (val.endsWith("+")) {
              suffix = "+";
              val = val.slice(0, -1);
            }

            return (
              <div
                key={idx}
                className="space-y-2 p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.04] group"
              >
                {/* Jackpot Slot Machine Number Roller */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-400 drop-shadow-[0_2px_14px_rgba(244,63,94,0.45)] flex items-center justify-center">
                  <SlotCounter
                    value={val}
                    suffix={suffix}
                    prefix={prefix}
                    duration={1.6}
                    delay={idx * 0.12}
                    className="text-rose-400"
                  />
                </div>

                <div className="text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase">
                  {stat.label}
                </div>

                <div className="text-[11px] sm:text-xs text-white/50 leading-relaxed font-normal">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

