import {
  STEP_MINT,
  X_STEP_MINT,
  X_STEP_PROGRAM_ID,
} from "@/constants/programPubkey";
import { useQuery } from "@tanstack/react-query";
import { useStakingProgram } from "./useStakingProgram";
import { PublicKey } from "@solana/web3.js";

export const useStepPerXStep = () => {
  const program = useStakingProgram();

  return useQuery({
    queryKey: ["emitPrice"],
    queryFn: async () => {
      const [vaultPubkey] = await PublicKey.findProgramAddress(
        [STEP_MINT.toBuffer()],
        X_STEP_PROGRAM_ID
      );
      const result = await program.simulate.emitPrice({
        accounts: {
          tokenMint: STEP_MINT,
          xTokenMint: X_STEP_MINT,
          tokenVault: vaultPubkey,
        },
      });
      return result;
    },
  });
};
