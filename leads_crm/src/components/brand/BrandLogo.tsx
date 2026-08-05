'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const LOGO_SRC = '/Logo.png';

interface BrandLogoProps {
  variant?: 'full' | 'sidebar' | 'icon' | 'auth' | 'loading';
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
  const content = (
    <>
      {variant === 'full' || variant === 'auth' ? (
        <img
          src={LOGO_SRC}
          alt="AKTECH"
          width={variant === 'auth' ? 200 : 160}
          height={variant === 'auth' ? 80 : 64}
          className={cn(
            'object-contain object-left',
            variant === 'auth' ? 'h-16 w-auto' : 'h-14 w-auto',
            className
          )}
        />
      ) : variant === 'loading' ? (
        <Image
          src={LOGO_SRC}
          alt="AKTECH"
          width={180}
          height={72}
          className={cn('h-12 w-auto object-contain', className)}
          priority
        />
      ) : variant === 'icon' ? (
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-white">
          <Image
            src={LOGO_SRC}
            alt="AKTECH"
            width={32}
            height={32}
            className="h-8 w-8 object-cover object-top"
            priority
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-white/10">
            <Image
              src={LOGO_SRC}
              alt="AKTECH"
              width={36}
              height={36}
              className="h-9 w-9 object-cover object-top"
              priority
            />
          </div>
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
      )}
    </>
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
