import { api } from "./client";
import type { ApiResponse } from "./types";

export type CreateOrderItem = {
  variantId: number;
  qty: number;
};

export type CreateOrderRequest = {
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  shippingAddress1: string;
  shippingCity: string;
  shippingState: string;
  shippingPostal: string;
  shippingCountry?: string;
  items: CreateOrderItem[];
};

export type CreateOrderResponse = {
  orderNumber: string;
};

export async function createOrder(req: CreateOrderRequest) {
  const { data } = await api.post<ApiResponse<CreateOrderResponse>>(
    "/api/v1/orders",
    req
  );
  if (!data.success) throw new Error(data.error?.message ?? "Order failed");
  return data.data!;
}
