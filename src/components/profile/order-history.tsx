import { ChevronRight, Package, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  orderNumber: string
  date: string
  total: number
  status: "pending" | "shipped" | "delivered"
  items: number
}

const ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024 年 12 月 15 日",
    total: 4497,
    status: "delivered",
    items: 3,
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "2024 年 12 月 10 日",
    total: 2499,
    status: "shipped",
    items: 1,
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    date: "2024 年 12 月 5 日",
    total: 1599,
    status: "pending",
    items: 2,
  },
]

function getStatusInfo(status: string) {
  switch (status) {
    case "pending":
      return { label: "處理中", color: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: Package }
    case "shipped":
      return { label: "運送中", color: "bg-blue-50 text-blue-700 border-blue-200", icon: Truck }
    case "delivered":
      return { label: "已送達", color: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle }
    default:
      return { label: "未知", color: "bg-gray-50 text-gray-700 border-gray-200", icon: Package }
  }
}

export function OrderHistory() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">購物紀錄</h2>

      <div className="space-y-4">
        {ORDERS.map((order) => {
          const statusInfo = getStatusInfo(order.status)
          const StatusIcon = statusInfo.icon

          return (
            <Link key={order.id} href={`/profile/orders/${order.id}`}>
              <div className="rounded-lg border border-border p-6 hover:border-primary transition-smooth cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">訂單編號</p>
                    <p className="font-semibold text-foreground">{order.orderNumber}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusInfo.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{statusInfo.label}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">訂單日期</p>
                    <p className="text-sm font-medium text-foreground">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">商品數量</p>
                    <p className="text-sm font-medium text-foreground">{order.items} 件</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">訂單金額</p>
                    <p className="text-sm font-bold text-primary">NT${order.total.toLocaleString()}</p>
                  </div>
                  <div className="flex items-end">
                    <button className="flex items-center gap-1 text-primary hover:text-primary-dark transition-smooth font-medium">
                      查看詳情
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
