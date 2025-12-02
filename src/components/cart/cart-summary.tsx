'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client-api';
import { useCallback } from 'react';
import { useCart } from '@/store/cart-store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface CartSummaryProps {
  total: number;
}

export function CartSummary({ total }: CartSummaryProps) {
  const { items } = useCart();
  const { push } = useRouter();

  const { mutateAsync: createOrder, error: createOrderError } =
    trpc.order.createOrder.useMutation();

  const onCreateOrder = useCallback(async () => {
    const { success, id } = await createOrder({
      total: total,
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
  }, [total, createOrder, items, push]);
  return (
    <div className="bg-muted rounded-lg p-6 space-y-4">
      <h3 className="font-semibold text-textPrimary text-lg">Order Summary</h3>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-textPrimary">Total</span>
        <span className="text-2xl font-bold text-primary">
          HKD${(total / 100).toLocaleString()}
        </span>
      </div>

      <div className="space-y-2">
        <Button
          className="w-full text-center cursor-pointer"
          onClick={onCreateOrder}
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
