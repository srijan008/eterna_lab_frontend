"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCategory, setSearch } from "@/store/tokenSlice";
import { useTokenTableData } from "@/hooks/useTokenTable";
import { usePriceFeed } from "@/hooks/usePriceFeed";
import { TokenTableHeader } from "./TokenTableHeader";
import { TokenSkeletonRow } from "./TokenSkeletonRow";
import { TokenRow } from "./TokenRow";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Badge } from "@/components/ui/Badge";
import { TokenCategory } from "@/lib/types";

const categoryLabel: Record<TokenCategory, string> = {
  NEW_PAIRS: "New pairs",
  FINAL_STRETCH: "Final Stretch",
  MIGRATED: "Migrated",
};

const categories: TokenCategory[] = ["NEW_PAIRS", "FINAL_STRETCH", "MIGRATED"];

const CategoryTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((s) => s.tokens.activeCategory);

  return (
    <div className="inline-flex rounded-full bg-slate-900/80 p-1 text-xs">
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            onClick={() => dispatch(setCategory(cat))}
            className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
              isActive
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            {categoryLabel[cat]}
          </button>
        );
      })}
    </div>
  );
};

export const TokenTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.tokens);
  const { rows, isLoading, isError, error, data } = useTokenTableData();

  usePriceFeed(state.activeCategory, data);

  return (
    <ErrorBoundary>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 shadow-xl sm:p-4 md:p-5">
        {/* Header row: title + category tabs + search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
              Token Discovery
            </h2>
            <Badge variant="default" className="hidden sm:inline-flex">
              Live
            </Badge>
          </div>
          <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
            <CategoryTabs />
            <div className="relative w-full max-w-xs">
              <input
              value={state.search}
              onChange={(e) => dispatch(setSearch(e.target.value.toUpperCase()))}
              placeholder="Search by token or CA..."
              className="h-8 w-full rounded-full border border-slate-800 bg-slate-900/60 px-3 pr-8 text-xs text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
              />
             
            </div>
          </div>
        </div>

        {/* Table wrapper */}
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70">
          {isLoading && (
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400 animate-[pulse_1.5s_ease-in-out_infinite]" />
          )}

          <div className="max-h-[460px] overflow-auto">
            <table className="min-w-full border-collapse text-xs">
              <TokenTableHeader />
              <tbody>
                {isLoading &&
                  Array.from({ length: 10 }).map((_, idx) => (
                    <TokenSkeletonRow key={idx} />
                  ))}

                {!isLoading &&
                  !isError &&
                  rows.map((t) => <TokenRow key={t.id} token={t} />)}
              </tbody>
            </table>

            {isError && (
              <div className="p-4 text-xs text-rose-300">
                Failed to load tokens: {(error as Error).message}
              </div>
            )}

            {!isLoading && !isError && rows.length === 0 && (
              <div className="p-4 text-xs text-slate-400">
                No tokens found for this filter.
              </div>
            )}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};
