"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

import { Connected, NotConnected } from "@/components";

export default function Home() {
  const { connected } = useWallet();

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col pt-24 pb-24">
        <WalletMultiButton />
        {connected ? <Connected /> : <NotConnected />}
      </main>
    </div>
  );
}
