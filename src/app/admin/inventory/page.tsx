import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function AdminInventoryPage() {
  return (
    <Card>
      <CardHeader>
        <div className="text-xs tracking-[0.25em] text-white/60">INVENTORY</div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-white/60">
          Low-stock list + stock in/out + movement history will go here.
        </div>
      </CardContent>
    </Card>
  );
}
