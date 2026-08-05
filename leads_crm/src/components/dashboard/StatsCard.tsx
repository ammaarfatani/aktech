'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  className,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden border-border/50 shadow-sm ring-1 ring-foreground/[0.03] transition-all duration-200 hover:shadow-md hover:border-border/80',
        className
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider truncate">
              {title}
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
              {value}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            )}
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
