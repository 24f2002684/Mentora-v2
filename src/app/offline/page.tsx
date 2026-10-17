"use client";

import React, { useState, useEffect } from 'react';
import { COMPETENCIES } from '@/lib/types/competencies';
import {
  WifiOff,
  RefreshCw,
  Home,
  BookOpen,
  HelpCircle,
  Phone,
  Mail,
  ShieldCheck,
  Award,
  Sparkles,
} from 'lucide-react';

export default function OfflinePage() {
  const [isChecking, setIsChecking] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOnlineStatus(navigator.onLine);
      const handleOnline = () => setOnlineStatus(true);
      const handleOffline = () => setOnlineStatus(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const handleRetry = () => {
    setIsChecking(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        if (navigator.onLine) {
          window.location.href = '/student';
        } else {
          setIsChecking(false);
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 flex flex-col justify-between max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* 1. Offline Header Card */}
      <div className="mentora-card p-6 sm:p-8 text-center space-y-4 border-2 border-amber-500/30 bg-surface-raised/40">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-brand flex items-center justify-center mx-auto shadow-inner">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-1.5 max-w-md mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-brand text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-brand animate-pulse" />
            <span>Offline Leadership Mode Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            You're currently offline
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Internet connection was interrupted. Mentora has loaded your cached offline study tools so your learning doesn't pause.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isChecking}
            className="mentora-btn-primary text-xs sm:text-sm px-5 py-2.5 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Checking Connection...' : 'Try Reconnecting'}</span>
          </button>

          <a
            href="/student"
            className="mentora-btn-secondary text-xs sm:text-sm px-5 py-2.5 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </a>
        </div>
      </div>

      {/* 2. Offline Leadership Toolkit */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-lg text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Offline Leadership Toolkit
            </h2>
            <p className="text-xs text-muted">
              Pre-cached reference guides and first-principles mental models
            </p>
          </div>
          <span className="mentora-badge-teal text-xs">Offline Cache</span>
        </div>

        {/* First Principles Prompts Card */}
        <div className="mentora-card p-6 space-y-4 border-l-4 border-l-primary">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-sm text-foreground">
              Socratic First-Principles Checklist
            </h3>
          </div>
          <p className="text-xs text-muted">
            Ask these 3 questions when solving any complex engineering, academic, or team challenge:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-[14px] bg-muted-bg/50 border border-border space-y-1">
              <span className="text-[11px] font-extrabold text-primary">Q1. Deconstruct</span>
              <p className="text-xs text-muted leading-relaxed">
                "What do we believe is true about this problem, and what if that fundamental assumption is false?"
              </p>
            </div>

            <div className="p-3.5 rounded-[14px] bg-muted-bg/50 border border-border space-y-1">
              <span className="text-[11px] font-extrabold text-primary">Q2. Rebuild</span>
              <p className="text-xs text-muted leading-relaxed">
                "Starting from raw physical or mathematical facts, what is the most direct path to a working solution?"
              </p>
            </div>

            <div className="p-3.5 rounded-[14px] bg-muted-bg/50 border border-border space-y-1">
              <span className="text-[11px] font-extrabold text-primary">Q3. Test Under Scarcity</span>
              <p className="text-xs text-muted leading-relaxed">
                "If we had only 20% of our current budget or time, what essential core would we build first?"
              </p>
            </div>
          </div>
        </div>

        {/* 10 Competencies Quick Revision Cards */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-brand" />
            10 Core VRCF Competencies Revision
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(COMPETENCIES).map(([k, comp]) => (
              <div
                key={k}
                className="mentora-card p-3.5 flex flex-col justify-between space-y-2 hover:border-primary/40 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {comp.shortLabel}
                  </span>
                  <h4 className="font-extrabold text-xs text-foreground mt-0.5 line-clamp-1">
                    {comp.label}
                  </h4>
                </div>
                <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
                  {comp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Emergency Foundation Contacts */}
        <div className="mentora-card p-5 space-y-3 bg-surface-raised/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-brand" />
            <h3 className="font-bold text-xs text-foreground uppercase tracking-wider">
              Emergency Scholar Support & Welfare
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-muted">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>Foundation Helpline: <strong>+91 94432 10987</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-muted">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>Mentor Desk: <strong>ramkumar.skr01@gmail.com</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[11px] text-muted pt-6">
        <p>Mentora • Vasumathi Ramaswami Centenary Foundation (VRCF)</p>
      </footer>
    </div>
  );
}
