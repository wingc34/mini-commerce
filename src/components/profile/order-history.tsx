import { ChevronRight, Package, Truck, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Item, ItemActions, ItemContent } from '@/components/ui/item';
import { trpc } from '@/trpc/client-api';
import dayjs from 'dayjs';
import { OrderStatus } from '@prisma/client';

interface Order {
  id: string;
  createAt: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  itemCount: number;
}

function getStatusInfo(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return {
        label: '處理中',
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: Package,
      };
    case OrderStatus.PAID:
      return {
        label: '已付款',
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: Package,
      };
    case OrderStatus.SHIPPED:
      return {
        label: '已送達',
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: CheckCircle,
      };
    default:
      return {
        label: '未知',
        color: 'bg-gray-50 text-gray-700 border-gray-200',
        icon: Package,
      };
  }
}

export function OrderHistory() {
  const { data } = trpc.order.getUserOrder.useQuery({ page: 1 });
  const order = data?.order as Order[] | undefined;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">購物紀錄</h2>

      <div className="space-y-4">
        {order &&
          order?.length > 0 &&
          order?.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <Item key={order.id}>
                <ItemContent>
                  <div className="rounded-lg border border-border p-6 hover:border-primary transition-smooth">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          訂單編號
                        </p>
                        <p className="font-semibold text-foreground">
                          {order.id}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusInfo.color}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          訂單日期
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {dayjs(order.createAt).format('YYYY-MM-DD')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          商品數量
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {order.itemCount} 件
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          訂單金額
                        </p>
                        <p className="text-sm font-bold text-primary">
                          HKD${order.total.toLocaleString()}
                        </p>
                      </div>
                      <ItemActions className="flex items-end">
                        <Link
                          className="flex items-center gap-1 text-primary hover:text-primary-dark transition-smooth font-medium"
                          key={order.id}
                          href={`/profile/orders/${order.id}`}
                        >
                          查看詳情
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </ItemActions>
                    </div>
                  </div>
                </ItemContent>
              </Item>
            );
          })}
      </div>
    </div>
  );
}
