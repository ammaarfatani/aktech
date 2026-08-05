'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'sales')[];
  fallbackUrl?: string;
}

export function RoleGuard({
  children,
  allowedRoles,
  fallbackUrl = '/dashboard',
}: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (!allowedRoles.includes(user.role)) {
        router.push(fallbackUrl);
      }
    }
  }, [user, loading, allowedRoles, fallbackUrl, router]);

  if (loading || !user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs text-muted-foreground">Validating permissions...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
