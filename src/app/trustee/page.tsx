"use client";

import React from 'react';
import { getMockStore } from '@/lib/mock/store';
import { COMPETENCIES } from '@/lib/types/competencies';
import {
  Users,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  Building,
  HeartHandshake,
  BarChart2,
} from 'lucide-react';

export default function TrusteeDashboard() {
  const store = getMockStore();

  const totalStudents = store.students.length;
  const totalMentors = store.mentors.length;
  const totalTasks = store.tasks.length;
  const reviewedTasks = store.tasks.filter((t) => t.status === 'reviewed').length;
  const submittedTasks = store.tasks.filter((t) => t.status === 'submitted').length;
  const inProgressTasks = store.tasks.filter((t) => t.status === 'in_progress').length;

  const completionRate = Math.round((reviewedTasks / (totalTasks || 1)) * 100);
  const openFlags = store.aiFlags.filter((f) => f.status === 'open').length;
  const resolvedFlags = store.aiFlags.filter((f) => f.status === 'resolved' || f.status === 'acknowledged').length;

  const cohorts = [
    { cohort: 1, count: store.students.filter((s) => s.cohort === 1).length, avgGpa: '8.7', activeRate: '94%' },
    { cohort: 2, count: store.students.filter((s) => s.cohort === 2).length, avgGpa: '8.4', activeRate: '91%' },
    { cohort: 3, count: store.students.filter((s) => s.cohort === 3).length, avgGpa: '8.6', activeRate: '96%' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Trustee Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Foundation Governance & Impact
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Executive oversight of scholar development, mentor turnaround, and leadership outcomes
          </p>
        </div>

        <a
          href="/trustee/students"
          className="mentora-btn-primary text-sm self-start sm:self-auto"
        >
          <HeartHandshake className="w-4 h-4" />
          Send Scholar Feedback
        </a>
      </div>

      {/* 2. Top Foundation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-primary">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Funded Scholars</span>
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">{totalStudents}</div>
          <p className="text-xs text-muted">38 active on platform this week</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-emerald-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Tasks Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-brand" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-brand">{reviewedTasks}</div>
          <p className="text-xs text-muted">{completionRate}% total review rate</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-sky-500">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Active Mentors</span>
            <Users className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-3xl font-extrabold text-sky-500">{totalMentors}</div>
          <p className="text-xs text-muted">Avg 1.2 day feedback turnaround</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-amber-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Support Cases</span>
            <ShieldAlert className="w-4 h-4 text-amber-brand" />
          </div>
          <div className="text-3xl font-extrabold text-amber-brand">{openFlags} Open</div>
          <p className="text-xs text-muted">{resolvedFlags} addressed by mentors</p>
        </div>
      </div>

      {/* 3. Cohort Distribution & Performance */}
      <section className="mentora-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              Cohort Engagement & Academic Growth
            </h2>
            <p className="text-xs text-muted">Platform participation and progress across academic batches</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {cohorts.map((c) => (
            <div key={c.cohort} className="p-5 rounded-[16px] bg-muted-bg/50 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-foreground">Cohort {c.cohort}</span>
                <span className="mentora-badge-teal text-xs">{c.count} Scholars</span>
              </div>
              <div className="space-y-1.5 text-xs text-muted">
                <div className="flex justify-between">
                  <span>Weekly Platform Activity:</span>
                  <strong className="text-foreground">{c.activeRate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Avg Competency Score:</span>
                  <strong className="text-foreground">4.2 / 5.0</strong>
                </div>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: c.activeRate }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Aggregate Competency Growth Across the Foundation */}
      <section className="mentora-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-brand" />
              Foundation-Wide Competency Baselines
            </h2>
            <p className="text-xs text-muted">Aggregated across all 42 scholars from mentor evaluations and reflective milestones</p>
          </div>
          <a href="/trustee/analytics" className="mentora-btn-secondary text-xs px-3.5 py-1.5">
            Detailed Analytics
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {Object.entries(COMPETENCIES).map(([key, comp]) => (
            <div key={key} className="p-4 rounded-[14px] bg-surface border border-border space-y-2">
              <span className="text-xs font-semibold text-muted truncate block">{comp.label}</span>
              <div className="text-xl font-extrabold text-foreground">4.2 <span className="text-xs text-muted font-normal">/ 5.0</span></div>
              <div className="w-full bg-muted-bg rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
