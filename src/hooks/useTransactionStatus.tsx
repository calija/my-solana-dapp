import { useState } from 'react';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useConnection } from '@solana/wallet-adapter-react';
import { type TransactionSignature } from '@solana/web3.js';

import { useStepPerXStep } from './useStepPerXStep';

import { ConfirmingTxToast, SuccessTxToast } from '@/components';
import { type StakeAction } from '@/components/StakingCard';
import { STEP_DECIMALS } from '@/lib/constants';

import StepLogo from '../../public/svg/stepLogo.svg';
import XStepLogo from '../../public/svg/xStepLogo.svg';

type TransactionDetails = {
  signature: TransactionSignature;
  sendAmount: number;
  action: StakeAction;
};
export const useTransactionStatus = () => {
  const queryClient = useQueryClient();
  const { connection } = useConnection();
  const { data } = useStepPerXStep();

  const [txDetails, setTxDetails] = useState<TransactionDetails>();

  const query = useQuery({
    queryKey: [`transactionStatus-${txDetails}`],
    queryFn: async () => {
      if (!txDetails) {
        return;
      }
      const { signature, action, sendAmount } = txDetails;

      const res = await connection.confirmTransaction(signature, 'confirmed');

      toast.dismiss();
      if (!res.value.err) {
        const toastMessage =
          action === 'stake' ? 'You staked STEP' : 'You unstaked xSTEP';

        const receivedAmount =
          action === 'stake'
            ? +sendAmount / +data!.stepPerXstep
            : sendAmount * +data!.stepPerXstep;
        toast(
          <SuccessTxToast
            message={toastMessage}
            sendSectionTitle={
              action === 'stake' ? 'You staked:' : 'You unstaked:'
            }
            sendTokenIcon={
              action === 'stake' ? (
                <StepLogo width={20} height={20} />
              ) : (
                <XStepLogo width={20} height={20} />
              )
            }
            sendAmount={sendAmount.toString()}
            sendTokenLabel={action === 'unstake' ? 'xSTEP' : 'STEP'}
            receiveSectionTitle="You received:"
            receiveAmount={receivedAmount.toFixed(STEP_DECIMALS).toString()}
            receiveTokenLabel={action === 'stake' ? 'xSTEP' : 'STEP'}
            receiveTokenIcon={
              action === 'unstake' ? (
                <StepLogo width={20} height={20} />
              ) : (
                <XStepLogo width={20} height={20} />
              )
            }
            onClick={() => {
              window.open(
                `https://solscan.io/tx/${signature}`,
                '_blank',
                'noopener,noreferrer'
              );
            }}
          />
        );
      } else {
        toast('Transaction error');
      }
      queryClient.invalidateQueries({
        queryKey: ['tokens'],
      });
      setTxDetails(undefined);
      return res;
    },
    enabled: !!txDetails,
  });

  const checkStatus = (transactionDetails: TransactionDetails) => {
    const toastMessage =
      transactionDetails.action === 'stake'
        ? 'Your are staking STEP'
        : 'You are unstaking xSTEP';
    toast(
      <ConfirmingTxToast
        message={toastMessage}
        onClick={() => {
          window.open(
            `https://solscan.io/tx/${transactionDetails.signature}`,
            '_blank',
            'noopener,noreferrer'
          );
        }}
      />,
      {
        dismissible: false,
        duration: Infinity,
      }
    );
    setTxDetails(transactionDetails);
  };

  return { ...query, checkStatus };
};
