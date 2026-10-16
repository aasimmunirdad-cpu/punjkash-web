import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { isAdmin } from "@/lib/admin";
import { updatePackage } from "../../actions";

export default async function EditPackage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params; const { saved } = await searchParams;
  const [p] = await db.select().from(schema.packages).where(eq(schema.packages.id, Number(id)));
  if (!p) notFound();
  const [tiers, hotels, [sup]] = await Promise.all([db.select().from(schema.priceTiers).where(eq(schema.priceTiers.packageId, p.id)), db.select().from(schema.hotels).orderBy(asc(schema.hotels.city), asc(schema.hotels.name)), db.select().from(schema.suppliers).where(eq(schema.suppliers.id, p.supplierId))]);
  const t = (k: string) => tiers.find((x) => x.tier === k);
  const F = ({ n, l, v, type = "text", span }: { n: string; l: string; v: string | number | null | undefined; type?: string; span?: number }) => <div className="field" style={span ? { gridColumn: `span ${span}` } : undefined}><label htmlFor={n}>{l}</label><input id={n} name={n} type={type} defaultValue={v ?? ""} /></div>;
  const HotelSel = ({ n, l, v, city }: { n: string; l: string; v: number | null; city: "makkah" | "madinah" }) => <div className="field"><label htmlFor={n}>{l}</label><select id={n} name={n} defaultValue={v ?? ""}><option value="">—</option>{hotels.filter((h) => h.city === city).map((h) => <option key={h.id} value={h.id}>{h.name}{h.distanceM ? ` (${h.distanceM} m)` : h.distanceLabel ? ` (${h.distanceLabel})` : ""}</option>)}</select></div>;
  return (
    <form action={updatePackage} style={{ display: "grid", gap: 16 }}>
      <input type="hidden" name="id" value={p.id} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}><div><Link className="small faint" href="/admin/packages">← Packages</Link><h1 style={{ fontSize: 26 }}>{p.code} <span className="muted" style={{ fontSize: 15, fontWeight: 400 }}>{sup?.name} · ref {p.supplierRef ?? "—"} · {p.priceType}, markup {p.markupPct ?? 0}%</span></h1></div><Link className="btn btn-line btn-sm" href={`/umrah/${p.slug}`} target="_blank">View on site</Link></div>
      {saved && <div className="notice">Saved. The public page is updated.</div>}
      <div className="card card-body"><h3>Status and seats</h3><div className="grid g4" style={{ gap: 10 }}>
        <div className="field"><label htmlFor="status">Status</label><select id="status" name="status" defaultValue={p.status}>{["draft", "open", "few", "sold", "closed", "hidden"].map((s) => <option key={s}>{s}</option>)}</select></div>
        <F n="seats" l="Seats left (blank = unknown)" v={p.seats} type="number" />
        <div className="field"><label>Badge</label><label style={{ display: "flex", gap: 8, alignItems: "center", minHeight: 48, fontWeight: 500, color: "var(--ink)" }}><input type="checkbox" name="discountBadge" defaultChecked={!!p.discountBadge} style={{ width: 20, height: 20 }} /> Discount on call</label></div>
        <F n="sourceNote" l="Source note" v={p.sourceNote} />
      </div></div>
      <div className="card card-body"><h3>Customer prices per person (PKR)</h3><div className="grid g4" style={{ gap: 10 }}>{(["sharing", "quad", "triple", "double"] as const).map((k) => <div key={k} style={{ display: "grid", gap: 6 }}><F n={`price_${k}`} l={`${k} price`} v={t(k)?.customerPrice} type="number" /><F n={`rate_${k}`} l={`${k} supplier rate`} v={t(k)?.supplierRate} type="number" /></div>)}<F n="childWithoutBed" l="Child without bed" v={p.childWithoutBed} type="number" /><F n="infant" l="Infant" v={p.infant} type="number" /></div><p className="tiny muted">Blank price removes that room type from the site.</p></div>
      <div className="card card-body"><h3>Flights and dates</h3><div className="grid g4" style={{ gap: 10 }}><F n="departDate" l="Departure" v={p.departDate} type="date" /><F n="returnDate" l="Return" v={p.returnDate} type="date" /><F n="days" l="Days" v={p.days} type="number" /><F n="airline" l="Airline" v={p.airline} /><F n="flightOut" l="Flight out" v={p.flightOut} span={2} /><F n="flightBack" l="Flight back" v={p.flightBack} span={2} /></div></div>
      <div className="card card-body"><h3>Hotels and ground</h3><div className="grid g4" style={{ gap: 10 }}><HotelSel n="hotelMakkahId" l="Makkah hotel" v={p.hotelMakkahId} city="makkah" /><F n="nightsMakkah" l="Nights Makkah" v={p.nightsMakkah} type="number" /><HotelSel n="hotelMadinahId" l="Madinah hotel" v={p.hotelMadinahId} city="madinah" /><F n="nightsMadinah" l="Nights Madinah" v={p.nightsMadinah} type="number" /><F n="transport" l="Transport" v={p.transport} span={2} /><F n="luggage" l="Luggage" v={p.luggage} span={2} /></div></div>
      <div className="card card-body"><h3>Inclusions, one per line</h3><div className="field"><textarea name="inclusions" rows={6} defaultValue={(p.inclusions ?? []).join("\n")} /></div></div>
      <button className="btn btn-gold" style={{ justifySelf: "start" }}>Save package</button>
    </form>
  );
}
