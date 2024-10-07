import { useMemo, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

import { useStake, useTokens, useUnstake } from '@/hooks';
import { STEP_MINT, X_STEP_MINT } from '@/lib/constants';

import { type StakeAction, StakingCard } from '../StakingCard';

export const Dashboard = () => {
  const { data: tokens } = useTokens();
  const { mutate: stake, isPending: isStakePending } = useStake();
  const { mutate: unstake, isPending: isUnstakePending } = useUnstake();

  const [action, setAction] = useState<StakeAction>('stake');
  const [inputValue, setInputValue] = useState('');

  const stepAmount = useMemo(() => {
    return tokens?.find((i) => i.info.mint === STEP_MINT.toBase58())?.info
      .tokenAmount.uiAmount;
  }, [tokens]);

  const xStepAmount = useMemo(() => {
    return tokens?.find((i) => i.info.mint === X_STEP_MINT.toBase58())?.info
      .tokenAmount.uiAmount;
  }, [tokens]);

  const maxStakeBalance = useMemo(() => {
    if (action === 'stake') {
      return stepAmount;
    }
    return xStepAmount;
  }, [action, stepAmount, xStepAmount]);

  const maxReceiveBalance = useMemo(() => {
    if (action === 'stake') {
      return xStepAmount;
    }
    return stepAmount;
  }, [action, stepAmount, xStepAmount]);

  const buttonLabel = useMemo(() => {
    if (isStakePending || isUnstakePending) {
      return 'Approve transactions from your wallet';
    }
    if (+inputValue === 0) {
      return 'Enter an amount';
    }
    if (maxStakeBalance && +inputValue > +maxStakeBalance) {
      if (action === 'stake') {
        return 'Insufficient STEP balance';
      }
      return 'Insufficient xSTEP balance';
    }
    if (action === 'stake') {
      return 'Stake';
    }
    return 'Unstake';
  }, [inputValue, maxStakeBalance, action, isStakePending, isUnstakePending]);

  return (
    <div className="flex flex-col items-center max-w-[450px] gap-7">
      <div className="flex items-center gap-5 text-3xl font-bold">
        <ArrowUpDown />
        <span>Stake STEP</span>
      </div>
      <div className="flex text-sm text-gray1">
        <span>Stake STEP to receive xSTEP</span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-start w-full p-7 gap-2.5 rounded-lg bg-card text-sm">
          <span className="font-bold">{`"Where is my staking reward?"`}</span>
          <span className="text-gray1 leading-6">
            {`xSTEP is a yield bearing asset. This means it is automatically worth
            more STEP over time. You don't need to claim any rewards, or do
            anything other than hold your xSTEP to benefit from this. Later,
            when you unstake your xSTEP you will receive more STEP than you
            initially deposited.`}
          </span>
        </div>
        <StakingCard
          action={action}
          onChangeAction={setAction}
          stakeAmount={inputValue}
          onChangeStakeAmount={setInputValue}
          maxStakeBalance={maxStakeBalance}
          maxReceiveBalance={maxReceiveBalance}
        />
        <button
          disabled={
            isStakePending ||
            isUnstakePending ||
            +inputValue === 0 ||
            !maxStakeBalance ||
            +inputValue > +maxStakeBalance
          }
          onClick={() => {
            if (action === 'stake') {
              stake(+inputValue);
              return;
            }

            unstake(+inputValue);
          }}
          className="h-[60px] w-full bg-green1 text-green2 hover:bg-green2 hover:text-black disabled:bg-gray5 disabled:text-gray1 rounded-sm font-extrabold transition-colors 
            duration-300"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};
