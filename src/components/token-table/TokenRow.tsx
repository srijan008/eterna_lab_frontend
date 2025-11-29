"use client";

import React, { useState, useEffect } from "react";
import { Token } from "@/lib/types";
import { formatCurrency, formatNumber, formatPercent, formatTimeAgo } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Popover } from "@/components/ui/Popover";
import { Modal } from "@/components/ui/Modal";
import { Tooltip } from "@/components/ui/Tooltip";

interface Props {
  token: Token;
}

export const TokenRow: React.FC<Props> = React.memo(({ token }) => {
  const [highlight, setHighlight] = useState<"up" | "down" | null>(null);
  const [lastPrice, setLastPrice] = useState(token.price);
  const [modalOpen, setModalOpen] = useState(false);

  // Smooth color transition on price change
  useEffect(() => {
    if (token.price === lastPrice) return;
    const direction = token.price > lastPrice ? "up" : "down";
    // Defer state updates to avoid calling setState synchronously inside the effect
    const start = setTimeout(() => {
      setHighlight(direction);
      setLastPrice(token.price);
    }, 0);
    const end = setTimeout(() => setHighlight(null), 600);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [token.price, lastPrice]);

  const priceHighlightClass =
    highlight === "up"
      ? "bg-emerald-500/10 text-emerald-200"
      : highlight === "down"
      ? "bg-rose-500/10 text-rose-200"
      : "";

  const pctClass =
    token.priceChange24h > 0
      ? "text-emerald-400"
      : token.priceChange24h < 0
      ? "text-rose-400"
      : "text-slate-300";

  return (
    <>
      <tr className="group border-b border-slate-800/70 transition-colors hover:bg-slate-900/50">
        {/* TOKEN NAME + POPOVER */}
        <td className="px-3 py-2">
          <Popover
            trigger={
              <button className="flex w-full items-center gap-2 text-left">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold text-slate-100">
                  {token.symbol[0]}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-50">
                    {token.symbol}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {token.name}
                  </span>
                </div>
              </button>
            }
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-50">
                    {token.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {token.symbol} · {token.chain}
                  </div>
                </div>
                <Badge variant="green">Live</Badge>
              </div>
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Liquidity</span>
                <span>{formatCurrency(token.liquidity)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Volume 24h</span>
                <span>{formatCurrency(token.volume24h)}</span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-2 w-full rounded-full bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-100 hover:bg-slate-700"
              >
                View details
              </button>
            </div>
          </Popover>
        </td>

        {/* PRICE */}
        <td className="px-3 py-2 text-right">
          <span
            className={`inline-flex rounded-md px-1.5 py-0.5 text-xs tabular-nums transition-colors duration-500 ${priceHighlightClass}`}
          >
            {formatCurrency(token.price)}
          </span>
        </td>

        {/* 24H */}
        <td className="px-3 py-2 text-right">
          <span className={`text-xs tabular-nums ${pctClass}`}>
            {formatPercent(token.priceChange24h)}
          </span>
        </td>

        {/* LQ / MKT / VOL / TX / HOLDERS / AGE */}
        <td className="px-3 py-2 text-right">
          <span className="text-xs tabular-nums text-slate-200">
            {formatCurrency(token.liquidity)}
          </span>
        </td>
        <td className="px-3 py-2 text-right">
          <span className="text-xs tabular-nums text-slate-200">
            {formatCurrency(token.marketCap)}
          </span>
        </td>
        <td className="px-3 py-2 text-right">
          <span className="text-xs tabular-nums text-slate-200">
            {formatCurrency(token.volume24h)}
          </span>
        </td>
        <td className="px-3 py-2 text-right">
          <span className="text-xs tabular-nums text-slate-200">
            {formatNumber(token.txCount24h)}
          </span>
        </td>
        <td className="px-3 py-2 text-right">
          <Tooltip content={`${token.holders.toLocaleString()} holders`}>
            <span className="cursor-help text-xs tabular-nums text-slate-200">
              {formatNumber(token.holders)}
            </span>
          </Tooltip>
        </td>
        <td className="px-3 py-2 text-right">
          <span className="text-xs text-slate-400">
            {formatTimeAgo(token.createdAt ?? "")}
          </span>
        </td>
      </tr>

      {/* DETAILS MODAL */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={`${token.symbol} · ${token.name}`}
      >
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Price</span>
            <span className="font-mono text-slate-100">
              {formatCurrency(token.price)} ({formatPercent(token.priceChange24h)})
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Liquidity</span>
            <span className="font-mono text-slate-100">
              {formatCurrency(token.liquidity)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Market Cap</span>
            <span className="font-mono text-slate-100">
              {formatCurrency(token.marketCap)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Volume 24h</span>
            <span className="font-mono text-slate-100">
              {formatCurrency(token.volume24h)}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
});

TokenRow.displayName = "TokenRow";
