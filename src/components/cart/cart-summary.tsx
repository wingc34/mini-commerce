'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect } from 'react';
import { useCart } from '@/store/cart-store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

interface CartSummaryProps {
  total: number;
  shippingAddressId: string;
  setIsPending: (isPending: boolean) => void;
}

export function CartSummary({
  total,
  shippingAddressId,
  setIsPending,
}: CartSummaryProps) {
  const { user } = useAuth();
  const { items } = useCart();
  const { push } = useRouter();
  const { mutateAsync: createDraftOrder, isPending } = useMutation({
    mutationFn: (data: {
      total: number;
      shippingAddressId: string;
      orderItem: { skuId: string; quantity: number; price: number }[];
    }) =>
      api.post<{ success: boolean; id: string }>('/api/v1/orders/draft', data),
  });

  const onCreateDraftOrder = useCallback(async () => {
    if (!user) {
      toast.error('Please login to proceed to checkout');
      return;
    } else if (!shippingAddressId) {
      toast.error(
        'Please set a default address in your profile before proceeding to checkout.'
      );
      return;
    }
    const res = await createDraftOrder({
      total,
      shippingAddressId,
      orderItem: items.map((item) => ({
        skuId: item.sku.id,
        quantity: item.quantity,
        price: item.sku.price,
      })),
    });

    if (res.success) {
      push(`/checkout?draftOrderId=${res.id}`);
    } else {
      toast.error('Failed to create order');
    }
  }, [total, createDraftOrder, items, push, shippingAddressId, user]);

  useEffect(() => {
    setIsPending(isPending);
  }, [isPending, setIsPending]);

  return (
    <div className="bg-muted rounded-lg p-6 space-y-4 relative">
      <h3 className="font-semibold text-textPrimary text-lg">Order Summary</h3>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-textPrimary">Total</span>
        <span className="text-2xl font-bold text-primary">
          HKD${total.toLocaleString()}
        </span>
      </div>

      <div className="space-y-2">
        <Button
          className="w-full text-center cursor-pointer"
          onClick={onCreateDraftOrder}
        >
          Proceed to Checkout
        </Button>

        <Button
          className="w-full text-center bg-transparent"
          variant={'outline'}
        >
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
