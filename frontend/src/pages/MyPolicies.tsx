import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Clock, CheckCircle2, AlertTriangle, FileText, Loader2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { getZeusContract, formatUSDC, Policy } from "@/lib/contract";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PolicyWithId extends Policy {
  id: bigint;
}

export default function MyPolicies() {
  const { account, provider, signer, isConnected, isCorrectChain } = useWallet();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [policies, setPolicies] = useState<PolicyWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [claimingIds, setClaimingIds] = useState<Set<bigint>>(new Set());
  const [now, setNow] = useState(BigInt(Math.floor(Date.now() / 1000)));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(BigInt(Math.floor(Date.now() / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchPolicies = async () => {
    if (!provider || !account || !isCorrectChain) return;
    
    try {
      setLoading(true);
      const zeus = getZeusContract(provider);
      const nextId = await zeus.nextPolicyId();
      
      const fetchedPolicies: PolicyWithId[] = [];
      
      // Iterate backwards to show newest first
      for (let i = Number(nextId) - 1; i >= 1; i--) {
        const policy = await zeus.getPolicy(i);
        if (policy.buyer.toLowerCase() === account.toLowerCase()) {
          fetchedPolicies.push({
            id: BigInt(i),
            buyer: policy.buyer,
            seller: policy.seller,
            amount: policy.amount,
            premium: policy.premium,
            retryDeadline: policy.retryDeadline,
            maxRetries: policy.maxRetries,
            isActive: policy.isActive,
            isPaidOut: policy.isPaidOut,
            isExpired: policy.isExpired,
          });
        }
      }
      
      setPolicies(fetchedPolicies);
    } catch (error) {
      console.error("Failed to fetch policies:", error);
      toast({
        title: "Error fetching policies",
        description: "Could not load your policies from the blockchain.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && isCorrectChain) {
      fetchPolicies();
    } else {
      setPolicies([]);
    }
  }, [account, provider, isConnected, isCorrectChain]);

  const handleClaim = async (policyId: bigint) => {
    if (!signer) return;
    
    try {
      setClaimingIds(prev => new Set(prev).add(policyId));
      
      const zeus = getZeusContract(signer);
      const tx = await zeus.claimPayout(policyId);
      
      toast({
        title: "Claiming Payout",
        description: "Transaction submitted. Waiting for confirmation...",
      });
      
      const receipt = await tx.wait();
      
      toast({
        title: "Payout Successful!",
        description: `Tx: ${receipt.hash.slice(0, 10)}...`,
      });
      
      // Refresh policies to show updated status
      fetchPolicies();
    } catch (error: any) {
      console.error("Claim failed:", error);
      toast({
        title: "Claim Failed",
        description: error?.reason || error?.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setClaimingIds(prev => {
        const next = new Set(prev);
        next.delete(policyId);
        return next;
      });
    }
  };

  if (!isConnected || !isCorrectChain) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-8">My Policies</h1>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            You must connect your wallet to Base Sepolia to view your policies.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Policies</h1>
          <p className="text-muted-foreground mt-2">Manage your active protections and claim payouts.</p>
        </div>
        <Button data-testid="button-buy-new" onClick={() => setLocation('/buy')}>
          Buy New Policy
        </Button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="bg-card/30">
              <CardHeader>
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : policies.length === 0 ? (
        <div className="text-center py-20 bg-card/30 rounded-xl border border-dashed border-border">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No policies found</h3>
          <p className="text-muted-foreground mb-6">You don't have any insurance policies yet.</p>
          <Button data-testid="button-empty-buy" onClick={() => setLocation('/buy')}>Get Protected <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {policies.map(policy => {
            const isClaimable = policy.isActive && now >= policy.retryDeadline;
            const timeRemaining = policy.retryDeadline > now ? policy.retryDeadline - now : 0n;
            const hoursRemaining = Math.floor(Number(timeRemaining) / 3600);
            const minutesRemaining = Math.floor((Number(timeRemaining) % 3600) / 60);
            
            return (
              <Card key={policy.id.toString()} className="flex flex-col bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div>
                    <CardTitle className="text-xl mb-1">Policy #{policy.id.toString()}</CardTitle>
                    <CardDescription className="font-mono text-xs">
                      Seller: {policy.seller.slice(0, 8)}...{policy.seller.slice(-6)}
                    </CardDescription>
                  </div>
                  <div>
                    {policy.isPaidOut ? (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">Paid Out</Badge>
                    ) : policy.isExpired ? (
                      <Badge variant="outline" className="text-muted-foreground">Expired</Badge>
                    ) : policy.isActive ? (
                      <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Insured Amount</p>
                      <p className="font-mono font-medium text-lg">${formatUSDC(policy.amount)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Premium Paid</p>
                      <p className="font-mono font-medium text-lg">${formatUSDC(policy.premium)}</p>
                    </div>
                  </div>
                  
                  {policy.isActive && (
                    <div className="mt-6 p-3 bg-muted/30 rounded-lg border border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm">Claim available in:</span>
                      </div>
                      <span className="font-mono text-sm font-medium">
                        {isClaimable ? "Now" : `${hoursRemaining}h ${minutesRemaining}m`}
                      </span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-2 border-t border-border/50 mt-auto">
                  {policy.isActive && isClaimable && (
                    <Button 
                      className="w-full" 
                      onClick={() => handleClaim(policy.id)}
                      disabled={claimingIds.has(policy.id)}
                      data-testid={`button-claim-${policy.id}`}
                    >
                      {claimingIds.has(policy.id) ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Claiming...</>
                      ) : (
                        <><CheckCircle2 className="mr-2 h-4 w-4" /> Claim Payout</>
                      )}
                    </Button>
                  )}
                  {policy.isActive && !isClaimable && (
                    <Button className="w-full" variant="outline" disabled>
                      Timeout not reached
                    </Button>
                  )}
                  {(policy.isPaidOut || policy.isExpired || !policy.isActive) && (
                    <Button className="w-full" variant="ghost" disabled>
                      Policy Concluded
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
