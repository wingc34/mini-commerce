import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export function useWishlist() {
  const addWishItem = useMutation({
    mutationFn: (productId: string) =>
      api.post('/api/v1/users/me/wishlist', { productId }),
  });

  const removeWishItem = useMutation({
    mutationFn: (productId: string) =>
      api.delete(`/api/v1/users/me/wishlist/${productId}`),
  });

  return { addWishItem, removeWishItem };
}
