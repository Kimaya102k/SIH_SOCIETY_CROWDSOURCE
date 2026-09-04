import { Activity, ArrowUpRight, Compass, FlaskConical, Handshake, Menu, Plus, Send, Sparkles, Users, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { getHealthCheckQueryKey, useHealthCheck } from '@workspace/api-client-react';

const navItems = [
  { href: '/', label: 'Discover', icon: Compass },
  { href: '/partners', label: 'Partners', icon: Handshake },
  { href: '/ai-lab', label: 'AI lab', icon: FlaskConical },
];

export function CivicShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const health = useHealthCheck({ query: { staleTime: 30000, queryKey: getHealthCheckQueryKey() } });

  return (
    <div className="noise-layer min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b border-[hsl(var(--border)/.8)] bg-[hsl(var(--background)/.88)] backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 md:px-8">
          <Link href="/" data-testid="link-brand" className="focus-ring group flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-[4px_4px_0_hsl(var(--foreground))] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]">
              <span className="display-font text-[25px] leading-none">C</span>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            <span className="leading-none">
              <span className="block text-[17px] font-bold tracking-[-.04em]">CivicForge</span>
              <span className="mono-font mt-1 block text-[8px] uppercase tracking-[.22em] text-[hsl(var(--muted-foreground))]">make room for better</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase().replace(' ', '-')}`} className={`focus-ring group flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${location === href ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]'}`}>
                <Icon size={15} strokeWidth={1.8} />
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 text-[11px] text-[hsl(var(--muted-foreground))]" data-testid="status-platform-health">
              <span className={`h-2 w-2 rounded-full ${health.isError ? 'bg-[hsl(var(--destructive))]' : 'animate-pulse-soft bg-[hsl(var(--secondary))]'}`} />
              {health.isError ? 'Offline mode' : 'Platform live'}
            </div>
            <Link href="/submit" data-testid="link-submit-header" className="focus-ring group flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-4 py-2.5 text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-[3px_3px_0_hsl(var(--foreground))] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_hsl(var(--foreground))]">
              <Plus size={16} />
              Submit a challenge
            </Link>
          </div>
          <button type="button" data-testid="button-toggle-menu" onClick={() => setOpen((value) => !value)} className="focus-ring rounded-full p-2.5 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] md:hidden" aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 py-4 md:hidden">
            <div className="grid gap-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-mobile-${label.toLowerCase().replace(' ', '-')}`} className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold hover:bg-[hsl(var(--muted))]">
                  <Icon size={17} /> {label}
                </Link>
              ))}
              <Link href="/submit" onClick={() => setOpen(false)} data-testid="link-mobile-submit" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-3 py-3 font-bold text-[hsl(var(--primary-foreground))]">
                <Plus size={17} /> Submit a challenge
              </Link>
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary))] display-font text-xl">C</span>
              <span className="font-bold">CivicForge</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[hsl(var(--background)/.65)]">A public-interest workspace for people who believe the best civic ideas are built together.</p>
          </div>
          <div className="text-sm">
            <p className="mono-font mb-3 text-[10px] uppercase tracking-[.2em] text-[hsl(var(--background)/.45)]">Explore</p>
            <div className="grid gap-2.5 text-[hsl(var(--background)/.75)]">
              <Link href="/" data-testid="link-footer-discover" className="hover:text-[hsl(var(--accent))]">Browse challenges</Link>
              <Link href="/partners" data-testid="link-footer-partners" className="hover:text-[hsl(var(--accent))]">Meet the partners</Link>
              <Link href="/ai-lab" data-testid="link-footer-ai-lab" className="hover:text-[hsl(var(--accent))]">Visit the AI lab</Link>
            </div>
          </div>
          <div className="text-sm">
            <p className="mono-font mb-3 text-[10px] uppercase tracking-[.2em] text-[hsl(var(--background)/.45)]">For builders</p>
            <div className="grid gap-2.5 text-[hsl(var(--background)/.75)]">
              <Link href="/submit" data-testid="link-footer-submit" className="flex items-center gap-2 hover:text-[hsl(var(--accent))]">Bring a challenge <ArrowUpRight size={13} /></Link>
              <span className="flex items-center gap-2"><Users size={13} /> Residents welcome</span>
              <span className="flex items-center gap-2"><Send size={13} /> Built in public</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function LoadingBlock({ label = 'Gathering the latest civic work' }: { label?: string }) {
  return <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 text-center" data-testid="state-loading"><div className="mx-auto mb-4 h-8 w-8 animate-pulse rounded-full bg-[hsl(var(--accent))]" /><p className="text-sm text-[hsl(var(--muted-foreground))]">{label}</p></div>;
}

export function ErrorBlock({ onRetry, label = 'We could not reach the civic workspace.' }: { onRetry?: () => void; label?: string }) {
  return <div className="rounded-2xl border border-[hsl(var(--destructive)/.35)] bg-[hsl(var(--destructive)/.06)] p-8 text-center" data-testid="state-error"><Activity className="mx-auto mb-3 text-[hsl(var(--destructive))]" size={22} /><p className="text-sm text-[hsl(var(--foreground))]">{label}</p>{onRetry && <button type="button" onClick={onRetry} data-testid="button-retry" className="mt-4 rounded-full bg-[hsl(var(--foreground))] px-4 py-2 text-xs font-bold text-[hsl(var(--background))]">Try again</button>}</div>;
}

export function EmptyBlock({ title, detail }: { title: string; detail: string }) {
  return <div className="rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card)/.45)] p-12 text-center" data-testid="state-empty"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--accent))]"><Sparkles size={20} /></div><h3 className="display-font text-xl">{title}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">{detail}</p></div>;
}