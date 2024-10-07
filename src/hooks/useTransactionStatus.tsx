import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Ellipsis } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useConnection } from '@solana/wallet-adapter-react';
import { type TransactionSignature } from '@solana/web3.js';
import { useStepPerXStep } from './useStepPerXStep';
import { type StakeAction } from '@/components/StakingCard';

type TransactionDetails = {
  signature: TransactionSignature;
  sendAmount: number;
  action: StakeAction;
};
export const useTransactionStatus = () => {
  const queryClient = useQueryClient();
  const { connection } = useConnection();
  const { data } = useStepPerXStep();

  const [enabled, setEnabled] = useState(false);
  const [txDetails, setTxDetails] = useState<TransactionDetails>();

  const toastIdRef = useRef<string | number | undefined>(undefined);

  const query = useQuery({
    queryKey: [`transactionStatus-${txDetails}`, toastIdRef.current],
    queryFn: async () => {
      if (!txDetails) {
        return;
      }
      const { signature, action, sendAmount } = txDetails;
      const status = await connection.confirmTransaction(
        signature,
        'confirmed'
      );
      if (!status.value.err) {
        const toastMessage =
          action === 'stake' ? 'You staked STEP' : 'You unstaked xSTEP';

        const receivedAmount =
          action === 'stake'
            ? +sendAmount / +data!.stepPerXstep
            : sendAmount * +data!.stepPerXstep;
        toast(toastMessage, {
          description: `Send: ${sendAmount}; Received:${receivedAmount}`,
          dismissible: true,
          id: toastIdRef.current,
          duration: 5000,
        });
      } else {
        toast('Transaction error', {
          description: undefined,
          dismissible: true,
          id: toastIdRef.current,
          duration: 5000,
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['tokens'],
      });
      setEnabled(false);
      setTxDetails(undefined);
      toastIdRef.current = undefined;
      return status;
    },
    enabled: enabled && !!txDetails,
  });

  const checkStatus = (transactionDetails: TransactionDetails) => {
    const toastMessage =
      transactionDetails.action === 'stake'
        ? 'Your are staking STEP'
        : 'You are unstaking xSTEP';
    const toastId = toast(toastMessage, {
      description: 'Confirmation is in progress',
      dismissible: false,
      duration: Infinity,
      action: {
        label: 'View on Solscan',
        onClick: () => {
          window.open(
            `https://solscan.io/tx/${transactionDetails.signature}`,
            '_blank',
            'noopener,noreferrer'
          );
        },
      },
      icon: <Ellipsis color="blue" />,
    });
    toastIdRef.current = toastId;
    setTxDetails(transactionDetails);
    setEnabled(true);
  };

  return { ...query, checkStatus };
};
