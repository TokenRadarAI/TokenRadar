"use client";

import styles from "./TokenCard.module.css";
import { TokenData } from "@/utils/generateFakeTokenList";

type Props = {
  token: TokenData;
  onClick: () => void;
  // onAddToWatchlist: (token: TokenData) => void;
};

export default function TokenCard({ token, onClick }: Props) {
  
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{token.name} (${token.symbol})</h3>
      <p>💰 Price: ${token.price}</p>
      <p>📊 Volume (24h): ${token.volume.toLocaleString()}</p>
      <p>🔥 Trending: {token.trending ? "Yes" : "No"}</p>
      <p>⚠️ Risk: <strong>{token.risk}</strong></p>

      {/* <button
        className={styles.watchlistBtn}
        onClick={(e) => {
          e.stopPropagation(); 
          onAddToWatchlist(token);
        }}
      >
        + Add to Watchlist
      </button> */}
    </div>
  );
}