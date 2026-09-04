import { ArrowUpRight, Clock3, MapPin, Users } from 'lucide-react';
import { Link } from 'wouter';
import type { Challenge } from '@workspace/api-client-react';

const categoryColors: Record<string, string> = {
  Environment: 'bg-[hsl(163_31%_35%)] text-[hsl(var(--primary-foreground))]',
  Housing: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
  Mobility: 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]',
  Health: 'bg-[hsl(222_28%_16%)] text-[hsl(var(--background))]',
};

export function ChallengeCard({ challenge, featured = false }: { challenge: Challenge; featured?: boolean }) {
  return (
    <Link href={`/challenge/${challenge.id}`} data-testid={`card-challenge-${challenge.id}`} className={`group focus-ring relative block overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--foreground)/.3)] hover:shadow-[var(--shadow-soft)] ${featured ? 'min-h-[330px] p-7 md:p-8' : 'p-5'}`}>
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] ${categoryColors[challenge.category] || 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'}`}>{challenge.category}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-[hsl(var(--foreground))] group-hover:text-[hsl(var(--foreground))]"><ArrowUpRight size={16} /></span>
      </div>
      <h3 className={`display-font mt-7 max-w-[520px] leading-[1.06] tracking-[-.03em] ${featured ? 'text-3xl md:text-[42px]' : 'text-2xl'}`}>{challenge.title}</h3>
      <p className={`mt-3 leading-6 text-[hsl(var(--muted-foreground))] ${featured ? 'max-w-xl text-base' : 'line-clamp-2 text-sm'}`}>{challenge.summary}</p>
      <div className={`mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[hsl(var(--muted-foreground))] ${featured ? 'absolute bottom-7 left-7 right-7 border-t border-[hsl(var(--border))] pt-4 md:bottom-8 md:left-8 md:right-8' : 'border-t border-[hsl(var(--border))] pt-4'}`}>
        <span className="flex items-center gap-1.5"><MapPin size={13} /> {challenge.location}</span>
        <span className="flex items-center gap-1.5"><Users size={13} /> {challenge.participants} contributing</span>
        <span className="ml-auto flex items-center gap-1.5 font-semibold text-[hsl(var(--primary))]"><Clock3 size={13} /> {challenge.timeLeft}</span>
      </div>
    </Link>
  );
}

export function ChallengeSkeleton() {
  return <div className="h-[260px] animate-pulse rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--muted)/.6)]" aria-label="Loading challenge" />;
}