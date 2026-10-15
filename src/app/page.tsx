import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import PackageRow from "@/components/PackageRow";
import { facets, listPackages } from "@/lib/packages";
import { destinations, flightRoutes, holidays, tours } from "@/lib/catalog";
import { pkr, site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";

const services = [
  ["Flights", "/flights", "Worldwide, all airlines, group fares"],
  ["Holidays", "/holidays", "Dubai, Istanbul, Baku, Maldives, Malaysia"],
  ["Umrah & Hajj", "/umrah", "Packages, custom, Hajj 2027"],
  ["Pakistan tours", "/tours", "Punjab, Kashmir, the north"],
  ["Hotels", "/hotels", "Makkah, Madinah and abroad"],
  ["Visas", "/visas", "Checklists, fees and filing"],
];

export default async function Home() {
  const [{ cities, months }, pkgs] = await Promise.all([facets(), listPackages({}, 4)]);
  const deals = [...flightRoutes].filter((f) => f.cabin === "Economy" && !["ISB", "KHI", "LHE", "KDU", "GIL"].includes(f.toIata)).sort((a, b) => a.fare - b.fare).slice(0, 8);
  return (
    <>
      <section style={{ background: "var(--bg-soft)", padding: "44px 0 36px" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ maxWidth: 820, display: "flex", flexDirection: "column", gap: 10 }}>
            <h1>Flights, holidays, Umrah and Hajj, tours, hotels and visas. One place, one honest price.</h1>
            <p className="muted" style={{ margin: 0, fontSize: 19 }}>From Lahore, Islamabad, Karachi and Multan to anywhere. Search below, or tell us where you want to go and we build it.</p>
          </div>
          <SearchBox cities={cities} months={months} active="umrah" />
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            <div className="stat"><b>All major airlines</b>Saudia, Emirates, Qatar, Turkish, Etihad, PIA, Airblue, Air Sial</div>
            <div className="stat"><b>Written quotation</b>before any payment, price held 7 days</div>
            <div className="stat"><b>Partners you can name</b>{site.partners.map((p) => p.name.replace("Dr ", "")).join(" and ")}, Lahore</div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ padding: "36px 0 0" }}>
        <div className="grid g6">{services.map(([t, h, d]) => <Link key={t} href={h} className="card" style={{ gap: 4 }}><span className="display" style={{ fontWeight: 800, fontSize: 18 }}>{t}</span><span className="muted" style={{ fontSize: 15 }}>{d}</span></Link>)}</div>
      </section>

      <section className="wrap" style={{ padding: "48px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}><h2>Where do you want to go?</h2><Link href="/holidays" style={{ color: "var(--blue)", fontWeight: 600 }}>All holidays</Link></div>
        <div className="grid g4">{destinations.map((d) => <Link key={d.name} href={d.href} className="photo" style={{ height: 200, flexDirection: "column", alignItems: "flex-start", gap: 2, color: "var(--ink)" }}><span className="display" style={{ fontSize: 20, fontWeight: 800 }}>{d.name}</span><span className="muted" style={{ fontSize: 14 }}>{d.tag}</span></Link>)}</div>
      </section>

      <section className="wrap" style={{ padding: "48px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}><h2>Flight deals this month</h2><Link href="/flights" style={{ color: "var(--blue)", fontWeight: 600 }}>All routes</Link></div>
        <div className="grid g4">{deals.map((f) => <Link key={f.fromIata + f.toIata + f.airline} href={`/flights?from=${f.from}&to=${f.to}`} className="card" style={{ gap: 4 }}><span className="tag" style={{ alignSelf: "flex-start" }}>{f.airline} · {f.stops}</span><span className="display" style={{ fontWeight: 800, fontSize: 18 }}>{f.from} to {f.to}</span><span className="muted" style={{ fontSize: 14 }}>Return, per adult, from</span><span className="price" style={{ fontSize: 22 }}>{pkr(f.fare)}</span></Link>)}</div>
        <span className="faint" style={{ fontSize: 13 }}>Sample fares for preview; live fares at launch.</span>
      </section>

      <section className="wrap" style={{ padding: "48px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}><h2>Umrah departing soon</h2><Link href="/umrah" style={{ color: "var(--blue)", fontWeight: 600 }}>All open departures</Link></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{pkgs.map((p) => <PackageRow key={p.id} p={p} />)}</div>
      </section>

      <section className="wrap" style={{ padding: "48px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}><h2>Holidays abroad</h2><Link href="/holidays" style={{ color: "var(--blue)", fontWeight: 600 }}>All packages</Link></div>
        <div className="grid g4">{holidays.slice(0, 4).map((h) => <Link key={h.slug} href={`/holidays/${h.slug}`} className="card" style={{ gap: 6 }}><div className="photo" style={{ height: 140 }}>Photo: {h.city}</div><span className="tag tag-gold" style={{ alignSelf: "flex-start" }}>{h.nights} nights</span><h3 style={{ fontSize: 19 }}>{h.title}</h3><span className="muted" style={{ fontSize: 14 }}>{h.highlight}</span><span className="price" style={{ fontSize: 22, marginTop: "auto" }}>{pkr(h.from)}</span></Link>)}</div>
      </section>

      <section className="wrap" style={{ padding: "48px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}><h2>Punjab, Kashmir and the north</h2><Link href="/tours" style={{ color: "var(--blue)", fontWeight: 600 }}>All tours</Link></div>
        <div className="grid g4">{tours.slice(0, 4).map((t) => <Link key={t.slug} href={`/tours/${t.slug}`} className="card" style={{ gap: 6 }}><div className="photo" style={{ height: 140 }}>Photo: {t.title}</div><span className="tag" style={{ alignSelf: "flex-start" }}>{t.region}</span><h3 style={{ fontSize: 19 }}>{t.title}</h3><span className="muted" style={{ fontSize: 14 }}>{t.days} days · {t.type}</span><span className="price" style={{ fontSize: 22, marginTop: "auto" }}>{pkr(t.from)}</span></Link>)}</div>
      </section>

      <section className="wrap" style={{ padding: "48px 0 0" }}>
        <div className="grid g2" style={{ background: "var(--navy)", color: "#fff", borderRadius: 18, padding: 36, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><h2 style={{ color: "#fff" }}>Build your own Umrah</h2><p style={{ margin: 0, color: "#C8D3DC" }}>Pick hotels, nights, room type and transport. We price it the same day and send a written quotation on WhatsApp.</p></div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}><a className="btn btn-gold" href={waLink("Assalam o Alaikum, I want to build a custom Umrah package. City, dates, hotels and travellers: ")}>Start on WhatsApp</a><Link className="btn" style={{ background: "var(--navy-2)", color: "#fff" }} href="/hajj">Hajj 2027</Link></div>
        </div>
      </section>

      <section className="wrap grid g3" style={{ padding: "40px 0 0" }}>
        <div className="card" style={{ gap: 10 }}><h3>How booking works</h3><ol className="muted" style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4, fontSize: 15 }}><li>Pick a package or build one, tap WhatsApp.</li><li>We confirm seats and rooms the same day.</li><li>Written quotation, price held 7 days.</li><li>Deposit by bank, JazzCash or Easypaisa.</li><li>Documents, briefing, departure.</li></ol></div>
        <div className="card" style={{ gap: 10 }}><h3>Who you are dealing with</h3><p className="muted" style={{ margin: 0, fontSize: 15 }}>{site.legalName}, NTN {site.ntn}. {site.address}. Partners {site.partners[0].name} and {site.partners[1].name} take every call.</p><Link className="btn btn-line btn-sm" style={{ alignSelf: "flex-start" }} href="/about">Meet the partners</Link></div>
        <div className="card" style={{ gap: 10 }}><h3>Talk to us now</h3>{site.partners.map((p) => <a key={p.wa} href={`tel:+${p.wa}`} style={{ fontWeight: 600 }}>{p.name} · {p.phone}</a>)}<a className="btn btn-wa btn-sm" style={{ alignSelf: "flex-start" }} href={waLink("Assalam o Alaikum")}>WhatsApp</a></div>
      </section>
    </>
  );
}
