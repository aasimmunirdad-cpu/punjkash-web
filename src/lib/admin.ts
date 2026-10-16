import { cookies } from "next/headers";
import { createHash } from "node:crypto";

export const ADMIN_COOKIE = "pk_admin";
export const adminToken = () => createHash("sha256").update("pk|" + (process.env.ADMIN_PASSWORD ?? "")).digest("hex").slice(0, 40);
export async function isAdmin() {
  if (!process.env.ADMIN_PASSWORD) return false;
  const c = await cookies();
  return c.get(ADMIN_COOKIE)?.value === adminToken();
}
