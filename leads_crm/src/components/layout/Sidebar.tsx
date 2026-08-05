'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { NAV_ITEMS } from './nav-items';

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || user?.role === 'admin'
  );

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 ease-in-out shrink-0',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* Premium Brand Section */}
      <div
        className={cn(
          'flex h-[72px] items-center border-b border-sidebar-border shrink-0',
          collapsed ? 'justify-center px-2' : 'px-4'
        )}
      >
        {collapsed ? (
          <BrandLogo variant="icon" />
        ) : (
          <BrandLogo variant="sidebar" subtitle="Lead CRM" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Navigation
          </p>
        )}
        {visibleItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          if (collapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger
                  render={
                    <Link
                      href={item.href}
                      className={cn(
                        'flex h-10 w-full items-center justify-center rounded-lg transition-all duration-150',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                          : 'text-zinc-400 hover:bg-sidebar-accent hover:text-zinc-100'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  }
                />
                <TooltipContent side="right" className="text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-10 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-all duration-150',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'text-zinc-400 hover:bg-sidebar-accent hover:text-zinc-100'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Role Indicator */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/80 px-3 py-2.5 ring-1 ring-white/5">
            <div className="h-8 w-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
              {user?.name?.charAt(0).toUpperCase() ?? '?'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-zinc-200 truncate">
                {user?.name}
              </span>
              <span className="text-[10px] text-zinc-500 capitalize">
                {user?.role} account
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'w-full h-9 text-zinc-500 hover:text-zinc-200 hover:bg-sidebar-accent transition-colors',
            collapsed && 'px-0 justify-center'
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              collapsed && 'rotate-180'
            )}
          />
          {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
