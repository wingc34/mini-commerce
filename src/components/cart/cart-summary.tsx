'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client-api';
import { useCallback, useEffect } from 'react';
import { useCart } from '@/store/cart-store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
  const { items } = useCart();
  const { push } = useRouter();
  const { mutateAsync: createDraftOrder, isPending } =
    trpc.order.createDraftOrder.useMutation();
  const onCreateDraftOrder = useCallback(async () => {
    if (!shippingAddressId) {
      toast.error(
        'Please set a default address in your profile before proceeding to checkout.'
      );
      return;
    }
    const { success, id } = await createDraftOrder({
      total: total,
      shippingAddressId: shippingAddressId,
      orderItem: items.map((item) => ({
        skuId: item.sku.id,
        quantity: item.quantity,
        price: item.sku.price,
      })),
    });
    if (success) {
      push(`/checkout?orderId=${id}`);
    } else {
      toast.error('failed to create order');
    }
  }, [total, createDraftOrder, items, push, shippingAddressId]);

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
