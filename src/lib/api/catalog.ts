import { api } from "./client";
import type {
  ApiResponse,
  CategoryDto,
  Page,
  ProductDetailDto,
  ProductSummaryDto,
} from "./types";

export async function listCategories() {
  const { data } = await api.get<ApiResponse<CategoryDto[]>>(
    "/api/v1/categories"
  );
  if (!data.success) throw new Error(data.error?.message ?? "Failed");
  return data.data ?? [];
}

export async function listProducts(params: {
  q?: string;
  page?: number;
  size?: number;
}) {
  const { data } = await api.get<ApiResponse<Page<ProductSummaryDto>>>(
    "/api/v1/products",
    { params }
  );
  if (!data.success) throw new Error(data.error?.message ?? "Failed");
  return data.data!;
}

export async function getProduct(slug: string) {
  const { data } = await api.get<ApiResponse<ProductDetailDto>>(
    `/api/v1/products/${encodeURIComponent(slug)}`
  );
  if (!data.success) throw new Error(data.error?.message ?? "Failed");
  return data.data!;
}
