import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, Link, useLocation } from 'wouter';
import { Shield } from 'lucide-react';

import Dashboard from '@/pages/Dashboard';
import BuyInsurance from '@/pages/BuyInsurance';
import MyPolicies from '@/pages/MyPolicies';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/not-found';
import { WalletButton } from '@/components/WalletButton';
import { useWallet } from '@/hooks/useWallet';

const queryClient = new QueryClient();

function Navbar() {
  const [location] = useLocation();
  const wallet = useWallet();

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4 justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Shield className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-tight text-lg">ZeusInsurance</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className={`transition-colors hover:text-foreground ${location === '/' ? 'text-foreground font-semibold' : ''}`}>Dashboard</Link>
            <Link href="/buy" className={`transition-colors hover:text-foreground ${location === '/buy' ? 'text-foreground font-semibold' : ''}`}>Buy Insurance</Link>
            <Link href="/policies" className={`transition-colors hover:text-foreground ${location === '/policies' ? 'text-foreground font-semibold' : ''}`}>My Policies</Link>
            <Link href="/admin" className={`transition-colors hover:text-foreground ${location === '/admin' ? 'text-foreground font-semibold' : ''}`}>Admin</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <WalletButton 
            account={wallet.account}
            chainId={wallet.chainId}
            isConnected={wallet.isConnected}
            isCorrectChain={wallet.isCorrectChain}
            onConnect={wallet.connect}
            onDisconnect={wallet.disconnect}
          />
        </div>
      </div>
    </header>
  );
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full relative">
        {/* Subtle background glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/buy" component={BuyInsurance} />
          <Route path="/policies" component={MyPolicies} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
