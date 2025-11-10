import Link from "next/link"

interface CartSummaryProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export function CartSummary({ subtotal, shipping, tax, total }: CartSummaryProps) {
  return (
    <div className="bg-muted rounded-lg p-6 space-y-4">
      <h3 className="font-semibold text-textPrimary text-lg">訂單摘要</h3>

      <div className="space-y-3 border-b border-border pb-4">
        <div className="flex justify-between text-textSecondary">
          <span>小計</span>
          <span>NT${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-textSecondary">
          <span>運費</span>
          <span>{shipping === 0 ? "免費" : `NT$${shipping.toLocaleString()}`}</span>
        </div>
        <div className="flex justify-between text-textSecondary">
          <span>稅金</span>
          <span>NT${tax.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-textPrimary">總計</span>
        <span className="text-2xl font-bold text-primary">NT${total.toLocaleString()}</span>
      </div>

      <Link
        href="/checkout"
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-smooth block text-center"
      >
        前往結帳
      </Link>

      <Link
        href="/products"
        className="w-full border border-border text-textPrimary hover:bg-muted font-semibold py-3 rounded-lg transition-smooth block text-center"
      >
        繼續購物
      </Link>

      {/* Promo Code */}
      <div className="pt-4 border-t border-border">
        <label className="block text-sm font-medium text-textPrimary mb-2">優惠碼</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="輸入優惠碼"
            className="flex-1 px-4 py-2 border border-border rounded-lg bg-white text-textPrimary placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-white transition-smooth font-medium">
            套用
          </button>
        </div>
      </div>
    </div>
  )
}
