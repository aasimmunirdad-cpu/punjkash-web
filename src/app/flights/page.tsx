import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SampleNote from "@/components/SampleNote";
import { I } from "@/components/Icons";
import { airlines, flightRoutes } from "@/lib/catalog";
import { waLink } from "@/lib/site";

export const metadata: Metadata = { title: "Flights from Pakistan, all airlines", description: "Air tickets from Lahore, Islamabad, Karachi and Multan on Saudia, Emirates, Qatar, Turkish, PIA, Airblue and Air Sial. International and domestic, group fares and bumper offers." };
type SP = Record<string, string | undefined>;

export default async function Flights({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const from = sp.from ?? ""; const to = (sp.to ?? "").trim().toLowerCase();
  let rows = flightRoutes.filter((r) => (!from || r.fromIata === from || r.from === from) && (!to || r.to.toLowerCase().includes(to) || r.toIata.toLowerCase() === to));
  rows = [...rows].sort((a, b) => a.fare - b.fare);
  const DOM = ["ISB", "KHI", "LHE", "KDU", "GIL"];
  const intl = rows.filter((r) => !DOM.includes(r.toIata)); const dom = rows.filter((r) => DOM.includes(r.toIata));
  const pax = sp.pax ?? "2-0-0";
  const Row = ({ r }: { r: typeof rows[number] }) => (
    <div className="card pkg" style={{ gridTemplateColumns: "1fr auto" }}>
      <div className="body">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><span className="chip">{r.airline}</span><span className="chip">{r.stops}</span><span className="chip">{r.cabin}</span></div>
        <h3>{r.from} ({r.fromIata}) <span className="faint">→</span> {r.to} ({r.toIata})</h3>
        <div className="small muted">Return, per adult, taxes included{r.note ? ` · ${r.note}` : ""}{sp.depart ? ` · ${sp.depart}${sp.return ? ` to ${sp.return}` : ""}` : ""}</div>
      </div>
      <div className="foot"><div><div className="tiny muted">From</div><div className="price"><small>PKR</small> {r.fare.toLocaleString("en-PK")}</div></div><a className="btn btn-gold btn-sm" href={`/reserve?item=FLT-${r.fromIata}-${r.toIata}-${encodeURIComponent(r.airline)}&price=${r.fare}&pax=${pax}&depart=${sp.depart ?? ""}&return=${sp.return ?? ""}`}>Reserve</a></div>
    </div>
  );
  return (
    <>
      <PageHero img="dubai" alt="Dubai skyline" title="Flights from Pakistan, every airline" intro="Saudia, Emirates, Qatar, Turkish, PIA, Airblue, Air Sial and more. Fares held once reserved." tab="flights" />
      <section className="section wrap" style={{ display: "grid", gap: 14, paddingBottom: 48 }}>
        <SampleNote what="Fares" />
        <h2>International · {intl.length} route{intl.length === 1 ? "" : "s"}</h2>
        {intl.map((r) => <Row key={r.fromIata + r.toIata + r.airline + r.cabin} r={r} />)}
        {dom.length > 0 && <><h2 style={{ marginTop: 10 }}>Domestic</h2>{dom.map((r) => <Row key={r.fromIata + r.toIata + r.airline} r={r} />)}</>}
        {!rows.length && <div className="card card-body" style={{ textAlign: "center", padding: 28 }}><h3>No fare on that route yet</h3><p className="muted">We quote any route the same day.</p><a className="btn btn-wa" style={{ justifySelf: "center" }} href={waLink(`Assalam o Alaikum, I need a flight quote: ${from || "Pakistan"} to ${sp.to || "__"}, ${sp.depart || "dates __"}.`)}><I.wa /> Ask on WhatsApp</a></div>}
        <p className="tiny faint">Airlines we ticket: {airlines.join(", ")}.</p>
      </section>
    </>
  );
}
