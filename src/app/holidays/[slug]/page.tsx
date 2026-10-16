import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import SampleNote from "@/components/SampleNote";
import { I } from "@/components/Icons";
import { holidays } from "@/lib/catalog";
import { holidayImg } from "@/lib/img";
import { pkr } from "@/lib/site";

export function generateStaticParams() { return holidays.map((h) => ({ slug: h.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const h = holidays.find((x) => x.slug === slug);
  return h ? { title: `${h.title}, ${h.nights} nights from ${pkr(h.from)}`, description: `${h.city}, ${h.country}. ${h.includes.join(", ")}. Reserve online with PunjKash, Lahore.`, openGraph: { images: [holidayImg(h.slug, 1600)] } } : {};
}

export default async function Holiday({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const h = holidays.find((x) => x.slug === slug);
  if (!h) notFound();
  const others = holidays.filter((x) => x.region === h.region && x.slug !== h.slug).slice(0, 2);
  return (
    <ProductPage crumbs={[["Home", "/"], ["Holidays", "/holidays"]]} chips={[h.country, `${h.nights} nights`, h.stars]} title={h.title} sub={`${h.city}. ${h.highlight}.`}
      images={[holidayImg(h.slug, 1600), ...others.map((o) => holidayImg(o.slug)), "/img/dubai-800.webp"]} alt={h.city}
      price={h.from} priceNote="Per person, twin sharing, from" reserveHref={`/reserve?item=HOL-${h.slug}&price=${h.from}`} waText={`Assalam o Alaikum, I am interested in the ${h.title} holiday (${h.nights} nights).`}>
      <SampleNote />
      <div className="card card-body"><h3>What is included</h3><ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: 6 }}>{h.includes.map((i) => <li key={i} style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--green)", flex: "none" }}><I.check /></span>{i}</li>)}</ul></div>
      <div className="grid g2"><div className="card card-body"><div className="tiny muted">Hotel</div><h3>{h.hotel}</h3><span className="small muted">{h.city} · {h.stars}</span></div><div className="card card-body"><div className="tiny muted">Departures</div><h3>{h.departures.join(", ")}</h3><span className="small muted">From Lahore, Islamabad or Karachi</span></div></div>
      <div className="card card-body"><h3>Good to know</h3><p className="small muted">Prices are per person sharing a twin room; single and triple on request. Child prices depend on age and bedding. Visa support is included where listed; embassy fees are shown on your confirmation. Hotels are as named or similar in the same category.</p></div>
    </ProductPage>
  );
}
