import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export const ConnectButton = () => {
  const { wallets, select } = useWallet();

  const [isOpen, setIsOpen] = useState(false);

  const renderWallets = () =>
    wallets
      .filter((w) => w.readyState === 'Installed')
      ?.map((wallet) => (
        <li key={wallet.adapter.name}>
          <button
            onClick={async () => {
              setIsOpen(false);
              select(wallet.adapter.name);
            }}
            className="flex w-full h-10 items-center gap-2 px-4 border border-gray4 hover:border-green3 hover:text-green3 rounded-sm"
          >
            <img
              src={wallet.adapter.icon}
              alt={`${wallet.adapter.name} icon`}
              className="w-[20px] h-[20px]"
            />
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
        <ul className="flex flex-col w-full gap-2 p-6">{renderWallets()}</ul>
      </DialogContent>
    </Dialog>
  );
};
