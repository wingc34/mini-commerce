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
          Page Not Found
        </h1>
        <p className="text-xl md:text-2xl text-textSecondary mb-6">
          Sorry, the page you are looking for does not exist or has been
          removed.
        </p>
        <p className="text-base text-textSecondary mb-8">
          This could be caused by:
        </p>

        {/* Reasons List */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 text-sm text-textSecondary">
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="font-semibold text-foreground mb-2">
              ✕ Expired Link
            </div>
            <p className="text-textSecondary">
              The page may have been deleted or is temporarily unavailable.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="font-semibold text-foreground mb-2">
              ✕ Incorrect URL
            </div>
            <p className="text-textSecondary">
              Please check if the address you entered is correct.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <div className="font-semibold text-foreground mb-2">
              ✕ Permission Denied
            </div>
            <p className="text-textSecondary">
              You may not have permission to access this page.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            className="inline-flex items-center justify-center gap-2 px-8! py-3! rounded-lg font-semibold transition-colors hover:cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
          <Button
            className="inline-flex items-center justify-center gap-2 px-8! py-3! bg-secondary rounded-lg font-semibold transition-colors hover:cursor-pointer"
            onClick={() => router.push('/products')}
          >
            <Search className="w-5 h-5" />
            Browse Products
          </Button>
        </div>
      </div>

      {/* Suggestions */}
      <div className="p-6 rounded-lg bg-muted border border-border">
        <h3 className="font-semibold text-foreground mb-4">You can try:</h3>
        <ul className="space-y-2 text-sm text-textSecondary">
          <li>• Use the top navigation menu to see all available pages</li>
          <li>• Return to the homepage and start browsing</li>
          <li>• Use the search function to find specific products</li>
          <li>• Contact our support team for assistance</li>
        </ul>
      </div>

      {/* Contact Link */}
      <div className="mt-8">
        <p className="text-sm text-textSecondary mb-3">Still need help?</p>
        <Link
          href="/contact"
          className="inline-text text-primary font-semibold hover:underline"
        >
          Contact Us →
        </Link>
      </div>
    </div>
  );
}
