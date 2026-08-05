'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead } from '@/types/lead.types';
import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { LEAD_STATUS_CHART_COLORS } from '@/lib/constants';

interface LeadStatusPieChartProps {
  leads: Lead[];
}

export function LeadStatusPieChart({ leads }: LeadStatusPieChartProps) {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => {
      counts[l.status] = (counts[l.status] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: LEAD_STATUS_CHART_COLORS[name as keyof typeof LEAD_STATUS_CHART_COLORS] || '#64748b',
    }));
  }, [leads]);

  const hasData = chartData.length > 0;

  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Lead Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">
            No leads uploaded yet.
          </div>
        ) : (
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0];
                      return (
                        <div className="rounded-lg border border-border bg-popover p-2 shadow-md text-xs">
                          <p className="font-semibold" style={{ color: data.payload.color }}>
                            {data.name}: {data.value} {data.value === 1 ? 'lead' : 'leads'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
