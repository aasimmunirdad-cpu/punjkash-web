import Link from "next/link";
import { site, waLink } from "@/lib/site";
import { I } from "@/components/Icons";
export const metadata = { title: "Enquiry received", robots: { index: false } };
export default async function Sent({ searchParams }: { searchParams: Promise<{ code?: string; error?: string }> }) {
  const { code, error } = await searchParams;
  return (
    <div className="wrap section" style={{ maxWidth: 680, paddingBottom: 60 }}>
      <div className="card card-body" style={{ padding: 28, gap: 14 }}>
        {error ? <><h1 style={{ fontSize: 28 }}>Something was missing</h1><p className="muted">Go back and check your name and WhatsApp number, or message us directly.</p></> :
          <><span style={{ color: "var(--green)" }}><I.check /></span><h1 style={{ fontSize: 28 }}>Thank you, we have your enquiry</h1><p className="muted">{code ? `Reference ${code}. ` : ""}{site.partners[0].name} or {site.partners[1].name} will reply on WhatsApp, usually within the hour during working hours.</p></>}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><a className="btn btn-wa" href={waLink(`Assalam o Alaikum, I just sent an enquiry on punjkash.com${code ? ` for ${code}` : ""}.`)}><I.wa /> Open WhatsApp</a><Link className="btn btn-line" href="/umrah">Back to packages</Link></div>
      </div>
    </div>
  );
}
