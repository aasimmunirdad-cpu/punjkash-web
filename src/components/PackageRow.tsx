import Link from "next/link";
import type { PackageCard } from "@/lib/packages";
import { TIERS } from "@/lib/packages";
import { fmtDate } from "@/lib/site";

const hotelLine = (h: PackageCard["makkah"], nights: number | null, city: string) => {
  if (!h) return null;
  const d = h.distanceM ? `${h.distanceM} m from Haram` : h.distanceLabel ?? "";
  return `${city}: ${h.name}${d ? `, ${d}` : ""}${nights ? `, ${nights} nights` : ""}`;
};

export default function PackageRow({ p }: { p: PackageCard }) {
  const seats = p.seats != null && p.seats <= 10 ? `Only ${p.seats} seats` : p.status === "few" ? "Few seats" : null;
  return (
    <article className="card pkg-row">
      <div className="body">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span className="tag">Ref {p.code}</span><span className="tag tag-gold">{p.days} days</span>
          {seats && <span className="tag tag-few">{seats}</span>}
          {p.discountBadge && <span className="tag tag-gold">Discount available on call</span>}
        </div>
        <h3><Link href={`/umrah/${p.slug}`}>{fmtDate(p.departDate)} · {p.departureCity} to Jeddah{p.airline ? ` · ${p.airline}` : ""}</Link></h3>
        <div className="muted" style={{ fontSize: 15 }}>
          {hotelLine(p.makkah, p.nightsMakkah, "Makkah")}<br />{hotelLine(p.madinah, p.nightsMadinah, "Madinah")}
        </div>
      </div>
      <div className="side">
        <div style={{ textAlign: "right" }}>
          <div className="faint" style={{ fontSize: 13 }}>{TIERS.filter((t) => p.tiers[t] != null).map((t) => t[0].toUpperCase() + t.slice(1)).join(" · ")}, per person</div>
          <div className="price">{TIERS.filter((t) => p.tiers[t] != null).map((t) => p.tiers[t]!.toLocaleString("en-PK")).join(" · ")}</div>
        </div>
        <Link className="btn btn-line" href={`/umrah/${p.slug}`}>View</Link>
      </div>
    </article>
  );
}
