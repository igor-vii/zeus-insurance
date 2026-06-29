import { useState, useEffect } from "react";
import { ShieldAlert, ArrowDownToLine, ArrowUpFromLine, Loader2, Database } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { getZeusContract, getUsdcContract, formatUSDC, parseUSDC, ZEUS_INSURANCE_ADDRESS } from "@/lib/contract";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const depositSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
});

const withdrawSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0"),
});

export default function Admin() {
  const { account, provider, signer, isConnected, isCorrectChain } = useWallet();
  const { toast } = useToast();
  
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [reserveBalance, setReserveBalance] = useState<string>("0");
  const [loading, setLoading] = useState(false);
  const [actionPending, setActionPending] = useState<"deposit" | "withdraw" | null>(null);

  const depositForm = useForm<z.infer<typeof depositSchema>>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: 0 },
  });

  const withdrawForm = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: 0 },
  });

  const fetchAdminData = async () => {
    if (!provider || !account || !isCorrectChain) return;
    
    try {
      setLoading(true);
      const zeus = getZeusContract(provider);
      const [owner, reserve] = await Promise.all([
        zeus.owner(),
        zeus.reserveBalance()
      ]);
      
      setIsOwner(owner.toLowerCase() === account.toLowerCase());
      setReserveBalance(formatUSDC(reserve));
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && isCorrectChain) {
      fetchAdminData();
    }
  }, [account, provider, isConnected, isCorrectChain]);

  const onDeposit = async (values: z.infer<typeof depositSchema>) => {
    if (!signer || !isOwner) return;
    
    try {
      setActionPending("deposit");
      const zeus = getZeusContract(signer);
      const usdc = getUsdcContract(signer);
      const amountWei = parseUSDC(values.amount.toString());

      toast({
        title: "Approval Required",
        description: "Approving USDC for deposit...",
      });

      const approveTx = await usdc.approve(ZEUS_INSURANCE_ADDRESS, amountWei);
      await approveTx.wait();
      
      toast({
        title: "Depositing",
        description: "Executing deposit transaction...",
      });

      const depositTx = await zeus.depositReserve(amountWei);
      await depositTx.wait();

      toast({
        title: "Deposit Successful",
        description: `Successfully deposited ${values.amount} USDC into reserve.`,
      });
      
      depositForm.reset();
      fetchAdminData();
    } catch (error: any) {
      console.error("Deposit failed:", error);
      toast({
        title: "Deposit Failed",
        description: error?.reason || error?.message || "Unknown error",
        variant: "destructive",
      });
    } finally {
      setActionPending(null);
    }
  };

  const onWithdraw = async (values: z.infer<typeof withdrawSchema>) => {
    if (!signer || !isOwner) return;
    
    try {
      setActionPending("withdraw");
      const zeus = getZeusContract(signer);
      const amountWei = parseUSDC(values.amount.toString());

      toast({
        title: "Withdrawing",
        description: "Executing withdraw transaction...",
      });

      const withdrawTx = await zeus.withdrawReserve(amountWei);
      await withdrawTx.wait();

      toast({
        title: "Withdrawal Successful",
        description: `Successfully withdrew ${values.amount} USDC from reserve.`,
      });
      
      withdrawForm.reset();
      fetchAdminData();
    } catch (error: any) {
      console.error("Withdraw failed:", error);
      toast({
        title: "Withdrawal Failed",
        description: error?.reason || error?.message || "Unknown error",
        variant: "destructive",
      });
    } finally {
      setActionPending(null);
    }
  };

  if (!isConnected || !isCorrectChain) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            You must connect your wallet to view this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Protocol Reserve
            </Badge>
          </div>
          <p className="text-muted-foreground">Manage the USDC reserves backing the insurance policies.</p>
        </div>
      </div>

      {!loading && isOwner === false && (
        <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
          <ShieldAlert className="h-4 w-4 text-destructive" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You are not the contract owner. You can view the reserve balance, but cannot deposit or withdraw.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-3 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" />
              Current Reserve Balance
            </CardDescription>
            <CardTitle className="text-4xl font-mono text-primary">
              {loading ? <Skeleton className="h-10 w-48 mt-1" /> : `$${reserveBalance} USDC`}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className={`bg-card/50 ${isOwner ? 'border-primary/20' : 'opacity-70 pointer-events-none'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownToLine className="w-5 h-5 text-green-500" />
              Deposit Reserve
            </CardTitle>
            <CardDescription>Add USDC to the protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...depositForm}>
              <form onSubmit={depositForm.handleSubmit(onDeposit)} className="space-y-4">
                <FormField
                  control={depositForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (USDC)</FormLabel>
                      <FormControl>
                        <Input type="number" step="any" placeholder="1000" {...field} data-testid="input-deposit" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white" 
                  disabled={actionPending !== null || !isOwner}
                  data-testid="button-submit-deposit"
                >
                  {actionPending === "deposit" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Deposit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className={`bg-card/50 ${isOwner ? 'border-primary/20' : 'opacity-70 pointer-events-none'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpFromLine className="w-5 h-5 text-destructive" />
              Withdraw Reserve
            </CardTitle>
            <CardDescription>Remove USDC from protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...withdrawForm}>
              <form onSubmit={withdrawForm.handleSubmit(onWithdraw)} className="space-y-4">
                <FormField
                  control={withdrawForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount (USDC)</FormLabel>
                      <FormControl>
                        <Input type="number" step="any" placeholder="1000" {...field} data-testid="input-withdraw" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  variant="destructive"
                  className="w-full" 
                  disabled={actionPending !== null || !isOwner}
                  data-testid="button-submit-withdraw"
                >
                  {actionPending === "withdraw" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Withdraw
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
