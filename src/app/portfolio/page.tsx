"use client";

import { useState } from "react";
import TokenCard from "@/components/TokenCard/TokenCard";
import TokenModal from "@/components/TokenModal/TokenModal";
import { generateFakeTokenList, type TokenData } from "@/utils/generateFakeTokenList";
import styles from './page.module.css'

export default function PortfolioPage() {
  const [tokens] = useState<TokenData[]>(generateFakeTokenList());
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Portfolio</h1>
      <div className={styles.grid}>
        {tokens.map((token) => (
          <TokenCard
            key={token.symbol}
            token={token}
            onClick={() => setSelectedToken(token)}
          />
        ))}
      </div>

      {selectedToken && (
        <TokenModal
          token={selectedToken.name}
          onClose={() => setSelectedToken(null)}
        />
      )}
    </div>
  );
}