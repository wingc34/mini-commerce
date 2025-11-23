import { CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const orderId = 'ORD-2025-001234';
  const orderDate = new Date().toLocaleDateString('zh-TW');

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
              <p className="text-xl font-bold text-foreground">{orderDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">訂單總額</p>
              <p className="text-xl font-bold text-primary">NT$4,822</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">訂單商品</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">高級無線耳機</p>
                  <p className="text-sm text-muted-foreground">數量: 1</p>
                </div>
                <p className="font-semibold text-foreground">NT$2,499</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground">智能手錶</p>
                  <p className="text-sm text-muted-foreground">數量: 2</p>
                </div>
                <p className="font-semibold text-foreground">NT$3,998</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mb-8">
          {/* Shipping Address */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">送貨地址</h3>
            <div className="space-y-2 text-muted-foreground">
              <p className="font-medium text-foreground">王小明</p>
              <p>台北市信義區信義路五段 1 號</p>
              <p>電話: 02-1234-5678</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/profile?tab=orders"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-smooth"
          >
            <Clock className="w-5 h-5" />
            查看訂單詳情
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-smooth"
          >
            繼續購物
          </Link>
        </div>
      </div>
      F
    </>
  );
}
