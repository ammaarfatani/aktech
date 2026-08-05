import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-10 text-center rounded-xl border border-dashed border-border/60 bg-muted/20 my-2',
        className
      )}
    >
      <div className="h-14 w-14 rounded-2xl bg-muted/60 flex items-center justify-center mb-4 ring-1 ring-foreground/5">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-1.5 mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button size="sm" variant="outline" onClick={onAction} className="text-xs">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
