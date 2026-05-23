import { Card, CardContent } from "@/components/ui/Card";

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <CardContent className="grid gap-2">
        <div className="text-xs tracking-[0.25em] text-white/60">{label}</div>
        <div className="text-2xl font-black tracking-wide">{value}</div>
        {hint ? <div className="text-sm text-white/60">{hint}</div> : null}
      </CardContent>
    </Card>
  );
}
