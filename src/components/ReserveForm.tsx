"use client";
import { useState } from "react";
import { createBooking } from "@/app/actions";

type Q = { unit: number; unitLabel: string; childPrice?: number; infantPrice?: number; depositRule: "umrah" | "quarter" | "full"; onRequest?: boolean };
const DEP = 50000;
function calc(q: Q, a: number, c: number, i: number) {
  const total = q.unit * a + (q.childPrice ?? Math.round(q.unit * 0.75)) * c + (q.infantPrice ?? Math.round(q.unit * 0.2)) * i;
  let dep = q.depositRule === "umrah" ? DEP * (a + c) : q.depositRule === "full" ? total : Math.round(total * 0.25);
  if (dep > total) dep = total; dep = Math.ceil(dep / 100) * 100;
  return { total, dep };
}
const n = (v: number) => v.toLocaleString("en-PK");

export default function ReserveForm({ q, qs, defaults }: { q: Q; qs: string; defaults: { a: number; c: number; i: number } }) {
  const [a, setA] = useState(defaults.a); const [c, setC] = useState(defaults.c); const [i, setI] = useState(defaults.i);
  const { total, dep } = calc(q, a, c, i);
  const Step = ({ l, s, v, set, min, max }: { l: string; s: string; v: number; set: (x: number) => void; min: number; max: number }) => (
    <div className="step-row"><div><b>{l}</b><span className="small muted">{s}</span></div><div className="stepper"><button type="button" aria-label={`Fewer ${l}`} disabled={v <= min} onClick={() => set(v - 1)}>−</button><span>{v}</span><button type="button" aria-label={`More ${l}`} disabled={v >= max} onClick={() => set(v + 1)}>+</button></div></div>
  );
  const Names = ({ k, count, label }: { k: string; count: number; label: string }) => <>{Array.from({ length: count }).map((_, x) => <div key={k + x} className="field"><label htmlFor={k + x}>{label} {x + 1}, name as on passport</label><input id={k + x} name={k + x} maxLength={80} placeholder="Full name" autoComplete="off" /></div>)}</>;
  return (
    <form action={createBooking} className="product" style={{ alignItems: "start" }}>
      <input type="hidden" name="q" value={qs} /><input type="hidden" name="adults" value={a} /><input type="hidden" name="children" value={c} /><input type="hidden" name="infants" value={i} />
      <div style={{ display: "grid", gap: 16 }}>
        <div className="card card-body" style={{ gap: 12 }}>
          <h3>Who is travelling</h3>
          <Step l="Adults" s="12 and over" v={a} set={setA} min={1} max={20} />
          <Step l="Children" s="2 to 11" v={c} set={setC} min={0} max={10} />
          <Step l="Infants" s="Under 2" v={i} set={setI} min={0} max={a} />
        </div>
        <div className="card card-body" style={{ gap: 10 }}>
          <h3>Traveller names</h3>
          <p className="small muted">Exactly as printed on each passport. You can add passport numbers later from My bookings.</p>
          <Names k="a" count={a} label="Adult" /><Names k="c" count={c} label="Child" /><Names k="i" count={i} label="Infant" />
        </div>
        <div className="card card-body" style={{ gap: 10 }}>
          <h3>Your contact</h3>
          <div className="grid g2" style={{ gap: 10 }}>
            <div className="field"><label htmlFor="leadName">Your name</label><input id="leadName" name="leadName" required maxLength={80} autoComplete="name" /></div>
            <div className="field"><label htmlFor="phone">WhatsApp number</label><input id="phone" name="phone" required inputMode="tel" placeholder="03xx xxxxxxx" maxLength={20} autoComplete="tel" /></div>
            <div className="field"><label htmlFor="email">Email (optional)</label><input id="email" name="email" type="email" maxLength={120} autoComplete="email" /></div>
            <div className="field"><label htmlFor="city">City</label><input id="city" name="city" maxLength={40} /></div>
          </div>
          <div className="field"><label htmlFor="notes">Anything we should know</label><textarea id="notes" name="notes" rows={2} maxLength={600} placeholder="Wheelchair, connecting rooms, a date you cannot travel…" /></div>
        </div>
      </div>
      <aside className="sticky-side card card-body" style={{ borderColor: "var(--gold)", gap: 10 }}>
        <h3>Your price</h3>
        <div className="small" style={{ display: "grid", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>{a} adult{a > 1 ? "s" : ""} × {n(q.unit)}</span><b>{n(q.unit * a)}</b></div>
          {c > 0 && <div style={{ display: "flex", justifyContent: "space-between" }}><span>{c} child{c > 1 ? "ren" : ""} × {n(q.childPrice ?? Math.round(q.unit * 0.75))}</span><b>{n((q.childPrice ?? Math.round(q.unit * 0.75)) * c)}</b></div>}
          {i > 0 && <div style={{ display: "flex", justifyContent: "space-between" }}><span>{i} infant{i > 1 ? "s" : ""} × {n(q.infantPrice ?? Math.round(q.unit * 0.2))}</span><b>{n((q.infantPrice ?? Math.round(q.unit * 0.2)) * i)}</b></div>}
        </div>
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "end" }}><span>Total</span><span className="price" style={{ fontSize: 24 }}><small>PKR</small> {n(total)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", background: "var(--gold-soft)", borderRadius: 10, padding: "8px 12px" }}><span>Deposit now</span><span className="price" style={{ fontSize: 20 }}><small>PKR</small> {n(dep)}</span></div>
        <span className="tiny muted">{q.depositRule === "umrah" ? "PKR 50,000 per person. Balance 45 days before departure." : q.depositRule === "full" ? "Visa fees are paid in full at application." : "25% deposit. Balance 30 days before travel."}{q.onRequest ? " Price confirmed by us before any payment." : ""}</span>
        <button className="btn btn-gold btn-block" type="submit">Continue to payment</button>
        <span className="tiny faint">No charge is made on this page. You get a PK reference on the next step.</span>
      </aside>
    </form>
  );
}
