import { useState } from 'react';
import { type Wallet, useWallet } from '@solana/wallet-adapter-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { WalletIcon } from '../WalletIcon';

export const ConnectButton = () => {
  const { wallets, select } = useWallet();

  const [isOpen, setIsOpen] = useState(false);

  const installedWallets = wallets.filter((w) => w.readyState === 'Installed');

  const renderWallets = (walletList: Wallet[]) =>
    walletList.map((wallet) => (
      <li key={wallet.adapter.name}>
        <button
          onClick={async () => {
            setIsOpen(false);
            select(wallet.adapter.name);
          }}
          className="flex w-full h-10 items-center gap-2 px-4 border border-gray4 hover:border-green3 hover:text-green3 rounded-sm"
        >
          <WalletIcon src={wallet.adapter.icon} name={wallet.adapter.name} />
          <span>{wallet.adapter.name}</span>
        </button>
      </li>
    ));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="flex w-32 h-8 items-center justify-center bg-green1 hover:bg-green2 text-green2 hover:text-black transition-colors 
            duration-300 rounded-lg text-sm font-extrabold"
        >
          <span>Connect</span>
        </button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Select Wallet</DialogTitle>
        </DialogHeader>
        <div className="w-full p-6">
          {installedWallets.length ? (
            <ul className="flex flex-col gap-2">
              {renderWallets(installedWallets)}
            </ul>
          ) : (
            <p>
              No wallets detected. Please install a supported wallet extension
              (e.g., Phantom, Solflare) to continue.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
