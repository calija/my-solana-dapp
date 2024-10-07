import { BN } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';

import { useStakingProgram } from './useStakingProgram';

import {
  STEP_MINT,
  X_STEP_MINT,
  X_STEP_PROGRAM_ID,
} from '@/constants/programPubkey';

export const useStepPerXStep = () => {
  const program = useStakingProgram();

  return useQuery({
    queryKey: ['emitPrice'],
    queryFn: async () => {
      const [vaultPubkey] = await PublicKey.findProgramAddress(
        [STEP_MINT.toBuffer()],
        X_STEP_PROGRAM_ID
      );
      const res = await program.simulate.emitPrice({
        accounts: {
          tokenMint: STEP_MINT,
          xTokenMint: X_STEP_MINT,
          tokenVault: vaultPubkey,
        },
      });

      const price = res.events[0].data as {
        stepPerXstep: string;
        stepPerXstepE9: BN;
      };

      return price;
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    refetchInterval: 1000 * 60, // Refetch every 1 minute
  });
};
