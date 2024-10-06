import { ArrowDown, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

import { StakeCardTabButton } from "../StakeCardTabButton";
import { useStepPerXStep } from "@/hooks";

export type StakeAction = "stake" | "unstake";
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
  useStepPerXStep();
  return (
    <div>
      <div className="flex">
        <StakeCardTabButton
          isActive={action === "stake"}
          Icon={<ArrowDownToLine size={16} />}
          onClick={() => onChangeAction("stake")}
        >
          Stake
        </StakeCardTabButton>
        <StakeCardTabButton
          isActive={action === "unstake"}
          Icon={<ArrowUpFromLine size={16} />}
          onClick={() => onChangeAction("unstake")}
        >
          Unstake
        </StakeCardTabButton>
      </div>
      <div className="flex flex-col items-center p-5 gap-3 rounded-b-lg rounded-t-none bg-card">
        {/* Gornja sekcija */}
        <div className="flex flex-col w-full gap-4">
          {/* Linija gde su dugmad HALF i MAX */}
          <div className="flex justify-between text-sm">
            <span>You stake</span>
            <div className="flex items-center text-sm text-gray3 gap-1">
              <span>
                {`Balance: `}
                <span className="font-mono">{maxStakeBalance || 0}</span>
              </span>
              {maxStakeBalance && (
                <>
                  <button
                    onClick={() =>
                      onChangeStakeAmount((+maxStakeBalance / 2).toString())
                    }
                    className="bg-green1 text-green2 text-[10px] font-extrabold rounded-sm px-1 hover:bg-green2 hover:text-black transition-colors duration-300"
                  >
                    <span>HALF</span>
                  </button>
                  <button
                    onClick={() =>
                      onChangeStakeAmount(maxStakeBalance.toString())
                    }
                    className="bg-green1 text-green2 text-[10px] font-extrabold rounded-sm px-1 hover:bg-green2 hover:text-black transition-colors duration-300"
                  >
                    <span>MAX</span>
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Gornji input */}
          <div className="flex items-center h-16 p-3 rounded-lg bg-background">
            <span className="text-sm font-bold">
              {action === "stake" ? "STEP" : "xSTEP"}
            </span>
            <div className="flex flex-col items-end w-full">
              <input
                min="0"
                id="input"
                type="number"
                value={stakeAmount}
                placeholder="0.00"
                onChange={(e) => onChangeStakeAmount(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-lg font-bold text-right placeholder-gray2 font-mono"
              />
            </div>
          </div>
        </div>

        <ArrowDown size={36} color="rgb(255,187,29)" />

        {/* Donji input */}
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
              {action === "stake" ? "xSTEP" : "STEP"}
            </span>
            <span className="text-lg font-bold font-mono">0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
