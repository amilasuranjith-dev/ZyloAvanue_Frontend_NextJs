export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};

export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};

export type CategoryDto = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
};

export type ProductSummaryDto = {
  id: number;
  slug: string;
  name: string;
  primaryImageUrl: string | null;
  minPriceCents: number | null;
  maxPriceCents: number | null;
  inStock: boolean;
};

export type ProductImageDto = {
  url: string;
  primary: boolean;
  sortOrder: number;
};

export type ProductVariantDto = {
  id: number;
  sku: string;
  size: string;
  color: string;
  priceCents: number;
  stockQty: number;
  active: boolean;
};

export type ProductDetailDto = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  images: ProductImageDto[];
  variants: ProductVariantDto[];
};

export type TokenPairResponse = {
  tokenType: "Bearer";
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
};
