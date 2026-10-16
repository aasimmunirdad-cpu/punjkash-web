import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import { db, schema } from "@/db";
import { isAdmin } from "@/lib/admin";
import { fmtDate } from "@/lib/site";
import { updateLead } from "../actions";
const STATUSES = ["new", "contacted", "quoted", "deposit", "booked", "lost"] as const;
export default async function AdminLeads() {
  if (!(await isAdmin())) redirect("/admin/login");
  const rows = await db.select().from(schema.leads).orderBy(desc(schema.leads.createdAt)).limit(200);
  return (
    <>
      <h1 style={{ fontSize: 28 }}>Leads</h1>
      <div style={{ display: "grid", gap: 10 }}>{rows.map((l) => <form key={l.id} action={updateLead} className="card card-body" style={{ gap: 8 }}><input type="hidden" name="id" value={l.id} /><div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}><div><b>{l.name}</b> · {l.phone}{l.city ? ` · ${l.city}` : ""} <span className="small muted">{fmtDate(l.createdAt)}</span><div className="small muted">{l.packageCode ? `${l.packageCode} · ` : ""}{l.travellers ? `${l.travellers} · ` : ""}{l.room ? `${l.room} · ` : ""}{l.pagePath}</div>{l.message && <div className="small">{l.message}</div>}</div><div style={{ display: "flex", gap: 8, alignItems: "end" }}><div className="field"><label>Status</label><select name="status" defaultValue={l.status}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div><div className="field"><label>Assigned</label><select name="assignedTo" defaultValue={l.assignedTo ?? ""}><option value="">—</option><option>Aasim</option><option>Mustafa</option><option>Waseem</option></select></div><button className="btn btn-navy btn-sm">Save</button></div></div></form>)}{!rows.length && <p className="muted">No leads yet.</p>}</div>
    </>
  );
}
