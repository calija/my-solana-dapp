import { ArrowUpDown } from "lucide-react";

import { StackingCard } from "../StackingCard";

export const Connected = () => {
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
          <span className="font-bold">"Where is my staking reward?"</span>
          <span className="text-gray1 leading-6">
            xSTEP is a yield bearing asset. This means it is automatically worth
            more STEP over time. You don't need to claim any rewards, or do
            anything other than hold your xSTEP to benefit from this. Later,
            when you unstake your xSTEP you will receive more STEP than you
            initially deposited.
          </span>
        </div>
        <StackingCard />
        <button className="h-[60px] w-full bg-green1 text-green2 rounded-sm font-extrabold">
          <span>Stake</span>
        </button>
      </div>
    </div>
  );
};
