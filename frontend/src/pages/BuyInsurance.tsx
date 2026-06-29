import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, ShieldCheck, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { getZeusContract, getUsdcContract, parseUSDC, calcPremium, formatUSDC, ZEUS_INSURANCE_ADDRESS } from "@/lib/contract";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  sellerAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  timeoutSeconds: z.coerce.number().positive("Timeout must be greater than 0"),
  maxRetries: z.coerce.number().min(1).max(10),
});

export default function BuyInsurance() {
  const { account, signer, isConnected, isCorrectChain } = useWallet();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isPending, setIsPending] = useState(false);
  const [livePremium, setLivePremium] = useState<string>("0");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellerAddress: "",
      amount: 0,
      timeoutSeconds: 86400, // Default 1 day
      maxRetries: 1,
    },
  });

  const amount = form.watch("amount");
  const maxRetries = form.watch("maxRetries");

  useEffect(() => {
    if (amount > 0 && maxRetries >= 1) {
      try {
        const amountWei = parseUSDC(amount.toString());
        const premiumWei = calcPremium(amountWei, maxRetries);
        setLivePremium(formatUSDC(premiumWei));
      } catch (e) {
        setLivePremium("0");
      }
    } else {
      setLivePremium("0");
    }
  }, [amount, maxRetries]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isConnected || !isCorrectChain || !signer) {
      toast({
        title: "Connection Error",
        description: "Please connect your wallet to Base Sepolia.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPending(true);
      const zeus = getZeusContract(signer);
      const usdc = getUsdcContract(signer);

      const amountWei = parseUSDC(values.amount.toString());
      const premiumWei = calcPremium(amountWei, values.maxRetries);

      // 1. Approve USDC
      toast({
        title: "Approval Required",
        description: "Please approve USDC spending in your wallet...",
      });
      
      const approveTx = await usdc.approve(ZEUS_INSURANCE_ADDRESS, premiumWei);
      await approveTx.wait();
      
      toast({
        title: "Approval Successful",
        description: "USDC approved. Now confirming policy creation...",
      });

      // 2. Buy Insurance
      const buyTx = await zeus.buyInsurance(
        values.sellerAddress,
        amountWei,
        values.timeoutSeconds,
        values.maxRetries
      );
      
      const receipt = await buyTx.wait();
      
      toast({
        title: "Policy Created!",
        description: `Transaction successful: ${receipt.hash.slice(0, 10)}...`,
      });

      setLocation("/policies");
    } catch (error: any) {
      console.error("Buy insurance failed:", error);
      toast({
        title: "Transaction Failed",
        description: error?.reason || error?.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  const premiumPercent = maxRetries >= 1 ? (700 + (maxRetries - 1) * 200) / 100 : 0;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Buy Insurance</h1>
        <p className="text-muted-foreground mt-2">Protect your transactions against counterparty failure.</p>
      </div>

      {!isConnected || !isCorrectChain ? (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Wallet not connected</AlertTitle>
          <AlertDescription>
            You must connect your wallet to Base Sepolia to purchase a policy.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle>Policy Details</CardTitle>
              <CardDescription>Configure your protection parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="sellerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seller Address</FormLabel>
                        <FormControl>
                          <Input placeholder="0x..." className="font-mono" {...field} data-testid="input-seller-address" />
                        </FormControl>
                        <FormDescription>The Ethereum address of the counterparty you are transacting with.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insured Amount (USDC)</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" placeholder="1000" {...field} data-testid="input-amount" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="timeoutSeconds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeout per retry (seconds)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="86400" {...field} data-testid="input-timeout" />
                          </FormControl>
                          <FormDescription>Time before a retry/claim.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxRetries"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Retries</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="10" {...field} data-testid="input-retries" />
                          </FormControl>
                          <FormDescription>1 to 10 retries.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={!isConnected || !isCorrectChain || isPending}
                    data-testid="button-submit-policy"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Transaction...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Purchase Protection
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Premium Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Insured Amount</span>
                <span className="font-mono font-medium">${amount > 0 ? amount : "0"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Premium Rate</span>
                <span className="font-mono font-medium">{premiumPercent}%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold">Total Premium</span>
                <span className="font-mono text-xl font-bold text-primary">${livePremium} USDC</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground text-center w-full">
                Premium will be paid from your wallet in USDC.
              </p>
            </CardFooter>
          </Card>
          
          <div className="bg-muted/50 p-4 rounded-lg border border-border text-sm text-muted-foreground">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              How it works
            </h4>
            <ul className="space-y-2 list-disc list-inside">
              <li>Approve the USDC premium spend.</li>
              <li>Confirm the policy creation transaction.</li>
              <li>If the seller fails to perform before the timeout, you can claim the full insured amount.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
