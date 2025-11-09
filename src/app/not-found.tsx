'use client';

import Link from 'next/link';
import { AlertCircle, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="px-4 py-16 w-full text-center">
      {/* Illustration Area */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl font-bold text-primary/10 dark:text-primary/50 select-none">
              404
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <AlertCircle className="w-32 h-32 text-primary animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-textSecondary mb-4">
          頁面未找到
        </h1>
        <p className="text-xl md:text-2xl text-textSecondary mb-6">
          抱歉，您正在尋找的頁面不存在或已被移除。
        </p>
        <p className="text-base text-textSecondary mb-8">
          可能是以下原因造成的：
        </p>

        {/* Reasons List */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 text-sm text-textSecondary">
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="font-semibold text-foreground mb-2">
              ✕ 連結已過期
            </div>
            <p className="text-textSecondary">
              該頁面可能已被刪除或暫時不可用。
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="font-semibold text-foreground mb-2">
              ✕ 錯誤的URL
            </div>
            <p className="text-textSecondary">請檢查您輸入的網址是否正確。</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="font-semibold text-foreground mb-2">✕ 權限不足</div>
            <p className="text-textSecondary">您可能沒有權限訪問此頁面。</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="inline-flex items-center justify-center gap-2 px-8! py-3! rounded-lg font-semibold transition-colors hover:cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Home className="w-5 h-5" />
            返回首頁
          </Button>
          <Button
            className="inline-flex items-center justify-center gap-2 px-8! py-3! bg-secondary rounded-lg font-semibold transition-colors hover:cursor-pointer"
            onClick={() => router.push('/products')}
          >
            <Search className="w-5 h-5" />
            瀏覽產品
          </Button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="p-6 rounded-lg bg-muted border border-border">
        <h3 className="font-semibold text-foreground mb-4">您可以試試：</h3>
        <ul className="space-y-2 text-sm text-textSecondary">
          <li>• 使用頂部導航菜單查看所有可用頁面</li>
          <li>• 返回首頁並重新開始瀏覽</li>
          <li>• 使用搜索功能尋找特定產品</li>
          <li>• 聯絡客服支持團隊獲得幫助</li>
        </ul>
      </div>

      {/* Contact Link */}
      <div className="mt-8">
        <p className="text-sm text-textSecondary mb-3">仍然需要幫助？</p>
        <Link
          href="/contact"
          className="inline-text text-primary font-semibold hover:underline"
        >
          聯絡我們 →
        </Link>
      </div>
    </div>
  );
}
