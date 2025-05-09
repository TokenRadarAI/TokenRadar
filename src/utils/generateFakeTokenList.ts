export type TokenData = {
  name: string;
  symbol: string;
  price: number;
  volume: number;
  whale: string;
  dev: string;
  social: string;
  trending: boolean;
  risk: string;
};

export function generateFakeTokenList(): TokenData[] {
  const tokens = ["HYPE", "SOLX", "FISH", "DEGEN", "MOON", "RAIN", "WAVE"];
  return tokens.map((symbol) => ({
    name: `${symbol} Token`,
    symbol,
    price: +(Math.random() * 0.1 + 0.001).toFixed(4),
    volume: Math.floor(Math.random() * 100_000),
    whale: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
    dev: ["none", "low", "active"][Math.floor(Math.random() * 3)],
    social: ["quiet", "some buzz", "trending"][Math.floor(Math.random() * 3)],
    trending: Math.random() > 0.6,
    risk: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
  }));
}
