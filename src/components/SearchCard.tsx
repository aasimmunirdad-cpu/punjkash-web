"use client";
import { useState } from "react";
import { I } from "./Icons";
import Travellers from "./Travellers";

type Tab = "umrah" | "flights" | "holidays" | "hotels" | "tours" | "visas";
const TABS: { id: Tab; label: string; icon: () => React.JSX.Element }[] = [
  { id: "umrah", label: "Umrah", icon: I.kaaba },
  { id: "flights", label: "Flights", icon: I.plane },
  { id: "holidays", label: "Holidays", icon: I.sun },
  { id: "hotels", label: "Hotels", icon: I.bed },
  { id: "tours", label: "Tours", icon: I.mountain },
  { id: "visas", label: "Visas", icon: I.passport },
];

const months = (n = 8) => {
  const out: { v: string; l: string }[] = [];
  const d = new Date(); d.setDate(1);
  for (let i = 0; i < n; i++) {
    const m = new Date(d.getFullYear(), d.getMonth() + i, 1);
    out.push({ v: `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`, l: m.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) });
  }
  return out;
};
const todayPlus = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };

export default function SearchCard({ initial = "umrah" }: { initial?: Tab }) {
  const [tab, setTab] = useState<Tab>(initial);
  return (
    <div className="search-card">
      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" type="button" aria-current={tab === t.id ? "true" : undefined} onClick={() => setTab(t.id)}><t.icon />{t.label}</button>
        ))}
      </div>

      {tab === "umrah" && (
        <form className="search-form" action="/umrah" method="get">
          <div className="field"><label>Flying from</label><select name="city" defaultValue=""><option value="">Any city</option><option>Lahore</option><option>Islamabad</option><option>Karachi</option><option>Sialkot</option><option>Multan</option><option>Faisalabad</option><option>Peshawar</option></select></div>
          <div className="field"><label>Travel month</label><select name="month" defaultValue=""><option value="">Any month</option>{months().map((m) => <option key={m.v} value={m.v}>{m.l}</option>)}</select></div>
          <div className="field"><label>Length</label><select name="days" defaultValue=""><option value="">Any</option><option value="7-10">7 to 10 days</option><option value="11-15">11 to 15 days</option><option value="16-22">16 to 22 days</option><option value="23-40">23 days and longer</option></select></div>
          <div className="field"><label>Room</label><select name="room" defaultValue=""><option value="">Any</option><option value="sharing">Sharing</option><option value="quad">Quad</option><option value="triple">Triple</option><option value="double">Double</option></select></div>
          <div className="field wide"><label>Budget per person</label><select name="budget" defaultValue=""><option value="">Any</option><option value="0-250000">Up to PKR 250,000</option><option value="250000-350000">250,000 to 350,000</option><option value="350000-500000">350,000 to 500,000</option><option value="500000-9999999">500,000 and above</option></select></div>
          <button className="btn btn-gold" type="submit"><I.search /> Search Umrah</button>
        </form>
      )}

      {tab === "flights" && (
        <form className="search-form" action="/flights" method="get">
          <div className="field"><label>From</label><select name="from" defaultValue="LHE"><option value="LHE">Lahore (LHE)</option><option value="ISB">Islamabad (ISB)</option><option value="KHI">Karachi (KHI)</option><option value="SKT">Sialkot (SKT)</option><option value="MUX">Multan (MUX)</option><option value="PEW">Peshawar (PEW)</option></select></div>
          <div className="field wide"><label>To</label><input name="to" placeholder="City or airport" list="dest" /><datalist id="dest"><option>Jeddah</option><option>Madinah</option><option>Dubai</option><option>London</option><option>Istanbul</option><option>Kuala Lumpur</option><option>Bangkok</option><option>Doha</option><option>Baku</option><option>Toronto</option></datalist></div>
          <div className="field"><label>Depart</label><input type="date" name="depart" defaultValue={todayPlus(14)} min={todayPlus(1)} /></div>
          <div className="field"><label>Return</label><input type="date" name="return" min={todayPlus(1)} /></div>
          <Travellers />
          <button className="btn btn-gold" type="submit"><I.search /> Search flights</button>
        </form>
      )}

      {tab === "holidays" && (
        <form className="search-form" action="/holidays" method="get">
          <div className="field"><label>Where to</label><select name="region" defaultValue=""><option value="">Anywhere</option><option>Middle East</option><option>Europe and Caucasus</option><option>Far East</option><option>Islands</option></select></div>
          <div className="field"><label>Travel month</label><select name="month" defaultValue=""><option value="">Any month</option>{months().map((m) => <option key={m.v} value={m.v}>{m.l}</option>)}</select></div>
          <div className="field"><label>Nights</label><select name="nights" defaultValue=""><option value="">Any</option><option value="3-4">3 to 4</option><option value="5-6">5 to 6</option><option value="7-14">7 and longer</option></select></div>
          <Travellers />
          <div className="field wide"><label>Budget per person</label><select name="budget" defaultValue=""><option value="">Any</option><option value="0-200000">Up to PKR 200,000</option><option value="200000-300000">200,000 to 300,000</option><option value="300000-9999999">300,000 and above</option></select></div>
          <button className="btn btn-gold" type="submit"><I.search /> Find holidays</button>
        </form>
      )}

      {tab === "hotels" && (
        <form className="search-form" action="/hotels" method="get">
          <div className="field wide"><label>City</label><input name="city" placeholder="Makkah, Dubai, Istanbul…" list="hcity" /><datalist id="hcity"><option>Makkah</option><option>Madinah</option><option>Dubai</option><option>Istanbul</option><option>Baku</option><option>Kuala Lumpur</option><option>Lahore</option><option>Murree</option></datalist></div>
          <div className="field"><label>Check-in</label><input type="date" name="in" defaultValue={todayPlus(7)} min={todayPlus(0)} /></div>
          <div className="field"><label>Check-out</label><input type="date" name="out" defaultValue={todayPlus(10)} min={todayPlus(1)} /></div>
          <div className="field"><label>Rooms</label><select name="rooms" defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
          <Travellers />
          <button className="btn btn-gold" type="submit"><I.search /> Search hotels</button>
        </form>
      )}

      {tab === "tours" && (
        <form className="search-form" action="/tours" method="get">
          <div className="field"><label>Region</label><select name="region" defaultValue=""><option value="">All of Pakistan</option><option>Punjab</option><option>Azad Kashmir</option><option>Gilgit-Baltistan</option><option>Khyber Pakhtunkhwa</option></select></div>
          <div className="field"><label>Travel month</label><select name="month" defaultValue=""><option value="">Any month</option>{months().map((m) => <option key={m.v} value={m.v}>{m.l}</option>)}</select></div>
          <div className="field"><label>Days</label><select name="days" defaultValue=""><option value="">Any</option><option value="2-3">2 to 3</option><option value="4-6">4 to 6</option><option value="7-14">7 and longer</option></select></div>
          <div className="field"><label>Type</label><select name="type" defaultValue=""><option value="">Private or group</option><option>Private</option><option>Group</option></select></div>
          <Travellers />
          <button className="btn btn-gold" type="submit"><I.search /> Find tours</button>
        </form>
      )}

      {tab === "visas" && (
        <form className="search-form" action="/visas" method="get">
          <div className="field" style={{ gridColumn: "span 3" }}><label>Country</label><input name="country" placeholder="Dubai, Turkey, Malaysia, UK…" list="vc" /><datalist id="vc"><option>UAE</option><option>Turkey</option><option>Malaysia</option><option>Thailand</option><option>Azerbaijan</option><option>Saudi Arabia</option><option>United Kingdom</option><option>Schengen</option><option>Egypt</option><option>Sri Lanka</option></datalist></div>
          <div className="field" style={{ gridColumn: "span 2" }}><label>Purpose</label><select name="purpose" defaultValue="Tourist"><option>Tourist</option><option>Umrah</option><option>Business</option><option>Family visit</option></select></div>
          <button className="btn btn-gold" type="submit"><I.search /> Check visa</button>
        </form>
      )}
    </div>
  );
}
