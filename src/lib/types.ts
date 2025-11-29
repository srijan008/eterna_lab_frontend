export type TokenCategory = "NEW_PAIRS" | "FINAL_STRETCH" | "MIGRATED";

export interface Token {
  id: string;
  symbol: string;
  name: string;
  imageUrl: string;

  // Numeric values (raw)
  price: number;
  marketCap: number;
  liquidity: number;
  volume24h: number;
  txCount24h: number;
  holders: number;
  priceChange24h: number;   // +12.5, -8.2

  // Formatted UI labels (Axiom style)
  marketCapLabel?: string;   // "$48.2K"
  volumeLabel?: string;      // "$12.1K"
  liquidityLabel?: string;   // "$22.4K"
  change24hLabel?: string;   // "+12%" or "-5%"
  ageLabel?: string;         // "2m", "5s", "1h"
  chain?: string;  // <-- NEW FIELD

  // Category for tabs
  category?: "NEW_PAIRS" | "FINAL_STRETCH" | "MIGRATED";

  // Timestamp for age calculation
  createdAt?: string;        // "2024-02-21T12:00:00Z"
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
