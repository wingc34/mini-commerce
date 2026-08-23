'use client';

import { useCart } from '@/store/cart-store';
import CheckoutPanel from '@/components/checkout/CheckoutPanel';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTheme } from '@/lib/theme-provider';
import { redirect, useSearchParams } from 'next/navigation';
import { env } from '@/lib/env';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

if (env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}
const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
  developerTools: {
    assistant: {
      enabled: false,
    }, // enable when testing
  },
});

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const draftOrderId = searchParams.get('draftOrderId');
  const [clientSecret, setClientSecret] = useState('');

  const { items } = useCart();

  if (items.length <= 0) {
    redirect('/');
  }

  const { isDark } = useTheme();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.sku.price * item.quantity,
    0
  );

  useEffect(() => {
    api
      .post<{ clientSecret: string }>('/api/v1/payments/intent', {
        amount: Math.round(totalPrice * 100),
        draftOrderId: draftOrderId,
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-textPrimary mb-2">Checkout</h1>
        </div>
      </div>

      {
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 w-[80%]">
          {/* Summary */}
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecret,
              appearance: {
                variables: {
                  colorBackground: isDark ? '#262626' : '#ffffff',
                  colorText: isDark ? '#ffffff' : '#262626',
                },
              },
            }}
          >
            <CheckoutPanel
              amount={totalPrice}
              draftOrderId={draftOrderId || ''}
              clientSecret={clientSecret}
            />
          </Elements>
        </div>
      }
    </>
  );
}
