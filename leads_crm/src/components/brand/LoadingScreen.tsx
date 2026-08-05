'use client';

import { BrandLogo } from './BrandLogo';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export function LoadingScreen({
  message = 'Verifying access…',
  className,
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'flex h-screen w-screen items-center justify-center bg-[#09090b]',
        className
      )}
    >
      <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
        <BrandLogo variant="loading" />
        <div className="flex flex-col items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#e31e2d] border-t-transparent" />
          <p className="text-xs text-zinc-500 tracking-wide">{message}</p>
        </div>
      </div>
    </div>
  );
}
