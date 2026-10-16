import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPage from "@/components/ProductPage";
import SampleNote from "@/components/SampleNote";
import { I } from "@/components/Icons";
import { tours } from "@/lib/catalog";
import { tourImg } from "@/lib/img";
import { pkr } from "@/lib/site";

export function generateStaticParams() { return tours.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const t = tours.find((x) => x.slug === slug);
  return t ? { title: `${t.title}, ${t.days} days from ${pkr(t.from)}`, description: `${t.region}. ${t.highlights.join(", ")}. ${t.type} tour with PunjKash.`, openGraph: { images: [tourImg(t.slug, 1600)] } } : {};
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const t = tours.find((x) => x.slug === slug);
  if (!t) notFound();
  const others = tours.filter((x) => x.slug !== t.slug).slice(0, 2);
  return (
    <ProductPage crumbs={[["Home", "/"], ["Tours", "/tours"]]} chips={[t.region, `${t.days} days`, t.type]} title={t.title} sub={`Best season ${t.season}.`}
      images={[tourImg(t.slug, 1600), ...others.map((o) => tourImg(o.slug))]} alt={t.title}
      price={t.from} priceNote="Per person from" reserveHref={`/reserve?item=TOUR-${t.slug}&price=${t.from}`} waText={`Assalam o Alaikum, I am interested in the ${t.title} tour (${t.days} days).`}>
      <SampleNote />
      <div className="card card-body"><h3>Highlights</h3><ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "grid", gap: 6 }}>{t.highlights.map((i) => <li key={i} style={{ display: "flex", gap: 8 }}><span style={{ color: "var(--green)", flex: "none" }}><I.check /></span>{i}</li>)}</ul></div>
      <div className="card card-body"><h3>Included</h3><p className="small muted">Transport from Lahore or Islamabad, hotel stays with breakfast, a guide where listed, and all road tolls and parking. Meals on the road, entry tickets and jeep hire where needed are stated on your confirmation.</p><p className="tiny faint">Weather and road conditions can change an itinerary in the north; we tell you before departure.</p></div>
    </ProductPage>
  );
}
