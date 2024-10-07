import { useWallet } from '@solana/wallet-adapter-react';

import DisconnectedLogo from '../../../public/svg/disconnectedLogo.svg';

export const NotConnected = () => {
  const { connecting } = useWallet();
  return (
    <div className="flex flex-col items-center w-full gap-xlg text-xl">
      <DisconnectedLogo />

      <span>
        {connecting
          ? 'Connecting your wallet...'
          : 'Connect your wallet to begin'}
      </span>
    </div>
  );
};
