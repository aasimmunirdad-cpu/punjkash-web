import Link from "next/link";
import { site, waLink } from "@/lib/site";

export const metadata = { title: "Enquiry received", robots: { index: false } };

export default async function Sent({ searchParams }: { searchParams: Promise<{ code?: string; error?: string }> }) {
  const { code, error } = await searchParams;
  return (
    <div className="wrap" style={{ padding: "60px 0", maxWidth: 680 }}>
      <div className="card" style={{ gap: 14, padding: 32 }}>
        {error ? <><h1 style={{ fontSize: 30 }}>Something was missing</h1><p className="muted">Please go back and check your name and WhatsApp number, or message us directly.</p></> :
          <><h1 style={{ fontSize: 30 }}>Thank you, we have your enquiry</h1><p className="muted">{code ? `Reference ${code}. ` : ""}{site.partners[0].name} or {site.partners[1].name} will reply on WhatsApp, usually within the hour during working hours.</p></>}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><a className="btn btn-wa" href={waLink(`Assalam o Alaikum, I just sent an enquiry on punjkash.com${code ? ` for ${code}` : ""}.`)}>Open WhatsApp</a><Link className="btn btn-line" href="/umrah">Back to packages</Link></div>
      </div>
    </div>
  );
}
