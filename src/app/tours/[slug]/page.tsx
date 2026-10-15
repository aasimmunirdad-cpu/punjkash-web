import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SampleNote from "@/components/SampleNote";
import LeadForm from "@/components/LeadForm";
import { tours } from "@/lib/catalog";
import { pkr, site, waLink } from "@/lib/site";

export function generateStaticParams() { return tours.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = tours.find((x) => x.slug === slug);
  return t ? { title: `${t.title}, ${t.days} days from ${pkr(t.from)}`, description: `${t.region}. ${t.highlights.join(", ")}. ${t.type} tour with PunjKash.` } : {};
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tours.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <div className="wrap" style={{ padding: "28px 0 0", display: "flex", flexDirection: "column", gap: 24 }}>
      <nav className="faint" style={{ fontSize: 14 }}><Link href="/">Home</Link> › <Link href="/tours">Tours</Link> › {t.region}</nav>
      <div className="grid g2" style={{ gridTemplateColumns: "minmax(0,1fr) 380px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", gap: 8 }}><span className="tag">{t.region}</span><span className="tag tag-gold">{t.days} days</span><span className="tag" style={{ background: "#EEF2F5", color: "var(--muted)" }}>{t.type}</span></div>
          <h1 style={{ fontSize: "clamp(28px,4vw,42px)" }}>{t.title}</h1>
          <div className="photo" style={{ height: 320 }}>Photo: {t.title}</div>
          <SampleNote />
          <div className="card" style={{ gap: 10 }}><h3>Highlights</h3><ul className="muted" style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>{t.highlights.map((i) => <li key={i}>{i}</li>)}</ul></div>
          <div className="card" style={{ gap: 6 }}><h3>Included</h3><p className="muted" style={{ margin: 0 }}>Transport from Lahore or Islamabad, hotel stays with breakfast, a guide where listed, and all road tolls and parking. Meals on the road, entry tickets and jeep hire where needed are stated per quotation.</p><p className="faint" style={{ margin: 0, fontSize: 14 }}>Best season: {t.season}. Weather and road conditions can change an itinerary; we tell you before departure.</p></div>
        </div>
        <aside style={{ display: "flex", flexDirection: "column", gap: 16, alignSelf: "start", position: "sticky", top: 90 }}>
          <div className="card" style={{ gap: 14, borderColor: "var(--gold)" }}><div><span className="faint" style={{ fontSize: 13 }}>Per person from</span><div className="price" style={{ fontSize: 32 }}>{pkr(t.from)}</div></div><a className="btn btn-wa" href={waLink(`Assalam o Alaikum, I am interested in the ${t.title} tour (${t.days} days). Travellers: __ Dates: __`)}>Plan this on WhatsApp</a><a className="btn btn-line" href={`tel:+${site.partners[0].wa}`}>Call {site.partners[0].phone}</a></div>
          <div className="card" style={{ gap: 12 }}><h3 style={{ fontSize: 18 }}>Or send an enquiry</h3><LeadForm code={`TOUR-${t.slug}`} pagePath={`/tours/${t.slug}`} /></div>
        </aside>
      </div>
    </div>
  );
}
