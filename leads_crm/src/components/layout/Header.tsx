'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useNotifications } from '@/hooks/useNotifications';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NotificationBell } from './NotificationBell';
import { MobileSidebar } from './MobileSidebar';
import { LogOut, ChevronDown, Shield, Briefcase, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview & performance metrics' },
  '/leads': { title: 'Lead Management', subtitle: 'View, filter & convert opportunities' },
  '/upload': { title: 'CSV Lead Import', subtitle: 'Batch upload & assign leads' },
  '/users': { title: 'Team Management', subtitle: 'User roles & commission settings' },
  '/commissions': { title: 'Commissions', subtitle: 'Payout records & deal profits' },
  '/activity': { title: 'Activity Audit Log', subtitle: 'System history & event tracing' },
};

function getPageDetails(pathname: string) {
  if (pathname.startsWith('/leads/'))
    return { title: 'Lead Details', subtitle: 'Pipeline progress & activity notes' };
  if (pathname.startsWith('/users/'))
    return { title: 'User Profile', subtitle: 'Account & performance overview' };
  return PAGE_TITLES[pathname] ?? { title: 'AKTECH CRM', subtitle: 'Sales management portal' };
}

function getInitials(name: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { unreadCount } = useNotifications();
  const pageDetails = getPageDetails(pathname);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <>
      <MobileSidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/80 bg-card/80 backdrop-blur-xl px-4 sm:px-6 gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-col min-w-0">
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-foreground truncate">
              {pageDetails.title}
            </h1>
            <p className="text-[11px] text-muted-foreground hidden sm:block truncate">
              {pageDetails.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <NotificationBell unreadCount={unreadCount} />

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="flex items-center gap-2.5 h-10 px-2 sm:px-2.5 rounded-xl hover:bg-muted/80 transition-colors border border-transparent hover:border-border/60"
                >
                  <Avatar className="h-8 w-8 border border-primary/20 shadow-sm">
                    <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
                      {user ? getInitials(user.name) : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:flex flex-col items-start text-left">
                    <span className="text-xs font-semibold leading-none text-foreground">
                      {user?.name}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-medium leading-none px-1.5 py-0.5 rounded-md uppercase tracking-wider mt-1',
                        user?.role === 'admin'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {user?.role === 'admin' ? 'Admin' : 'Sales'}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-0.5 hidden sm:block" />
                </Button>
              }
            />
            <DropdownMenuContent
              align="end"
              className="w-56 p-1.5 shadow-xl rounded-xl border-border/80 bg-popover"
            >
              <div className="px-3 py-2.5 bg-muted/40 rounded-lg mb-1 space-y-1">
                <p className="text-xs font-bold text-foreground truncate">{user?.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  {user?.role === 'admin' ? (
                    <span className="flex items-center gap-1 text-primary">
                      <Shield className="h-3 w-3" /> Full Administrator
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" /> Sales Executive (
                      {user?.commissionPercentage ?? 35}% comm.)
                    </span>
                  )}
                </div>
              </div>

              <DropdownMenuSeparator className="my-1" />

              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-xs font-medium text-primary hover:bg-primary/10 hover:text-primary rounded-lg cursor-pointer transition-colors py-2"
              >
                <LogOut className="mr-2 h-4 w-4 shrink-0" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
