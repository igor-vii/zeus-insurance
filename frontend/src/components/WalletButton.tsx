import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { NetworkBadge } from "./NetworkBadge";

interface WalletButtonProps {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isCorrectChain: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletButton({ account, chainId, isConnected, isCorrectChain, onConnect, onDisconnect }: WalletButtonProps) {
  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <NetworkBadge chainId={chainId} isCorrectChain={isCorrectChain} />
        <div className="flex items-center border border-border rounded-md bg-card overflow-hidden">
          <div className="px-3 py-2 text-sm font-mono text-muted-foreground bg-muted/30">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </div>
          <Button variant="ghost" size="icon" onClick={onDisconnect} className="rounded-none h-auto py-2 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10" data-testid="button-disconnect">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button onClick={onConnect} className="gap-2" data-testid="button-connect">
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  );
}
