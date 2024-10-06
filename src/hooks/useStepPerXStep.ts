import {
  STEP_MINT,
  X_STEP_MINT,
  X_STEP_PROGRAM_ID,
} from "@/constants/programPubkey";
import { useQuery } from "@tanstack/react-query";
import { useStakingProgram } from "./useStakingProgram";
import { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

export const useStepPerXStep = () => {
  const { connection } = useConnection();
  const program = useStakingProgram();

  return useQuery({
    queryKey: ["emitPrice"],
    queryFn: async () => {
      const [vaultPubkey] = await PublicKey.findProgramAddress(
        [STEP_MINT.toBuffer()],
        X_STEP_PROGRAM_ID
      );
      const tx = await program.methods
        .emitPrice()
        .accounts({
          tokenMint: STEP_MINT,
          xTokenMint: X_STEP_MINT,
          tokenVault: vaultPubkey,
        })
        .transaction();
      tx.feePayer = program.provider.publicKey;
      const res = await connection.simulateTransaction(tx);
      const price = res.events[0].data;
    },
    // staleTime: 1000 * 60 * 5,
    // refetchInterval: 1000 * 60,
  });
};
