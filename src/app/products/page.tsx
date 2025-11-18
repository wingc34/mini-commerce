'use client';

import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { Filter } from 'lucide-react';
import { ProductPagination } from '@/components/products/ProductPagination';
import { useState } from 'react';
import { trpc } from '@/app/_trpc/client-api';
import { pageItemSize } from '@/constant';

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { data: products, isLoading } = trpc.product.getProducts.useQuery({
    page: page,
  });
  const totalPages = Math.ceil((products?.total || 0) / pageItemSize);

  return (
    <>
      {/* Page Header */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <h1 className="text-4xl font-bold text-textPrimary mb-2">產品目錄</h1>
        <p className="text-textSecondary">瀏覽我們的完整產品系列</p>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-background">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
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
              <div className="pt-4 bg-muted rounded-lg p-4 mt-4">
                <ProductFilters />
              </div>
            </details>
          </div>
          <div className="flex gap-8">
            {/* Fixed Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-muted rounded-lg p-6 border border-border">
                <ProductFilters />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* @TODO: Sort Options */}
              {/* <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">顯示 8 件產品</p>
                <select className="px-4 py-2 border border-border rounded-lg bg-white dark:bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>最新上市</option>
                  <option>價格：低到高</option>
                  <option>價格：高到低</option>
                  <option>評分最高</option>
                  <option>最多評論</option>
                </select>
              </div> */}

              {/* Product Grid */}
              {isLoading ? (
                'loading'
              ) : (
                <>
                  <ProductGrid products={products?.data ?? []} />
                  <ProductPagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
