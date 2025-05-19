"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    if ("solana" in window) {
      const provider = (window as any).solana;
      if (provider.isPhantom) {
        provider.connect({ onlyIfTrusted: true }).then((resp: any) => {
          setWalletAddress(resp.publicKey.toString());
        }).catch(() => {
        });
      }
    }
  }, []);

  const connectWallet = async () => {
    try {
      const provider = (window as any).solana;
      if (!provider) {
        alert("Phantom Wallet is not installed. Please install it from https://phantom.app/");
        return;
      }
      const resp = await provider.connect();
      setWalletAddress(resp.publicKey.toString());
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  const shortenAddress = (address: string) => address.slice(0, 4) + "..." + address.slice(-4);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          TokenRadar
        </Link>
        <nav className={styles.nav}>
          <Link href="/tokens" className={styles.link}>Tokens</Link>
          {walletAddress ? (
            <button className={styles.walletButton} title={walletAddress}>
              {shortenAddress(walletAddress)}
            </button>
          ) : (
            <button className={styles.walletButton} onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}