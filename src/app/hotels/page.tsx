import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SampleNote from "@/components/SampleNote";
import { hotelOffers } from "@/lib/catalog";
import { cityImg } from "@/lib/img";

export const metadata: Metadata = { title: "Hotels in Makkah, Madinah and abroad", description: "Hotel-only bookings in Makkah and Madinah by distance from the Haram, and hotels in Dubai, Istanbul, Baku, Gilgit and Skardu, from PunjKash." };
type SP = Record<string, string | undefined>;

export default async function Hotels({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = (sp.city ?? "").trim().toLowerCase();
  const list = hotelOffers.filter((h) => !q || h.city.toLowerCase().includes(q) || h.name.toLowerCase().includes(q));
  const groups = [...new Set(list.map((h) => h.city))];
  const nights = sp.in && sp.out ? Math.max(1, Math.round((new Date(sp.out).getTime() - new Date(sp.in).getTime()) / 864e5)) : 0;
  return (
    <>
      <PageHero img="madinah" alt="Madinah" title="Hotels, by distance, not by star claims" intro="Makkah and Madinah priced by walking distance to the Haram. Dubai, Istanbul, Baku and the north too." tab="hotels" />
      <section className="section wrap" style={{ display: "grid", gap: 24, paddingBottom: 48 }}>
        <SampleNote what="Nightly rates" />
        {groups.map((city) => (
          <div key={city} style={{ display: "grid", gap: 12 }}>
            <h2>{city}</h2>
            {list.filter((h) => h.city === city).map((h) => (
              <div key={h.name} className="card pkg">
                <div className="photo"><img src={cityImg(h.city)} alt="" loading="lazy" width={800} height={400} /></div>
                <div className="body"><div style={{ display: "flex", gap: 6 }}><span className="chip">{h.type}</span><span className="chip">{h.board}</span></div><h3>{h.name}</h3><div className="small muted">{h.distance}</div></div>
                <div className="foot"><div><div className="tiny muted">Per night from</div><div className="price"><small>PKR</small> {h.perNight.toLocaleString("en-PK")}</div>{nights > 0 && <div className="tiny muted">{nights} nights {(h.perNight * nights).toLocaleString("en-PK")}</div>}</div><a className="btn btn-gold btn-sm" href={`/reserve?item=HTL-${encodeURIComponent(h.name)}&price=${h.perNight * (nights || 1)}&in=${sp.in ?? ""}&out=${sp.out ?? ""}&rooms=${sp.rooms ?? 1}&pax=${sp.pax ?? "2-0-0"}`}>Reserve</a></div>
              </div>
            ))}
          </div>
        ))}
        {!list.length && <div className="card card-body" style={{ textAlign: "center", padding: 28 }}><h3>No hotel listed in {sp.city} yet</h3><p className="muted">We book hotels in any city; reserve with the details and we confirm the property.</p><a className="btn btn-gold" style={{ justifySelf: "center" }} href={`/reserve?item=HTL-${encodeURIComponent(sp.city ?? "")}&price=0&in=${sp.in ?? ""}&out=${sp.out ?? ""}`}>Request a hotel</a></div>}
      </section>
    </>
  );
}
