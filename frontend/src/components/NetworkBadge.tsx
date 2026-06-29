import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface NetworkBadgeProps {
  chainId: number | null;
  isCorrectChain: boolean;
}

export function NetworkBadge({ chainId, isCorrectChain }: NetworkBadgeProps) {
  if (!chainId) return null;

  if (isCorrectChain) {
    return (
      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20" data-testid="badge-network-correct">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Base Sepolia
      </Badge>
    );
  }

  return (
    <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30" data-testid="badge-network-wrong">
      <AlertCircle className="w-3 h-3 mr-1" />
      Wrong Network
    </Badge>
  );
}
