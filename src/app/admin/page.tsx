import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { isAdmin } from "@/lib/admin";
import { fmtDate } from "@/lib/site";

export default async function Admin() {
  if (!(await isAdmin())) redirect("/admin/login");
  const [[b], [l], [p], recent] = await Promise.all([
    db.select({ n: sql<number>`count(*)::int`, pending: sql<number>`count(*) filter (where status in ('reserved','deposit_pending'))::int`, paid: sql<number>`coalesce(sum(paid),0)::int` }).from(schema.bookings),
    db.select({ n: sql<number>`count(*)::int`, open: sql<number>`count(*) filter (where status='new')::int` }).from(schema.leads),
    db.select({ n: sql<number>`count(*)::int`, open: sql<number>`count(*) filter (where status in ('open','few'))::int` }).from(schema.packages),
    db.select().from(schema.bookings).orderBy(desc(schema.bookings.createdAt)).limit(8),
  ]);
  const Stat = ({ k, v, h }: { k: string; v: string | number; h: string }) => <Link href={h} className="card card-body"><span className="tiny muted">{k}</span><span className="price" style={{ fontSize: 28 }}>{v}</span></Link>;
  return (
    <>
      <h1 style={{ fontSize: 28 }}>Overview</h1>
      <div className="grid g4"><Stat k="Bookings needing action" v={b.pending} h="/admin/bookings?status=pending" /><Stat k="Deposits reported, PKR" v={b.paid.toLocaleString("en-PK")} h="/admin/bookings" /><Stat k="New leads" v={l.open} h="/admin/leads" /><Stat k="Open packages" v={`${p.open} / ${p.n}`} h="/admin/packages" /></div>
      <h2 style={{ fontSize: 20 }}>Latest bookings</h2>
      <div className="card" style={{ overflowX: "auto" }}><table className="tiers-t" style={{ minWidth: 640 }}><thead><tr><th style={{ padding: "8px 12px" }}>Ref</th><th>Item</th><th>Lead</th><th>Status</th><th>Paid / total</th><th>Made</th></tr></thead><tbody>{recent.map((r) => <tr key={r.id}><td style={{ padding: "10px 12px" }}><Link className="more" href={`/admin/bookings?q=${r.ref}`}>{r.ref}</Link></td><td>{r.title}</td><td>{r.leadName}<div className="tiny muted">{r.phone}</div></td><td><span className="chip">{r.status.replace("_", " ")}</span></td><td>{r.paid.toLocaleString("en-PK")} / {r.total.toLocaleString("en-PK")}</td><td className="small muted">{fmtDate(r.createdAt)}</td></tr>)}</tbody></table></div>
    </>
  );
}
