import Link from "next/link";
import { monthLabel } from "@/lib/site";

const tabs: [string, string][] = [["Flights", "flights"], ["Flight + Hotel", "fh"], ["Holidays", "holidays"], ["Umrah & Hajj", "umrah"], ["Tours", "tours"], ["Hotels", "hotels"], ["Visas", "visas"]];

export default function SearchBox({ cities, months, values = {}, active = "umrah" }: { cities: string[]; months: string[]; values?: Record<string, string | undefined>; active?: string }) {
  const hrefs: Record<string, string> = { flights: "/flights", fh: "/flights", holidays: "/holidays", umrah: "/umrah", tours: "/tours", hotels: "/hotels", visas: "/visas" };
  return (
    <div className="searchbox">
      <div className="tabs">{tabs.map(([l, k]) => k === active ? <span key={k}>{l}</span> : <Link key={k} href={hrefs[k]}>{l}</Link>)}</div>
      {active === "umrah" && (
        <form action="/umrah" method="get" className="srow">
          <div className="field"><label htmlFor="city">From</label><select id="city" name="city" defaultValue={values.city ?? ""}><option value="">Any city</option>{cities.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
          <div className="field"><label htmlFor="month">When</label><select id="month" name="month" defaultValue={values.month ?? ""}><option value="">Any month</option>{months.map((m) => <option key={m} value={m}>{monthLabel(m + "-01")}</option>)}</select></div>
          <div className="field"><label htmlFor="days">Days</label><select id="days" name="days" defaultValue={values.days ?? ""}><option value="">Any</option><option value="15">14 to 15 days</option><option value="21">20 to 21 days</option><option value="28">28 days</option></select></div>
          <div className="field"><label htmlFor="room">Room</label><select id="room" name="room" defaultValue={values.room ?? ""}><option value="">Any</option><option value="sharing">Sharing</option><option value="quad">Quad</option><option value="triple">Triple</option><option value="double">Double</option></select></div>
          <div className="field"><label htmlFor="distance">Makkah hotel</label><select id="distance" name="distance" defaultValue={values.distance ?? ""}><option value="">Any distance</option><option value="500">Under 500 m</option><option value="shuttle">Shuttle hotels</option></select></div>
          <button className="btn btn-gold" type="submit">Search packages</button>
        </form>
      )}
      {active === "flights" && (
        <form action="/flights" method="get" className="srow">
          <div className="field"><label htmlFor="from">Flying from</label><select id="from" name="from" defaultValue=""><option value="">Any city</option><option>Lahore</option><option>Islamabad</option><option>Karachi</option></select></div>
          <div className="field"><label htmlFor="to">Flying to</label><input id="to" name="to" placeholder="City or airport" /></div>
          <div className="field"><label htmlFor="dep">Departure</label><input id="dep" name="dep" type="date" /></div>
          <div className="field"><label htmlFor="ret">Return</label><input id="ret" name="ret" type="date" /></div>
          <div className="field"><label htmlFor="cabin">Cabin</label><select id="cabin" name="cabin" defaultValue=""><option value="">Economy</option><option>Business</option></select></div>
          <button className="btn btn-gold" type="submit">Search flights</button>
        </form>
      )}
    </div>
  );
}
