import Link from "next/link";
import PackageRow from "@/components/PackageRow";
import PageHero from "@/components/PageHero";
import SampleNote from "@/components/SampleNote";
import { listPackages } from "@/lib/packages";
import { flightRoutes, holidays } from "@/lib/catalog";
import { holidayImg } from "@/lib/img";

export const dynamic = "force-dynamic";
export const metadata = { title: "Special offers and last seats", description: "Umrah departures within 30 days, last seats, bumper fares and holiday deals from PunjKash." };

export default async function Offers() {
  const all = await listPackages({}, 100);
  const cutoff = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);
  const umrah = all.filter((p) => p.departDate <= cutoff || p.discountBadge || (p.seats != null && p.seats <= 10)).slice(0, 6);
  const fares = flightRoutes.filter((f) => f.note || f.fare < 80000).slice(0, 4);
  const hols = holidays.slice(0, 3);
  return (
    <>
      <PageHero img="maldives" alt="Maldives" title="Special offers and last seats" intro="Departures within 30 days, packages with a few seats left, bumper fares and this month's holiday deals." />
      <div className="wrap section" style={{ display: "grid", gap: 28, paddingBottom: 48 }}>
        <div style={{ display: "grid", gap: 12 }}><h2>Umrah, departing soon</h2>{umrah.map((p, i) => <PackageRow key={p.id} p={p} photo={i % 2 ? "/img/madinah-800.webp" : "/img/makkah-800.webp"} />)}{!umrah.length && <p className="muted">Nothing within 30 days right now. <Link href="/umrah" className="more">See all departures</Link></p>}</div>
        <SampleNote what="Fares and holiday prices" />
        <div style={{ display: "grid", gap: 12 }}><h2>Bumper fares</h2><div className="grid g4">{fares.map((f) => <Link key={f.fromIata + f.toIata} href={`/flights?from=${f.fromIata}&to=${f.to}`} className="card card-body"><span className="chip" style={{ alignSelf: "flex-start" }}>{f.airline}</span><h3>{f.from} <span className="faint">→</span> {f.to}</h3><div className="price" style={{ fontSize: 22 }}><small>PKR</small> {f.fare.toLocaleString("en-PK")}</div></Link>)}</div></div>
        <div style={{ display: "grid", gap: 12 }}><h2>Holiday deals</h2><div className="grid g3">{hols.map((h) => <Link key={h.slug} href={`/holidays/${h.slug}`} className="card"><div className="card-photo"><img src={holidayImg(h.slug)} alt={h.city} loading="lazy" width={800} height={600} /></div><div className="card-body"><h3>{h.title}</h3><div className="small muted">{h.nights} nights · {h.highlight}</div><div className="price" style={{ fontSize: 22 }}><small>from PKR</small> {h.from.toLocaleString("en-PK")}</div></div></Link>)}</div></div>
      </div>
    </>
  );
}
