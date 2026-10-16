import Link from "next/link";
import { I } from "@/components/Icons";
import { getBooking } from "@/lib/bookings";
import { site, waLink } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Booking", robots: { index: false } };
const n = (v: number) => v.toLocaleString("en-PK");
const STATUS: Record<string, string> = { reserved: "Reserved, deposit due", deposit_pending: "Deposit being checked", deposit_received: "Deposit received, confirmation on its way", confirmed: "Confirmed", cancelled: "Cancelled" };

export default async function Booking({ params, searchParams }: { params: Promise<{ ref: string }>; searchParams: Promise<{ phone?: string }> }) {
  const { ref } = await params; const { phone } = await searchParams;
  const b = await getBooking(ref, phone || undefined);
  if (!b) return <div className="wrap section" style={{ maxWidth: 680, paddingBottom: 60 }}><div className="card card-body"><h1 style={{ fontSize: 26 }}>Open booking {ref.toUpperCase()}</h1><p className="muted">Enter the WhatsApp number used when reserving.</p><form method="get" className="field"><label htmlFor="p">WhatsApp number</label><input id="p" name="phone" inputMode="tel" required /><button className="btn btn-navy" style={{ marginTop: 10, justifySelf: "start" }}>Open</button></form></div></div>;
  const steps = ["reserved", "deposit_pending", "deposit_received", "confirmed"]; const idx = steps.indexOf(b.status);
  return (
    <div className="wrap section" style={{ maxWidth: 820, display: "grid", gap: 16, paddingBottom: 60 }}>
      <nav className="small faint"><Link href="/bookings">My bookings</Link> › {b.ref}</nav>
      <div className="card card-body" style={{ background: "var(--navy)", color: "#fff", borderColor: "var(--navy)" }}><div className="tiny" style={{ opacity: .8 }}>Booking reference</div><div className="display" style={{ fontSize: 30, fontWeight: 700 }}>{b.ref}</div><div className="small">{STATUS[b.status] ?? b.status}</div></div>
      {b.status !== "cancelled" && <div className="steps" style={{ gridTemplateColumns: "repeat(4,auto)", justifyContent: "start", gap: 16 }}>{["Reserved", "Deposit", "Received", "Confirmed"].map((s, i) => <div key={s} style={{ opacity: i <= idx ? 1 : .4 }}><b>{s}</b></div>)}</div>}
      <div className="card card-body" style={{ gap: 8 }}>
        <h3>{b.title}</h3><span className="small muted">{String(b.details?.sub ?? "")}{b.room ? ` · ${b.room} room` : ""}</span>
        <table className="tiers-t"><tbody>{b.travellers.map((t, i) => <tr key={i}><td style={{ textTransform: "capitalize" }} className="small muted">{t.type}</td><td>{t.name || <i className="faint">name to be added</i>}</td></tr>)}</tbody></table>
      </div>
      <div className="grid g2">
        <div className="card card-body" style={{ gap: 6 }}><h3>Money</h3><div style={{ display: "flex", justifyContent: "space-between" }}><span>Total</span><b>PKR {n(b.total)}</b></div><div style={{ display: "flex", justifyContent: "space-between" }}><span>Deposit required</span><b>PKR {n(b.deposit)}</b></div><div style={{ display: "flex", justifyContent: "space-between" }}><span>Reported paid</span><b>PKR {n(b.paid)}</b></div><div style={{ display: "flex", justifyContent: "space-between" }}><span>Balance</span><b>PKR {n(Math.max(0, b.total - b.paid))}</b></div>{b.status === "reserved" && <Link className="btn btn-gold btn-sm" href={`/reserve/${b.ref}/pay`} style={{ marginTop: 6 }}>Pay the deposit</Link>}</div>
        <div className="card card-body" style={{ gap: 6 }}><h3>Contact</h3><span>{b.leadName}</span><span className="small muted">{b.phone}{b.email ? ` · ${b.email}` : ""}{b.city ? ` · ${b.city}` : ""}</span><a className="btn btn-wa btn-sm" style={{ marginTop: 6 }} href={waLink(`Assalam o Alaikum, about my booking ${b.ref}.`)}><I.wa /> Message about this booking</a><span className="tiny faint">To change names or dates, message {site.partners[0].name}; changes are confirmed in writing.</span></div>
      </div>
    </div>
  );
}
