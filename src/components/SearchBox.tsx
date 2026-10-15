import Link from "next/link";
import { monthLabel } from "@/lib/site";

export default function SearchBox({ cities, months, values = {} }: { cities: string[]; months: string[]; values?: Record<string, string | undefined> }) {
  const tabs = [["Flights", "/flights"], ["Flight + Hotel", "/flights"], ["Holidays", "/holidays"], ["Tours", "/tours"], ["Hotels", "/hotels"], ["Visas", "/visas"]];
  return (
    <form className="searchbox" action="/umrah" method="get">
      <div className="tabs">
        {tabs.slice(0, 3).map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
        <span>Umrah &amp; Hajj</span>
        {tabs.slice(3).map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
      </div>
      <div className="srow">
        <div className="field"><label htmlFor="city">From</label>
          <select id="city" name="city" defaultValue={values.city ?? ""}><option value="">Any city</option>{cities.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="field"><label htmlFor="month">When</label>
          <select id="month" name="month" defaultValue={values.month ?? ""}><option value="">Any month</option>{months.map((m) => <option key={m} value={m}>{monthLabel(m + "-01")}</option>)}</select></div>
        <div className="field"><label htmlFor="days">Days</label>
          <select id="days" name="days" defaultValue={values.days ?? ""}><option value="">Any</option><option value="15">14 to 15 days</option><option value="21">20 to 21 days</option><option value="28">28 days</option></select></div>
        <div className="field"><label htmlFor="room">Room</label>
          <select id="room" name="room" defaultValue={values.room ?? ""}><option value="">Any</option><option value="sharing">Sharing</option><option value="quad">Quad</option><option value="triple">Triple</option><option value="double">Double</option></select></div>
        <div className="field"><label htmlFor="distance">Makkah hotel</label>
          <select id="distance" name="distance" defaultValue={values.distance ?? ""}><option value="">Any distance</option><option value="500">Under 500 m</option><option value="shuttle">Shuttle hotels</option></select></div>
        <button className="btn btn-gold" type="submit">Search packages</button>
      </div>
    </form>
  );
}
