import { Token, TokenCategory } from "./types";

// Base for Tokens API V2 (public lite endpoint)
const JUP_BASE = "https://lite-api.jup.ag/tokens/v2";

const endpointForCategory = (category: TokenCategory): string => {
  switch (category) {
    case "NEW_PAIRS":
      // Recently created pools – similar to "new pairs"
      return `${JUP_BASE}/recent?limit=40`;
    case "FINAL_STRETCH":
      // Top trending tokens over last 24h
      return `${JUP_BASE}/toptrending/24h?limit=40`;
    case "MIGRATED":
    default:
      // Top traded tokens over last 24h
      return `${JUP_BASE}/toptraded/24h?limit=40`;
  }
};

type JupiterToken = {
  id: string; // mint address
  name: string;
  symbol: string;
  icon?: string;
  mcap?: number;
  usdPrice?: number;
  liquidity?: number;
  holderCount?: number;
  firstPool?: {
    createdAt: string;
  };
  stats24h?: {
    priceChange?: number; // relative change, e.g. 0.2 = +20%
    buyVolume?: number;
    sellVolume?: number;
    numBuys?: number;
    numSells?: number;
  };
  marketCapLabel?: string;
  volumeLabel?: string;
  ageLabel?: string;
};

export const fetchTokens = async (
  category: TokenCategory
): Promise<Token[]> => {
  const url = endpointForCategory(category);

  const res = await fetch(url, {
    // helpful for Next.js caching – okay in browser too
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tokens (${res.status})`);
  }

  const raw: JupiterToken[] = await res.json();

  const mapped: Token[] = raw.map((t) => {
    const stats24h = t.stats24h ?? {};
    const volume24h =
      (stats24h.buyVolume ?? 0) + (stats24h.sellVolume ?? 0);
    const txCount24h =
      (stats24h.numBuys ?? 0) + (stats24h.numSells ?? 0);

    return {
      id: t.id,
      symbol: t.symbol ?? "UNK",
      name: t.name ?? "Unknown",
      chain: "SOL", // Jupiter is Solana; if you want multi-chain, you’d detect it here
      price: t.usdPrice ?? 0,
      priceChange24h: (stats24h.priceChange ?? 0) * 100, // convert ratio to %
      liquidity: t.liquidity ?? 0,
      marketCap: t.mcap ?? 0,
      volume24h,
      txCount24h,
      holders: t.holderCount ?? 0,
      createdAt: t.firstPool?.createdAt ?? new Date().toISOString(),
      category,
      imageUrl:
        t.icon ??
        "https://static.jup.ag/token-logos/placeholder.svg", // fallback icon
    };
  });

  return mapped;
};
