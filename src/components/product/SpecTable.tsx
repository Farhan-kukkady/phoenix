import type { SpecGroup } from "@/types";

interface SpecTableProps {
  specifications: SpecGroup[];
}

export function SpecTable({ specifications }: SpecTableProps) {
  // Extract key KPI highlights for the top banner (matching ref/Screenshot 2026-11-01 012152.png)
  const allItems = specifications.flatMap((g) => g.items);
  const iia = allItems.find((i) => i.label.toLowerCase().includes("inter-instrument") || i.label.toLowerCase().includes("agreement"));
  const speed = allItems.find((i) => i.label.toLowerCase().includes("time") || i.label.toLowerCase().includes("speed"));
  const geom = allItems.find((i) => i.label.toLowerCase().includes("geometry") || i.label.toLowerCase().includes("optics"));

  return (
    <div className="space-y-12">
      {/* 3 Metric Highlights Strip (matching ref/Screenshot 2026-11-01 012152.png) */}
      {(iia || speed || geom) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-slate-200/90 text-center">
          {iia && (
            <div className="px-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {iia.value} {iia.unit && <span className="text-xl sm:text-2xl font-bold text-slate-700">{iia.unit}</span>}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                {iia.label}
              </div>
            </div>
          )}

          {speed && (
            <div className="px-4 border-t md:border-t-0 md:border-x border-slate-200/90 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {speed.value} {speed.unit && <span className="text-xl sm:text-2xl font-bold text-slate-700">{speed.unit}</span>}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                {speed.label}
              </div>
            </div>
          )}

          {geom && (
            <div className="px-4 border-t md:border-t-0 border-slate-200/90 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {geom.value.split(",")[0]}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                {geom.label}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Structured Specifications Groups */}
      <div className="space-y-8">
        {specifications.map((group, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200/80">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {group.group}
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="grid grid-cols-1 sm:grid-cols-3 px-6 py-3.5 text-xs sm:text-sm hover:bg-slate-50/50 transition-colors"
                >
                  <div className="font-semibold text-slate-600 sm:col-span-1">
                    {item.label}
                  </div>
                  <div className="text-slate-900 sm:col-span-2 font-medium">
                    {item.value} {item.unit && <span className="text-slate-500 font-normal">({item.unit})</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

