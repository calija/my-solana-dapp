"use client";

// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

import {
  Connected,
  NotConnected,
  ConnectButton,
  WalletButton,
} from "@/components";

export default function Home() {
  const { connected } = useWallet();

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex h-[75px] p-5 justify-between items-center w-full fixed top-0">
        <div>
          <span>Step</span>
        </div>
        <div className="px-2.5">
          {connected ? <WalletButton /> : <ConnectButton />}
        </div>
      </header>
      <main className="flex flex-col pt-24 pb-24">
        {/* <WalletMultiButton /> */}
        {connected ? <Connected /> : <NotConnected />}
      </main>
    </div>
  );
}
