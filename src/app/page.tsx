import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import PackageRow from "@/components/PackageRow";
import { facets, listPackages } from "@/lib/packages";
import { site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";

const services = [
  ["Flights", "/flights", "Worldwide, all airlines, group fares"],
  ["Holidays", "/holidays", "Turkey, Dubai, Azerbaijan, Malaysia"],
  ["Umrah & Hajj", "/umrah", "Packages, custom, Hajj 2027"],
  ["Pakistan tours", "/tours", "Punjab, Kashmir, the north"],
  ["Hotels", "/hotels", "Makkah, Madinah and abroad"],
  ["Visas", "/visas", "Checklists and filing"],
];

export default async function Home() {
  const [{ cities, months }, pkgs] = await Promise.all([facets(), listPackages({}, 6)]);
  return (
    <>
      <section style={{ background: "var(--bg-soft)", padding: "48px 0 40px" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ maxWidth: 780, display: "flex", flexDirection: "column", gap: 12 }}>
            <h1>Flights, holidays, Umrah and Hajj, tours and visas. One place, one honest price.</h1>
            <p className="muted" style={{ margin: 0, fontSize: 19 }}>Search live fares and packages from Lahore, Islamabad, Karachi and Multan, or tell us where you want to go and we build it.</p>
          </div>
          <SearchBox cities={cities} months={months} />
          <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            <div className="stat"><b>All major airlines</b>Saudia, Emirates, Qatar, Turkish, PIA, Airblue, Air Sial</div>
            <div className="stat"><b>Written quotation</b>before any payment</div>
            <div className="stat"><b>Partners you can name</b>{site.partners.map((p) => p.name.replace("Dr ", "")).join(" and ")}</div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ padding: "40px 0 0" }}>
        <div className="grid g6">
          {services.map(([t, h, d]) => (
            <Link key={t} href={h} className="card" style={{ gap: 4 }}><span className="display" style={{ fontWeight: 800, fontSize: 18 }}>{t}</span><span className="muted" style={{ fontSize: 15 }}>{d}</span></Link>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ padding: "48px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}>
          <h2>Umrah departing soon</h2><Link href="/umrah" style={{ color: "var(--blue)", fontWeight: 600 }}>All open departures</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{pkgs.map((p) => <PackageRow key={p.id} p={p} />)}</div>
      </section>

      <section className="wrap" style={{ padding: "48px 0 0" }}>
        <div style={{ background: "var(--navy)", color: "#fff", borderRadius: 18, padding: 36, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28, alignItems: "center" }} className="grid g2">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}><h2 style={{ color: "#fff" }}>Build your own Umrah</h2><p style={{ margin: 0, color: "#C8D3DC" }}>Pick hotels, nights, room type and transport. We price it the same day and send a written quotation on WhatsApp.</p></div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}><a className="btn btn-gold" href={waLink("Assalam o Alaikum, I want to build a custom Umrah package. City, dates, hotels and travellers: ")}>Start on WhatsApp</a><Link className="btn" style={{ background: "var(--navy-2)", color: "#fff" }} href="/hajj">Hajj 2027</Link></div>
        </div>
      </section>

      <section className="wrap grid g2" style={{ padding: "40px 0 0" }}>
        <div className="card" style={{ gap: 14 }}>
          <h3>How booking works</h3>
          <ol className="muted" style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
            <li>Pick a package or build one, then tap WhatsApp.</li><li>We confirm seats with the airline and hotels the same day.</li><li>You get a written quotation, price locked for 7 days.</li><li>Deposit by bank transfer, JazzCash or Easypaisa; send the receipt.</li><li>Documents, briefing, departure. Balance before travel.</li>
          </ol>
        </div>
        <div className="card" style={{ gap: 14 }}>
          <h3>Who you are dealing with</h3>
          <p className="muted" style={{ margin: 0 }}>{site.legalName}, NTN {site.ntn}, {site.address}. Partners {site.partners[0].name} and {site.partners[1].name} take every call themselves.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><Link className="btn btn-line btn-sm" href="/about">Meet the partners</Link><Link className="btn btn-line btn-sm" href="/contact">Office and contact</Link></div>
        </div>
      </section>
    </>
  );
}
