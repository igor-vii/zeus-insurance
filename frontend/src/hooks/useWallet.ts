import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { BASE_SEPOLIA_CHAIN_ID } from "@/lib/contract";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAccountsChanged = useCallback(async (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
      setSigner(null);
    } else {
      setAccount(accounts[0]);
      if (window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(browserProvider);
        const newSigner = await browserProvider.getSigner();
        setSigner(newSigner);
      }
    }
  }, []);

  const handleChainChanged = useCallback((chainIdHex: string) => {
    setChainId(parseInt(chainIdHex, 16));
  }, []);

  const connect = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask or another Web3 wallet.",
        variant: "destructive"
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      handleAccountsChanged(accounts);
      const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
      handleChainChanged(chainIdHex);
    } catch (err) {
      console.error("Failed to connect wallet", err);
    }
  };

  const disconnect = () => {
    // Cannot disconnect MetaMask from app side, but we can clear local state
    setAccount(null);
    setSigner(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      // Check if already connected
      window.ethereum.request({ method: "eth_accounts" }).then(handleAccountsChanged);
      window.ethereum.request({ method: "eth_chainId" }).then(handleChainChanged);

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);

  return {
    account,
    provider,
    signer,
    chainId,
    connect,
    disconnect,
    isConnected: !!account,
    isCorrectChain: chainId === BASE_SEPOLIA_CHAIN_ID
  };
}
