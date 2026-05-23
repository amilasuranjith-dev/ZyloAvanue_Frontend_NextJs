"use client";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart";
import { formatMoney } from "@/lib/utils/money";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createOrder } from "@/lib/api/orders";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getErrorMessage } from "@/lib/utils/error";

function optionalText(minLength: number) {
  return z
    .string()
    .trim()
    .min(minLength)
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value));
}

const schema = z.object({
  customerEmail: z.string().email(),
  customerName: optionalText(2),
  customerPhone: optionalText(8),
  shippingAddress1: z.string().min(5),
  shippingCity: z.string().min(2),
  shippingState: z.string().min(2),
  shippingPostal: z.string().min(3),
  shippingCountry: z.string().min(2),
});

type CheckoutFormInput = z.input<typeof schema>;
type CheckoutForm = z.output<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotalCents());
  const clear = useCartStore((s) => s.clear);

  const [error, setError] = useState<string | null>(null);

  const form = useForm<CheckoutFormInput, undefined, CheckoutForm>({
    resolver: zodResolver(schema),
    defaultValues: { shippingCountry: "IN" },
  });

  async function onSubmit(values: CheckoutForm) {
    setError(null);
    try {
      const resp = await createOrder({
        ...values,
        items: items.map((i) => ({ variantId: i.variantId, qty: i.qty })),
      });
      clear();
      router.push(`/order/success/${encodeURIComponent(resp.orderNumber)}`);
    } catch (error) {
      setError(getErrorMessage(error, "Failed to place order"));
    }
  }

  return (
    <SiteFrame>
      <div className="container-zylo py-10">
        <div>
          <div className="text-xs tracking-[0.35em] text-white/60">CHECKOUT</div>
          <h1 className="mt-2 text-3xl font-black tracking-wide">Place Order</h1>
          <div className="mt-2 text-white/60 text-sm">
            No payment yet — order will be created as <span className="text-white">UNPAID</span>.
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 card-zylo p-8 text-white/60 text-sm">Your cart is empty.</div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px] items-start">
            <Card>
              <CardHeader>
                <div className="text-xs tracking-[0.25em] text-white/60">DETAILS</div>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <div>
                    <div className="text-xs tracking-[0.25em] text-white/60 mb-2">EMAIL</div>
                    <Input placeholder="you@domain.com" {...form.register("customerEmail")} />
                    <p className="text-xs text-[color:var(--red)] mt-1">
                      {form.formState.errors.customerEmail?.message}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs tracking-[0.25em] text-white/60 mb-2">NAME</div>
                      <Input placeholder="Full name" {...form.register("customerName")} />
                    </div>
                    <div>
                      <div className="text-xs tracking-[0.25em] text-white/60 mb-2">PHONE</div>
                      <Input placeholder="Phone" {...form.register("customerPhone")} />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs tracking-[0.25em] text-white/60 mb-2">ADDRESS</div>
                    <Input placeholder="Address line 1" {...form.register("shippingAddress1")} />
                    <p className="text-xs text-[color:var(--red)] mt-1">
                      {form.formState.errors.shippingAddress1?.message}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs tracking-[0.25em] text-white/60 mb-2">CITY</div>
                      <Input placeholder="City" {...form.register("shippingCity")} />
                    </div>
                    <div>
                      <div className="text-xs tracking-[0.25em] text-white/60 mb-2">STATE</div>
                      <Input placeholder="State" {...form.register("shippingState")} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs tracking-[0.25em] text-white/60 mb-2">POSTAL</div>
                      <Input placeholder="Postal code" {...form.register("shippingPostal")} />
                    </div>
                    <div>
                      <div className="text-xs tracking-[0.25em] text-white/60 mb-2">COUNTRY</div>
                      <Input placeholder="IN" {...form.register("shippingCountry")} />
                    </div>
                  </div>

                  {error ? (
                    <div className="rounded-xl border border-[color:var(--red2)]/40 bg-[color:var(--red2)]/10 p-3 text-sm">
                      {error}
                      <div className="text-white/60 text-xs mt-1">
                        (Backend order API may not be implemented yet.)
                      </div>
                    </div>
                  ) : null}

                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Placing…" : "Place Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-xs tracking-[0.25em] text-white/60">ORDER SUMMARY</div>
              </CardHeader>
              <CardContent className="grid gap-3">
                {items.map((i) => (
                  <div key={i.variantId} className="flex justify-between text-sm">
                    <div className="text-white/70">
                      {i.productName} ({i.size}/{i.color}) × {i.qty}
                    </div>
                    <div className="font-semibold">{formatMoney(i.priceCents * i.qty)}</div>
                  </div>
                ))}
                <div className="h-px bg-white/10" />
                <div className="flex justify-between">
                  <div className="font-black">TOTAL</div>
                  <div className="font-black">{formatMoney(subtotal)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </SiteFrame>
  );
}
