'use client';

import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { useCart } from '@/store/cart-store';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import CheckoutPanel from '@/components/checkout/CheckoutPanel';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTheme } from '@/lib/theme-provider';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const { isDark } = useTheme();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.sku.price * item.quantity,
    0
  );
  const isEmpty = items.length === 0;

  return (
    <>
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-textPrimary mb-2">購物車</h1>
          <p className="text-textSecondary">{items.length} 件商品</p>
        </div>
      </div>

      {isEmpty ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <ShoppingCart className="w-16 h-16 text-textSecondary" />
            </div>
            <h2 className="text-2xl font-bold text-textPrimary">
              您的購物車是空的
            </h2>
            <p className="text-textSecondary max-w-md mx-auto">
              開始探索我們的產品，找到您喜歡的商品吧！
            </p>
            <Link
              href="/products"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-smooth"
            >
              繼續購物
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-lg">
                {items?.map((item) => {
                  const attributes =
                    (item.sku.attributes as Record<string, string> | null) ??
                    {};
                  return (
                    <CartItem
                      key={`${item.id} ${item.sku.skuCode}`}
                      {...item}
                      image={item.image || 'https://placehold.co/600x400'}
                      price={item.sku.price}
                      sku={{
                        color: attributes['color'] ?? '',
                        size: attributes['size'] ?? '',
                      }}
                      onQuantityChange={(quantity) =>
                        updateQuantity(item.id, quantity)
                      }
                      onRemove={() => removeItem(item.id)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1 space-y-4">
              <CartSummary total={totalPrice} />
              <Elements
                stripe={stripePromise}
                options={{
                  mode: 'payment',
                  amount: totalPrice,
                  currency: 'hkd',
                  appearance: {
                    variables: {
                      colorBackground: isDark ? '#262626' : '#f5f5f5',
                    },
                  },
                }}
              >
                <CheckoutPanel amount={totalPrice} />
              </Elements>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
