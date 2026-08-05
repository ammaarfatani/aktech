'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/providers/AuthProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { cn } from '@/lib/utils';

const loginSchema = z.object({
  identifier: z
    .string()
    .min(2, 'Please enter a valid username or email')
    .max(100),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const FEATURES = [
  'Real-time lead pipeline management',
  'Automated commission calculations',
  'Multi-currency support (PKR, USD, AED)',
  'Role-based access control',
];

export default function LoginPage() {
  const { user, login, loading: authLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !authLoading) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  const onSubmit = async (data: LoginForm) => {
    setSubmitting(true);
    setLoginError(null);
    try {
      await login(data.identifier, data.password, !!data.rememberMe);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : 'Invalid credentials. Please try again.';
      setLoginError(message);
      toast.add({
        title: 'Sign in failed',
        description: message,
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isLoading = submitting || authLoading;

  return (
    <div className="min-h-screen w-full flex bg-[#09090b] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#e31e2d]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#e31e2d]/6 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 right-[38%] w-64 h-64 border border-white/[0.04] rounded-3xl rotate-12 hidden lg:block" />
      <div className="absolute bottom-32 left-[8%] w-40 h-40 border border-[#e31e2d]/10 rounded-full hidden lg:block" />

      {/* Left branding panel */}
      <div className="hidden lg:flex lg:flex-col lg:w-[48%] relative z-10 p-12 xl:p-16 justify-between">
        <BrandLogo variant="auth" />

        <div className="space-y-8 max-w-md animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e31e2d] animate-pulse" />
              <span className="text-[11px] font-medium text-zinc-400 tracking-wide uppercase">
                Enterprise Sales Platform
              </span>
            </div>
            <h1 className="text-4xl xl:text-[2.75rem] font-bold text-white leading-[1.15] tracking-tight">
              Close more deals.{' '}
              <span className="text-[#e31e2d]">Earn more commission.</span>
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed">
              The premium sales platform built for high-performance teams. Track
              leads, convert clients, and manage commissions — all in one place.
            </p>
          </div>

          <div className="space-y-3">
            {FEATURES.map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-500"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-6 w-6 rounded-full bg-[#e31e2d]/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#e31e2d]" />
                </div>
                <span className="text-zinc-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-zinc-600 text-xs">
          &copy; {new Date().getFullYear()} AKTECH. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 z-10">
        <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Mobile branding */}
          <div className="lg:hidden flex flex-col items-center gap-4 mb-10">
            <BrandLogo variant="auth" />
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-zinc-400 text-sm mt-2">
                Sign in to your AKTECH account to continue
              </p>
            </div>

            {loginError && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#e31e2d]/30 bg-[#e31e2d]/10 px-4 py-3 animate-in fade-in slide-in-from-top-1 duration-300">
                <AlertCircle className="h-4 w-4 text-[#e31e2d] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Sign in failed</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{loginError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label
                  className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
                  htmlFor="identifier"
                >
                  Username or Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-[#e31e2d] transition-colors" />
                  <Input
                    id="identifier"
                    placeholder="Enter your username or email"
                    autoComplete="username"
                    className={cn(
                      'pl-10 h-12 bg-zinc-900/80 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm rounded-xl',
                      'focus-visible:border-[#e31e2d] focus-visible:ring-[#e31e2d]/20 transition-all',
                      errors.identifier && 'border-[#e31e2d]/50'
                    )}
                    disabled={isLoading}
                    {...register('identifier')}
                  />
                </div>
                {errors.identifier && (
                  <p className="text-xs text-[#e31e2d] flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="text-xs font-semibold text-zinc-300 uppercase tracking-wider"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-[#e31e2d] transition-colors" />
                  <Input
                    id="password"
                    type={showPwd ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={cn(
                      'pl-10 pr-11 h-12 bg-zinc-900/80 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm rounded-xl',
                      'focus-visible:border-[#e31e2d] focus-visible:ring-[#e31e2d]/20 transition-all',
                      errors.password && 'border-[#e31e2d]/50'
                    )}
                    disabled={isLoading}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((p) => !p)}
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors p-0.5"
                  >
                    {showPwd ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#e31e2d] flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  {...register('rememberMe')}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-[#e31e2d] focus:ring-[#e31e2d] accent-[#e31e2d] cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-xs text-zinc-400 cursor-pointer select-none hover:text-zinc-300 transition-colors"
                >
                  Keep me signed in for 30 days
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#e31e2d] hover:bg-[#c41825] active:bg-[#a81420] text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#e31e2d]/25 transition-all duration-200 disabled:opacity-60 group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                )}
              </Button>
            </form>
          </div>

          <p className="text-center text-zinc-600 text-xs mt-8 lg:hidden">
            &copy; {new Date().getFullYear()} AKTECH. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
