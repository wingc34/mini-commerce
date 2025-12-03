import { ChevronRight, Package, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Item, ItemActions, ItemContent } from '@/components/ui/item';
import { trpc } from '@/trpc/client-api';
import dayjs from 'dayjs';
import { OrderStatus } from '@prisma/client';
import { PaginationComponent } from '@/components/ui/PaginationComponent';
import { useState } from 'react';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { userOrderPageItemSize } from '@/constant';
interface Order {
  id: string;
  createdAt: string;
  total: number;
  status: OrderStatus;
  itemCount: number;
}

function getStatusInfo(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return {
        label: 'Pending',
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: Package,
      };
    case OrderStatus.PAID:
      return {
        label: 'Paid',
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        icon: DollarSign,
      };
    case OrderStatus.SHIPPED:
      return {
        label: 'Shipped',
        color: 'bg-green-50 text-green-700 border-green-200',
        icon: CheckCircle,
      };
    default:
      return {
        label: 'Unknown',
        color: 'bg-gray-50 text-gray-700 border-gray-200',
        icon: Package,
      };
  }
}

export function OrderHistory() {
  const [page, setPage] = useState(1);
  const { data, isFetching } = trpc.order.getUserOrder.useQuery({ page: page });
  const order = data?.order as Order[] | undefined;
  const totalPages = Math.ceil((data?.orderCount || 0) / userOrderPageItemSize);

  return (
    <>
      <LoadingOverlay isLoading={isFetching} className="w-full h-full" />
      <h2 className="text-2xl font-bold text-foreground">Order History</h2>

      <div className="space-y-4">
        {order &&
          order?.length > 0 &&
          order
            ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <Item key={order.id}>
                  <ItemContent>
                    <div className="rounded-lg border border-border p-6 hover:border-primary transition-smooth">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-textSecondary mb-1">
                            Order Number
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
                          <p className="text-xs text-textSecondary mb-1">
                            Order Date
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {dayjs(order.createdAt).format('YYYY-MM-DD HH:mm')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-textSecondary mb-1">
                            Items
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {order.itemCount} item
                            {order.itemCount > 1 ? 's' : ''}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-textSecondary mb-1">
                            Order Total
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
                            View Details
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
      {order && order.length > 1 && (
        <PaginationComponent
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
