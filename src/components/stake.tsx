import { useState } from "react";

import { useStake } from "@/hooks";

const StakeButton = () => {
  const { mutate } = useStake();

  const [loading] = useState(false);

  const milosStake = () => {
    try {
      mutate();
    } catch (error) {
      console.error("milosStake[ERROR]: ", error);
    }
  };

  return (
    <>
      <button style={{ border: "1px solid green" }} onClick={() => {}}>
        simulacija
      </button>
      <button
        style={{ border: "1px solid red" }}
        onClick={milosStake}
        disabled={loading}
      >
        {loading ? "Staking..." : "Stake 1 STEP"}
      </button>
    </>
  );
};

export default StakeButton;
