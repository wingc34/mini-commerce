'use client';

import { useCart } from '@/store/cart-store';
import CheckoutPanel from '@/components/checkout/CheckoutPanel';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTheme } from '@/lib/theme-provider';
import { redirect } from 'next/navigation';
import { use } from 'react';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { items } = useCart();
  const orderId = use(searchParams).orderId;

  if (items.length <= 0) {
    redirect('/');
  }

  const { isDark } = useTheme();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.sku.price * item.quantity,
    0
  );

  return (
    <>
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-textPrimary mb-2">結帳</h1>
        </div>
      </div>

      {
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 w-[80%]">
          {/* Summary */}
          <Elements
            stripe={stripePromise}
            options={{
              mode: 'payment',
              amount: totalPrice,
              currency: 'hkd',
              appearance: {
                variables: {
                  colorBackground: isDark ? '#262626' : '##ffffff',
                  colorText: isDark ? '#ffffff' : '#262626',
                },
              },
            }}
          >
            <CheckoutPanel amount={totalPrice} orderId={orderId || ''} />
          </Elements>
        </div>
      }
    </>
  );
}
