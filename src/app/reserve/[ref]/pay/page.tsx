import Link from "next/link";
import { notFound } from "next/navigation";
import { reportPayment } from "@/app/actions";
import { I } from "@/components/Icons";
import { BANK, getBooking } from "@/lib/bookings";
import { waLink } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pay the deposit", robots: { index: false } };
const n = (v: number) => v.toLocaleString("en-PK");

export default async function Pay({ params, searchParams }: { params: Promise<{ ref: string }>; searchParams: Promise<{ error?: string }> }) {
  const { ref } = await params; const { error } = await searchParams;
  const b = await getBooking(ref);
  if (!b) notFound();
  const wa = waLink(`Assalam o Alaikum, this is ${b.leadName}. I have reserved ${b.ref} (${b.title}) and I am sending the deposit receipt for PKR ${n(b.deposit)}.`);
  return (
    <div className="wrap section" style={{ display: "grid", gap: 20, paddingBottom: 48 }}>
      <div className="steps" style={{ gridTemplateColumns: "repeat(3,auto)", justifyContent: "start", gap: 20 }}><div style={{ opacity: .5 }}><b>Travellers</b></div><div><b>Deposit</b></div><div style={{ opacity: .5 }}><b>Reference</b></div></div>
      <div className="card card-body" style={{ background: "var(--navy)", color: "#fff", borderColor: "var(--navy)" }}><div className="tiny" style={{ opacity: .8 }}>Your booking reference</div><div className="display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: ".02em" }}>{b.ref}</div><div className="small" style={{ opacity: .9 }}>{b.title} · {b.adults} adult{b.adults > 1 ? "s" : ""}{b.children ? `, ${b.children} child${b.children > 1 ? "ren" : ""}` : ""}{b.infants ? `, ${b.infants} infant${b.infants > 1 ? "s" : ""}` : ""}{b.room ? ` · ${b.room} room` : ""}</div></div>
      <div className="product" style={{ alignItems: "start" }}>
        <div style={{ display: "grid", gap: 16 }}>
          {error && <div className="notice">Please choose how you paid and enter the transaction ID or sender number.</div>}
          <div className="card card-body" style={{ gap: 12 }}>
            <h3>Pay the deposit of PKR {n(b.deposit)}</h3>
            <p className="small muted">Send the deposit by any method below, then enter the transaction ID. Your seats are held while we check it, usually within the hour.</p>
            <div className="grid g3" style={{ gap: 10 }}>
              <div className="card card-body" style={{ gap: 2 }}><b>JazzCash</b><span className="price" style={{ fontSize: 18 }}>{BANK.jazzcash}</span><span className="tiny muted">Account title {BANK.title.split(" ")[0]}</span></div>
              <div className="card card-body" style={{ gap: 2 }}><b>Easypaisa</b><span className="price" style={{ fontSize: 18 }}>{BANK.easypaisa}</span><span className="tiny muted">Account title {BANK.title.split(" ")[0]}</span></div>
              <div className="card card-body" style={{ gap: 2 }}><b>Bank transfer</b><span className="small">{BANK.title}</span><span className="tiny muted">{BANK.iban}</span></div>
            </div>
            <p className="tiny faint">Card payment (Visa, Mastercard) is being connected. Never pay to a personal account other than the numbers shown here.</p>
          </div>
          <form action={reportPayment} className="card card-body" style={{ gap: 12 }}>
            <input type="hidden" name="ref" value={b.ref} />
            <h3>I have paid</h3>
            <div className="grid g3" style={{ gap: 10 }}>
              <div className="field"><label htmlFor="pm">Method</label><select id="pm" name="payMethod" defaultValue="jazzcash"><option value="jazzcash">JazzCash</option><option value="easypaisa">Easypaisa</option><option value="bank">Bank transfer</option></select></div>
              <div className="field"><label htmlFor="pr">Transaction ID or sender number</label><input id="pr" name="payRef" required maxLength={60} /></div>
              <div className="field"><label htmlFor="am">Amount sent (PKR)</label><input id="am" name="amount" type="number" inputMode="numeric" defaultValue={b.deposit} min={100} required /></div>
            </div>
            <button className="btn btn-gold" type="submit" style={{ justifySelf: "start" }}>Confirm deposit sent</button>
            <span className="tiny muted">Then send the receipt screenshot on WhatsApp so we can match it faster.</span>
          </form>
        </div>
        <aside className="sticky-side card card-body" style={{ gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Total</span><b>PKR {n(b.total)}</b></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Deposit now</span><b style={{ color: "var(--gold-ink)" }}>PKR {n(b.deposit)}</b></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Balance later</span><b>PKR {n(b.total - b.deposit)}</b></div>
          <a className="btn btn-wa btn-block" href={wa}><I.wa /> Send receipt on WhatsApp</a>
          <Link className="more" href={`/bookings/${b.ref}`} style={{ justifySelf: "start" }}>Pay later, keep my reference</Link>
          <span className="tiny faint">Unpaid reservations are released after 24 hours.</span>
        </aside>
      </div>
    </div>
  );
}
