import { createLead } from "@/app/actions";

export default function LeadForm({ code, pagePath }: { code?: string; pagePath: string }) {
  return (
    <form action={createLead} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input type="hidden" name="packageCode" value={code ?? ""} />
      <input type="hidden" name="pagePath" value={pagePath} />
      <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required maxLength={80} /></div>
      <div className="field"><label htmlFor="phone">WhatsApp number</label><input id="phone" name="phone" required inputMode="tel" placeholder="03xx xxxxxxx" maxLength={20} /></div>
      <div className="field"><label htmlFor="city">City</label><input id="city" name="city" maxLength={40} /></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div className="field"><label htmlFor="travellers">Travellers</label><input id="travellers" name="travellers" maxLength={20} placeholder="2 adults" /></div>
        <div className="field"><label htmlFor="room">Room</label><select id="room" name="room" defaultValue=""><option value="">Any</option><option>Sharing</option><option>Quad</option><option>Triple</option><option>Double</option></select></div>
      </div>
      <div className="field"><label htmlFor="message">Anything else</label><textarea id="message" name="message" rows={3} maxLength={600} /></div>
      <button className="btn btn-navy" type="submit">Send enquiry</button>
      <span className="faint" style={{ fontSize: 13 }}>We reply on WhatsApp, usually within the hour during working hours.</span>
    </form>
  );
}
