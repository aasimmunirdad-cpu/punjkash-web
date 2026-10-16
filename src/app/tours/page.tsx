import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SampleNote from "@/components/SampleNote";
import { tours } from "@/lib/catalog";
import { tourImg } from "@/lib/img";

export const metadata: Metadata = { title: "Tours of Punjab, Kashmir and northern Pakistan", description: "Lahore, Neelum Valley, Hunza, Skardu, Swat, Naran and south Punjab, with PunjKash's own itineraries, private or group." };
type SP = Record<string, string | undefined>;

export default async function Tours({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  let list = tours.filter((t) => (!sp.region || t.region === sp.region) && (!sp.type || t.type === sp.type));
  if (sp.days) { const [lo, hi] = sp.days.split("-").map(Number); list = list.filter((t) => t.days >= lo && t.days <= hi); }
  return (
    <>
      <PageHero img="hunza" alt="Hunza valley" title="Punjab, Kashmir and the north, planned by people from here" intro="The name is Punjab plus Kashmir. Our own itineraries, hosts we know by name, transport, hotels and guides priced together." tab="tours" />
      <section className="section wrap" style={{ display: "grid", gap: 14, paddingBottom: 48 }}>
        <SampleNote />
        <div className="grid g4">
          {list.map((t) => (
            <Link key={t.slug} href={`/tours/${t.slug}`} className="card">
              <div className="card-photo"><img src={tourImg(t.slug)} alt={t.title} loading="lazy" width={800} height={600} /></div>
              <div className="card-body"><div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><span className="chip">{t.region}</span><span className="chip">{t.days} days · {t.type}</span></div><h3>{t.title}</h3><span className="small muted">{t.season}</span><div style={{ marginTop: "auto" }}><div className="tiny muted">Per person from</div><div className="price" style={{ fontSize: 22 }}><small>PKR</small> {t.from.toLocaleString("en-PK")}</div></div></div>
            </Link>
          ))}
        </div>
        {!list.length && <div className="card card-body" style={{ textAlign: "center", padding: 28 }}><h3>Nothing matches yet</h3><p className="muted"><Link href="/tours" className="more">See all tours</Link></p></div>}
      </section>
    </>
  );
}
