'use client';

import { useCommissions } from '@/hooks/useCommissions';
import { useAuth } from '@/providers/AuthProvider';
import { commissionsService } from '@/services/commissions.service';
import { useState, useMemo } from 'react';
import { toast } from '@/components/ui/toast';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, DollarSign, Clock, CheckCircle2, Wallet, Award, TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Commission } from '@/types/commission.types';
import { PageHeader } from '@/components/shared/PageHeader';

export default function CommissionsPage() {
  const { user } = useAuth();
  const { commissions, loading, error, totalEarnings, pendingAmount, paidAmount } = useCommissions();

  const [processingId, setProcessingId] = useState<string | null>(null);

  // Admin Handler to Mark Commission as Paid
  const handleMarkAsPaid = async (comm: Commission) => {
    if (!user || user.role !== 'admin') return;

    setProcessingId(comm.id);
    try {
      await commissionsService.markAsPaid(comm.id, comm.leadId, user.uid, user.name);
      toast.add({
        title: 'Commission Paid',
        description: `Marked commission for ${comm.projectName} as Paid. Wallet updated.`,
        type: 'success',
      });
    } catch (err: any) {
      toast.add({
        title: 'Error',
        description: err.message || 'Failed to update commission payment status.',
        type: 'error',
      });
    } finally {
      setProcessingId(null);
    }
  };

  const completedDealsCount = commissions.length;

  // Monthly Earnings Aggregation
  const monthlyEarnings = useMemo(() => {
    const map: Record<string, number> = {};
    commissions.forEach((c) => {
      if (c.createdAt) {
        const monthKey = c.createdAt.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
        map[monthKey] = (map[monthKey] || 0) + c.amount;
      }
    });

    const entries = Object.entries(map).map(([month, total]) => ({ month, total }));
    const maxVal = Math.max(...entries.map((e) => e.total), 1);

    return entries.map((e) => ({
      ...e,
      percentage: Math.min(100, Math.round((e.total / maxVal) * 100)),
    }));
  }, [commissions]);

  return (
    <div className="page-container">
      <PageHeader
        title={user?.role === 'admin' ? 'Commissions & Wallet' : 'My Wallet & Earnings'}
        description={
          user?.role === 'admin'
            ? 'Monitor global sales commissions, inspect completed deals, and execute payouts.'
            : 'Track your current balance, pending payouts, and commission history.'
        }
      />

      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-lg border border-destructive/20">
          {error}
        </div>
      )}

      {/* 4 Core Wallet Stat Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Current Balance"
          value={formatCurrency(totalEarnings, 'PKR')}
          icon={Wallet}
          description="Total Computed Earnings"
        />
        <StatsCard
          title="Pending Commission"
          value={formatCurrency(pendingAmount, 'PKR')}
          icon={Clock}
          description="Awaiting Processing"
        />
        <StatsCard
          title="Paid Commission"
          value={formatCurrency(paidAmount, 'PKR')}
          icon={CheckCircle2}
          description="Successfully Disbursed"
        />
        <StatsCard
          title="Completed Projects"
          value={completedDealsCount}
          icon={Award}
          description="Converted Sales Deals"
        />
      </div>

      {/* Grid for Monthly Earnings & History Table */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Monthly Earnings Card */}
        <Card className="premium-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Monthly Earnings Breakdown
            </CardTitle>
            <CardDescription className="text-xs">
              Historical view of commission revenues per month.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyEarnings.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No monthly earnings data available yet.
              </div>
            ) : (
              <div className="space-y-3">
                {monthlyEarnings.map((item) => (
                  <div key={item.month} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-foreground flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> {item.month}
                      </span>
                      <span className="font-bold text-green-700 dark:text-green-400">
                        {formatCurrency(item.total, 'PKR')}
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Commission History Ledger Table */}
        <Card className="premium-card overflow-hidden lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              {user?.role === 'admin' ? 'Global Commission Registry' : 'Commission History & Payouts'}
            </CardTitle>
            <CardDescription className="text-xs">
              Complete record of converted projects, commission rates, and status.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : commissions.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No commission entries recorded in the wallet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      {user?.role === 'admin' && <TableHead>Sales Agent</TableHead>}
                      <TableHead>Contract Amount</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Payout</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      {user?.role === 'admin' && <TableHead className="text-right">Action</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissions.map((comm) => (
                      <TableRow key={comm.id}>
                        <TableCell className="font-semibold text-xs text-foreground">
                          {comm.projectName}
                        </TableCell>
                        {user?.role === 'admin' && (
                          <TableCell className="text-xs">{comm.userName}</TableCell>
                        )}
                        <TableCell className="text-xs">
                          {formatCurrency(comm.projectAmount, comm.currency)}
                        </TableCell>
                        <TableCell className="text-xs">{comm.percentage}%</TableCell>
                        <TableCell className="font-bold text-xs text-green-700 dark:text-green-400">
                          {formatCurrency(comm.amount, comm.currency)}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {formatDate(comm.createdAt)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={comm.status === 'paid' ? 'default' : 'secondary'}
                            className={
                              comm.status === 'paid'
                                ? 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400'
                                : 'bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-400'
                            }
                          >
                            {comm.status}
                          </Badge>
                        </TableCell>
                        {user?.role === 'admin' && (
                          <TableCell className="text-right">
                            {comm.status === 'pending' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs px-2.5"
                                disabled={processingId === comm.id}
                                onClick={() => handleMarkAsPaid(comm)}
                              >
                                {processingId === comm.id ? (
                                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                ) : null}
                                Mark as Paid
                              </Button>
                            ) : (
                              <span className="text-[10px] text-muted-foreground">
                                Paid {formatDate(comm.paidAt)}
                              </span>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
