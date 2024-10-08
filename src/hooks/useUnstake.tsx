import { toast } from 'sonner';
import { Ellipsis, CircleX } from 'lucide-react';
import { BN } from '@coral-xyz/anchor';
import { PublicKey, VersionedTransaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';

import { useStakingProgram } from './useStakingProgram';
import { useTransactionStatus } from './useTransactionStatus';

import {
  STEP_MINT,
  X_STEP_DECIMALS,
  X_STEP_MINT,
  X_STEP_PROGRAM_ID,
} from '@/lib/constants';

export const useUnstake = () => {
  const { sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();
  const program = useStakingProgram();
  const { checkStatus } = useTransactionStatus();

  return useMutation({
    mutationKey: [`unstake-${publicKey}`],
    mutationFn: async (sendAmount: number) => {
      const tokenTo = await getAssociatedTokenAddress(STEP_MINT, publicKey!);

      const xTokenFrom = await getAssociatedTokenAddress(
        X_STEP_MINT,
        publicKey!
      );

      const [vaultPubkey, vaultBump] = await PublicKey.findProgramAddress(
        [STEP_MINT.toBuffer()],
        X_STEP_PROGRAM_ID
      );

      const tx = await program.methods
        .unstake(vaultBump, new BN(sendAmount * 10 ** X_STEP_DECIMALS))
        .accounts({
          tokenMint: STEP_MINT,
          xTokenMint: X_STEP_MINT,
          xTokenFrom,
          xTokenFromAuthority: publicKey!,
          tokenVault: vaultPubkey,
          tokenTo,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .transaction();

      tx.feePayer = publicKey!;

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;

      const message = tx.compileMessage();
      const versionedTx = new VersionedTransaction(message);

      const signature = await sendTransaction(versionedTx, connection);
      checkStatus({ signature, sendAmount, action: 'unstake' });
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
