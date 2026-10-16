import { redirect } from "next/navigation";
import { desc, ilike, inArray, or } from "drizzle-orm";
import { db, schema } from "@/db";
import { isAdmin } from "@/lib/admin";
import { fmtDate, waLink } from "@/lib/site";
import { updateBooking } from "../actions";

const STATUSES = ["reserved", "deposit_pending", "deposit_received", "confirmed", "cancelled"] as const;
export default async function AdminBookings({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; saved?: string }> }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { q, status, saved } = await searchParams;
  const where = q ? or(ilike(schema.bookings.ref, `%${q}%`), ilike(schema.bookings.phone, `%${q}%`), ilike(schema.bookings.leadName, `%${q}%`)) : status === "pending" ? inArray(schema.bookings.status, ["reserved", "deposit_pending"]) : status ? inArray(schema.bookings.status, [status as typeof STATUSES[number]]) : undefined;
  const rows = await db.select().from(schema.bookings).where(where).orderBy(desc(schema.bookings.createdAt)).limit(200);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}><h1 style={{ fontSize: 28 }}>Bookings</h1><form method="get" style={{ display: "flex", gap: 8 }}><input name="q" defaultValue={q ?? ""} placeholder="Ref, phone or name" style={{ minHeight: 40, border: "1.5px solid var(--line-2)", borderRadius: 10, padding: "0 10px" }} /><select name="status" defaultValue={status ?? ""} style={{ minHeight: 40, border: "1.5px solid var(--line-2)", borderRadius: 10, padding: "0 10px" }}><option value="">All</option><option value="pending">Needs action</option>{STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}</select><button className="btn btn-navy btn-sm">Go</button></form></div>
      {saved && <div className="notice">Saved booking #{saved}.</div>}
      <div style={{ display: "grid", gap: 12 }}>
        {rows.map((b) => (
          <form key={b.id} action={updateBooking} className="card card-body" style={{ gap: 10 }}>
            <input type="hidden" name="id" value={b.id} />
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}><div><b style={{ fontSize: 18 }}>{b.ref}</b> <span className="chip">{b.product}</span> <span className="small muted">{fmtDate(b.createdAt)}</span><div>{b.title}{b.room ? ` · ${b.room}` : ""} · {b.adults}A {b.children}C {b.infants}I</div><div className="small muted">{String(b.details?.sub ?? "")}</div></div><div style={{ textAlign: "right" }}><div className="tiny muted">Total / deposit</div><div className="price" style={{ fontSize: 18 }}>{b.total.toLocaleString("en-PK")} / {b.deposit.toLocaleString("en-PK")}</div></div></div>
            <div className="small"><b>{b.leadName}</b> · <a className="more" href={`tel:+92${b.phone.replace(/\D/g, "").replace(/^0/, "")}`}>{b.phone}</a> · <a className="more" href={waLink(`Assalam o Alaikum ${b.leadName}, this is PunjKash about your booking ${b.ref}.`).replace(/wa\.me\/\d+/, `wa.me/92${b.phone.replace(/\D/g, "").replace(/^0/, "")}`)}>WhatsApp</a>{b.email ? ` · ${b.email}` : ""}{b.city ? ` · ${b.city}` : ""}<div className="muted">Travellers: {b.travellers.map((t) => `${t.name || "?"} (${t.type[0]})`).join(", ")}</div>{b.payRef && <div className="muted">Reported: {b.payMethod} {b.payRef}, PKR {b.paid.toLocaleString("en-PK")}</div>}{b.notes && <div className="muted">Customer note: {b.notes}</div>}</div>
            <div className="grid g4" style={{ gap: 8, alignItems: "end" }}>
              <div className="field"><label>Status</label><select name="status" defaultValue={b.status}>{STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}</select></div>
              <div className="field"><label>Paid, verified (PKR)</label><input name="paid" type="number" defaultValue={b.paid} /></div>
              <div className="field" style={{ gridColumn: "span 2" }}><label>Internal notes</label><input name="notes" defaultValue={b.notes ?? ""} /></div>
            </div>
            <button className="btn btn-navy btn-sm" style={{ justifySelf: "start" }}>Save</button>
          </form>
        ))}
        {!rows.length && <p className="muted">No bookings match.</p>}
      </div>
    </>
  );
}
