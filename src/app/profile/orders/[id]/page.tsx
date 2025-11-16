'use client';

import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  CreditCard,
  Phone,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  items: OrderItem[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  shippingMethod: {
    name: string;
    cost: number;
    estimatedDays: number;
  };
  paymentMethod: {
    type: string;
    last4: string;
  };
  subtotal: number;
  tax: number;
  shippingCost: number;
  trackingNumber?: string;
}

const ORDER_DATA: Record<string, OrderDetails> = {
  '1': {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024 年 12 月 15 日',
    total: 4497,
    status: 'delivered',
    items: [
      {
        id: '1',
        name: '無線降噪耳機',
        price: 1999,
        quantity: 1,
        image: '/wireless-headphones.jpg',
      },
      {
        id: '2',
        name: '智能手錶',
        price: 1499,
        quantity: 1,
        image: '/smart-watch.jpg',
      },
      {
        id: '3',
        name: '便攜充電器',
        price: 799,
        quantity: 1,
        image: '/power-bank.jpg',
      },
    ],
    shippingAddress: {
      name: '王小明',
      phone: '+886 123 456 7890',
      address: '台北市信義區忠孝東路五段 123 號 12 樓',
      city: '台北市',
      zipCode: '110',
    },
    shippingMethod: {
      name: '宅配 (7-11/全家)',
      cost: 100,
      estimatedDays: 2,
    },
    paymentMethod: {
      type: '信用卡',
      last4: '4242',
    },
    subtotal: 4200,
    tax: 197,
    shippingCost: 100,
    trackingNumber: '2024121500001234',
  },
  '2': {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024 年 12 月 10 日',
    total: 2499,
    status: 'shipped',
    items: [
      {
        id: '1',
        name: '無線充電板',
        price: 799,
        quantity: 1,
        image: '/wireless-charger.jpg',
      },
    ],
    shippingAddress: {
      name: '張三',
      phone: '+886 987 654 3210',
      address: '台中市西屯區文心路一段 456 號',
      city: '台中市',
      zipCode: '407',
    },
    shippingMethod: {
      name: '快速宅配',
      cost: 200,
      estimatedDays: 1,
    },
    paymentMethod: {
      type: '信用卡',
      last4: '5555',
    },
    subtotal: 799,
    tax: 37,
    shippingCost: 200,
    trackingNumber: '2024121000005678',
  },
  '3': {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024 年 12 月 5 日',
    total: 1599,
    status: 'pending',
    items: [
      {
        id: '1',
        name: 'USB-C 傳輸線 (3 件)',
        price: 599,
        quantity: 1,
        image: '/usb-cable.jpg',
      },
    ],
    shippingAddress: {
      name: '李四',
      phone: '+886 912 345 6789',
      address: '高雄市左營區高鐵路 789 號',
      city: '高雄市',
      zipCode: '813',
    },
    shippingMethod: {
      name: '標準配送',
      cost: 100,
      estimatedDays: 3,
    },
    paymentMethod: {
      type: 'Line Pay',
      last4: '****',
    },
    subtotal: 599,
    tax: 28,
    shippingCost: 100,
    trackingNumber: undefined,
  },
};

function getStatusInfo(status: string) {
  switch (status) {
    case 'pending':
      return {
        label: '處理中',
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: Package,
        description: '您的訂單正在準備中，我們即將為您安排出貨',
      };
    case 'shipped':
      return {
        label: '運送中',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: Truck,
        description: '您的訂單已出貨，正在運送途中',
      };
    case 'delivered':
      return {
        label: '已送達',
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: CheckCircle,
        description: '訂單已送達，感謝您的購買',
      };
    default:
      return {
        label: '未知',
        color: 'bg-gray-50 text-gray-700 border-gray-200',
        icon: Package,
        description: '',
      };
  }
}

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = ORDER_DATA[1];
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            訂單未找到
          </h2>
          <p className="text-muted-foreground mb-4">
            抱歉，無法找到您要查看的訂單
          </p>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-smooth font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            返回個人資料
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-smooth mb-4 font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            返回個人資料
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">訂單詳情</h1>
          <p className="text-muted-foreground">訂單編號：{order.orderNumber}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Section */}
        <div className={`rounded-lg border p-6 mb-8 ${statusInfo.color}`}>
          <div className="flex items-start gap-4">
            <StatusIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
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
            {/* Tracking Information */}
            {order.trackingNumber && (
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  物流追蹤
                </h3>
                <div className="bg-muted rounded p-4">
                  <p className="text-sm text-muted-foreground mb-1">追蹤號碼</p>
                  <p className="font-mono text-foreground font-medium">
                    {order.trackingNumber}
                  </p>
                </div>
              </div>
            )}

            {/* Items Section */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  訂單商品
                </h3>
              </div>

              <div className="divide-y divide-border">
                {order.items.map((item) => (
                  <div key={item.id} className="p-6 flex gap-4">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg bg-muted object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        數量: {item.quantity} 件
                      </p>
                      <p className="font-medium text-primary">
                        NT${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">
                        NT${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 text-lg">
                訂單摘要
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">小計</span>
                  <span className="text-foreground font-medium">
                    NT${order.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">稅金</span>
                  <span className="text-foreground font-medium">
                    NT${order.tax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">運費</span>
                  <span className="text-foreground font-medium">
                    NT${order.shippingCost.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">總計</span>
                  <span className="text-2xl font-bold text-primary">
                    NT${order.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p className="mb-1">訂單日期：{order.date}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">收貨地址</h3>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">
                  {order.shippingAddress.name}
                </p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.phone}
                </p>
                <div className="bg-muted p-3 rounded-lg mt-3 text-foreground">
                  <p>{order.shippingAddress.address}</p>
                  <p className="mt-1">
                    {order.shippingAddress.city} {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">運送方式</h3>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">
                  {order.shippingMethod.name}
                </p>
                <p className="text-muted-foreground">
                  預計 {order.shippingMethod.estimatedDays} 天送達
                </p>
                <p className="font-medium text-primary">
                  運費：NT${order.shippingMethod.cost.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">付款方式</h3>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">
                  {order.paymentMethod.type}
                </p>
                <p className="text-muted-foreground">
                  卡號末4位:{' '}
                  {order.paymentMethod.last4 === '****'
                    ? '已隱蔽'
                    : order.paymentMethod.last4}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-smooth font-medium flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                聯絡客服
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
