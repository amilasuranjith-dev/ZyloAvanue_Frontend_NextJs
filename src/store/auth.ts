import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "ADMIN" | "STAFF" | "CUSTOMER";

type JwtPayload = {
  roles?: unknown;
};

function decodeBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

function decodeJwtPayload(token: string): JwtPayload | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const json = decodeBase64Url(parts[1]);
    const payload = JSON.parse(json);
    if (typeof payload === "object" && payload !== null) {
      return payload as JwtPayload;
    }
    return null;
  } catch (error) {
    console.error("Failed to decode auth token payload", error);
    return null;
  }
}

function setStoredToken(token: string) {
  try {
    localStorage.setItem("zylo_access_token", token);
  } catch (error) {
    console.error("Failed to persist auth token", error);
  }
}

function clearStoredToken() {
  try {
    localStorage.removeItem("zylo_access_token");
  } catch (error) {
    console.error("Failed to clear auth token", error);
  }
}

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  roles: Role[];
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAdminLike: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      roles: [],
      setTokens: (accessToken, refreshToken) => {
        const payload = decodeJwtPayload(accessToken);
        const rawRoles = Array.isArray(payload?.roles) ? payload.roles : [];
        const roles = rawRoles
          .filter((role): role is string => typeof role === "string")
          .map((role) => role.replace(/^ROLE_/, ""))
          .filter((role): role is Role => role === "ADMIN" || role === "STAFF" || role === "CUSTOMER");

        setStoredToken(accessToken);
        set({ accessToken, refreshToken, roles });
      },
      logout: () => {
        clearStoredToken();
        set({ accessToken: null, refreshToken: null, roles: [] });
      },
      isAdminLike: () => {
        const roles = get().roles;
        return roles.includes("ADMIN") || roles.includes("STAFF");
      },
    }),
    {
      name: "zylo_auth",
      partialize: (s) => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        roles: s.roles,
      }),
    }
  )
);
