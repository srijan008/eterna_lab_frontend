import { Token, TokenCategory } from "./types";

const CHAINS = ["SOL", "ETH", "BTC"] as const;

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const randomInt = (min: number, max: number) =>
  Math.floor(randomBetween(min, max));

const generateMockToken = (id: number, category: TokenCategory): Token => {
  const chain = CHAINS[id % CHAINS.length];
  const price = randomBetween(0.0001, 10);
  const createdDate = new Date(
    Date.now() - randomInt(10, 72) * 60 * 60 * 1000
  ).toISOString();

  return {
    id: `token-${category}-${id}`,
    symbol: `TKN${id}`,
    name: `Mock Token ${id}`,
    chain,
    price,
    priceChange24h: randomBetween(-60, 150),
    liquidity: randomBetween(5_000, 500_000),
    marketCap: randomBetween(10_000, 1_000_000),
    volume24h: randomBetween(2_000, 300_000),
    txCount24h: randomInt(50, 3000),
    holders: randomInt(20, 2000),
    createdAt: createdDate,
    category,
  };
};

export const fetchTokens = async (
  category: TokenCategory
): Promise<Token[]> => {
  await new Promise((res) => setTimeout(res, 800)); // simulate latency
  return Array.from({ length: 40 }).map((_, i) =>
    generateMockToken(i + 1, category)
  );
};
