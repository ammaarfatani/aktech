'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import logoImage from '../../../public/Logo.png';

/** Shared logo mark container — single source of truth for all logo instances. */
export const logoMarkContainerClass =
  'relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-white/10';

export const logoMarkImageClass = 'h-full w-full object-contain p-0.5';

interface LogoMarkProps {
  className?: string;
  priority?: boolean;
}

export function LogoMark({ className, priority = false }: LogoMarkProps) {
  return (
    <div className={cn(logoMarkContainerClass, className)}>
      <Image
        src={logoImage}
        alt="AKTECH"
        priority={priority}
        className={logoMarkImageClass}
      />
    </div>
  );
}

interface BrandLogoProps {
  variant?: 'sidebar' | 'icon' | 'auth' | 'loading';
  subtitle?: string;
  showSubtitle?: boolean;
  href?: string;
  className?: string;
}

export function BrandLogo({
  variant = 'sidebar',
  subtitle = 'Lead CRM',
  showSubtitle = true,
  href,
  className,
}: BrandLogoProps) {
  const content =
    variant === 'sidebar' ? (
      <div className="flex items-center gap-3 min-w-0">
        <LogoMark priority />
        {showSubtitle && (
          <div className="flex flex-col min-w-0 leading-none">
            <span className="text-[13px] font-bold text-white tracking-tight truncate">
              AKTECH
            </span>
            <span className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase mt-1">
              {subtitle}
            </span>
          </div>
        )}
      </div>
    ) : (
      <LogoMark priority />
    );

  if (href) {
    return (
      <Link href={href} className={cn('inline-flex items-center', className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn('inline-flex items-center', className)}>{content}</div>;
}
