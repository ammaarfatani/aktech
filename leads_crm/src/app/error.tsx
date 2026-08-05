'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled CRM Exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-muted/30">
      <div className="mb-8">
        <BrandLogo variant="auth" />
      </div>
      <Card className="w-full max-w-md border-border/60 shadow-lg ring-1 ring-foreground/[0.03]">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4 ring-1 ring-destructive/20">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-lg font-bold text-foreground">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-sm mt-2 leading-relaxed">
            An unexpected application error occurred. We have logged this event for
            investigation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          {error.message && (
            <div className="bg-muted/50 p-3 rounded-lg text-xs font-mono text-muted-foreground break-all border border-border/60">
              {error.message}
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" className="flex-1 text-xs gap-1.5" onClick={() => reset()}>
              <RefreshCw className="h-3.5 w-3.5" /> Try Again
            </Button>
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full text-xs gap-1.5">
                <Home className="h-3.5 w-3.5" /> Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
