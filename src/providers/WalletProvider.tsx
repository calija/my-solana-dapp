'use client';
import { ReactNode } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const RPC_URL = process.env.NEXT_RPC_URL!;

type Props = {
  children: ReactNode;
};
export const WalletContextProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={RPC_URL}>
        <WalletProvider wallets={[]} autoConnect>
          {children}
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
};
