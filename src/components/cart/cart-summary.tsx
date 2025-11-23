import Link from 'next/link';

interface CartSummaryProps {
  total: number;
}

export function CartSummary({ total }: CartSummaryProps) {
  return (
    <div className="bg-muted rounded-lg p-6 space-y-4">
      <h3 className="font-semibold text-textPrimary text-lg">訂單摘要</h3>

      <div className="flex justify-between items-center">
        <span className="font-semibold text-textPrimary">總計</span>
        <span className="text-2xl font-bold text-primary">
          HKD${(total / 100).toLocaleString()}
        </span>
      </div>

      <Link
        href="/products"
        className="w-full border border-border text-textPrimary hover:bg-muted font-semibold py-3 rounded-lg transition-smooth block text-center"
      >
        繼續購物
      </Link>
    </div>
  );
}
