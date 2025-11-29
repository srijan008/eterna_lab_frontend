"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCategory, setSearch } from "@/store/tokenSlice";
import { usePriceFeed } from "@/hooks/usePriceFeed";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Badge } from "@/components/ui/Badge";
import { Token, TokenCategory } from "@/lib/types";
import { fetchTokens } from "@/lib/mockApi";
import { TokenCardMobile } from "./TokenCardMobile";
import { TokenCardDesktop } from "./TokenCardDesktop";

const categoryLabel: Record<TokenCategory, string> = {
  NEW_PAIRS: "New Pairs",
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

// small hook: fetch + filter + sort tokens by category
const useTokensByCategory = (category: TokenCategory, search: string) => {
  const query = useQuery<Token[]>({
    queryKey: ["tokens", category],
    queryFn: () => fetchTokens(category),
    staleTime: 10_000,
    refetchInterval: 15_000,
  });

  const rows = useMemo(() => {
    if (!query.data) return [];
    let filtered = query.data;

    const q = search.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((t) =>
        `${t.symbol} ${t.name}`.toLowerCase().includes(q)
      );
    }

    // sort similar to Axiom: bigger market cap & volume first
    return [...filtered].sort((a, b) => {
      if (b.marketCap !== a.marketCap) return b.marketCap - a.marketCap;
      return b.volume24h - a.volume24h;
    });
  }, [query.data, search]);

  return { ...query, rows };
};

interface DesktopColumnProps {
  title: string;
  tokens: Token[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

const DesktopColumn: React.FC<DesktopColumnProps> = ({
  title,
  tokens,
  isLoading,
  isError,
  error,
}) => {
  return (
    <div className="flex flex-col rounded-md border border-slate-800 bg-slate-950/70">

      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
        <h3 className="text-xs font-semibold text-slate-100">{title}</h3>
        <span className="text-[11px] text-slate-500">{tokens.length} pairs</span>
      </div>
      <div className="max-h-[520px] space-y-1 overflow-auto p-1.5">

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl bg-slate-800/60"
            />
          ))}

        {!isLoading &&
          !isError &&
          tokens.map((t) => <TokenCardDesktop key={t.id} token={t} />)}

        {isError && (
          <div className="p-2 text-xs text-rose-300">
            Failed to load: {(error as Error).message}
          </div>
        )}

        {!isLoading && !isError && tokens.length === 0 && (
          <div className="p-2 text-xs text-slate-400">No tokens found.</div>
        )}
      </div>
    </div>
  );
};

export const TokenTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.tokens);

  // one query per column
  const newPairs = useTokensByCategory("NEW_PAIRS", state.search);
  const finalStretch = useTokensByCategory("FINAL_STRETCH", state.search);
  const migrated = useTokensByCategory("MIGRATED", state.search);

  // live price feeds per column
  usePriceFeed("NEW_PAIRS", newPairs.data);
  usePriceFeed("FINAL_STRETCH", finalStretch.data);
  usePriceFeed("MIGRATED", migrated.data);

  const activeCategory = state.activeCategory;
  const activeData =
    activeCategory === "NEW_PAIRS"
      ? newPairs
      : activeCategory === "FINAL_STRETCH"
      ? finalStretch
      : migrated;

  return (
    <ErrorBoundary>
      <section className="w-full max-w-full flex flex-col gap-2 px-2 sm:px-3 md:px-4">

        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
              Pulse · Token Discovery
            </h2>
            <Badge variant="default" className="hidden sm:inline-flex">
              Live
            </Badge>
          </div>

          {/* desktop / tablet search */}
          <div className="ml-auto hidden sm:block">
            <div className="relative w-full max-w-xs">
              <input
                value={state.search}
                onChange={(e) =>
                  dispatch(setSearch(e.target.value.toUpperCase()))
                }
                placeholder="Search by token or CA..."
                className="h-8 w-full rounded-full border border-slate-800 bg-slate-900/60 px-3 pr-8 text-xs text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* mobile controls: tabs + search under header */}
        <div className="mt-2 flex flex-col gap-2 sm:hidden">
          <CategoryTabs />
          <div className="relative w-full">
            <input
              value={state.search}
              onChange={(e) =>
                dispatch(setSearch(e.target.value.toUpperCase()))
              }
              placeholder="Search by token or CA..."
              className="h-8 w-full rounded-full border border-slate-800 bg-slate-900/60 px-3 pr-8 text-xs text-slate-100 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* DESKTOP: 3 columns (Axiom style) */}
        <div className="hidden gap-2 lg:grid lg:grid-cols-3">
          <DesktopColumn
            title="New Pairs"
            tokens={newPairs.rows}
            isLoading={newPairs.isLoading}
            isError={newPairs.isError}
            error={newPairs.error}
          />
          <DesktopColumn
            title="Final Stretch"
            tokens={finalStretch.rows}
            isLoading={finalStretch.isLoading}
            isError={finalStretch.isError}
            error={finalStretch.error}
          />
          <DesktopColumn
            title="Migrated"
            tokens={migrated.rows}
            isLoading={migrated.isLoading}
            isError={migrated.isError}
            error={migrated.error}
          />
        </div>

        {/* MOBILE / TABLET: single list with tabs */}
        <div className="block lg:hidden">
          <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950/80">
            <div className="max-h-[520px] space-y-3 overflow-auto p-2">
              {activeData.isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 animate-pulse rounded-xl bg-slate-800/60"
                  />
                ))}

              {!activeData.isLoading &&
                !activeData.isError &&
                activeData.rows.map((t) => (
                  <TokenCardMobile key={t.id} token={t} />
                ))}

              {activeData.isError && (
                <div className="p-2 text-xs text-rose-300">
                  Failed to load tokens
                </div>
              )}

              {!activeData.isLoading &&
                !activeData.isError &&
                activeData.rows.length === 0 && (
                  <div className="p-2 text-xs text-slate-400">
                    No tokens found.
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};
