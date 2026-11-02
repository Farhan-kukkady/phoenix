"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight, Package, Tag, Building2, Loader2 } from "lucide-react";
import { BreadcrumbBanner } from "@/components/catalog/BreadcrumbBanner";

interface SearchResultItem {
  id: string;
  type: "product" | "brand" | "category";
  title: string;
  description: string;
  url: string;
  modelNumber?: string;
  categoryName?: string;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const isLoading = Boolean(initialQuery && searchedQuery !== initialQuery);

  useEffect(() => {
    if (!initialQuery) {
      return;
    }

    let isMounted = true;

    fetch(`/api/search?q=${encodeURIComponent(initialQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setResults(data.results || []);
          setSearchedQuery(initialQuery);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSearchedQuery(initialQuery);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const activeResults = initialQuery ? results : [];
  const filteredResults = selectedType === "all"
    ? activeResults
    : activeResults.filter((r) => r.type === selectedType);

  return (
    <>
      <BreadcrumbBanner
        title="Catalog Search"
        subtitle="Search across 21 global brands, categories, spectrophotometers, and software suites."
        items={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />

      <section className="section-padding bg-slate-50/50">
        <div className="container-wide max-w-5xl">
          {/* Search Box Input */}
          <form onSubmit={handleSearchSubmit} className="relative mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search spectrophotometers, eXact 2, GMG, Ci64, G7 calibration..."
              className="w-full text-base sm:text-lg font-medium rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-32 shadow-sm focus:border-[rgb(196,30,58)] focus:outline-none focus:ring-2 focus:ring-[rgb(196,30,58)/0.2]"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 btn-primary py-2 px-5 text-xs font-bold"
            >
              Search
            </button>
          </form>

          {/* Type Filter Pills */}
          {results.length > 0 && (
            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
              <span className="text-xs font-semibold text-slate-500 mr-2">Filter by:</span>
              {[
                { label: `All (${results.length})`, value: "all" },
                { label: `Products (${results.filter((r) => r.type === "product").length})`, value: "product" },
                { label: `Categories (${results.filter((r) => r.type === "category").length})`, value: "category" },
                { label: `Brands (${results.filter((r) => r.type === "brand").length})`, value: "brand" },
              ].map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => setSelectedType(pill.value)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    selectedType === pill.value
                      ? "bg-[rgb(15,23,66)] text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[rgb(196,30,58)]" />
              <p className="text-sm">Searching catalog...</p>
            </div>
          )}

          {/* Results List */}
          {!isLoading && initialQuery && filteredResults.length > 0 && (
            <div className="space-y-4">
              {filteredResults.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="group block p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[rgb(196,30,58)] transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                        {item.type === "product" && (
                          <span className="inline-flex items-center gap-1 text-[rgb(196,30,58)] bg-red-50 px-2 py-0.5 rounded">
                            <Package className="w-3 h-3" />
                            Product {item.modelNumber && `• ${item.modelNumber}`}
                          </span>
                        )}
                        {item.type === "category" && (
                          <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            <Tag className="w-3 h-3" />
                            Category
                          </span>
                        )}
                        {item.type === "brand" && (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            <Building2 className="w-3 h-3" />
                            Brand Partner
                          </span>
                        )}
                        {item.categoryName && (
                          <span className="text-slate-400">in {item.categoryName}</span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[rgb(196,30,58)] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[rgb(196,30,58)] group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && initialQuery && filteredResults.length === 0 && (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-slate-900">No results found for &ldquo;{initialQuery}&rdquo;</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Try searching for broader keywords such as &ldquo;spectrophotometer&rdquo;, &ldquo;X-Rite&rdquo;, &ldquo;GMG&rdquo;, &ldquo;Pantone&rdquo;, or &ldquo;G7&rdquo;.
              </p>
            </div>
          )}

          {/* Initial State / Suggestions */}
          {!initialQuery && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 space-y-6">
              <h3 className="text-base font-bold text-slate-900">Popular Search Topics</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "eXact 2 Plus",
                  "Portable Spectrophotometer",
                  "Benchtop Ci7800",
                  "G7 Certification",
                  "GMG ColorProof",
                  "PantoneLIVE",
                  "Flexible Packaging QC",
                  "Ink Dispensing",
                  "Food Contact Inks",
                  "Anilox Inspection",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                    }}
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 hover:bg-[rgb(15,23,66)] hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="h-screen pt-40 text-center text-slate-400">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
