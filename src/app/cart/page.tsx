'use client';

import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';
import { useCart } from '@/store/cart-store';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: '1',
      name: '高級無線耳機',
      price: 2499,
      quantity: 1,
      image: '/premium-wireless-headphones.png',
    },
    {
      id: '2',
      name: '智能手錶',
      price: 1999,
      quantity: 2,
      image: '/smart-watch-modern.jpg',
    },
    {
      id: '3',
      name: '便攜式充電器',
      price: 599,
      quantity: 1,
      image: '/portable-charger-sleek.jpg',
    },
  ]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: string) => {
    removeItem(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 100;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const isEmpty = cartItems.length === 0;

  return (
    <>
      {/* Page Header */}
      <div className="border-b border-border">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-textPrimary mb-2">購物車</h1>
          <p className="text-textSecondary">{cartItems.length} 件商品</p>
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
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onQuantityChange={(quantity) =>
                      handleQuantityChange(item.id, quantity)
                    }
                    onRemove={() => handleRemove(item.id)}
                  />
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
