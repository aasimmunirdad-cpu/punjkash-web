export default function SampleNote({ what = "Prices" }: { what?: string }) {
  return <div className="notice">{what} shown here are sample figures while supplier feeds are connected. Reserve to lock a confirmed quotation today.</div>;
}
