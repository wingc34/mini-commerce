import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Product } from '@/types/product';
import type { PaginatedResponse } from '@/types/api';

export function useProducts(page: number) {
  return useQuery({
    queryKey: ['products', page],
    queryFn: () =>
      api.get<PaginatedResponse<Product>>(`/api/v1/products?page=${page}`),
  });
}

export function useRecommendedProducts() {
  return useQuery({
    queryKey: ['products', 'recommended'],
    queryFn: () => api.get<{ data: Product[] }>('/api/v1/products/recommended'),
  });
}

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => api.get<{ data: Product }>(`/api/v1/products/${id}`),
    enabled: !!id,
  });
}

export function useCheckStock(
  productId: string,
  attributes: Record<string, string>
) {
  const enabled = Object.values(attributes).every((v) => v !== '');

  return useQuery({
    queryKey: ['stock', productId, attributes],
    queryFn: () =>
      api.post<{ inStock: boolean }>(`/api/v1/products/${productId}/stock`, {
        attributes,
      }),
    enabled,
  });
}
