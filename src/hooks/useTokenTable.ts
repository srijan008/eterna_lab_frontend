import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTokens } from "@/lib/mockApi";
import { Token } from "@/lib/types";
import { useAppSelector } from "@/store";

export const useTokenTableData = () => {
  const { activeCategory, search, sortKey, sortDirection } = useAppSelector(
    (s) => s.tokens
  );

  const query = useQuery<Token[]>({
    queryKey: ["tokens", activeCategory],
    queryFn: () => fetchTokens(activeCategory),
    staleTime: 10_000,
    refetchInterval: 15_000,
  });

  const processed = useMemo(() => {
    if (!query.data) return [];
    let filtered = query.data;

    if (search.trim()) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.symbol.toLowerCase().includes(lower) ||
          t.name.toLowerCase().includes(lower)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      const dir = sortDirection === "asc" ? 1 : -1;
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return av > bv ? dir : av < bv ? -dir : 0;
      }
      return 0;
    });

    return sorted;
  }, [query.data, search, sortKey, sortDirection]);

  return {
    ...query,
    rows: processed,
  };
};
