'use client';

import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  isLoading: boolean;
  className?: string;
}

export function LoadingOverlay({ isLoading, className }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        'absolute inset-0 z-40 flex items-center justify-center bg-transparent backdrop-blur-sm rounded-md',
        className
      )}
    >
      <Spinner className="h-8 w-8" />
    </div>
  );
}
//parent container must have 'position relative' to work
