'use client';

import { trpc } from '@/trpc/client-api';
import { OrderStatus, Address } from '@prisma/client';
import dayjs from 'dayjs';
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Phone,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sku: {
    skuCode: string;
    name: string;
    price: number;
    image: string;
    attributes: {
      size: string;
      color: string;
    };
  };
}

interface OrderDetail {
  id: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: Address;
}

function getStatusInfo(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return {
        label: 'Pending',
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: Package,
        description: "Your order is being processed. We'll update you soon.",
      };
    case OrderStatus.PAID:
      return {
        label: 'paid',
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: DollarSign,
        description:
          "Your payment has been received. We're processing your order.",
      };
    case OrderStatus.SHIPPED:
      return {
        label: 'shipped',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: Truck,
        description: 'Your order has been shipped and is on its way.',
      };
    case OrderStatus.COMPLETED:
      return {
        label: 'Delivered',
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: CheckCircle,
        description:
          'Your order has been delivered. Thank you for your purchase!',
      };
    default:
      return {
        label: 'Unknown',
        color: 'bg-gray-50 text-gray-700 border-gray-200',
        icon: Package,
        description: '',
      };
  }
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isFetching } = trpc.order.getOrderDetail.useQuery({ id });

  if (!data?.success && !isFetching) {
    throw new Error('Failed to get order detail');
  }

  const orderDetail = data?.data as OrderDetail | undefined;

  if (!orderDetail && !isFetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Order Not Found
          </h2>
          <p className="text-textSecondary mb-4">
            Sorry, we couldn&apos;t find the order you&apos;re looking for
          </p>
          <Link
            href="/profile?tab=overview"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-smooth font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Account
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(orderDetail?.status || '');
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/profile?tab=overview"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-smooth mb-4 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Account
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Order Details
          </h1>
          <p className="text-textSecondary">Order Number: {orderDetail?.id}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <LoadingOverlay isLoading={isFetching} className="w-full h-full" />
        {/* Status Section */}
        <div className={`rounded-lg border p-6 mb-8 ${statusInfo.color}`}>
          <div className="flex items-start gap-4">
            <StatusIcon className="w-6 h-6 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xl font-semibold mb-1">{statusInfo.label}</h2>
              <p className="text-sm">{statusInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Items Section */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Order Items
                </h3>
              </div>

              <div className="divide-y divide-border">
                {orderDetail &&
                  orderDetail?.items.map((item) => {
                    const attr = item.sku.attributes as {
                      size: string;
                      color: string;
                    };
                    return (
                      <div key={item.id} className="p-6 flex gap-4">
                        <img
                          src={item.sku.image || '/placeholder.svg'}
                          alt={item.sku.name}
                          className="w-20 h-20 rounded-lg bg-muted object-cover"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold text-foreground">
                            {item.sku.name}
                          </h4>
                          <p className="text-sm text-textSecondary">
                            Quantity: {item.quantity}
                          </p>
                          <p className="font-medium text-primary">
                            HKD${item.sku.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-textSecondary">
                            {`size: ${attr.size} / color: ${attr.color}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            HKD${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 text-lg">
                Order Summary
              </h3>

              <div className="pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    HKD${orderDetail?.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-xs text-textSecondary">
                <p className="mb-1">
                  Order Date:
                  {dayjs(orderDetail?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Shipping Address
                </h3>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">
                  {orderDetail?.shippingAddress.fullName}
                </p>
                <p className="text-textSecondary">
                  {orderDetail?.shippingAddress.phone}
                </p>
                <div className="bg-muted p-3 rounded-lg mt-3 text-foreground">
                  <p>{`${orderDetail?.shippingAddress.line1}`}</p>
                  <p className="mt-1">
                    {orderDetail?.shippingAddress.city}{' '}
                    {orderDetail?.shippingAddress.postal}
                  </p>
                  <p className="mt-1">
                    {orderDetail?.shippingAddress.state}{' '}
                    {orderDetail?.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-smooth font-medium flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
