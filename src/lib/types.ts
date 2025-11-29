export type TokenCategory = "NEW_PAIRS" | "FINAL_STRETCH" | "MIGRATED";

export interface Token {
  id: string;
  symbol: string;
  name: string;
  chain: "SOL" | "ETH" | "BTC" | "OTHER";
  price: number;
  priceChange24h: number; // in %
  liquidity: number;
  marketCap: number;
  volume24h: number;
  txCount24h: number;
  holders: number;
  createdAt: string; // ISO string
  category: TokenCategory;

  // 🔥 new
  ageLabel?: string; 
  imageUrl: string;
}


export type SortKey =
  | "price"
  | "priceChange24h"
  | "liquidity"
  | "marketCap"
  | "volume24h"
  | "txCount24h"
  | "holders"
  | "createdAt";

export type SortDirection = "asc" | "desc";

export interface TokenTableState {
  activeCategory: TokenCategory;
  search: string;
  sortKey: SortKey;
  sortDirection: SortDirection;
  selectedTokenId: string | null;
}
