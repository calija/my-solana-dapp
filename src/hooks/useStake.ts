import { useMutation } from "@tanstack/react-query";
import { useStakingProgram } from "./useStakingProgram";
import { PublicKey } from "@solana/web3.js";
import {
  STEP_MINT,
  X_STEP_MINT,
  X_STEP_PROGRAM_ID,
} from "@/constants/programPubkey";
import { BN } from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useAnchorProvider } from "./useAnchorProvider";

export const useStake = () => {
  const program = useStakingProgram();
  const provider = useAnchorProvider();

  return useMutation({
    mutationKey: ["stakeStep"],
    mutationFn: async () => {
      const tokenFrom = await getAssociatedTokenAddress(
        STEP_MINT,
        provider.wallet.publicKey
      );

      const xTokenTo = await getAssociatedTokenAddress(
        X_STEP_MINT,
        provider.wallet.publicKey
      );

      const [vaultPubkey, vaultBump] = await PublicKey.findProgramAddress(
        [STEP_MINT.toBuffer()],
        X_STEP_PROGRAM_ID
      );

      const tx = await program.methods
        .stake(vaultBump, new BN(1_000_000_000))
        .accounts({
          tokenMint: STEP_MINT,
          xTokenMint: X_STEP_MINT,
          tokenFrom,
          tokenFromAuthority: provider.wallet.publicKey,
          tokenVault: vaultPubkey,
          xTokenTo,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();

      tx.feePayer = provider.wallet.publicKey;

      const connection = provider.connection;

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;

      const signedTx = await provider.wallet.signTransaction(tx);

      await connection.sendRawTransaction(signedTx.serialize());
    },
  });
};
