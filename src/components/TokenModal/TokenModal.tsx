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

  useEffect(() => {
    setData(generateFakeInsights(token));
  }, [token]);

  if (!data) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2>AI Summary for {data.token}</h2>
        <p>🐋 Whale Activity: <strong>{data.whale}</strong></p>
        <p>🧠 Developer Activity: <strong>{data.dev}</strong></p>
        <p>💬 Social Mentions Last 72h: <strong>{data.social}</strong></p>
        <p>📈 Trending: <strong>{data.trending ? "Yes 🔥" : "Not Yet"}</strong></p>
        <p>
          ⚠️ Risk Level: <span className={styles.badge}>{data.risk}</span>
        </p>
      </div>
    </div>
  );
}