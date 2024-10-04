import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";

export const useAnchorProvider = () => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = new AnchorProvider(
    connection,
    wallet as AnchorWallet,
    AnchorProvider.defaultOptions()
  );

  return provider;
};
