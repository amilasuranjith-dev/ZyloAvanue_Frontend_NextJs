import type { ReactNode } from "react";
import { AdminGuard } from "@/components/auth/AdminGuard";
import { AdminShell } from "@/components/layout/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
