import type { Metadata } from "next";
import Link from "next/link";
import PackageRow from "@/components/PackageRow";
import SearchCard from "@/components/SearchCard";
import { I } from "@/components/Icons";
import { facets, listPackages, type Filters } from "@/lib/packages";
import { monthLabel, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";
type SP = Record<string, string | undefined>;

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const sp = await searchParams;
  const bits = [sp.days ? `${sp.days.replace("-", " to ")} day` : "", "Umrah packages", sp.city ? `from ${sp.city}` : "from Pakistan", sp.month ? monthLabel(sp.month + "-01") : "2026 and 2027"].filter(Boolean);
  return { title: bits.join(" "), description: `${bits.join(" ")}: hotels named with distance to the Haram, prices per room type, seats left. Reserve online with a deposit at PunjKash.` };
}

export default async function UmrahPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const f: Filters = { city: sp.city || undefined, month: sp.month || undefined, days: sp.days || undefined, room: (sp.room as Filters["room"]) || undefined, distance: sp.distance || undefined, budget: sp.budget || undefined, sort: sp.sort || undefined, airline: sp.airline || undefined };
  const [{ airlines }, pkgs] = await Promise.all([facets(), listPackages(f)]);
  const qs = (patch: Record<string, string>) => { const u = new URLSearchParams(); for (const [k, v] of Object.entries({ ...sp, ...patch })) if (v) u.set(k, v); const q = u.toString(); return "/umrah" + (q ? "?" + q : ""); };
  const active = Object.values(f).filter(Boolean).length;
  const Group = ({ title, k, opts }: { title: string; k: keyof Filters; opts: [string, string][] }) => (
    <div className="fgroup"><b>{title}</b>{opts.map(([v, l]) => <a key={v} href={qs({ [k]: v })} aria-current={(f[k] ?? "") === v ? "true" : undefined}>{l}</a>)}</div>
  );
  const title = `Umrah packages ${f.city ? `from ${f.city}` : "from Pakistan"}${f.month ? `, ${monthLabel(f.month + "-01")}` : ""}`;
  return (
    <>
      <section className="hero" style={{ minHeight: 260 }}>
        <img className="bg" src="/img/madinah.webp" alt="Al-Masjid an-Nabawi, Madinah" fetchPriority="high" />
        <div className="wrap" style={{ paddingBottom: 90 }}><h1 style={{ fontSize: "clamp(26px,4vw,40px)" }}>{title}</h1><p>Every hotel named. Every distance measured. Every room type priced.</p></div>
      </section>
      <div className="wrap search-wrap" style={{ marginTop: -70 }}><SearchCard initial="umrah" /></div>

      <section className="section wrap results" style={{ paddingBottom: 48 }}>
        <aside id="filters" className="filters">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3>Filters</h3><a className="menu-btn" href="#" aria-label="Close filters" style={{ display: "inline-flex" }}><I.close /></a></div>
          <Group title="Sort by" k="sort" opts={[["", "Soonest departure"], ["price", "Lowest price"], ["distance", "Closest Makkah hotel"]]} />
          <Group title="Room type" k="room" opts={[["", "Any"], ["sharing", "Sharing"], ["quad", "Quad"], ["triple", "Triple"], ["double", "Double"]]} />
          <Group title="Makkah hotel" k="distance" opts={[["", "Any distance"], ["500", "Within 500 m of the Haram"], ["shuttle", "Shuttle hotels (cheaper)"]]} />
          <Group title="Budget per person" k="budget" opts={[["", "Any"], ["0-250000", "Up to 250,000"], ["250000-350000", "250,000 to 350,000"], ["350000-500000", "350,000 to 500,000"], ["500000-9999999", "500,000 and above"]]} />
          <Group title="Airline" k="airline" opts={[["", "All airlines"], ...airlines.map((a) => [a, a] as [string, string])]} />
          {active > 0 && <div className="fgroup" style={{ borderBottom: 0 }}><Link className="btn btn-line btn-sm" href="/umrah">Clear all filters</Link></div>}
          <a className="btn btn-navy btn-block filter-btn" href="#" style={{ marginTop: 16 }}>Show {pkgs.length} package{pkgs.length === 1 ? "" : "s"}</a>
        </aside>
        <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <span className="muted">{pkgs.length} open departure{pkgs.length === 1 ? "" : "s"}{f.room ? `, priced for ${f.room}` : ""}</span>
            <a className="btn btn-line btn-sm filter-btn" href="#filters"><I.filter /> Filters{active ? ` (${active})` : ""}</a>
          </div>
          {pkgs.map((p, i) => <PackageRow key={p.id} p={p} photo={i % 2 ? "/img/madinah-800.webp" : "/img/makkah-800.webp"} />)}
          {!pkgs.length && <div className="card card-body" style={{ textAlign: "center", padding: 32 }}><h3>Nothing matches these filters yet</h3><p className="muted">Try another month or city, or tell us your dates and we build a package around them.</p><div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}><Link className="btn btn-line" href="/umrah">Clear filters</Link><a className="btn btn-wa" href={waLink("Assalam o Alaikum, I want an Umrah package for my own dates.")}><I.wa /> Ask on WhatsApp</a></div></div>}
          <p className="tiny faint">Prices are per person in PKR, include the Umrah visa, return flights, hotels as named, and transport between cities. Infants and children are priced on each package page.</p>
        </div>
      </section>
    </>
  );
}
