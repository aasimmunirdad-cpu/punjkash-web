import type { Metadata } from "next";
import SampleNote from "@/components/SampleNote";
import { airlines, flightRoutes } from "@/lib/catalog";
import { pkr, waLink } from "@/lib/site";

export const metadata: Metadata = { title: "Flights from Pakistan, all airlines", description: "Air tickets from Lahore, Islamabad, Karachi and Multan on Saudia, Emirates, Qatar, Turkish, PIA, Airblue and Air Sial. International and domestic, group fares and bumper offers." };

type SP = Record<string, string | undefined>;

export default async function Flights({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const from = sp.from ?? ""; const to = sp.to ?? ""; const cabin = sp.cabin ?? "";
  const cities = [...new Set(flightRoutes.map((r) => r.from))];
  const dests = [...new Set(flightRoutes.map((r) => r.to))].sort();
  let rows = flightRoutes.filter((r) => (!from || r.from === from) && (!to || r.to === to) && (!cabin || r.cabin === cabin));
  rows = [...rows].sort((a, b) => a.fare - b.fare);
  const intl = rows.filter((r) => !["ISB", "KHI", "LHE", "KDU", "GIL"].includes(r.toIata));
  const dom = rows.filter((r) => ["ISB", "KHI", "LHE", "KDU", "GIL"].includes(r.toIata));
  const Row = ({ r }: { r: typeof rows[number] }) => (
    <div className="card pkg-row">
      <div className="body">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><span className="tag">{r.airline}</span><span className="tag tag-gold">{r.stops}</span><span className="tag" style={{ background: "#EEF2F5", color: "var(--muted)" }}>{r.cabin}</span></div>
        <h3>{r.from} ({r.fromIata}) to {r.to} ({r.toIata})</h3>
        <div className="muted" style={{ fontSize: 15 }}>Return fare per adult, taxes included{r.note ? ` · ${r.note}` : ""}</div>
      </div>
      <div className="side"><div style={{ textAlign: "right" }}><div className="faint" style={{ fontSize: 13 }}>From</div><div className="price">{pkr(r.fare)}</div></div><a className="btn btn-wa btn-sm" href={waLink(`Assalam o Alaikum, I want a flight quote: ${r.from} to ${r.to} return, ${r.airline}, ${r.cabin}. Dates: __ Travellers: __`)}>Get dates and price</a></div>
    </div>
  );
  return (
    <>
      <section style={{ background: "var(--bg-soft)", padding: "32px 0" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>Flights from Pakistan, every airline</h1>
          <form className="searchbox" method="get">
            <div className="srow" style={{ gridTemplateColumns: "repeat(5,minmax(0,1fr)) auto" }}>
              <div className="field"><label htmlFor="from">Flying from</label><select id="from" name="from" defaultValue={from}><option value="">Any city</option>{cities.map((c) => <option key={c}>{c}</option>)}</select></div>
              <div className="field"><label htmlFor="to">Flying to</label><select id="to" name="to" defaultValue={to}><option value="">Anywhere</option>{dests.map((c) => <option key={c}>{c}</option>)}</select></div>
              <div className="field"><label htmlFor="dep">Departure</label><input id="dep" name="dep" type="date" defaultValue={sp.dep ?? ""} /></div>
              <div className="field"><label htmlFor="ret">Return</label><input id="ret" name="ret" type="date" defaultValue={sp.ret ?? ""} /></div>
              <div className="field"><label htmlFor="cabin">Cabin</label><select id="cabin" name="cabin" defaultValue={cabin}><option value="">Any</option><option>Economy</option><option>Business</option></select></div>
              <button className="btn btn-gold" type="submit">Search flights</button>
            </div>
            <div className="faint" style={{ fontSize: 13 }}>Airlines: {airlines.join(", ")}</div>
          </form>
        </div>
      </section>
      <section className="wrap" style={{ padding: "28px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
        <SampleNote what="Fares" />
        <h2>International, {intl.length} route{intl.length === 1 ? "" : "s"}</h2>
        {intl.map((r) => <Row key={r.fromIata + r.toIata + r.airline + r.cabin} r={r} />)}
        {dom.length > 0 && <><h2 style={{ marginTop: 16 }}>Domestic</h2>{dom.map((r) => <Row key={r.fromIata + r.toIata + r.airline} r={r} />)}</>}
        {!rows.length && <div className="notice">No sample fare on that route yet. Message us and we quote it the same day.</div>}
      </section>
    </>
  );
}
