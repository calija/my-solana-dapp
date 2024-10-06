import { useWallet } from "@solana/wallet-adapter-react";
import { Copy, Unplug } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const WalletButton = () => {
  const { wallet, disconnect } = useWallet();

  const publicKey = wallet?.adapter.publicKey?.toBase58();

  const formattedPublicKey = `${publicKey?.slice(0, 4)}...${publicKey?.slice(
    -4
  )}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex h-8 items-center px-2.5 gap-2.5 rounded-lg bg-card border border-card hover:border-green2 text-sm text-green2">
          <img
            src={wallet?.adapter.icon}
            alt={`${wallet?.adapter.name} icon`}
            className="w-[20px] h-[20px]"
          />
          <span>{formattedPublicKey}</span>
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
            <span>{formattedPublicKey}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-gray1" onClick={() => console.log("test")}>
              <Copy size={16} />
            </button>
            <button className="text-gray1" onClick={disconnect}>
              <Unplug size={16} />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
