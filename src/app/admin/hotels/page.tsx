import { redirect } from "next/navigation";
import { asc } from "drizzle-orm";
import { db, schema } from "@/db";
import { isAdmin } from "@/lib/admin";
import { updateHotel } from "../actions";
export default async function AdminHotels() {
  if (!(await isAdmin())) redirect("/admin/login");
  const rows = await db.select().from(schema.hotels).orderBy(asc(schema.hotels.city), asc(schema.hotels.name));
  return (
    <>
      <h1 style={{ fontSize: 28 }}>Hotels <span className="muted" style={{ fontSize: 16, fontWeight: 400 }}>{rows.length}</span></h1>
      <p className="small muted">Distance in metres is measured to the nearest Haram gate and shown on every package using the hotel. Leave metres blank for shuttle hotels and write the label instead.</p>
      <div style={{ display: "grid", gap: 8 }}>{rows.map((h) => <form key={h.id} action={updateHotel} className="card card-body" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1.4fr 1fr auto", gap: 8, alignItems: "end" }}><input type="hidden" name="id" value={h.id} /><div><span className="chip">{h.city}</span> <b>{h.name}</b>{h.aliases?.length ? <div className="tiny muted">also: {h.aliases.join(", ")}</div> : null}</div><div className="field"><label>Metres</label><input name="distanceM" type="number" defaultValue={h.distanceM ?? ""} /></div><div className="field"><label>Label</label><input name="distanceLabel" defaultValue={h.distanceLabel ?? ""} /></div><div className="field"><label>Source</label><input name="distanceSource" defaultValue={h.distanceSource ?? ""} /></div><button className="btn btn-navy btn-sm">Save</button></form>)}</div>
      <style>{`@media(max-width:800px){form.card-body{grid-template-columns:1fr 1fr!important}form.card-body>div:first-child{grid-column:1/-1}}`}</style>
    </>
  );
}
