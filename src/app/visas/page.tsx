import type { Metadata } from "next";
import SampleNote from "@/components/SampleNote";
import { visas } from "@/lib/catalog";
import { pkr, waLink } from "@/lib/site";

export const metadata: Metadata = { title: "Visa support from Pakistan", description: "Umrah, UAE, Turkey, Azerbaijan, Malaysia, Thailand, Sri Lanka, Egypt, UK and Schengen visa checklists, fees and processing times from PunjKash, Lahore." };

export default function Visas() {
  return (
    <>
      <section style={{ background: "var(--bg-soft)", padding: "32px 0" }}><div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 10 }}><h1 style={{ fontSize: "clamp(28px,4vw,40px)" }}>Visa support, with the checklist before the fee</h1><p className="muted" style={{ margin: 0, fontSize: 18 }}>Which documents, how long, and what it costs, stated before you commit. Embassy fees are shown separately from our service fee.</p></div></section>
      <section className="wrap" style={{ padding: "28px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
        <SampleNote what="Fees" />
        <div className="grid g2">
          {visas.map((v) => (
            <div key={v.country} className="card" style={{ gap: 10 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><span className="tag">{v.type}</span><span className="tag tag-gold">{v.days}</span></div>
              <h3>{v.country}</h3>
              <div className="muted" style={{ fontSize: 15 }}>Documents: {v.docs.join(", ")}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: "auto", gap: 10, flexWrap: "wrap" }}>
                <div><div className="faint" style={{ fontSize: 13 }}>Embassy fee {pkr(v.fee)}{v.service ? ` + service ${pkr(v.service)}` : ", no service fee with a package"}</div><div className="price" style={{ fontSize: 22 }}>{pkr(v.fee + v.service)}</div></div>
                <a className="btn btn-wa btn-sm" href={waLink(`Assalam o Alaikum, I need visa support for ${v.country}. Travel dates: __`)}>Start</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
