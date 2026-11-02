import { FileText, Download as DownloadIcon } from "lucide-react";
import type { Download } from "@/types";

interface DownloadsSectionProps {
  downloads: Download[];
}

export function DownloadsSection({ downloads }: DownloadsSectionProps) {
  if (!downloads || downloads.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400 text-sm">
        No technical documents available for this model.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {downloads.map((item, idx) => (
        <a
          key={idx}
          href={item.url}
          download
          className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[rgb(196,30,58)] transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-[rgb(196,30,58)/0.1] text-slate-600 group-hover:text-[rgb(196,30,58)] flex items-center justify-center flex-shrink-0 transition-colors">
            <FileText className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                {item.type}
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[rgb(196,30,58)] transition-colors truncate">
              {item.label}
            </h4>
            <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-[rgb(15,23,66)]">
              <DownloadIcon className="w-3.5 h-3.5" />
              Download Document
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}

