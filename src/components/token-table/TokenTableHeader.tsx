"use client";

import { SortKey } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSort } from "@/store/tokenSlice";
import { Tooltip } from "@/components/ui/Tooltip";

interface HeaderCellProps {
  label: string;
  sortKey?: SortKey;
  align?: "left" | "right";
  tooltip?: string;
}

const HeaderCell: React.FC<HeaderCellProps> = ({
  label,
  sortKey,
  align = "left",
  tooltip,
}) => {
  const dispatch = useAppDispatch();
  const { sortKey: currentKey, sortDirection } = useAppSelector(
    (s) => s.tokens
  );

  const isActive = sortKey && currentKey === sortKey;
  const arrow =
    isActive && (sortDirection === "asc" ? "▲" : "▼");

  const content = (
    <button
      type="button"
      className={`flex w-full items-center gap-1 text-xs font-medium uppercase tracking-wide text-slate-400 ${
        align === "right" ? "justify-end" : "justify-start"
      } ${sortKey ? "hover:text-slate-200" : ""}`}
      onClick={
        sortKey ? () => dispatch(setSort({ key: sortKey })) : undefined
      }
    >
      <span>{label}</span>
      {arrow && <span className="text-[9px] text-slate-500">{arrow}</span>}
    </button>
  );

  return (
    <th className={`px-3 py-2 ${align === "right" ? "text-right" : "text-left"}`}>
      {tooltip ? <Tooltip content={tooltip}>{content}</Tooltip> : content}
    </th>
  );
};

export const TokenTableHeader: React.FC = () => (
  <thead className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur">
    <tr>
      <th className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        Token
      </th>
      <HeaderCell label="Price" sortKey="price" align="right" />
      <HeaderCell
        label="24h"
        sortKey="priceChange24h"
        align="right"
        tooltip="Price change in last 24h"
      />
      <HeaderCell
        label="Liquidity"
        sortKey="liquidity"
        align="right"
        tooltip="Current pool liquidity"
      />
      <HeaderCell
        label="Mkt Cap"
        sortKey="marketCap"
        align="right"
        tooltip="Fully diluted market capitalization"
      />
      <HeaderCell
        label="Volume"
        sortKey="volume24h"
        align="right"
        tooltip="24h trading volume"
      />
      <HeaderCell
        label="Txs"
        sortKey="txCount24h"
        align="right"
        tooltip="Transactions in last 24h"
      />
      <HeaderCell
        label="Holders"
        sortKey="holders"
        align="right"
        tooltip="Unique holders"
      />
      <HeaderCell label="Age" sortKey="createdAt" align="right" />
    </tr>
  </thead>
);
