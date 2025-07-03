"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { generateFakeTokenList, TokenData } from "@/utils/generateFakeTokenList";
import TokenCard from "@/components/TokenCard/TokenCard";
import TokenModal from "@/components/TokenModal/TokenModal";

export default function TokensPage() {
  const [tokens] = useState<TokenData[]>(generateFakeTokenList());
  const [selected, setSelected] = useState<TokenData | null>(null);

  const [maxPrice, setMaxPrice] = useState<number>(1);
  const [minVolume, setMinVolume] = useState<number>(0);
  //  const [watchlist, setWatchlist] = useState<TokenData[]>([]);

  const filteredTokens = tokens.filter(
    (token) => token.price <= maxPrice && token.volume >= minVolume
  );

  // const handleAddToWatchlist = (token: TokenData) => {
  //   const already = watchlist.find((t) => t.symbol === token.symbol);
  //   if (!already) {
  //     const updated = [...watchlist, token];
  //     setWatchlist(updated);
  //     localStorage.setItem("watchlist", JSON.stringify(updated));
  //   }
  // };

  return (
    <div className={styles.page}>
      <h1>🧠 AI-Powered Token Radar</h1>
      <p>A list of fresh tokens with auto-analysis from AI. Click on any token for a detailed report.</p>

      <div className={styles.filters}>
        <label>
          Max Price: 
          <input
            type="number"
            value={maxPrice}
            min={0}
            step={0.001}
            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Min Volume (24h): 
          <input
            type="number"
            value={minVolume}
            min={0}
            step={100}
            onChange={(e) => setMinVolume(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div className={styles.grid}>
        {filteredTokens.map((token) => (
          <TokenCard key={token.symbol} token={token} onClick={() => setSelected(token)} />
        ))}
      </div>

      {selected && (
        <TokenModal token={selected.symbol} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
