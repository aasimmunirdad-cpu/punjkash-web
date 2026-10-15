import type { Metadata } from "next";
import Link from "next/link";
import SampleNote from "@/components/SampleNote";
import { holidays } from "@/lib/catalog";
import { pkr } from "@/lib/site";

export const metadata: Metadata = { title: "Holiday packages from Pakistan", description: "Dubai, Istanbul, Baku, Kuala Lumpur, Bangkok, Maldives, Sri Lanka, Egypt and more. Flights, hotels, transfers and visa support in one quotation from PunjKash, Lahore." };

export default function Holidays() {
  const regions = [...new Set(holidays.map((h) => h.region))];
  return (
    <>
      <section style={{ background: "var(--bg-soft)", padding: "32px 0" }}><div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 10 }}><h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>Holidays abroad, flights and hotels together</h1><p className="muted" style={{ margin: 0, fontSize: 18 }}>Every package below includes return flights from Pakistan, hotel with breakfast, transfers and the visa support we offer for that country.</p></div></section>
      <section className="wrap" style={{ padding: "28px 0 0", display: "flex", flexDirection: "column", gap: 28 }}>
        <SampleNote />
        {regions.map((reg) => (
          <div key={reg} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h2>{reg}</h2>
            <div className="grid g3">
              {holidays.filter((h) => h.region === reg).map((h) => (
                <Link key={h.slug} href={`/holidays/${h.slug}`} className="card" style={{ gap: 8 }}>
                  <div className="photo" style={{ height: 160 }}>Photo: {h.city}</div>
                  <div style={{ display: "flex", gap: 8 }}><span className="tag">{h.country}</span><span className="tag tag-gold">{h.nights} nights</span></div>
                  <h3>{h.title}</h3>
                  <div className="muted" style={{ fontSize: 15 }}>{h.highlight}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: "auto" }}><div><div className="faint" style={{ fontSize: 13 }}>Per person from</div><div className="price">{pkr(h.from)}</div></div><span className="btn btn-line btn-sm">View</span></div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
