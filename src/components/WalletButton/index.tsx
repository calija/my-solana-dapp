import { Copy, Unplug } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

import { useDisconnect } from "@/hooks";
import { formatPublicKey } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { WalletIcon } from "../WalletIcon";

export const WalletButton = () => {
  const { wallet } = useWallet();
  const { mutate } = useDisconnect();

  const publicKey = wallet?.adapter.publicKey?.toBase58();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-8 items-center px-2.5 gap-2.5 rounded-lg bg-card border border-card hover:border-green2 text-sm text-green2">
          <WalletIcon name={wallet?.adapter.name} src={wallet?.adapter.icon} />
          <span>{formatPublicKey(publicKey!)}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={wallet?.adapter.icon}
              alt={`${wallet?.adapter.name} icon`}
              className="w-[20px] h-[20px]"
            />
            <span>{formatPublicKey(publicKey!)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray1" onClick={() => console.log("test")}>
              <Copy size={16} />
            </button>
            <button className="text-gray1" onClick={() => mutate()}>
              <Unplug size={16} />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
