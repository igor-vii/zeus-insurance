import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Shield, ShieldAlert, ArrowRight, Activity, Wallet, FileText, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/hooks/useWallet";
import { getZeusContract, formatUSDC } from "@/lib/contract";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { account, provider, isConnected, isCorrectChain, connect } = useWallet();
  const [, setLocation] = useLocation();
  
  const [stats, setStats] = useState<{ reserveBalance: string; totalPolicies: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      if (!provider || !isCorrectChain) return;
      
      try {
        setLoading(true);
        const zeus = getZeusContract(provider);
        const [reserve, nextId] = await Promise.all([
          zeus.reserveBalance(),
          zeus.nextPolicyId()
        ]);
        
        setStats({
          reserveBalance: formatUSDC(reserve),
          totalPolicies: (nextId - 1n).toString() // nextPolicyId starts at 1, so count is nextId - 1
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, [provider, isCorrectChain]);

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-10 px-4">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
          <Shield className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Trustless Insurance for <span className="text-primary">On-Chain Commerce</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Protect yourself against seller non-performance. Premiums paid in USDC, payouts executed automatically on-chain when timeouts expire.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-4">
          {!isConnected ? (
            <Button size="lg" className="h-12 px-8 text-md gap-2" onClick={connect} data-testid="button-hero-connect">
              <Wallet className="w-5 h-5" />
              Connect Wallet to Start
            </Button>
          ) : !isCorrectChain ? (
            <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-3 rounded-lg font-medium border border-destructive/20">
              <ShieldAlert className="w-5 h-5" />
              Please switch to Base Sepolia
            </div>
          ) : (
            <>
              <Button size="lg" className="h-12 px-8 text-md gap-2" onClick={() => setLocation('/buy')} data-testid="link-hero-buy">
                  Buy Insurance <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-md gap-2" onClick={() => setLocation('/policies')} data-testid="link-hero-policies">
                  <FileText className="w-4 h-4" />
                  My Policies
              </Button>
            </>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              Protocol Reserve
            </CardDescription>
            <CardTitle className="text-3xl font-mono">
              {loading || !stats ? <Skeleton className="h-9 w-32 mt-1" /> : `$${stats.reserveBalance}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Total USDC backing active policies</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Total Policies
            </CardDescription>
            <CardTitle className="text-3xl font-mono">
              {loading || !stats ? <Skeleton className="h-9 w-20 mt-1" /> : stats.totalPolicies}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Policies issued to date</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              Connected Account
            </CardDescription>
            <CardTitle className="text-xl font-mono truncate mt-2">
              {isConnected && account ? (
                <span>
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              ) : (
                <span className="text-muted-foreground">Not connected</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Your active wallet</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
