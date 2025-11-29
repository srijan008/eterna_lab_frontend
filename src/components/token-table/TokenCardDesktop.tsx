import { useState } from "react";
import { Token } from "@/lib/types";

export const TokenCardDesktop = ({ token }: { token: Token }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <article
      className="
        relative w-full rounded-md border border-slate-800 bg-[#0d1117]/95 
        px-2 py-1 transition-all duration-150 cursor-pointer
        hover:bg-[#131820] hover:border-slate-600
      "
    >
      {/* Hover Preview Image */}
      {showPreview && (
        <div
          className="
            absolute left-16 top-16 z-50 
            rounded-lg border border-slate-700 bg-[#0d1117] p-2 shadow-lg
          "
        >
          <img
            src={token.imageUrl}
            alt={token.symbol}
            className="w-[300px] h-[300px] object-cover rounded-md"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Token Image */}
        <div
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
          className="
            h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-slate-700
          "
        >
          <img
            src={token.imageUrl}
            alt={token.symbol}
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        {/* Token Name + Symbol */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-white text-sm">
              {token.symbol}
            </span>
            <span className="text-[11px] text-slate-400">{token.name}</span>
          </div>

          {/* Age + Stats Row */}
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <span className="text-emerald-400">{token.ageLabel ?? "2m"}</span>

            {/* Small Stats Icons */}
            <div className="flex items-center gap-1">
              <span>👤</span>
              <span>{token.txCount24h}</span>
              <span>🏆</span>
              <span>{token.holders}</span>
            </div>

            {/* Rank */}
            <span className="flex items-center gap-1 text-slate-400">
              <span>👑</span> 4/5
            </span>
          </div>
        </div>

        {/* Market Cap + Volume */}
        <div className="ml-auto flex flex-col text-right">
          <span className="text-[13px] font-semibold text-blue-300">
            MC ${token.marketCapLabel}
          </span>
          <span className="text-[12px] text-slate-300">
            V ${token.volumeLabel}
          </span>
        </div>
      </div>

      {/* Badge Row */}
      <div className="mt-2 flex flex-wrap gap-1 text-[10px]">
        <span className="rounded-full bg-red-900/40 px-2 py-[1px] text-red-400">
          75%
        </span>
        <span className="rounded-full bg-blue-900/40 px-2 py-[1px] text-blue-300">
          DS 33m
        </span>
        <span className="rounded-full bg-green-900/40 px-2 py-[1px] text-emerald-400">
          0%
        </span>
        <span className="rounded-full bg-red-900/40 px-2 py-[1px] text-red-400">
          74%
        </span>
        <span className="rounded-full bg-green-900/40 px-2 py-[1px] text-emerald-400">
          0%
        </span>
      </div>
    </article>
  );
};
