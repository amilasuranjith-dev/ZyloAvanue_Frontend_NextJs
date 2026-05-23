import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function AdminPaymentsPage() {
  return (
    <Card>
      <CardHeader>
        <div className="text-xs tracking-[0.25em] text-white/60">PAYMENTS</div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-white/60">
          Placeholder. Payment gateway integration will be added later.
        </div>
      </CardContent>
    </Card>
  );
}
