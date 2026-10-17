import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
const url = process.env.DATABASE_URL;
if (!url) { console.log("no DATABASE_URL, skipping migrations"); process.exit(0); }
const sql = postgres(url, { max: 1 });
await migrate(drizzle(sql), { migrationsFolder: "./drizzle" });
console.log("migrations applied");
const [{ n }] = await sql`select count(*)::int as n from packages`;
await sql.end();
if (n === 0 && process.env.SEED_ON_EMPTY !== "false") {
  console.log("packages table empty, seeding register");
  const { execSync } = await import("node:child_process");
  execSync("node seed.cjs", { stdio: "inherit" });
}

if (process.env.RUN_BATCH !== "false") {
  const { execSync } = await import("node:child_process");
  try { execSync("node batch.cjs", { stdio: "inherit" }); } catch (e) { console.log("batch import failed, continuing"); }
}
