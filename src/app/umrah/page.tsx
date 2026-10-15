import type { Metadata } from "next";
import SearchBox from "@/components/SearchBox";
import PackageRow from "@/components/PackageRow";
import { facets, listPackages, type Filters } from "@/lib/packages";
import { monthLabel } from "@/lib/site";

export const dynamic = "force-dynamic";

type SP = Record<string, string | undefined>;

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const sp = await searchParams;
  const bits = [sp.days ? `${sp.days} days` : "", "Umrah packages", sp.city ? `from ${sp.city}` : "from Pakistan", sp.month ? monthLabel(sp.month + "-01") : "2026"].filter(Boolean);
  return { title: bits.join(" "), description: `${bits.join(" ")}: hotels named with distance to the Haram, prices per room type, seats left. Book on WhatsApp with PunjKash.` };
}

export default async function UmrahPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const f: Filters = { city: sp.city || undefined, month: sp.month || undefined, days: sp.days || undefined, room: (sp.room as Filters["room"]) || undefined, distance: sp.distance || undefined, budget: sp.budget || undefined, sort: sp.sort || undefined, airline: sp.airline || undefined };
  const [{ cities, months, airlines }, pkgs] = await Promise.all([facets(), listPackages(f)]);
  const qs = (patch: Record<string, string>) => { const u = new URLSearchParams(); for (const [k, v] of Object.entries({ ...sp, ...patch })) if (v) u.set(k, v); return "/umrah?" + u.toString(); };
  return (
    <>
      <section style={{ background: "var(--bg-soft)", padding: "32px 0" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>Umrah packages {f.city ? `from ${f.city}` : "from Pakistan"}{f.month ? `, ${monthLabel(f.month + "-01")}` : ""}</h1>
          <SearchBox cities={cities} months={months} values={sp} />
        </div>
      </section>
      <section className="wrap" style={{ padding: "28px 0 0", display: "grid", gridTemplateColumns: "260px minmax(0,1fr)", gap: 24 }}>
        <aside className="filters card" style={{ alignSelf: "start" }}>
          <strong>Refine</strong>
          <div className="field"><label>Airline</label><div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <a href={qs({ airline: "" })} style={{ fontWeight: !f.airline ? 700 : 400 }}>All airlines</a>
            {airlines.map((a) => <a key={a} href={qs({ airline: a })} style={{ fontWeight: f.airline === a ? 700 : 400 }}>{a}</a>)}</div></div>
          <div className="field"><label>Budget per person</label><div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[["", "Any"], ["260000", "Up to 260,000"], ["300000", "Up to 300,000"], ["350000", "Up to 350,000"]].map(([v, l]) => <a key={v} href={qs({ budget: v })} style={{ fontWeight: (f.budget ?? "") === v ? 700 : 400 }}>{l}</a>)}</div></div>
          <div className="field"><label>Sort</label><div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[["", "Soonest departure"], ["price", "Lowest price"], ["distance", "Closest Makkah hotel"]].map(([v, l]) => <a key={v} href={qs({ sort: v })} style={{ fontWeight: (f.sort ?? "") === v ? 700 : 400 }}>{l}</a>)}</div></div>
        </aside>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="muted">{pkgs.length} open departure{pkgs.length === 1 ? "" : "s"}{f.room ? `, priced for ${f.room}` : ""}</div>
          {pkgs.map((p) => <PackageRow key={p.id} p={p} />)}
          {!pkgs.length && <div className="notice">No package matches these filters yet. Try another month or city, or message us and we will build one around your dates.</div>}
        </div>
      </section>
      <style>{`@media(max-width:900px){section.wrap[style*="260px"]{grid-template-columns:1fr!important}}`}</style>
    </>
  );
}
