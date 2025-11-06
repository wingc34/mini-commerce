import { ProductGrid } from '@/components/products/product-grid';
import { ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <>
      {/* Breadcrumb */}

      {/* Page Header */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-textPrimary mb-2">產品目錄</h1>
        <p className="text-textSecondary">瀏覽我們的完整產品系列</p>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-6">
        {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-8"> */}
        {/* Main Content */}

        {/* Filters */}

        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer py-4 font-semibold text-foreground hover:text-primary transition-smooth">
            <span className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              篩選選項
            </span>
            <span className="transition-transform group-open:rotate-180">
              ▼
            </span>
          </summary>
          <div className="pt-4">{/* <ProductFilters /> */}</div>
        </details>

        <div className="lg:col-span-4">
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-textPrimary">顯示 8 件產品</p>
          </div>

          {/* Product Grid */}
          <ProductGrid />
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
