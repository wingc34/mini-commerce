import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { Address } from '@/types/user';
import { useAuth } from '@/context/auth-context';

export function useAddress() {
  const { status } = useAuth();

  const getAddresses = useQuery({
    queryKey: ['addresses'],
    queryFn: () => api.get<Address[]>('/api/v1/users/me/addresses'),
    enabled: status === 'authenticated',
  });
  const createAddress = useMutation({
    mutationFn: (data: Omit<Address, 'id' | 'userId' | 'createdAt'>) =>
      api.post('/api/v1/users/me/addresses', data),
  });

  const updateAddress = useMutation({
    mutationFn: ({ id, ...data }: Partial<Address> & { id: string }) =>
      api.put(`/api/v1/users/me/addresses/${id}`, data),
  });

  const deleteAddress = useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/users/me/addresses/${id}`),
  });

  const setDefault = useMutation({
    mutationFn: (id: string) =>
      api.put(`/api/v1/users/me/addresses/${id}`, { isDefault: true }),
  });

  return {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefault,
  };
}
