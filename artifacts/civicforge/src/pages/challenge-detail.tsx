import { ArrowLeft, ArrowRight, Check, Clock3, MapPin, Send, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { useGetChallenge, useJoinChallenge, getGetChallengeQueryKey, type Challenge } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorBlock, LoadingBlock } from '@/components/civic-shell';

export default function ChallengeDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const challenge = useGetChallenge(id, { query: { queryKey: getGetChallengeQueryKey(id), enabled: Number.isFinite(id) } });
  const join = useJoinChallenge();
  const [joined, setJoined] = useState(false);
  const [role, setRole] = useState('');
  const [showForm, setShowForm] = useState(false);
  const item = challenge.data as Challenge | undefined;
  if (challenge.isLoading) return <div className="mx-auto max-w-[900px] px-5 py-20"><LoadingBlock label="Opening the challenge brief" /></div>;
  if (challenge.isError || !item) return <div className="mx-auto max-w-[900px] px-5 py-20"><ErrorBlock onRetry={() => challenge.refetch()} label="This challenge brief could not be opened." /></div>;
  const submitJoin = () => {
    join.mutate({ challengeId: id, data: { role: role || 'Contributor' } }, {
      onSuccess: (updated) => {
        setJoined(true);
        queryClient.setQueryData(getGetChallengeQueryKey(id), updated);
      },
    });
  };
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-16">
      <Link href="/" data-testid="link-back-challenges" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"><ArrowLeft size={16} /> All challenges</Link>
      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_350px] md:items-start">
        <article>
          <div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-[hsl(var(--primary))] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))]">{item.category}</span><span className="mono-font text-[10px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))]">{item.status}</span></div>
          <h1 className="display-font mt-7 max-w-4xl text-5xl leading-[.94] tracking-[-.06em] md:text-[82px]">{item.title}</h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-[hsl(var(--muted-foreground))]">{item.summary}</p>
          <div className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-y border-[hsl(var(--border))] py-6 md:grid-cols-3"><div><MapPin size={16} className="mb-2 text-[hsl(var(--primary))]" /><p className="text-sm font-semibold">{item.location}</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">where it lives</p></div><div><Users size={16} className="mb-2 text-[hsl(var(--primary))]" /><p className="text-sm font-semibold">{item.participants} people</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">in the room</p></div><div><Clock3 size={16} className="mb-2 text-[hsl(var(--primary))]" /><p className="text-sm font-semibold">{item.timeLeft}</p><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">to join this round</p></div></div>
          <section className="mt-12"><p className="mono-font text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">The opportunity</p><h2 className="display-font mt-3 text-3xl tracking-[-.04em]">What could become possible?</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[hsl(var(--muted-foreground))]">{item.impact}</p></section>
          <section className="mt-12"><p className="mono-font text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">Already around the table</p><div className="mt-4 flex flex-wrap gap-2">{item.partners.map((partner) => <span key={partner} className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-xs font-semibold">{partner}</span>)}</div></section>
        </article>
        <aside className="sticky top-28 rounded-2xl bg-[hsl(var(--foreground))] p-6 text-[hsl(var(--background))] shadow-[8px_8px_0_hsl(var(--accent))] md:p-7">
          {joined ? <div data-testid="state-joined"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]"><Check size={23} /></div><h2 className="display-font mt-6 text-3xl leading-none">You’re in the room.</h2><p className="mt-4 text-sm leading-6 text-[hsl(var(--background)/.65)]">We’ve added you to this challenge. Keep an eye out for the next working session.</p><Link href="/" data-testid="link-return-discover" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--accent))]">Find another challenge <ArrowRight size={15} /></Link></div> : <><div className="flex items-center gap-2 text-[hsl(var(--accent))]"><ShieldCheck size={17} /><span className="mono-font text-[10px] uppercase tracking-[.16em]">Open invitation</span></div><h2 className="display-font mt-6 text-4xl leading-[.95] tracking-[-.04em]">Bring what<br />you know.</h2><p className="mt-4 text-sm leading-6 text-[hsl(var(--background)/.65)]">You don’t need a perfect plan. Join with a perspective, a question, or a useful skill.</p>{showForm ? <div className="mt-7"><label className="text-xs font-semibold text-[hsl(var(--background)/.7)]" htmlFor="join-role">What perspective are you bringing?</label><input id="join-role" value={role} onChange={(event) => setRole(event.target.value)} data-testid="input-join-role" placeholder="Resident, researcher, designer..." className="focus-ring mt-2 w-full rounded-xl border border-[hsl(var(--background)/.2)] bg-[hsl(var(--background)/.08)] px-3 py-3 text-sm outline-none placeholder:text-[hsl(var(--background)/.4)]" /><button type="button" disabled={join.isPending} onClick={submitJoin} data-testid="button-confirm-join" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-4 py-3 font-bold text-[hsl(var(--foreground))] disabled:opacity-60">{join.isPending ? 'Joining...' : 'Confirm my place'} <Send size={15} /></button>{join.isError && <p className="mt-3 text-xs text-[hsl(var(--accent))]">We couldn’t add you this time. Please try again.</p>}</div> : <button type="button" onClick={() => setShowForm(true)} data-testid="button-join-challenge" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3.5 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-0.5">Join this challenge <ArrowRight size={16} /></button>}</>}
          <p className="mt-5 text-center text-[11px] text-[hsl(var(--background)/.45)]">Hosted by {item.createdBy} · Started {new Date(item.createdAt).toLocaleDateString()}</p>
        </aside>
      </div>
    </div>
  );
}