'use client';
import { useWallet } from '@solana/wallet-adapter-react';

export const NotConnected = () => {
  const { connecting } = useWallet();
  return (
    <div className="flex flex-col items-center w-full gap-xlg text-xl">
      {/* TODO: use as React component */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="120" width="40" height="40" rx="2" fill="#D94C00" />
        <rect x="60" y="80" width="40" height="80" rx="2" fill="#FFBB1D" />
        <rect x="120" width="40" height="160" rx="2" fill="#118AB2" />
      </svg>

      <span>
        {connecting
          ? 'Connection your wallet...'
          : 'Connect your wallet to begin'}
      </span>
    </div>
  );
};
