import Link from "next/link";
import { waLink } from "@/lib/site";

export default function ServicePage({ title, intro, points, waText, status }: { title: string; intro: string; points: string[]; waText: string; status?: string }) {
  return (
    <div className="wrap" style={{ padding: "48px 0", display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <h1 style={{ fontSize: "clamp(30px,4vw,44px)" }}>{title}</h1>
        <p className="muted" style={{ margin: 0, fontSize: 19 }}>{intro}</p>
        {status && <div className="notice">{status}</div>}
        <ul className="muted" style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>{points.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
      <aside className="card" style={{ gap: 12, alignSelf: "start" }}>
        <h3 style={{ fontSize: 18 }}>Tell us what you need</h3>
        <p className="muted" style={{ margin: 0 }}>Send dates, travellers and where you want to go. We price it and send a written quotation.</p>
        <a className="btn btn-wa" href={waLink(waText)}>Message on WhatsApp</a>
        <Link className="btn btn-line" href="/umrah">See Umrah packages</Link>
      </aside>
      <style>{`@media(max-width:900px){.wrap[style*="360px"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
