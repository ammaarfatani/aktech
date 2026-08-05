import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRoleGuard(requiredRoles: string[]) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (!requiredRoles.includes(user.role)) {
        router.replace('/dashboard');
      }
    }
  }, [user, loading, requiredRoles, router]);
}
