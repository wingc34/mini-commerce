'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { trpc } from '@/app/_trpc/client-api';
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
      userId: 'cmi2m5mh30000rvp7v88l9ey5', //@TODO get user id
      total: total,
      shippingAddressId: 'cmi2m5mhe0002rvp7lvz0huxi', //@TODO get user default shipping address
      orderItem: items.map((item) => ({
        skuId: item.sku.id,
        quantity: item.quantity,
        price: item.sku.price,
      })),
    });
    if (success) {
      push(`/checkout?orderId=${id}`);
    } else {
      toast('failed to create order');
    }
  }, [total, createOrder, items, push]);
  return (
    <div className="bg-muted rounded-lg p-6 space-y-4">
      <h3 className="font-semibold text-textPrimary text-lg">訂單摘要</h3>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-textPrimary">總計</span>
        <span className="text-2xl font-bold text-primary">
          HKD${(total / 100).toLocaleString()}
        </span>
      </div>

      <div className="space-y-2">
        <Button
          className="w-full text-center cursor-pointer"
          onClick={onCreateOrder}
        >
          前往結帳
        </Button>

        <Button
          className="w-full text-center bg-transparent"
          variant={'outline'}
        >
          <Link href="/products">繼續購物</Link>
        </Button>
      </div>
    </div>
  );
}
