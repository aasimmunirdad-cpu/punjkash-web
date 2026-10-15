import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SampleNote from "@/components/SampleNote";
import LeadForm from "@/components/LeadForm";
import { holidays } from "@/lib/catalog";
import { pkr, site, waLink } from "@/lib/site";

export function generateStaticParams() { return holidays.map((h) => ({ slug: h.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = holidays.find((x) => x.slug === slug);
  return h ? { title: `${h.title}, ${h.nights} nights from ${pkr(h.from)}`, description: `${h.city}, ${h.country}. ${h.includes.join(", ")}. Book with PunjKash, Lahore.` } : {};
}

export default async function Holiday({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = holidays.find((x) => x.slug === slug);
  if (!h) notFound();
  const wa = waLink(`Assalam o Alaikum, I am interested in the ${h.title} holiday (${h.nights} nights). Travellers: __ Dates: __`);
  return (
    <div className="wrap" style={{ padding: "28px 0 0", display: "flex", flexDirection: "column", gap: 24 }}>
      <nav className="faint" style={{ fontSize: 14 }}><Link href="/">Home</Link> › <Link href="/holidays">Holidays</Link> › {h.country}</nav>
      <div className="grid g2" style={{ gridTemplateColumns: "minmax(0,1fr) 380px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 8 }}><span className="tag">{h.country}</span><span className="tag tag-gold">{h.nights} nights</span><span className="tag" style={{ background: "#EEF2F5", color: "var(--muted)" }}>{h.stars}</span></div>
          <h1 style={{ fontSize: "clamp(28px,4vw,42px)" }}>{h.title}</h1>
          <div className="photo" style={{ height: 320 }}>Photo: {h.city}</div>
          <SampleNote />
          <div className="card" style={{ gap: 10 }}><h3>What is included</h3><ul className="muted" style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>{h.includes.map((i) => <li key={i}>{i}</li>)}</ul></div>
          <div className="grid g2"><div className="card"><span className="faint" style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase" }}>Hotel</span><h3>{h.hotel}</h3><span className="muted">{h.city}</span></div><div className="card"><span className="faint" style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase" }}>Departures</span><h3>{h.departures.join(", ")}</h3><span className="muted">From Lahore, Islamabad or Karachi</span></div></div>
        </div>
        <aside style={{ display: "flex", flexDirection: "column", gap: 16, alignSelf: "start", position: "sticky", top: 90 }}>
          <div className="card" style={{ gap: 14, borderColor: "var(--gold)" }}><div><span className="faint" style={{ fontSize: 13 }}>Per person, twin sharing, from</span><div className="price" style={{ fontSize: 32 }}>{pkr(h.from)}</div></div><a className="btn btn-wa" href={wa}>Get this quote on WhatsApp</a><a className="btn btn-line" href={`tel:+${site.partners[0].wa}`}>Call {site.partners[0].phone}</a></div>
          <div className="card" style={{ gap: 12 }}><h3 style={{ fontSize: 18 }}>Or send an enquiry</h3><LeadForm code={`HOL-${h.slug}`} pagePath={`/holidays/${h.slug}`} /></div>
        </aside>
      </div>
    </div>
  );
}
