'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Commission } from '@/types/commission.types';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface MonthlyRevenueChartProps {
  commissions: Commission[];
}

export function MonthlyRevenueChart({ commissions }: MonthlyRevenueChartProps) {
  const chartData = useMemo(() => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    // Initialize data for last 6 months
    const now = new Date();
    const last6Months = Array.from({ length: 6 }).map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        label: `${months[d.getMonth()]} ${d.getFullYear()}`,
        revenue: 0,
        commission: 0,
      };
    }).reverse();

    commissions.forEach((c) => {
      const date = new Date(c.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const target = last6Months.find((m) => m.monthKey === key);
      if (target) {
        // Assume converting PKR/AED/USD for rough display is not needed or we display based on PKR equivalent
        // For simplicity and since PKR is our main currency or we just add amounts together, let's display projectAmount
        target.revenue += c.projectAmount;
        target.commission += c.amount;
      }
    });

    return last6Months;
  }, [commissions]);

  const hasData = chartData.some((d) => d.revenue > 0);

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Monthly Revenue & Commission</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">
            No sales converted in the last 6 months.
          </div>
        ) : (
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="label"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => formatCurrency(val, 'PKR').replace('PKR', '').trim()}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-border bg-popover p-3 shadow-md text-xs space-y-1">
                          <p className="font-semibold">{data.label}</p>
                          <p className="text-primary">
                            Revenue: {formatCurrency(data.revenue, 'PKR')}
                          </p>
                          <p className="text-emerald-600">
                            Commission: {formatCurrency(data.commission, 'PKR')}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar dataKey="commission" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
