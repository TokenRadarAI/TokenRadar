"use client";

import { useState } from "react";
import TokenSearch from "@/components/TokenSearch/TokenSearch";
import TokenModal from "@/components/TokenModal/TokenModal";
import styles from "./page.module.css";

export default function Home() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const handleAnalyze = (token: string) => {
    setSelectedToken(token);
  };

  const handleClose = () => {
    setSelectedToken(null);
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🚀 TokenRadar</h1>
        <p className={styles.subtitle}>
          Discover and analyze new crypto tokens before they trend.  
          Powered by AI, blockchain data, and real-time insights.
        </p>
      </header>

      <section className={styles.searchSection}>
        <TokenSearch onAnalyze={handleAnalyze} />
      </section>

      <section className={styles.infoSection}>
        <h2>Why TokenRadar?</h2>
        <ul className={styles.features}>
          <li>🧠 AI-generated insights about token trust & potential</li>
          <li>📊 Real-time on-chain activity & whale monitoring</li>
          <li>🐙 GitHub activity and social sentiment detection</li>
          <li>🔔 Custom alerts and wallet tracking (coming soon)</li>
        </ul>
      </section>

      {selectedToken && (
        <TokenModal token={selectedToken} onClose={handleClose} />
      )}
    </main>
  );
}