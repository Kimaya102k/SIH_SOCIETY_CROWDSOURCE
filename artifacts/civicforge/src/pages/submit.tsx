import { ArrowLeft, ArrowRight, CheckCircle2, FileText, MapPin, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useQueryClient } from '@tanstack/react-query';
import { getListChallengesQueryKey, useCreateChallenge } from '@workspace/api-client-react';

const categories = ['Environment', 'Housing', 'Mobility', 'Health', 'Education', 'Belonging'];

export default function SubmitChallenge() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const create = useCreateChallenge();
  const [form, setForm] = useState({ title: '', summary: '', category: 'Environment', location: '', impact: '', createdBy: '' });
  const [complete, setComplete] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    create.mutate({ data: form }, {
      onSuccess: (challenge) => {
        queryClient.invalidateQueries({ queryKey: getListChallengesQueryKey() });
        setComplete(true);
        window.setTimeout(() => setLocation(`/challenge/${challenge.id}`), 850);
      },
    });
  };
  if (complete) return <div className="mx-auto flex min-h-[68vh] max-w-xl flex-col items-center justify-center px-5 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--accent))]"><CheckCircle2 size={30} /></div><p className="mono-font mt-7 text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">Challenge submitted</p><h1 className="display-font mt-3 text-5xl leading-none tracking-[-.05em]">Now the room<br />can get bigger.</h1><p className="mt-5 text-[hsl(var(--muted-foreground))]">Your question is live. Taking you to the challenge brief...</p></div>;
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-16">
      <Link href="/" data-testid="link-back-submit" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"><ArrowLeft size={16} /> Back to discovery</Link>
      <div className="mt-12 grid gap-12 md:grid-cols-[.75fr_1.25fr]">
        <div className="md:sticky md:top-28 md:self-start"><p className="mono-font text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">Open a door</p><h1 className="display-font mt-4 text-6xl leading-[.9] tracking-[-.06em] md:text-[82px]">What needs<br /><span className="text-[hsl(var(--primary))]">attention?</span></h1><p className="mt-7 max-w-sm leading-7 text-[hsl(var(--muted-foreground))]">A good challenge is specific enough to act on and spacious enough for other people to make it better.</p><div className="mt-10 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5"><div className="flex items-center gap-2 text-sm font-bold"><Sparkles size={16} className="text-[hsl(var(--primary))]" /> Helpful prompt</div><p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">“I keep noticing that…” is often a more powerful beginning than “The solution is…”</p><Link href="/ai-lab" data-testid="link-submit-ai-lab" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--primary))]">Try the AI framing lab <ArrowRight size={14} /></Link></div></div>
        <form onSubmit={submit} className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-9">
          <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] pb-6"><FileText size={19} className="text-[hsl(var(--primary))]" /><div><h2 className="font-bold">Set the scene</h2><p className="text-xs text-[hsl(var(--muted-foreground))]">Keep it human. We can sharpen it together.</p></div></div>
          <div className="mt-7 grid gap-6">
            <label className="grid gap-2"><span className="text-sm font-bold">Challenge title <span className="text-[hsl(var(--primary))]">*</span></span><input required minLength={3} value={form.title} onChange={(event) => update('title', event.target.value)} data-testid="input-challenge-title" placeholder="How might we make..." className="focus-ring rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3.5 text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))]" /></label>
            <label className="grid gap-2"><span className="text-sm font-bold">What’s happening? <span className="text-[hsl(var(--primary))]">*</span></span><textarea required minLength={10} rows={5} value={form.summary} onChange={(event) => update('summary', event.target.value)} data-testid="input-challenge-summary" placeholder="Describe the situation, who feels it, and what you’ve seen..." className="focus-ring resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3.5 text-sm leading-6 outline-none placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))]" /></label>
            <div className="grid gap-6 md:grid-cols-2"><label className="grid gap-2"><span className="text-sm font-bold">Area of focus</span><select value={form.category} onChange={(event) => update('category', event.target.value)} data-testid="select-challenge-category" className="focus-ring rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3.5 text-sm outline-none">{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label><label className="grid gap-2"><span className="text-sm font-bold">Where does it live?</span><div className="relative"><MapPin size={16} className="absolute left-3 top-3.5 text-[hsl(var(--muted-foreground))]" /><input required value={form.location} onChange={(event) => update('location', event.target.value)} data-testid="input-challenge-location" placeholder="City, neighborhood, or online" className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] py-3.5 pl-9 pr-4 text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))]" /></div></label></div>
            <label className="grid gap-2"><span className="text-sm font-bold">What could change?</span><textarea required rows={3} value={form.impact} onChange={(event) => update('impact', event.target.value)} data-testid="input-challenge-impact" placeholder="If this moved forward, what would be different?" className="focus-ring resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3.5 text-sm leading-6 outline-none placeholder:text-[hsl(var(--muted-foreground))]" /></label>
            <label className="grid gap-2"><span className="text-sm font-bold">Your name or group</span><input value={form.createdBy} onChange={(event) => update('createdBy', event.target.value)} data-testid="input-challenge-creator" placeholder="A person, neighborhood, or organization" className="focus-ring rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3.5 text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))]" /></label>
          </div>
          {create.isError && <p className="mt-5 rounded-xl bg-[hsl(var(--destructive)/.08)] p-3 text-sm text-[hsl(var(--destructive))]" data-testid="status-submit-error">Something got in the way. Check the fields and try again.</p>}
          <button type="submit" disabled={create.isPending} data-testid="button-submit-challenge" className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-4 text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-[4px_4px_0_hsl(var(--foreground))] transition-all hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">{create.isPending ? 'Opening the room...' : 'Publish this challenge'} <ArrowRight size={17} /></button>
          <p className="mt-4 text-center text-[11px] text-[hsl(var(--muted-foreground))]">By publishing, you’re inviting collaboration — not asking for perfection.</p>
        </form>
      </div>
    </div>
  );
}