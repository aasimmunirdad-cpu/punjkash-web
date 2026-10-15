import Link from "next/link";
import PackageRow from "@/components/PackageRow";
import SampleNote from "@/components/SampleNote";
import { listPackages } from "@/lib/packages";
import { flightRoutes, holidays } from "@/lib/catalog";
import { pkr, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Special offers and last seats", description: "Umrah departures within 30 days, last seats, bumper fares and holiday deals from PunjKash." };

export default async function Offers() {
  const all = await listPackages({}, 100);
  const cutoff = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);
  const umrah = all.filter((p) => p.departDate <= cutoff || p.discountBadge || (p.seats != null && p.seats <= 10));
  const fares = flightRoutes.filter((f) => f.note || f.fare < 80000).slice(0, 4);
  const hols = holidays.slice(0, 3);
  return (
    <div className="wrap" style={{ padding: "40px 0", display: "flex", flexDirection: "column", gap: 28 }}>
      <div><h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>Special offers and last seats</h1><p className="muted" style={{ margin: "8px 0 0" }}>Departures within 30 days, packages with only a few seats, bumper fares and this month's holiday deals.</p></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><h2>Umrah, departing soon</h2>{umrah.map((p) => <PackageRow key={p.id} p={p} />)}{!umrah.length && <p className="muted">Nothing within 30 days right now. <Link href="/umrah">See all departures.</Link></p>}</div>
      <SampleNote what="Fares and holiday prices" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><h2>Bumper fares</h2><div className="grid g4">{fares.map((f) => <div key={f.fromIata + f.toIata} className="card" style={{ gap: 6 }}><span className="tag">{f.airline}</span><h3 style={{ fontSize: 20 }}>{f.from} to {f.to}</h3><div className="price" style={{ fontSize: 22 }}>{pkr(f.fare)}</div><a className="btn btn-wa btn-sm" href={waLink(`Assalam o Alaikum, I want the ${f.from} to ${f.to} fare on ${f.airline}. Dates: __`)}>Ask for dates</a></div>)}</div></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><h2>Holiday deals</h2><div className="grid g3">{hols.map((h) => <Link key={h.slug} href={`/holidays/${h.slug}`} className="card" style={{ gap: 6 }}><div className="photo" style={{ height: 140 }}>Photo: {h.city}</div><h3 style={{ fontSize: 20 }}>{h.title}</h3><div className="muted" style={{ fontSize: 14 }}>{h.nights} nights · {h.highlight}</div><div className="price" style={{ fontSize: 22 }}>{pkr(h.from)}</div></Link>)}</div></div>
    </div>
  );
}
