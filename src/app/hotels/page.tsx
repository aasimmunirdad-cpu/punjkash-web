import type { Metadata } from "next";
import SampleNote from "@/components/SampleNote";
import { hotelOffers } from "@/lib/catalog";
import { pkr, waLink } from "@/lib/site";

export const metadata: Metadata = { title: "Hotels in Makkah, Madinah and abroad", description: "Hotel-only bookings in Makkah and Madinah by distance from the Haram, and hotels in Dubai, Istanbul, Baku, Gilgit and Skardu, from PunjKash." };

export default function Hotels() {
  const groups = [...new Set(hotelOffers.map((h) => h.city))];
  return (
    <>
      <section style={{ background: "var(--bg-soft)", padding: "32px 0" }}><div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 18 }}><h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>Hotels, by distance, not by star claims</h1>
        <form className="searchbox" method="get"><div className="srow" style={{ gridTemplateColumns: "repeat(4,minmax(0,1fr)) auto" }}>
          <div className="field"><label htmlFor="city">City</label><select id="city" name="city"><option>Makkah</option><option>Madinah</option><option>Dubai</option><option>Istanbul</option><option>Baku</option><option>Skardu</option><option>Gilgit</option></select></div>
          <div className="field"><label htmlFor="in">Check-in</label><input id="in" name="in" type="date" /></div>
          <div className="field"><label htmlFor="out">Check-out</label><input id="out" name="out" type="date" /></div>
          <div className="field"><label htmlFor="rooms">Rooms and guests</label><select id="rooms" name="rooms"><option>1 room, 2 guests</option><option>1 room, 4 guests</option><option>2 rooms, 4 guests</option></select></div>
          <button className="btn btn-gold" type="submit">Search hotels</button></div></form></div></section>
      <section className="wrap" style={{ padding: "28px 0 0", display: "flex", flexDirection: "column", gap: 24 }}>
        <SampleNote what="Nightly rates" />
        {groups.map((city) => (
          <div key={city} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2>{city}</h2>
            {hotelOffers.filter((h) => h.city === city).map((h) => (
              <div key={h.name} className="card pkg-row">
                <div className="photo" style={{ width: 160, height: 100, flex: "none" }}>Photo</div>
                <div className="body"><h3>{h.name}</h3><div className="muted" style={{ fontSize: 15 }}>{h.distance} · {h.type} · {h.board}</div></div>
                <div className="side"><div style={{ textAlign: "right" }}><div className="faint" style={{ fontSize: 13 }}>Per night from</div><div className="price">{pkr(h.perNight)}</div></div><a className="btn btn-wa btn-sm" href={waLink(`Assalam o Alaikum, I want to book ${h.name}, ${h.city}. Dates: __ Rooms: __`)}>Check dates</a></div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
