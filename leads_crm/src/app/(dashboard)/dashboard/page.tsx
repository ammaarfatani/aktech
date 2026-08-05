'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useLeads } from '@/hooks/useLeads';
import { useUsers } from '@/hooks/useUsers';
import { useCommissions } from '@/hooks/useCommissions';
import { useActivityLog } from '@/hooks/useActivityLog';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { SalesDashboard } from '@/components/dashboard/SalesDashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useAuth();
  const { leads, loading: loadingLeads } = useLeads();
  const { users, loading: loadingUsers } = useUsers();
  const { commissions, loading: loadingCommissions } = useCommissions();
  const { logs: activities, loading: loadingActivities } = useActivityLog(5);

  const loading = loadingLeads || (user?.role === 'admin' && loadingUsers) || loadingCommissions || (user?.role === 'admin' && loadingActivities);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Skeleton className="h-[260px] md:col-span-2 rounded-xl" />
          <Skeleton className="h-[260px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm ring-1 ring-foreground/[0.03]">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Welcome back, {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Here is your performance overview for today.
        </p>
      </div>

      {user?.role === 'admin' ? (
        <AdminDashboard leads={leads} users={users} commissions={commissions} activities={activities} />
      ) : (
        <SalesDashboard leads={leads} commissions={commissions} />
      )}
    </div>
  );
}
