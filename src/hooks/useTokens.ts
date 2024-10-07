import { useQuery } from '@tanstack/react-query';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

type ParsedToken = {
  info: {
    isNative: boolean;
    mint: string;
    owner: string;
    tokenAmount: {
      amount: string;
      decimals: number;
      uiAmount: number;
    };
  };
};
export const useTokens = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  return useQuery({
    queryKey: [`tokens-${publicKey}`],
    queryFn: async () => {
      if (!publicKey) throw new Error('Public key is required');

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      const parsedTokens = tokenAccounts.value.map(
        (i) => i.account.data.parsed
      ) as ParsedToken[];
      return parsedTokens;
    },
    enabled: !!publicKey && connected,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 1,
    refetchIntervalInBackground: true,
  });
};
