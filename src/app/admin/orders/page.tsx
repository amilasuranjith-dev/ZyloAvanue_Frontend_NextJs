import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function AdminOrdersPage() {
  return (
    <Card>
      <CardHeader>
        <div className="text-xs tracking-[0.25em] text-white/60">ORDERS</div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-white/60">
          Orders table + status updates (confirm/dispatch/delivered/cancel) placeholder.
        </div>
      </CardContent>
    </Card>
  );
}
