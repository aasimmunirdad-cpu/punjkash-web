import Link from "next/link";
import { redirect } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { isAdmin } from "@/lib/admin";
import { fmtDate } from "@/lib/site";
export default async function AdminPackages() {
  if (!(await isAdmin())) redirect("/admin/login");
  const rows = await db.select({ p: schema.packages, s: schema.suppliers.name }).from(schema.packages).leftJoin(schema.suppliers, eq(schema.packages.supplierId, schema.suppliers.id)).orderBy(asc(schema.packages.departDate));
  const tiers = await db.select().from(schema.priceTiers);
  const tm = new Map<number, string>(); for (const t of tiers) tm.set(t.packageId, (tm.get(t.packageId) ?? "") + `${t.tier[0].toUpperCase()} ${t.customerPrice.toLocaleString("en-PK")}  `);
  return (
    <>
      <h1 style={{ fontSize: 28 }}>Packages <span className="muted" style={{ fontSize: 16, fontWeight: 400 }}>{rows.length} in register</span></h1>
      <div className="card" style={{ overflowX: "auto" }}><table className="tiers-t" style={{ minWidth: 820 }}><thead><tr><th style={{ padding: "8px 12px" }}>Code</th><th>Departs</th><th>City · Airline</th><th>Days</th><th>Supplier</th><th>Prices</th><th>Seats</th><th>Status</th></tr></thead><tbody>
        {rows.map(({ p, s }) => <tr key={p.id}><td style={{ padding: "10px 12px" }}><Link className="more" href={`/admin/packages/${p.id}`}>{p.code}</Link></td><td>{fmtDate(p.departDate)}</td><td>{p.departureCity} · {p.airline ?? "—"}</td><td>{p.days}</td><td className="small muted">{s}</td><td className="small">{tm.get(p.id) ?? "—"}</td><td>{p.seats ?? "—"}</td><td><span className={`chip ${p.status === "open" ? "chip-green" : p.status === "few" ? "chip-gold" : ""}`}>{p.status}</span></td></tr>)}
      </tbody></table></div>
    </>
  );
}
