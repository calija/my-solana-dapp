import { toast } from 'sonner';
import { ExternalLink, Copy, Unplug } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

import { useDisconnect } from '@/hooks';
import { formatPublicKey } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { WalletIcon } from '../WalletIcon';

export const WalletButton = () => {
  const { wallet } = useWallet();
  const { mutate: disconnect } = useDisconnect();

  const publicKey = wallet?.adapter.publicKey?.toBase58();

  const copyPublicKey = async () => {
    await navigator.clipboard.writeText(publicKey!);
    toast('Address copied to clipboard', {
      description: publicKey,
      icon: <Copy size={20} />,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-8 items-center px-2.5 gap-2.5 rounded-lg bg-card border border-card hover:border-green2 text-sm text-green2">
          <WalletIcon name={wallet?.adapter.name} src={wallet!.adapter.icon} />
          <span>{formatPublicKey(publicKey!)}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <WalletIcon
              src={wallet!.adapter.icon}
              name={wallet?.adapter.name}
            />
            <span>{formatPublicKey(publicKey!)}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://solscan.io/account/${publicKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray1"
            >
              <ExternalLink size={16} />
            </a>
            <button className="text-gray1" onClick={copyPublicKey}>
              <Copy size={16} />
            </button>
            <button className="text-gray1" onClick={() => disconnect()}>
              <Unplug size={16} color="#FF5900" />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
