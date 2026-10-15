import type { Metadata } from "next";
import Link from "next/link";
import SampleNote from "@/components/SampleNote";
import { tours } from "@/lib/catalog";
import { pkr } from "@/lib/site";

export const metadata: Metadata = { title: "Tours of Punjab, Kashmir and northern Pakistan", description: "Lahore, Neelum Valley, Hunza, Skardu, Swat, Naran and south Punjab, with PunjKash's own itineraries, private or group." };

export default function Tours() {
  return (
    <>
      <section style={{ background: "var(--bg-soft)", padding: "32px 0" }}><div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 10 }}><h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>Punjab, Kashmir and the north, planned by people from here</h1><p className="muted" style={{ margin: 0, fontSize: 18 }}>The name is Punjab plus Kashmir. Our own itineraries, hosts we know by name, transport, hotels and guides priced together.</p></div></section>
      <section className="wrap" style={{ padding: "28px 0 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <SampleNote />
        <div className="grid g4">
          {tours.map((t) => (
            <Link key={t.slug} href={`/tours/${t.slug}`} className="card" style={{ gap: 8 }}>
              <div className="photo" style={{ height: 150 }}>Photo: {t.title}</div>
              <div style={{ display: "flex", gap: 8 }}><span className="tag">{t.region}</span><span className="tag tag-gold">{t.days} days</span></div>
              <h3 style={{ fontSize: 20 }}>{t.title}</h3>
              <div className="muted" style={{ fontSize: 14 }}>{t.type} · {t.season}</div>
              <div style={{ marginTop: "auto" }}><div className="faint" style={{ fontSize: 13 }}>Per person from</div><div className="price" style={{ fontSize: 22 }}>{pkr(t.from)}</div></div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
