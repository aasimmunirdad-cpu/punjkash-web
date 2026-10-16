import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SampleNote from "@/components/SampleNote";
import { visas } from "@/lib/catalog";

export const metadata: Metadata = { title: "Visa support from Pakistan", description: "Umrah, UAE, Turkey, Azerbaijan, Malaysia, Thailand, Sri Lanka, Egypt, UK and Schengen visa checklists, fees and processing times from PunjKash, Lahore." };
type SP = Record<string, string | undefined>;

export default async function Visas({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams; const q = (sp.country ?? "").trim().toLowerCase();
  const list = visas.filter((v) => !q || v.country.toLowerCase().includes(q) || (q === "dubai" && v.country === "UAE"));
  return (
    <>
      <PageHero img="london" alt="London" title="Visa support, with the checklist before the fee" intro="Which documents, how long, and what it costs, stated before you commit. Embassy fees are shown apart from our service fee." tab="visas" />
      <section className="section wrap" style={{ display: "grid", gap: 14, paddingBottom: 48 }}>
        <SampleNote what="Fees" />
        <div className="grid g2">
          {list.map((v) => (
            <div key={v.country} className="card card-body">
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}><span className="chip">{v.type}</span><span className="chip chip-green">{v.days}</span></div>
              <h3>{v.country}</h3>
              <div className="small muted">Documents: {v.docs.join(", ")}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: "auto", gap: 10, flexWrap: "wrap" }}>
                <div><div className="tiny muted">Embassy {v.fee.toLocaleString("en-PK")}{v.service ? ` + service ${v.service.toLocaleString("en-PK")}` : ", no service fee with a package"}</div><div className="price" style={{ fontSize: 22 }}><small>PKR</small> {(v.fee + v.service).toLocaleString("en-PK")}</div></div>
                <a className="btn btn-gold btn-sm" href={`/reserve?item=VISA-${encodeURIComponent(v.country)}&price=${v.fee + v.service}`}>Start application</a>
              </div>
            </div>
          ))}
        </div>
        {!list.length && <div className="card card-body" style={{ textAlign: "center", padding: 28 }}><h3>We have not listed {sp.country} yet</h3><p className="muted">Start an application and we send the checklist for that country within the day.</p><a className="btn btn-gold" style={{ justifySelf: "center" }} href={`/reserve?item=VISA-${encodeURIComponent(sp.country ?? "")}&price=0`}>Start application</a></div>}
      </section>
    </>
  );
}
