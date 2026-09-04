import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { CivicShell } from '@/components/civic-shell';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import AiLab from '@/pages/ai-lab';
import ChallengeDetail from '@/pages/challenge-detail';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';
import Partners from '@/pages/partners';
import SubmitChallenge from '@/pages/submit';
import { Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 20000, refetchOnWindowFocus: false } } });

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return <RoutedErrorBoundary><CivicShell><Switch><Route path="/" component={Home} /><Route path="/challenge/:id" component={ChallengeDetail} /><Route path="/partners" component={Partners} /><Route path="/submit" component={SubmitChallenge} /><Route path="/ai-lab" component={AiLab} /><Route component={NotFound} /></Switch></CivicShell></RoutedErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;