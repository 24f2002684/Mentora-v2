"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  GraduationCap,
  Shield,
  Users,
  Building,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, switchDemoRole } = useAuth();
  const [emailInput, setEmailInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorMsg('Please enter your email address');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    const result = await signInWithEmail(emailInput.trim());
    setIsSubmitting(false);

    if (!result.success) {
      if (result.error?.includes('not registered')) {
        router.push('/auth/not-registered');
      } else {
        setErrorMsg(result.error || 'Authentication failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground p-4 sm:p-6">
      {/* Top Bar with Logo and ThemeToggle */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/brand/mentora-logo.png"
            alt="Mentora Logo"
            className="w-10 h-10 object-contain rounded-xl p-1 border border-primary/20 bg-surface shadow-sm"
          />
          <div>
            <span className="font-extrabold text-lg text-foreground tracking-tight">Mentora</span>
            <p className="text-[11px] text-muted -mt-0.5">Vasumathi Ramaswami Centenary Foundation</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-8">
        <div className="mentora-card p-6 sm:p-8 space-y-6 shadow-xl border border-border">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Welcome to Mentora
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              Sign in with your registered VRCF email address to continue your mentorship journey.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-[14px] bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full min-h-[48px] rounded-full border border-border bg-surface hover:bg-muted-bg text-foreground font-semibold text-sm flex items-center justify-center gap-3 shadow-sm transition-all focus:ring-2 focus:ring-primary/30"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.09C3.33 21.46 7.39 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.27C.46 8.21 0 10.05 0 12s.46 3.79 1.27 5.41l4.01-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.33 2.54 1.27 6.59l4.01 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-border w-full" />
            <span className="bg-surface px-3 text-[11px] text-muted uppercase font-bold tracking-wider relative">
              Or with registered email
            </span>
          </div>

          {/* Email input form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="name@gmail.com"
                className="mentora-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mentora-btn-primary min-h-[44px]"
            >
              {isSubmitting ? 'Verifying Registration...' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Role Logins */}
          <div className="pt-4 border-t border-border/80 space-y-2.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted text-center">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => switchDemoRole('student', 'lakshana042006@gmail.com')}
                className="p-2.5 rounded-[12px] border border-border hover:border-primary bg-surface flex items-center gap-2 transition-colors text-left"
              >
                <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-foreground block">Scholar</span>
                  <span className="text-[10px] text-muted truncate block">Lakshana R</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => switchDemoRole('mentor', 'ramkumar.skr01@gmail.com')}
                className="p-2.5 rounded-[12px] border border-border hover:border-sky-500 bg-surface flex items-center gap-2 transition-colors text-left"
              >
                <Users className="w-4 h-4 text-sky-500 shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-foreground block">Lead Mentor</span>
                  <span className="text-[10px] text-muted truncate block">Ramkumar SKR</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => switchDemoRole('trustee', 'trustee1@vrcf.org.in')}
                className="p-2.5 rounded-[12px] border border-border hover:border-amber-500 bg-surface flex items-center gap-2 transition-colors text-left"
              >
                <Building className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-foreground block">Trustee</span>
                  <span className="text-[10px] text-muted truncate block">Smt. Shanthi R</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => switchDemoRole('admin', 'suhailmobina95@gmail.com')}
                className="p-2.5 rounded-[12px] border border-border hover:border-rose-500 bg-surface flex items-center gap-2 transition-colors text-left"
              >
                <Shield className="w-4 h-4 text-rose-500 shrink-0" />
                <div className="truncate">
                  <span className="font-bold text-foreground block">Admin</span>
                  <span className="text-[10px] text-muted truncate block">Suhail Akthar</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-muted py-4">
        &copy; 2026 Vasumathi Ramaswami Centenary Foundation (VRCF). All rights reserved.
      </footer>
    </div>
  );
}
