"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { generateFakeTokenList, TokenData } from "@/utils/generateFakeTokenList";
import TokenCard from "@/components/TokenCard/TokenCard";
import TokenModal from "@/components/TokenModal/TokenModal";

export default function TokensPage() {
  const [tokens] = useState<TokenData[]>(generateFakeTokenList());
  const [selected, setSelected] = useState<TokenData | null>(null);

  return (
    <div className={styles.page}>
      <h1>🧠 AI-Powered Token Radar</h1>
      <p>A list of fresh tokens with auto-analysis from AI. Click on any token for a detailed report.</p>

      <div className={styles.grid}>
        {tokens.map((token) => (
          <TokenCard key={token.symbol} token={token} onClick={() => setSelected(token)} />
        ))}
      </div>

      {selected && (
        <TokenModal token={selected.symbol} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}