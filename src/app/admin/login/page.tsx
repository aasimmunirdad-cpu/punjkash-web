import { login } from "../actions";
export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <form action={login} className="card card-body" style={{ gap: 12 }}><h1 style={{ fontSize: 24 }}>PunjKash admin</h1>{error && <div className="notice">Wrong password.</div>}<div className="field"><label htmlFor="pw">Password</label><input id="pw" name="password" type="password" required autoFocus /></div><button className="btn btn-navy">Sign in</button></form>;
}
