"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { login as loginApi } from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getErrorMessage } from "@/lib/utils/error";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Form = z.infer<typeof schema>;

export default function LoginClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const mode = sp.get("mode") ?? "customer";
  const next = sp.get("next") ?? (mode === "admin" ? "/admin" : "/");

  const setTokens = useAuthStore((s) => s.setTokens);
  const isAdminLike = useAuthStore((s) => s.isAdminLike());

  const [error, setError] = useState<string | null>(null);

  const form = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: Form) {
    setError(null);
    try {
      const resp = await loginApi(values.email, values.password);
      setTokens(resp.accessToken, resp.refreshToken);
      router.push(next);
    } catch (error) {
      setError(getErrorMessage(error, "Login failed"));
    }
  }

  return (
    <div className="container-zylo py-12">
      <div className="grid gap-6 max-w-xl">
        <div>
          <div className="text-xs tracking-[0.35em] text-white/60">AUTH</div>
          <h1 className="mt-2 text-3xl font-black tracking-wide">
            {mode === "admin" ? "Admin Login" : "Login"}
          </h1>
          <div className="mt-2 text-white/60 text-sm">
            JWT login. Admin routes require ADMIN/STAFF role.
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="text-xs tracking-[0.25em] text-white/60">CREDENTIALS</div>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <Input placeholder="Email" {...form.register("email")} />
                <p className="text-xs text-[color:var(--red)] mt-1">
                  {form.formState.errors.email?.message}
                </p>
              </div>
              <div>
                <Input type="password" placeholder="Password" {...form.register("password")} />
                <p className="text-xs text-[color:var(--red)] mt-1">
                  {form.formState.errors.password?.message}
                </p>
              </div>

              {error ? (
                <div className="rounded-xl border border-[color:var(--red2)]/40 bg-[color:var(--red2)]/10 p-3 text-sm">
                  {error}
                </div>
              ) : null}

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Signing in…" : "Sign In"}
              </Button>

              {isAdminLike ? (
                <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
                  Go to Admin
                </Button>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
