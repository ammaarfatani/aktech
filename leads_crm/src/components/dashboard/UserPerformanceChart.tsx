'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead } from '@/types/lead.types';
import { AppUser } from '@/types/user.types';
import { useMemo } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface UserPerformanceChartProps {
  leads: Lead[];
  users: AppUser[];
}

export function UserPerformanceChart({ leads, users }: UserPerformanceChartProps) {
  const chartData = useMemo(() => {
    // Map sales users
    const salesUsers = users.filter((u) => u.role === 'sales');
    
    return salesUsers.map((u) => {
      const userLeads = leads.filter((l) => l.assignedTo === u.uid);
      const convertedLeads = userLeads.filter((l) => l.status === 'Converted');
      const totalRevenue = convertedLeads.reduce((sum, l) => sum + (l.projectAmount || 0), 0);

      return {
        name: u.name,
        username: u.username,
        deals: convertedLeads.length,
        revenue: totalRevenue,
      };
    }).filter((d) => d.deals > 0 || d.revenue > 0);
  }, [leads, users]);

  const hasData = chartData.length > 0;

  return (
    <Card className="premium-card col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">User Performance (Converted Deals & Revenue)</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
            No sales activity converted yet.
          </div>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  stroke="hsl(var(--primary))"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => formatCurrency(val, 'PKR').replace('PKR', '').trim()}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#f97316"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val} deals`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-border bg-popover p-3 shadow-md text-xs space-y-1">
                          <p className="font-semibold">{data.name} ({data.username})</p>
                          <p className="text-primary font-medium">
                            Revenue: {formatCurrency(data.revenue, 'PKR')}
                          </p>
                          <p className="text-orange-500 font-medium">
                            Deals: {data.deals}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                <Bar yAxisId="left" dataKey="revenue" name="Total Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={25} />
                <Bar yAxisId="right" dataKey="deals" name="Deals Converted" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
