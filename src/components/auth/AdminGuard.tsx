"use client";

import { useAuthStore } from "@/store/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAdminLike = useAuthStore((s) => s.isAdminLike());

  useEffect(() => {
    if (!accessToken || !isAdminLike) {
      router.replace(`/login?mode=admin&next=${encodeURIComponent(pathname)}`);
    }
  }, [accessToken, isAdminLike, pathname, router]);

  if (!accessToken || !isAdminLike) return null;
  return <>{children}</>;
}
