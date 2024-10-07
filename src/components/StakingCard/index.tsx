import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

import { useStepPerXStep, useStepPrice } from '@/hooks';

import { StakeCardTabButton } from '../StakingCardTabButton';
import { StakingAmountButton } from '../StakingAmountButton';
import { StakingInput } from '../StakingInput';

import StepLogo from '../../../public/svg/stepLogo.svg';
import XStepLogo from '../../../public/svg/xStepLogo.svg';

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
  const { data: stepUSDPrice } = useStepPrice();

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
  }, [stakeAmount, data, action]);

  const coinPrice = useMemo(() => {
    if (!stepUSDPrice || !stakeAmount) {
      return undefined;
    }
    let price;
    if (action === 'stake') {
      price = +stakeAmount * stepUSDPrice;
    }
    if (action === 'unstake' && data) {
      price = +stakeAmount * +data.stepPerXstep * stepUSDPrice;
    }

    return price?.toFixed(2);
  }, [stepUSDPrice, stakeAmount, action, data]);

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
      <div className="flex flex-col items-center p-5 gap-3 rounded-br-lg rounded-bl-lg rounded-tr-lg bg-card">
        <div className="flex flex-col w-full gap-4">
          <div className="flex justify-between text-sm">
            <span>{action === 'stake' ? 'You stake' : 'You unstake'}</span>
            <div className="flex items-center text-sm text-gray3 gap-1">
              <span>
                {`Balance: `}
                <span className="font-mono">{maxStakeBalance || 0}</span>
              </span>
              {maxStakeBalance ? (
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
              ) : null}
            </div>
          </div>

          <div className="flex items-center h-16 p-3 rounded-lg bg-background gap-2.5">
            {action === 'stake' ? (
              <StepLogo width={28} height={28} />
            ) : (
              <XStepLogo width={28} height={28} />
            )}
            <span className="text-sm font-bold">
              {action === 'stake' ? 'STEP' : 'xSTEP'}
            </span>
            <div className="flex flex-col items-end w-full">
              <StakingInput
                placeholder="0.00"
                value={stakeAmount}
                onChange={onChangeStakeAmount}
              />
              {coinPrice && (
                <span className="text-xs text-gray3 font-mono">{`$${coinPrice}`}</span>
              )}
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
          <div className="flex items-center justify-between gap-2.5 h-16 p-4 px-2.5 border border-[rgba(120,120,120,0.15)] rounded-lg ">
            {action === 'unstake' ? (
              <StepLogo width={28} height={28} />
            ) : (
              <XStepLogo width={28} height={28} />
            )}
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
