import { StatCard } from "@/components/layout/StatCard";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <div>
        <div className="text-xs tracking-[0.35em] text-white/60">ADMIN</div>
        <h1 className="mt-2 text-3xl font-black tracking-wide">Dashboard</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="TOTAL SALES" value="—" hint="No payment integration yet" />
        <StatCard label="ORDERS" value="—" />
        <StatCard label="LOW STOCK" value="—" />
        <StatCard label="TOTAL PRODUCTS" value="—" />
      </div>

      <Card>
        <CardHeader>
          <div className="text-xs tracking-[0.25em] text-white/60">OVERVIEW</div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-white/60">
            Connect admin widgets to backend endpoints next (orders, low-stock, totals).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
