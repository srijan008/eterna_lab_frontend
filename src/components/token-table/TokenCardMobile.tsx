"use client";

import React from "react";
import { Token } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export const TokenCardMobile: React.FC<{ token: Token }> = ({ token }) => {
  const pctClass =
    token.priceChange24h > 0
      ? "text-emerald-400"
      : token.priceChange24h < 0
      ? "text-rose-400"
      : "text-slate-300";

  return (
    <article
  className="
    w-full rounded-md border border-slate-800 bg-slate-950/90 
    p-2 transition-all duration-150 
    hover:border-slate-600 hover:bg-slate-900 cursor-pointer
  "
>


      <div className="grid grid-cols-[auto,1fr,auto] gap-3">
        {/* Image */}
        <div className="flex items-start">
          <img
            src={token.imageUrl}
            alt={token.name}
            className="h-10 w-10 rounded-md object-cover"
          />
        </div>

        {/* Middle info */}
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="truncate text-sm font-semibold text-slate-100">
                  {token.symbol}
                </h3>
                <span className="truncate text-[11px] text-slate-400 max-w-[110px]">
                  {token.name}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                <span>{token.chain}</span>
                <span className={pctClass}>{formatPercent(token.priceChange24h)}</span>
              </div>
            </div>
          </div>

          {/* bottom badges */}
          <div className="mt-3 flex flex-wrap items-center gap-1">
            <Badge
              variant={token.priceChange24h >= 0 ? "green" : "red"}
              className="text-[10px]"
            >
              {formatPercent(token.priceChange24h)}
            </Badge>
            <Badge variant="default" className="text-[10px]">
              LQ {formatCurrency(token.liquidity)}
            </Badge>
            <Badge variant="default" className="text-[10px]">
              TX {token.txCount24h}
            </Badge>
            <Badge variant="default" className="text-[10px]">
              {token.holders} holders
            </Badge>
          </div>
        </div>

        {/* Right MC/V block */}
        <div className="flex flex-col items-end justify-start gap-1">
          <div className="text-[10px] uppercase text-slate-500">MC</div>
          <div className="text-xs font-mono text-slate-100">
            {formatCurrency(token.marketCap)}
          </div>
          <div className="mt-1 text-[10px] uppercase text-slate-500">V</div>
          <div className="text-xs font-mono text-slate-100">
            {formatCurrency(token.volume24h)}
          </div>
        </div>
      </div>
    </article>
  );
};
