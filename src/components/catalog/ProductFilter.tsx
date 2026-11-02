"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Filter, X } from "lucide-react";

interface ProductFilterProps {
  industries: string[];
  applications: string[];
  tags: string[];
  totalCount: number;
}

export function ProductFilter({
  industries,
  applications,
  tags,
  totalCount,
}: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentIndustry = searchParams.get("industry") || "";
  const currentApp = searchParams.get("application") || "";
  const currentTag = searchParams.get("tag") || "";
  const currentSort = searchParams.get("sort") || "name-asc";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    const qs = createQueryString(name, value);
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(currentIndustry || currentApp || currentTag);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[rgb(196,30,58)]" />
          <span className="text-sm font-bold text-slate-900">Filter Products</span>
          <span className="text-xs text-slate-500 font-medium ml-1">
            ({totalCount} {totalCount === 1 ? "instrument" : "instruments"})
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[rgb(196,30,58)] hover:underline self-start md:self-auto"
          >
            <X className="w-3.5 h-3.5" />
            Clear all filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {/* Industry Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Industry
          </label>
          <select
            value={currentIndustry}
            onChange={(e) => handleFilterChange("industry", e.target.value)}
            className="w-full text-xs font-medium rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgb(196,30,58)]"
          >
            <option value="">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Application Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Application
          </label>
          <select
            value={currentApp}
            onChange={(e) => handleFilterChange("application", e.target.value)}
            className="w-full text-xs font-medium rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgb(196,30,58)]"
          >
            <option value="">All Applications</option>
            {applications.map((app) => (
              <option key={app} value={app}>
                {app}
              </option>
            ))}
          </select>
        </div>

        {/* Technology Tag */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Technology / Tag
          </label>
          <select
            value={currentTag}
            onChange={(e) => handleFilterChange("tag", e.target.value)}
            className="w-full text-xs font-medium rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgb(196,30,58)]"
          >
            <option value="">All Tags</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Sort By
          </label>
          <select
            value={currentSort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
            className="w-full text-xs font-medium rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgb(196,30,58)]"
          >
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

