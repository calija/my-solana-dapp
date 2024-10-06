import { toast } from 'sonner';
import { Ellipsis, CircleX } from 'lucide-react';
import { BN } from '@coral-xyz/anchor';
import { PublicKey, VersionedTransaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import { useStakingProgram } from './useStakingProgram';

import {
  STEP_MINT,
  X_STEP_MINT,
  X_STEP_PROGRAM_ID,
} from '@/constants/programPubkey';
import { useTransactionStatus } from './useTransactionStatus';

export const useStake = () => {
  const { sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();
  const program = useStakingProgram();

  const { checkStatus } = useTransactionStatus();

  return useMutation({
    mutationKey: [`stakeStep-${publicKey?.toBase58()}`],
    mutationFn: async (stakeAmount: number) => {
      try {
        const tokenFrom = await getAssociatedTokenAddress(
          STEP_MINT,
          publicKey!
        );

        const xTokenTo = await getAssociatedTokenAddress(
          X_STEP_MINT,
          publicKey!
        );

        const [vaultPubkey, vaultBump] = await PublicKey.findProgramAddress(
          [STEP_MINT.toBuffer()],
          X_STEP_PROGRAM_ID
        );

        const tx = await program.methods
          .stake(vaultBump, new BN(stakeAmount * 1_000_000_000))
          .accounts({
            tokenMint: STEP_MINT,
            xTokenMint: X_STEP_MINT,
            tokenFrom,
            tokenFromAuthority: publicKey!,
            tokenVault: vaultPubkey,
            xTokenTo,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .transaction();

        tx.feePayer = publicKey!;

        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;

        const message = tx.compileMessage();
        const versionedTx = new VersionedTransaction(message);

        const signature = await sendTransaction(versionedTx, connection);
        console.log('signature:', signature);

        checkStatus(signature);
      } catch (error) {
        throw error;
      }
    },
    onMutate: () => {
      toast('Approve transactions from your wallet', {
        icon: <Ellipsis color="blue" />,
      });
    },
    onError: () => {
      toast('Error staking STEP', { icon: <CircleX color="red" /> });
    },
  });
};
