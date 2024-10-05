"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useTokens } from "@/hooks";
import { STEP_MINT, X_STEP_MINT } from "@/constants/programPubkey";

export const StackingCard = () => {
  const { data } = useTokens();

  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [inputValue, setInputValue] = useState("");

  const stepAmount = useMemo(() => {
    return data?.find((i) => i.info.mint === STEP_MINT.toBase58())?.info
      .tokenAmount.uiAmount;
  }, [data]);

  const xStepAmount = useMemo(() => {
    return data?.find((i) => i.info.mint === X_STEP_MINT.toBase58())?.info
      .tokenAmount.uiAmount;
  }, [data]);

  const stakeMaxBalance = useMemo(() => {
    if (activeTab === "stake") {
      return stepAmount;
    }
    return xStepAmount;
  }, [activeTab, stepAmount, xStepAmount]);

  const receiveMaxBalance = useMemo(() => {
    if (activeTab === "stake") {
      return xStepAmount;
    }
    return stepAmount;
  }, [activeTab, stepAmount, xStepAmount]);

  return (
    <div>
      <div className="flex">
        {/* CARD STAKE BUTTON */}
        <button
          onClick={() => setActiveTab("stake")}
          className={`
            flex 
            items-center 
            justify-center 
            w-[150px] 
            h-[45px]
            gap-4
            rounded-t-lg 
            text-sm 
            font-bold 
            transition-colors 
            duration-300
            hover:text-green2 
            ${
              activeTab === "stake"
                ? "bg-card text-green2"
                : "bg-[rgb(10,10,10)] text-gray2"
            }
          `}
        >
          <ArrowDownToLine size={16} />
          <span>Stake</span>
        </button>
        {/* CARD UN_STAKE BUTTON */}
        <button
          onClick={() => setActiveTab("unstake")}
          className={`
            flex 
            items-center 
            justify-center 
            w-[150px] 
            h-[45px]
            gap-4
            rounded-t-lg 
            text-sm 
            font-bold 
            transition-colors 
            duration-300
            hover:text-green2 
            ${
              activeTab === "unstake"
                ? "bg-card text-green2"
                : "bg-[rgb(10,10,10)] text-gray2"
            }
          `}
        >
          <ArrowUpFromLine size={16} />
          <span>Unstake</span>
        </button>
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
                <span className="font-mono">{stakeMaxBalance || 0}</span>
              </span>
              {stakeMaxBalance && (
                <>
                  <button
                    onClick={() =>
                      setInputValue((+stakeMaxBalance / 2).toString())
                    }
                    className="bg-green1 text-green2 text-[10px] font-extrabold rounded-sm px-1 hover:bg-green2 hover:text-black transition-colors duration-300"
                  >
                    <span>HALF</span>
                  </button>
                  <button
                    onClick={() => setInputValue(stakeMaxBalance.toString())}
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
              {activeTab === "stake" ? "STEP" : "xSTEP"}
            </span>
            <div className="flex flex-col items-end w-full">
              <input
                min="0"
                id="input"
                type="number"
                value={inputValue}
                placeholder="0.00"
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-lg font-bold text-right placeholder-gray2 font-mono"
              />
              {/* <span
                style={{
                  height: "28px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                1.5
              </span> */}
              {/* <span
                style={{
                  fontSize: "12px",
                  lineHeight: "22px",
                  color: "rgba(125,125,125)",
                }}
              >
                $0.05
              </span> */}
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
              <span className="font-mono">{receiveMaxBalance || 0}</span>
            </span>
          </div>
          <div className="flex items-center justify-between w-full h-16 p-4 px-2.5 border border-[rgba(120,120,120,0.15)] rounded-lg ">
            <span className="text-sm font-bold">
              {activeTab === "stake" ? "xSTEP" : "STEP"}
            </span>
            <span className="text-lg font-bold font-mono">0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
