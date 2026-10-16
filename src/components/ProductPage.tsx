import Link from "next/link";
import { I } from "./Icons";
import { site, waLink } from "@/lib/site";

type Props = {
  crumbs: [string, string][]; chips: string[]; title: string; sub?: string; images: string[]; alt: string;
  price: number; priceNote: string; reserveHref: string; waText: string; sampleNote?: boolean;
  children: React.ReactNode;
};
export default function ProductPage({ crumbs, chips, title, sub, images, alt, price, priceNote, reserveHref, waText, children }: Props) {
  return (
    <div className="wrap" style={{ padding: "16px 16px 48px", display: "grid", gap: 24 }}>
      <nav className="small faint">{crumbs.map(([l, h], i) => <span key={h}>{i > 0 && " › "}<Link href={h}>{l}</Link></span>)} › {title}</nav>
      <div className="gallery">{images.slice(0, 3).map((src, i) => <img key={src + i} src={src} alt={i === 0 ? alt : ""} loading={i ? "lazy" : "eager"} />)}</div>
      <div className="product">
        <div style={{ display: "grid", gap: 20 }}>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
            <h1 style={{ fontSize: "clamp(26px,3.6vw,40px)" }}>{title}</h1>
            {sub && <p className="muted">{sub}</p>}
          </div>
          {children}
        </div>
        <aside className="sticky-side" style={{ display: "grid", gap: 14 }}>
          <div className="card card-body" style={{ borderColor: "var(--gold)", gap: 12 }}>
            <div><div className="tiny muted">{priceNote}</div><div className="price" style={{ fontSize: 32 }}><small>PKR</small> {price.toLocaleString("en-PK")}</div></div>
            <Link className="btn btn-gold btn-block" href={reserveHref}>Reserve</Link>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><a className="btn btn-wa btn-sm" href={waLink(waText)}><I.wa /> WhatsApp</a><a className="btn btn-line btn-sm" href={`tel:+${site.partners[0].wa}`}><I.phone /> Call</a></div>
            <span className="tiny muted">Deposit 25% to hold. Balance 30 days before travel. Written confirmation with a PK reference at once.</span>
          </div>
        </aside>
      </div>
      <div className="action-bar"><div><div className="tiny muted">{priceNote}</div><div className="price" style={{ fontSize: 20 }}><small>PKR</small> {price.toLocaleString("en-PK")}</div></div><div style={{ display: "flex", gap: 8 }}><a className="btn btn-wa btn-sm" href={waLink(waText)} aria-label="WhatsApp"><I.wa /></a><Link className="btn btn-gold btn-sm" href={reserveHref}>Reserve</Link></div></div>
    </div>
  );
}
