export type TokenCategory = "NEW_PAIRS" | "FINAL_STRETCH" | "MIGRATED";

export interface Token {
  id: string;
  symbol: string;
  name: string;
  imageUrl: string;

  // Raw numeric values
  price: number;
  marketCap: number;
  liquidity: number;
  volume24h: number;
  txCount24h: number;
  holders: number;

  
  marketCapLabel?: string; 
  volumeLabel?: string;    
  liquidityLabel?: string; 
  change24hLabel?: string;   
  ageLabel?: string;         

  category?: string;

  
  createdAt?: string;
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
