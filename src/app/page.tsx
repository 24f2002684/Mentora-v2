"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { ThemeToggle } from '@/components/theme-toggle';
import { DemoRoleSwitcher } from '@/components/demo-role-switcher';
import {
  GraduationCap,
  Users,
  Shield,
  Building,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Brain,
  TrendingUp,
} from 'lucide-react';

export default function RootHomePage() {
  const router = useRouter();
  const { role, user, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto p-4 sm:p-6 flex items-center justify-between">
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

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/auth/login"
            className="mentora-btn-primary text-xs sm:text-sm px-4 py-2"
          >
            Sign In
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl w-full mx-auto px-4 py-12 text-center space-y-8 animate-in fade-in duration-300">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          VRCF Leadership &amp; Mentorship Platform
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight max-w-2xl mx-auto">
            Empowering College Scholars with Socratic Mentorship
          </h1>
          <p className="text-sm sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Personalized goal-tracking, reflective problem-solving, and AI-assisted leadership growth for VRCF fellows across Tamil Nadu.
          </p>
        </div>

        {/* Role Portal Entry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left pt-6">
          <a
            href="/student"
            className="mentora-card p-5 space-y-3 hover:border-primary transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Scholar Portal</h3>
              <p className="text-xs text-muted mt-0.5">Tasks, goals, AI mentor sessions, and competency tracking.</p>
            </div>
            <div className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Scholar View →
            </div>
          </a>

          <a
            href="/mentor"
            className="mentora-card p-5 space-y-3 hover:border-sky-500 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Mentor Portal</h3>
              <p className="text-xs text-muted mt-0.5">Student roster, assignment reviews, and support alerts.</p>
            </div>
            <div className="text-xs font-bold text-sky-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Mentor View →
            </div>
          </a>

          <a
            href="/trustee"
            className="mentora-card p-5 space-y-3 hover:border-amber-500 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Trustee Board</h3>
              <p className="text-xs text-muted mt-0.5">Cohort impact analytics, mentor turnaround, and encouragement.</p>
            </div>
            <div className="text-xs font-bold text-amber-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Trustee View →
            </div>
          </a>

          <a
            href="/admin"
            className="mentora-card p-5 space-y-3 hover:border-rose-500 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Admin &amp; Design</h3>
              <p className="text-xs text-muted mt-0.5">User permissions, database hygiene, and design system.</p>
            </div>
            <div className="text-xs font-bold text-rose-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Admin View →
            </div>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto p-4 sm:p-6 text-center text-xs text-muted border-t border-border/60">
        &copy; 2026 Vasumathi Ramaswami Centenary Foundation (VRCF). Built for leadership excellence.
      </footer>

      {/* Demo Role Switcher */}
      <DemoRoleSwitcher />
    </div>
  );
}
