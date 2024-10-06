import { useRef, useState } from "react";
import { toast } from "sonner";
import { Ellipsis } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { type TransactionSignature } from "@solana/web3.js";

export const useTransactionStatus = () => {
  const queryClient = useQueryClient();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [enabled, setEnabled] = useState(false);
  const [signature, setSignature] = useState<TransactionSignature>();

  const toastIdRef = useRef<string | number | undefined>(undefined);

  const query = useQuery({
    queryKey: [`transactionStatus-${signature}`],
    queryFn: async () => {
      if (!signature) {
        return;
      }
      console.log("Provera status");
      const status = await connection.getSignatureStatus(signature);
      const parsedTransaction = await connection.getParsedTransaction(
        signature
      );
      console.log("parsedTransaction: ", parsedTransaction);
      console.log("Status: ", status);
      if (status.value?.confirmationStatus === "finalized") {
        toast("You staked STEP", {
          id: toastIdRef.current,
          duration: 5000,
        });
        console.log("GOTOVO");

        queryClient.invalidateQueries({
          queryKey: [`tokens-${publicKey?.toBase58()}`],
        });
        setEnabled(false);
        setSignature(undefined);
        toastIdRef.current = undefined;
      }
      return status;
    },
    enabled: enabled && !!signature,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });

  const checkStatus = (transactionSignature: TransactionSignature) => {
    const toastId = toast("Your are staking STEP", {
      description: "Confirmation is in progress",
      dismissible: false,
      duration: Infinity,
      icon: <Ellipsis color="blue" />,
    });
    toastIdRef.current = toastId;
    setSignature(transactionSignature);
    setEnabled(true);
  };

  return { ...query, checkStatus };
};
