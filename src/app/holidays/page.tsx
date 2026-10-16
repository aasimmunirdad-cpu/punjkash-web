import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SampleNote from "@/components/SampleNote";
import { holidays } from "@/lib/catalog";
import { holidayImg } from "@/lib/img";

export const metadata: Metadata = { title: "Holiday packages from Pakistan", description: "Dubai, Istanbul, Baku, Kuala Lumpur, Bangkok, Maldives, Sri Lanka, Egypt and more. Flights, hotels, transfers and visa support in one price from PunjKash, Lahore." };
type SP = Record<string, string | undefined>;

export default async function Holidays({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  let list = holidays.filter((h) => !sp.region || h.region === sp.region);
  if (sp.nights) { const [lo, hi] = sp.nights.split("-").map(Number); list = list.filter((h) => h.nights >= lo && h.nights <= hi); }
  if (sp.budget) { const [lo, hi] = sp.budget.split("-").map(Number); list = list.filter((h) => h.from >= lo && h.from <= hi); }
  const regions = [...new Set(list.map((h) => h.region))];
  return (
    <>
      <PageHero img="istanbul" alt="Istanbul at sunset" title="Holidays abroad, flights and hotel together" intro="Return flights, hotel with breakfast, transfers and visa support, one price per person." tab="holidays" />
      <section className="section wrap" style={{ display: "grid", gap: 28, paddingBottom: 48 }}>
        <SampleNote />
        {regions.map((reg) => (
          <div key={reg} style={{ display: "grid", gap: 14 }}>
            <h2>{reg}</h2>
            <div className="grid g3">
              {list.filter((h) => h.region === reg).map((h) => (
                <Link key={h.slug} href={`/holidays/${h.slug}`} className="card">
                  <div className="card-photo"><img src={holidayImg(h.slug)} alt={h.city} loading="lazy" width={800} height={600} /></div>
                  <div className="card-body"><div style={{ display: "flex", gap: 6 }}><span className="chip">{h.country}</span><span className="chip">{h.nights} nights · {h.stars}</span></div><h3>{h.title}</h3><span className="small muted">{h.highlight}</span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: "auto" }}><div><div className="tiny muted">Per person from</div><div className="price" style={{ fontSize: 22 }}><small>PKR</small> {h.from.toLocaleString("en-PK")}</div></div><span className="btn btn-navy btn-sm">See details</span></div></div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {!list.length && <div className="card card-body" style={{ textAlign: "center", padding: 28 }}><h3>Nothing matches yet</h3><p className="muted">Try a wider budget or another region, or <Link href="/holidays" className="more">see all holidays</Link>.</p></div>}
      </section>
    </>
  );
}
