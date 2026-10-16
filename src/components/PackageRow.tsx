import Link from "next/link";
import type { PackageCard } from "@/lib/packages";
import { fmtDate } from "@/lib/site";
import { I } from "./Icons";

const dist = (h: PackageCard["makkah"]) => (h?.distanceM ? `${h.distanceM} m from Haram` : h?.distanceLabel ?? "");

export default function PackageRow({ p, photo = "/img/makkah-800.webp" }: { p: PackageCard; photo?: string }) {
  const seats = p.seats != null && p.seats <= 10 ? `Only ${p.seats} seats left` : p.status === "few" ? "Few seats left" : null;
  const href = `/umrah/${p.slug}`;
  return (
    <article className="card pkg">
      <Link className="photo" href={href} aria-hidden tabIndex={-1}><img src={photo} alt="" loading="lazy" width={800} height={400} /></Link>
      <div className="body">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span className="chip">{p.days} days</span>
          <span className="chip">{p.nightsMakkah ?? 0}N Makkah · {p.nightsMadinah ?? 0}N Madinah</span>
          {seats && <span className="chip chip-hot">{seats}</span>}
          {p.discountBadge && <span className="chip chip-gold">Discount on call</span>}
        </div>
        <h3><Link href={href}>{fmtDate(p.departDate)} from {p.departureCity}{p.airline ? ` · ${p.airline}` : ""}</Link></h3>
        <div className="small muted" style={{ display: "grid", gap: 2 }}>
          {p.makkah && <span><I.bed /> <b style={{ color: "var(--ink)" }}>{p.makkah.name}</b>, Makkah{dist(p.makkah) ? ` · ${dist(p.makkah)}` : ""}</span>}
          {p.madinah && <span><I.bed /> <b style={{ color: "var(--ink)" }}>{p.madinah.name}</b>, Madinah{dist(p.madinah) ? ` · ${dist(p.madinah)}` : ""}</span>}
        </div>
        <div className="tiny faint">Ref {p.code} · {p.transport ?? "Transport included"} · Umrah visa included</div>
      </div>
      <div className="foot">
        <div>
          <div className="tiny muted">{p.fromTier} room, per person</div>
          <div className="price"><small>PKR</small> {p.fromPrice.toLocaleString("en-PK")}</div>
          {p.tiers.double && p.fromTier !== "double" && <div className="tiny muted">Double {p.tiers.double.toLocaleString("en-PK")}</div>}
        </div>
        <Link className="btn btn-navy btn-sm" href={href}>See details</Link>
      </div>
    </article>
  );
}
