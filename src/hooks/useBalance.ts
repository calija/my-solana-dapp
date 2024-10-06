import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export const useBalance = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  return useQuery({
    queryKey: [`balance-${publicKey?.toBase58()}`],
    queryFn: async () => {
      if (!publicKey) throw new Error("Public key is required");
      const balanceLamports = await connection.getBalance(publicKey);
      return balanceLamports / 1e9; // Pretvaranje u SOL
    },
    enabled: !!publicKey && connected,
    staleTime: 60000, // Keširanje podataka na 1 minut
  });
};
