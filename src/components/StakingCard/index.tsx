import { useEffect, useState } from 'react';
import { ArrowDown, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

import { useStepPerXStep } from '@/hooks';

import { StakeCardTabButton } from '../StakeCardTabButton';
import { StakingAmountButton } from '../StakingAmountButton';
import { StakingInput } from '../StakingInput';

export type StakeAction = 'stake' | 'unstake';
type Props = {
  stakeAmount: string;
  onChangeStakeAmount: (amount: string) => void;
  maxStakeBalance?: number;
  maxReceiveBalance?: number;
  action: StakeAction;
  onChangeAction: (action: StakeAction) => void;
};
export const StakingCard = ({
  action,
  onChangeAction,
  stakeAmount,
  onChangeStakeAmount,
  maxStakeBalance,
  maxReceiveBalance,
}: Props) => {
  const { data } = useStepPerXStep();

  const [receiveAmount, setReceiveAmount] = useState('');

  useEffect(() => {
    if (!data || !stakeAmount) {
      setReceiveAmount('');
      return;
    }
    if (action === 'stake') {
      setReceiveAmount((+stakeAmount / +data.stepPerXstep).toString());
      return;
    }
    setReceiveAmount((+stakeAmount * +data.stepPerXstep).toString());
  }, [stakeAmount, data]);

  return (
    <div>
      <div className="flex">
        <StakeCardTabButton
          isActive={action === 'stake'}
          Icon={<ArrowDownToLine size={16} />}
          onClick={() => onChangeAction('stake')}
        >
          Stake
        </StakeCardTabButton>
        <StakeCardTabButton
          isActive={action === 'unstake'}
          Icon={<ArrowUpFromLine size={16} />}
          onClick={() => onChangeAction('unstake')}
        >
          Unstake
        </StakeCardTabButton>
      </div>
      <div className="flex flex-col items-center p-5 gap-3 rounded-b-lg rounded-t-none bg-card">
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between text-sm">
            <span>You stake</span>
            <div className="flex items-center text-sm text-gray3 gap-1">
              <span>
                {`Balance: `}
                <span className="font-mono">{maxStakeBalance || 0}</span>
              </span>
              {maxStakeBalance && (
                <>
                  <StakingAmountButton
                    onClick={() =>
                      onChangeStakeAmount((+maxStakeBalance / 2).toString())
                    }
                  >
                    HALF
                  </StakingAmountButton>
                  <StakingAmountButton
                    onClick={() =>
                      onChangeStakeAmount(maxStakeBalance.toString())
                    }
                  >
                    MAX
                  </StakingAmountButton>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center h-16 p-3 rounded-lg bg-background">
            <span className="text-sm font-bold">
              {action === 'stake' ? 'STEP' : 'xSTEP'}
            </span>
            <div className="flex flex-col items-end w-full">
              <StakingInput
                placeholder="0.00"
                value={stakeAmount}
                onChange={onChangeStakeAmount}
              />
            </div>
          </div>
        </div>

        <ArrowDown size={36} color="rgb(255,187,29)" />

        <div className="flex flex-col w-full gap-1">
          <div className="flex justify-between">
            <span className="text-sm">You receive</span>
            <span className="text-sm text-gray3">
              {`Balance: `}
              <span className="font-mono">{maxReceiveBalance || 0}</span>
            </span>
          </div>
          <div className="flex items-center justify-between w-full h-16 p-4 px-2.5 border border-[rgba(120,120,120,0.15)] rounded-lg ">
            <span className="text-sm font-bold">
              {action === 'stake' ? 'xSTEP' : 'STEP'}
            </span>

            <StakingInput disabled placeholder="0.00" value={receiveAmount} />
          </div>
        </div>
      </div>
    </div>
  );
};
