export default function SampleNote({ what = "Prices" }: { what?: string }) {
  return <div className="notice" style={{ fontSize: 14 }}>{what} shown here are sample figures for preview and layout. Live supplier rates replace them before public launch. Message us for a confirmed quotation today.</div>;
}
