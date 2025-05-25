"use client";

import { useEffect, useState } from "react";
import styles from "./TokenModal.module.css";
import { generateFakeInsights } from "@/utils/generateFakeInsights";

type Props = {
  token: string;
  onClose: () => void;
};

export default function TokenModal({ token, onClose }: Props) {
  const [data, setData] = useState<ReturnType<typeof generateFakeInsights> | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  useEffect(() => {
    const metrics = generateFakeInsights(token);
    setData(metrics);

    const fetchAI = async () => {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          token,
          metrics,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const { result } = await res.json();
      setAiSummary(result);
    };

    fetchAI();
  }, [token]);

  if (!data) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2>AI Summary for {data.token}</h2>
        <div className={styles.content}>
          <p>🐋 Whale Activity: <strong>{data.whale}</strong></p>
          <p>🧠 Developer Activity: <strong>{data.dev}</strong></p>
          <p>💬 Social Mentions Last 72h: <strong>{data.social}</strong></p>
          <p>📈 Trending: <strong>{data.trending ? "Yes 🔥" : "Not Yet"}</strong></p>
          <p>⚠️ Risk Level: <span className={styles.badge}>{data.risk}</span></p>
          {aiSummary && (
            <>
              <hr className={styles.divider} />
              <p><strong>🧠 AI Insight:</strong></p>
              <p className={styles.aiText}>{aiSummary}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}