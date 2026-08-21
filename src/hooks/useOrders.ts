import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Order, DraftOrder } from '@/types/order';

interface OrdersResponse {
  orders: Order[];
  total: number;
}

export function useOrders(page: number) {
  return useQuery({
    queryKey: ['orders', page],
    queryFn: () => api.get<OrdersResponse>(`/api/v1/orders?page=${page}`),
  });
}

export function useOrderDetail(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => api.get<Order | DraftOrder>(`/api/v1/orders/${id}`),
    enabled: !!id,
  });
}
