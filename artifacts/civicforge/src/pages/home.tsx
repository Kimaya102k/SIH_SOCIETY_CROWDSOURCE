import { ArrowDownRight, ArrowRight, BarChart3, CircleDot, Handshake, Lightbulb, Search, Sparkles, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { useGetSummary, useListChallenges } from '@workspace/api-client-react';
import { ChallengeCard, ChallengeSkeleton } from '@/components/challenge-card';
import { EmptyBlock, ErrorBlock, LoadingBlock } from '@/components/civic-shell';

const categories = ['All', 'Environment', 'Housing', 'Mobility', 'Health'];

function Metric({ value, label, accent }: { value: number | undefined; label: string; accent?: boolean }) {
  return <div className={`border-l px-4 first:border-l-0 md:px-6 ${accent ? 'border-[hsl(var(--primary))]' : 'border-[hsl(var(--border))]'}`}><div className={`display-font text-3xl tracking-[-.05em] md:text-4xl ${accent ? 'text-[hsl(var(--primary))]' : ''}`}>{value ?? '—'}</div><div className="mono-font mt-1 text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">{label}</div></div>;
}

export default function Home() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const params = category === 'All' ? undefined : { category };
  const challenges = useListChallenges(params);
  const summary = useGetSummary();
  const visible = useMemo(() => (challenges.data || []).filter((challenge) => challenge.title.toLowerCase().includes(search.toLowerCase()) || challenge.summary.toLowerCase().includes(search.toLowerCase())), [challenges.data, search]);
  const featured = visible[0];

  return (
    <div>
      <section className="surface-grid relative overflow-hidden border-b border-[hsl(var(--border))]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[38px] border-[hsl(var(--accent)/.5)] animate-drift md:h-[420px] md:w-[420px]" />
        <div className="pointer-events-none absolute bottom-[-100px] left-[42%] h-72 w-72 rounded-full border-[1px] border-[hsl(var(--primary)/.25)]" />
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.1fr_.9fr] md:items-end md:px-8 md:pb-24 md:pt-24">
          <div className="relative z-10 animate-rise">
            <div className="mb-7 flex items-center gap-3"><span className="h-px w-10 bg-[hsl(var(--primary))]" /><span className="mono-font text-[10px] font-medium uppercase tracking-[.2em] text-[hsl(var(--primary))]">A workshop for the common good</span></div>
            <h1 className="display-font max-w-3xl text-[clamp(3.2rem,8vw,7.8rem)] leading-[.88] tracking-[-.065em] text-balance">Big problems<br /><span className="text-[hsl(var(--primary))]">need more</span><br />than one mind.</h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-[hsl(var(--muted-foreground))] md:text-lg">CivicForge brings residents, researchers, and industry into the same room to turn lived experience into practical progress.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#challenges" data-testid="link-browse-challenges" className="focus-ring inline-flex items-center gap-2 rounded-full bg-[hsl(var(--foreground))] px-5 py-3 text-sm font-bold text-[hsl(var(--background))] transition-transform hover:-translate-y-0.5">Find your place <ArrowDownRight size={16} /></a>
              <Link href="/ai-lab" data-testid="link-try-ai-lab" className="focus-ring inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/.5)] px-5 py-3 text-sm font-bold transition-colors hover:bg-[hsl(var(--accent))]"><Sparkles size={16} /> Frame an idea with AI</Link>
            </div>
          </div>
          <div className="relative z-10 animate-rise animate-rise-1 md:pb-2">
            <div className="rounded-2xl border border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] p-6 text-[hsl(var(--background))] shadow-[10px_10px_0_hsl(var(--primary))] md:ml-auto md:max-w-[430px] md:p-7">
              <div className="flex items-center justify-between"><span className="mono-font text-[10px] uppercase tracking-[.18em] text-[hsl(var(--background)/.6)]">The premise</span><CircleDot size={17} className="text-[hsl(var(--accent))]" /></div>
              <p className="display-font mt-10 text-3xl leading-[1.1] tracking-[-.04em]">“Nothing about us, without us.”</p>
              <p className="mt-5 text-sm leading-6 text-[hsl(var(--background)/.65)]">Every challenge starts with a real voice, gets sharper with many perspectives, and ends with work you can point to.</p>
              <div className="mt-8 flex items-center gap-2"><div className="flex -space-x-2">{['RV','MT','AO','+'].map((initial, index) => <span key={initial} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[hsl(var(--foreground))] text-[10px] font-bold ${index === 3 ? 'bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]' : 'bg-[hsl(var(--secondary))]'}`}>{initial}</span>)}</div><span className="text-xs text-[hsl(var(--background)/.6)]">people making things move</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card)/.7)]">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-y-8 px-5 py-9 md:grid-cols-5 md:px-8">
          <Metric value={summary.data?.activeChallenges} label="active challenges" accent />
          <Metric value={summary.data?.projectsInMotion} label="projects in motion" />
          <Metric value={summary.data?.peopleContributing} label="people contributing" />
          <Metric value={summary.data?.partnerOrganizations} label="partner orgs" />
          <Metric value={summary.data?.solvedThisYear} label="solved this year" />
        </div>
      </section>

      <section id="challenges" className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div><p className="mono-font text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">01 / The workbench</p><h2 className="display-font mt-3 text-4xl tracking-[-.05em] md:text-6xl">Challenges looking<br className="hidden md:block" /> for a crew.</h2></div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
            <div className="relative w-full md:w-64"><Search size={16} className="absolute left-3 top-3 text-[hsl(var(--muted-foreground))]" /><input value={search} onChange={(event) => setSearch(event.target.value)} data-testid="input-search-challenges" placeholder="Search the work..." className="focus-ring w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-2.5 pl-9 pr-4 text-sm outline-none placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))]" /></div>
            <div className="flex flex-wrap justify-end gap-1.5">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} data-testid={`button-filter-${item.toLowerCase()}`} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${category === item ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]'}`}>{item}</button>)}</div>
          </div>
        </div>
        {challenges.isLoading ? <div className="mt-10 grid gap-5 md:grid-cols-2"><ChallengeSkeleton /><ChallengeSkeleton /></div> : challenges.isError ? <div className="mt-10"><ErrorBlock onRetry={() => challenges.refetch()} /></div> : visible.length === 0 ? <div className="mt-10"><EmptyBlock title="No challenges in this corner yet." detail="Try another filter or bring a question from your community." /></div> : (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featured && <ChallengeCard challenge={featured} featured />}
            <div className="grid gap-5">{visible.slice(1, 3).map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}</div>
          </div>
        )}
        {visible.length > 3 && <div className="mt-5 grid gap-5 md:grid-cols-3">{visible.slice(3).map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}</div>}
      </section>

      <section className="bg-[hsl(var(--secondary))] text-[hsl(var(--primary-foreground))]">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 md:grid-cols-[.9fr_1.1fr] md:items-center md:px-8 md:py-24">
          <div><p className="mono-font text-[10px] uppercase tracking-[.2em] text-[hsl(var(--accent))]">02 / How it moves</p><h2 className="display-font mt-4 text-5xl leading-[.95] tracking-[-.055em] md:text-7xl">From “someone should…”<br /><span className="text-[hsl(var(--accent))]">to “we did.”</span></h2></div>
          <div className="grid gap-4">
            {[
              { icon: Lightbulb, num: '01', title: 'Name what is real', detail: 'Start with a sharp observation, not a polished pitch. Your lived experience is useful data.' },
              { icon: Users, num: '02', title: 'Find the edges', detail: 'Invite people who see the problem from another angle. Difference is where the good questions live.' },
              { icon: BarChart3, num: '03', title: 'Make a small bet', detail: 'Teams form around practical experiments, measurable outcomes, and a bias toward making.' },
            ].map(({ icon: Icon, num, title, detail }) => <div key={num} className="group flex gap-5 border-t border-[hsl(var(--primary-foreground)/.18)] py-5"><span className="mono-font pt-1 text-[10px] text-[hsl(var(--accent))]">{num}</span><Icon className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" size={20} /><div><h3 className="font-bold">{title}</h3><p className="mt-1 max-w-md text-sm leading-6 text-[hsl(var(--primary-foreground)/.65)]">{detail}</p></div><ArrowRight className="ml-auto hidden opacity-0 transition-opacity group-hover:opacity-100 md:block" size={18} /></div>)}
          </div>
        </div>
      </section>
      <section className="mx-auto flex max-w-[1320px] flex-col gap-7 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
        <div><p className="mono-font text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">Have a question worth sharing?</p><h2 className="display-font mt-3 text-4xl tracking-[-.04em]">Put it on the table.</h2></div>
        <Link href="/submit" data-testid="link-submit-cta" className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--primary-foreground))] shadow-[4px_4px_0_hsl(var(--foreground))] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_hsl(var(--foreground))]">Submit a challenge <ArrowRight size={16} /></Link>
      </section>
    </div>
  );
}