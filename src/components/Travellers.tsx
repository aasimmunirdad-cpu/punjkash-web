"use client";
import { useState } from "react";

export default function Travellers({ name = "pax" }: { name?: string }) {
  const [open, setOpen] = useState(false);
  const [a, setA] = useState(2); const [c, setC] = useState(0); const [i, setI] = useState(0);
  const label = `${a} adult${a > 1 ? "s" : ""}${c ? `, ${c} child${c > 1 ? "ren" : ""}` : ""}${i ? `, ${i} infant${i > 1 ? "s" : ""}` : ""}`;
  const Row = ({ t, s, v, set, min, max }: { t: string; s: string; v: number; set: (n: number) => void; min: number; max: number }) => (
    <div className="step-row">
      <div><b>{t}</b><span className="small muted">{s}</span></div>
      <div className="stepper"><button type="button" aria-label={`Fewer ${t}`} disabled={v <= min} onClick={() => set(v - 1)}>−</button><span>{v}</span><button type="button" aria-label={`More ${t}`} disabled={v >= max} onClick={() => set(v + 1)}>+</button></div>
    </div>
  );
  return (
    <div className="field" style={{ position: "relative" }}>
      <label>Travellers</label>
      <button type="button" className="pax-btn" aria-expanded={open} onClick={() => setOpen(!open)}>{label}</button>
      <input type="hidden" name={name} value={`${a}-${c}-${i}`} />
      {open && (
        <div className="pax-pop">
          <Row t="Adults" s="12 and over" v={a} set={setA} min={1} max={9} />
          <Row t="Children" s="2 to 11" v={c} set={setC} min={0} max={6} />
          <Row t="Infants" s="Under 2" v={i} set={setI} min={0} max={a} />
          <button type="button" className="btn btn-navy btn-sm btn-block" onClick={() => setOpen(false)}>Done</button>
        </div>
      )}
    </div>
  );
}
