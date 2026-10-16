import { site, waLink } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import { I } from "@/components/Icons";
export const metadata = { title: "Contact PunjKash, Lahore", description: "Call or WhatsApp Dr Aasim Munir Dad 0300 9395444 or Ghulam Mustafa 0324 4948850. Office: 12 Commercial, Sector G, DHA Phase 1, Lahore." };
export default function Page() {
  return <div className="wrap section product" style={{ paddingBottom: 48 }}>
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: "clamp(28px,4vw,42px)" }}>Talk to a director, not a call centre</h1>
      {site.partners.map((p, i) => <div key={p.wa} className="card card-body"><h3>{p.name}</h3><span className="muted">{p.role}</span><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><a className="btn btn-wa btn-sm" href={waLink("Assalam o Alaikum", i)}><I.wa /> WhatsApp {p.phone}</a><a className="btn btn-line btn-sm" href={`tel:+${p.wa}`}><I.phone /> Call</a></div></div>)}
      <div className="card card-body"><h3>Office</h3><span className="muted">{site.address}</span><a href={`mailto:${site.email}`} className="more" style={{ justifySelf: "start" }}>{site.email}</a><span className="small faint">Visits by appointment. WhatsApp any time; calls 11:00 to 23:00.</span></div>
    </div>
    <aside className="sticky-side card card-body"><h3>Send an enquiry</h3><LeadForm pagePath="/contact" /></aside>
  </div>;
}
