'use client';

import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';

import { formatPublicKey } from '@/lib/utils';
import {
  NotConnected,
  Dashboard,
  ConnectButton,
  WalletButton,
  WalletIcon,
} from '@/components';

import StepLogo from '../../public/stepLogo.svg';

const Main = () => {
  const { connected, wallet } = useWallet();

  useEffect(() => {
    if (connected && wallet) {
      toast(
        `Connected to ${formatPublicKey(wallet.adapter.publicKey!.toBase58())}`,
        {
          icon: (
            <WalletIcon name={wallet.adapter.name} src={wallet.adapter.icon} />
          ),
        }
      );
    }
  }, [connected, wallet]);

  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="flex h-[75px] p-5 justify-between items-center w-full fixed top-0">
        <div className="flex items-center gap-2.5 text-xl font-extrabold">
          <StepLogo width={40} height={40} />
          Step
        </div>
        <div className="px-2.5">
          {connected ? <WalletButton /> : <ConnectButton />}
        </div>
      </header>
      <main className="flex flex-col pt-24 pb-24">
        {connected ? <Dashboard /> : <NotConnected />}
      </main>
    </div>
  );
};

export default Main;
