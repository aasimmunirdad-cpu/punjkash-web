import AdminNav from "@/components/AdminNav";
import { isAdmin } from "@/lib/admin";
import { logout } from "./actions";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const ok = await isAdmin();
  if (!ok) return <div className="wrap section" style={{ maxWidth: 420, paddingBottom: 60 }}>{children}</div>;
  const nav = [["/admin", "Overview"], ["/admin/bookings", "Bookings"], ["/admin/leads", "Leads"], ["/admin/packages", "Packages"], ["/admin/hotels", "Hotels"]];
  return (
    <div className="wrap" style={{ padding: "16px 16px 60px", display: "grid", gap: 16 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}><AdminNav items={nav as [string, string][]} /><form action={logout} style={{ marginLeft: "auto" }}><button className="btn btn-line btn-sm">Sign out</button></form></div>
      {children}
    </div>
  );
}
