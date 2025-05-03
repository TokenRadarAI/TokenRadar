import { useState } from "react";
import styles from "./TokenSearch.module.css";

type Props = {
  onAnalyze: (token: string) => void;
};

export default function TokenSearch({ onAnalyze }: Props) {
  const [query, setQuery] = useState("");

  const handleClick = () => {
    if (query.trim()) {
      onAnalyze(query);
    }
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Enter token name or address"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <button className={styles.button} onClick={handleClick}>
        Analyze
      </button>
    </div>
  );
}