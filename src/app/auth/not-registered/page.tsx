"use client";

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Mail, ArrowLeft, Phone, HelpCircle, ShieldAlert } from 'lucide-react';

export default function NotRegisteredPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground p-4 sm:p-6">
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <a href="/auth/login" className="flex items-center gap-3">
          <img
            src="/brand/mentora-logo.png"
            alt="Mentora Logo"
            className="w-10 h-10 object-contain rounded-xl p-1 border border-primary/20 bg-surface shadow-sm"
          />
          <div>
            <span className="font-extrabold text-lg text-foreground tracking-tight">Mentora</span>
            <p className="text-[11px] text-muted -mt-0.5">Vasumathi Ramaswami Centenary Foundation</p>
          </div>
        </a>
        <ThemeToggle />
      </header>

      <main className="max-w-md w-full mx-auto my-8">
        <div className="mentora-card p-6 sm:p-8 space-y-6 text-center shadow-xl border border-border">
          <div className="w-14 h-14 rounded-full bg-amber-soft text-amber-brand mx-auto flex items-center justify-center">
            <HelpCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              You&apos;re Not Registered Yet
            </h1>
            <p className="text-sm text-muted leading-relaxed">
              Mentora is reserved for college scholars and mentors of the Vasumathi Ramaswami Centenary Foundation.
            </p>
          </div>

          <div className="p-4 rounded-[16px] bg-muted-bg/60 border border-border text-left space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">What to do next</p>
            <div className="space-y-2 text-xs text-foreground">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Reach out to your VRCF Lead Mentor at{' '}
                  <strong className="text-primary font-bold">ramkumar.skr01@gmail.com</strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>Include your full name, college, degree, and personal Gmail address.</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="/auth/login"
              className="mentora-btn-secondary w-full text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Sign In
            </a>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-muted py-4">
        &copy; 2026 Vasumathi Ramaswami Centenary Foundation (VRCF).
      </footer>
    </div>
  );
}
