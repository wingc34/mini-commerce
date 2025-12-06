'use client';

import Link from 'next/link';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { AlertTriangle, Home, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { reset: resetQueryError } = useQueryErrorResetBoundary();

  useEffect(() => {
    console.error('Page Error:', error);
  }, [error]);

  const handleReset = () => {
    resetQueryError();
    reset();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Illustration Area */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl font-bold text-destructive/10 select-none">
                Error
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <AlertTriangle className="w-32 h-32 text-destructive animate-bounce" />
                <div className="absolute inset-0 rounded-full border-2 border-destructive/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Oops! Something Went Wrong
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            We encountered an unexpected error while processing your request.
          </p>
          <p className="text-base text-muted-foreground mb-8">
            This could be caused by:
          </p>

          {/* Reasons List */}
          <div className="grid md:grid-cols-3 gap-4 mb-12 text-sm text-muted-foreground">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="font-semibold text-foreground mb-2">
                ⚠ Server Issue
              </div>
              <p>
                Our servers may be experiencing temporary issues or maintenance.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="font-semibold text-foreground mb-2">
                ⚠ Connection Error
              </div>
              <p>Please check your internet connection and try again.</p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="font-semibold text-foreground mb-2">
                ⚠ Request Timeout
              </div>
              <p>
                The request took too long to process. Please try again later.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors cursor-pointer"
            >
              Try Again
            </Button>

            <Button variant={'secondary'} asChild className="cursor-pointer">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="p-6 rounded-lg bg-muted border border-border mb-8">
          <h3 className="font-semibold text-foreground mb-4">
            What you can do:
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Refresh the page or try again in a few moments</li>
            <li>• Clear your browser cache and cookies</li>
            <li>• Try accessing the site from a different browser</li>
            <li>• Check your internet connection</li>
            <li>• Contact our support team if the issue persists</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="p-6 rounded-lg bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-3">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you continue to experience issues, our support team is here to
            help.
          </p>
          <Button asChild className="cursor-pointer">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Customer Service
            </Link>
          </Button>
        </div>

        {/* Error ID for Support */}
        {error.digest && (
          <div className="mt-6 p-4 rounded-lg bg-muted border border-border">
            <p className="text-xs text-muted-foreground">
              Error ID: <span className="font-mono">{error.digest}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Please share this ID when contacting support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
