"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import StakeButton from "@/components/stake";

type Token = {
  info: {
    isNative: boolean;
    mint: string;
    tokenAmount: {
      amount: string;
      decimals: number;
      uiAmount: number;
      uiAmountString: string;
    };
  };
};

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const { connection } = useConnection();
  const [tokens, setTokens] = useState<Token[]>([]);

  // Funkcija za dobijanje balansa [SOL]
  const getBalance = useCallback(async () => {
    if (publicKey && connected) {
      try {
        const balanceLamports = await connection.getBalance(publicKey);

        const balanceSOL = balanceLamports / 1e9;
        setBalance(balanceSOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  }, [publicKey, connected, connection]);

  const getTokens = useCallback(async () => {
    if (publicKey && connected) {
      try {
        // Dohvatanje svih token računa za dati wallet (publicKey)
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          {
            programId: TOKEN_PROGRAM_ID,
          }
        );

        const t = tokenAccounts.value.map(
          (i) => i.account.data.parsed
        ) as Token[];
        setTokens(t);
        return;
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    }
  }, [publicKey, connected, connection]);

  useEffect(() => {
    if (connected) {
      console.log("Uspesno smo konektovani");
      getTokens();
      getBalance();
    }
  }, [connected, getTokens, getBalance]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <WalletMultiButton />

        {/* Prikazivanje stanja wallet-a i balansa */}
        {connected ? (
          <div className="mt-4 text-center">
            <p>Connected Wallet: {publicKey?.toBase58()}</p>
            {balance !== null ? (
              <>
                <StakeButton />
                <p>Balance: {balance} SOL</p>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-bold">SPL Tokens:</h2>
                  {tokens.length > 0 ? (
                    <ul>
                      {tokens.map((token, index) => (
                        <li key={index}>
                          <strong>Mint:</strong> {token.info.mint} -{" "}
                          <strong>Balance:</strong>{" "}
                          {token.info.tokenAmount.uiAmount}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No SPL tokens found.</p>
                  )}
                </div>
              </>
            ) : (
              <p>Fetching balance...</p>
            )}
          </div>
        ) : (
          <p>Connect your wallet to see the balance.</p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
