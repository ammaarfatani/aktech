'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { NAV_ITEMS } from './nav-items';

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || user?.role === 'admin'
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0 bg-sidebar border-sidebar-border flex flex-col">
        <SheetHeader className="border-b border-sidebar-border px-5 py-5">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <BrandLogo variant="sidebar" subtitle="Lead CRM" />
        </SheetHeader>

        <nav className="flex-1 py-4 px-3 space-y-1">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Navigation
          </p>
          {visibleItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  'flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'text-zinc-400 hover:bg-sidebar-accent hover:text-zinc-100'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-sidebar-border px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/80 px-3 py-2.5">
            <div className="h-9 w-9 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {user?.name?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-zinc-200 truncate">
                {user?.name}
              </span>
              <span className="text-xs text-zinc-500 capitalize">
                {user?.role} account
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
