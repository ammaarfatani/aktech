'use client';

import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface NotificationBellProps {
  unreadCount: number;
}

export function NotificationBell({ unreadCount }: NotificationBellProps) {
  const { notifications, markAllRead } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-lg hover:bg-muted/80 transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-[#e31e2d] border-0">
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        }
      />
      <PopoverContent align="end" className="w-80 p-0 shadow-xl rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Bell className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-sm font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-[#e31e2d]/10 text-[#e31e2d] font-semibold px-1.5 py-0.5 rounded-full border border-[#e31e2d]/20">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] font-medium text-[#e31e2d] hover:text-[#c41825] transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Scrollable List — native overflow so mouse wheel always works */}
        <div
          className="overflow-y-auto overscroll-contain"
          style={{ maxHeight: '320px' }}
        >
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
              <BellOff className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={cn(
                    'px-4 py-3 transition-colors hover:bg-muted/40',
                    !n.read && 'bg-[#e31e2d]/5 border-l-2 border-[#e31e2d]'
                  )}
                >
                  <div className="flex items-start gap-2">
                    {!n.read && (
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e31e2d]" />
                    )}
                    <div className={cn('flex-1 min-w-0', !n.read ? '' : 'pl-3.5')}>
                      <p className="text-xs font-medium text-foreground leading-snug">{n.message}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {formatDistanceToNow(n.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
