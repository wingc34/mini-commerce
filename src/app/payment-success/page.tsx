'use client';

import { useCart } from '@/store/cart-store';
import { CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, use } from 'react';
import { trpc } from '@/trpc/client-api';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';

interface attribute {
  color: string;
  size: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  image: string;
  sku: {
    skuId: string;
    price: number;
    attributes: attribute;
    product: {
      name: string;
    };
  };
}

interface shippingAddress {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postal: string;
  country: string;
}

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ amount?: string; orderId?: string }>;
}) {
  const { amount, orderId } = use(searchParams);
  const { clearCart } = useCart();

  const { data: orderData } = trpc.order.getOrder.useQuery({
    id: orderId || '',
  });

  const shippingaddress = orderData?.shippingAddress as shippingAddress;
  const orderItem = orderData?.orderItem as unknown as OrderItem[];

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      {/* Success Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
              <CheckCircle
                className="w-24 h-24 text-green-500 relative"
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            訂單確認成功
          </h1>
          <p className="text-lg text-muted-foreground">
            感謝您的購買，我們已收到您的訂單
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">訂單編號</p>
              <p className="text-xl font-bold text-foreground">{orderId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">訂單日期</p>
              <p className="text-xl font-bold text-foreground">
                {dayjs().format('YYYY-MM-DD')}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">訂單總額</p>
              <p className="text-xl font-bold text-primary">HKD${amount}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">訂單商品</h3>
            <div className="space-y-3">
              {orderItem.map((item, idx) => {
                return (
                  <div
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    key={`${item.sku.product.name}-${idx}`}
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {item.sku.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        數量: {item.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        color: {item.sku.attributes.color}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        size: {item.sku.attributes.size}
                      </p>
                    </div>
                    <p className="font-semibold text-foreground">
                      HKD${item.sku.price}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mb-8">
          {/* Shipping Address */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">送貨地址</h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground">
                {shippingaddress?.fullName}
              </p>
              <p>{`${shippingaddress?.line2} ${shippingaddress?.line1}`}</p>
              <p>{`${shippingaddress?.city} ${shippingaddress?.state} ${shippingaddress?.postal}`}</p>
              <p>{shippingaddress?.country}</p>
              <p>{shippingaddress.phone}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button>
            <Link
              href="/profile?tab=orders"
              className="flex items-center justify-center gap-2"
            >
              <Clock className="w-5 h-5" />
              查看訂單詳情
            </Link>
          </Button>
          <Button variant={'outline'}>
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 px-6 py-2 text-foreground"
            >
              繼續購物
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
