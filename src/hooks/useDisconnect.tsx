import { toast } from 'sonner';
import { Unlink } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import { formatPublicKey } from '@/lib/utils';

export const useDisconnect = () => {
  const { wallet, disconnect } = useWallet();

  const publicKey = wallet?.adapter.publicKey?.toBase58();
  return useMutation({
    mutationKey: ['disconnect', publicKey],
    mutationFn: async () => {
      return await disconnect();
    },
    onSuccess: () => {
      toast(`Disconnected from ${formatPublicKey(publicKey!)}`, {
        icon: <Unlink color="orange" />,
      });
    },
  });
};
