import { api } from "./client";
import type { ApiResponse, TokenPairResponse } from "./types";

export async function login(email: string, password: string) {
  const { data } = await api.post<ApiResponse<TokenPairResponse>>(
    "/api/v1/auth/login",
    { email, password }
  );
  if (!data.success) throw new Error(data.error?.message ?? "Login failed");
  return data.data!;
}

export async function refresh(refreshToken: string) {
  const { data } = await api.post<ApiResponse<TokenPairResponse>>(
    "/api/v1/auth/refresh",
    { refreshToken }
  );
  if (!data.success) throw new Error(data.error?.message ?? "Refresh failed");
  return data.data!;
}
