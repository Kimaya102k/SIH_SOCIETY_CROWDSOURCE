import { ArrowUpRight, Building2, Filter, MapPin, Search, University } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useListPartners } from '@workspace/api-client-react';
import { EmptyBlock, ErrorBlock, LoadingBlock } from '@/components/civic-shell';

const types = ['All', 'University', 'Industry', 'Community'];

export default function Partners() {
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');
  const partners = useListPartners(type === 'All' ? undefined : { type });
  const visible = useMemo(() => (partners.data || []).filter((partner) => `${partner.name} ${partner.focus} ${partner.location}`.toLowerCase().includes(search.toLowerCase())), [partners.data, search]);
  return (
    <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20">
      <div className="grid gap-10 border-b border-[hsl(var(--border))] pb-14 md:grid-cols-[1fr_.72fr] md:items-end">
        <div><p className="mono-font text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">The constellation</p><h1 className="display-font mt-4 text-6xl leading-[.92] tracking-[-.06em] md:text-[92px]">People make<br /><span className="text-[hsl(var(--primary))]">the work.</span></h1></div>
        <p className="max-w-md text-base leading-7 text-[hsl(var(--muted-foreground))]">CivicForge is a network, not a marketplace. Meet the universities, studios, labs, and community organizations lending their particular brilliance to public questions.</p>
      </div>
      <div className="flex flex-col justify-between gap-4 py-8 md:flex-row md:items-center">
        <div className="flex items-center gap-2 text-sm font-semibold"><Filter size={16} /> Browse the network</div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative"><Search size={15} className="absolute left-3 top-3 text-[hsl(var(--muted-foreground))]" /><input value={search} onChange={(event) => setSearch(event.target.value)} data-testid="input-search-partners" placeholder="Search partners..." className="focus-ring w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] py-2.5 pl-9 pr-4 text-sm outline-none sm:w-56" /></div>
          <div className="flex gap-1 rounded-full bg-[hsl(var(--muted))] p-1">{types.map((item) => <button type="button" key={item} onClick={() => setType(item)} data-testid={`button-partner-filter-${item.toLowerCase()}`} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${item === type ? 'bg-[hsl(var(--card))] shadow-sm' : 'text-[hsl(var(--muted-foreground))]'}`}>{item}</button>)}</div>
        </div>
      </div>
      {partners.isLoading ? <div className="grid gap-4 md:grid-cols-2"><LoadingBlock /><LoadingBlock /></div> : partners.isError ? <ErrorBlock onRetry={() => partners.refetch()} /> : visible.length === 0 ? <EmptyBlock title="No one by that name yet." detail="Try a wider search, or be the first partner to bring an uncommon perspective." /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((partner, index) => {
            const Icon = partner.type.toLowerCase().includes('university') ? University : Building2;
            return <article key={partner.id} data-testid={`card-partner-${partner.id}`} className={`group relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] ${index === 0 ? 'md:row-span-2 md:p-8' : ''}`}>
              <div className="flex items-start justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold" style={{ backgroundColor: `${partner.color}22`, color: partner.color }}>{partner.initials}</span><span className="flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--border))] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"><ArrowUpRight size={16} /></span></div>
              <div className={index === 0 ? 'mt-16' : 'mt-8'}><div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]"><Icon size={14} /> {partner.type}</div><h2 className={`display-font mt-2 leading-[1.05] tracking-[-.04em] ${index === 0 ? 'text-4xl' : 'text-2xl'}`}>{partner.name}</h2><p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{partner.focus}</p></div>
              <div className="mt-8 flex flex-wrap gap-4 border-t border-[hsl(var(--border))] pt-4 text-xs text-[hsl(var(--muted-foreground))]"><span className="flex items-center gap-1.5"><MapPin size={13} /> {partner.location}</span><span className="font-semibold text-[hsl(var(--primary))]">{partner.openProjects} open projects</span></div>
            </article>;
          })}
        </div>
      )}
    </div>
  );
}