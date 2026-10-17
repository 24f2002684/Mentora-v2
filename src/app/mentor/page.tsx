"use client";

import React from 'react';
import { getMockStore } from '@/lib/mock/store';
import { useAuth } from '@/lib/auth/context';
import { COMPETENCIES } from '@/lib/types/competencies';
import {
  Users,
  CheckSquare,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  UserPlus,
  FileCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function MentorDashboard() {
  const { user } = useAuth();
  const store = getMockStore();

  const totalStudents = store.students.length;
  const submissionsToReview = store.submissions.filter((s) => !s.review);
  const openFlags = store.aiFlags.filter((f) => f.status === 'open');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Mentor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Mentor Workspace
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Vasumathi Ramaswami Centenary Foundation Leadership Platform
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/mentor/add-student"
            className="mentora-btn-secondary text-sm"
          >
            <UserPlus className="w-4 h-4" />
            Add Scholar
          </a>
          <a
            href="/mentor/review"
            className="mentora-btn-primary text-sm"
          >
            <CheckSquare className="w-4 h-4" />
            Review Submissions ({submissionsToReview.length})
          </a>
        </div>
      </div>

      {/* 2. Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-primary">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Active Scholars</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">{totalStudents}</div>
          <p className="text-xs text-muted">Across Cohorts 1, 2, and 3</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-amber-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Awaiting Review</span>
            <Clock className="w-4 h-4 text-amber-brand" />
          </div>
          <div className="text-3xl font-extrabold text-amber-brand">{submissionsToReview.length}</div>
          <p className="text-xs text-muted">Tasks submitted by students</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-rose-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Support Alerts</span>
            <AlertCircle className="w-4 h-4 text-rose-brand" />
          </div>
          <div className="text-3xl font-extrabold text-rose-brand">{openFlags.length}</div>
          <p className="text-xs text-muted">AI flagged for mentor check-in</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-emerald-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Turnaround Time</span>
            <TrendingUp className="w-4 h-4 text-emerald-brand" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-brand">1.2d</div>
          <p className="text-xs text-muted">Average review speed</p>
        </div>
      </div>

      {/* 3. Submissions To Review Queue */}
      <section className="mentora-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-amber-brand" />
              Submissions Pending Review
            </h2>
            <p className="text-xs text-muted">Evaluate reflections and assign rubric competency scores</p>
          </div>
          <a
            href="/mentor/review"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            View all ({submissionsToReview.length})
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {submissionsToReview.length === 0 ? (
          <div className="p-8 text-center rounded-[14px] bg-muted-bg/50 border border-dashed border-border text-muted">
            <FileCheck className="w-8 h-8 mx-auto text-emerald-brand mb-2" />
            <p className="text-sm font-semibold text-foreground">Review inbox is completely clear!</p>
            <p className="text-xs text-muted mt-1">All scholar submissions have been graded and reviewed.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {submissionsToReview.slice(0, 5).map((sub) => {
              const task = store.tasks.find((t) => t.id === sub.task_id);
              const student = store.students.find((s) => s.id === task?.student_id);

              return (
                <div
                  key={sub.id}
                  className="p-4 rounded-[16px] border border-border bg-surface hover:border-primary/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground truncate">
                        {student?.name || 'VRCF Scholar'}
                      </span>
                      <span className="text-[11px] font-semibold text-muted bg-muted-bg px-2 py-0.5 rounded-full">
                        {student?.vrcf_id} • Cohort {student?.cohort}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary line-clamp-1">{task?.title}</p>
                    <p className="text-xs text-muted line-clamp-1 italic">&ldquo;{sub.reflection}&rdquo;</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-1 flex-wrap">
                      {task?.focus_competencies.map((c) => (
                        <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-tint text-primary border border-primary/20">
                          {COMPETENCIES[c]?.shortLabel || c}
                        </span>
                      ))}
                    </div>
                    <a
                      href="/mentor/review"
                      className="mentora-btn-primary text-xs px-4 py-2"
                    >
                      Grade & Feedback
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Student Roster Quick Table */}
      <section className="mentora-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Assigned VRCF Scholars
            </h2>
            <p className="text-xs text-muted">Showing 5 of {totalStudents} scholars across affiliated colleges</p>
          </div>
          <a
            href="/mentor/students"
            className="mentora-btn-secondary text-xs px-3.5 py-1.5"
          >
            Full Roster
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted uppercase bg-muted-bg/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 rounded-l-[12px]">VRCF ID</th>
                <th className="px-4 py-3">Scholar Name</th>
                <th className="px-4 py-3">Degree & Year</th>
                <th className="px-4 py-3">College & District</th>
                <th className="px-4 py-3">Cohort</th>
                <th className="px-4 py-3 text-right rounded-r-[12px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {store.students.slice(0, 5).map((s) => (
                <tr key={s.id} className="hover:bg-surface-tint/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{s.vrcf_id}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted text-xs">{s.course_name} ({s.year_of_study})</td>
                  <td className="px-4 py-3 text-muted text-xs truncate max-w-[200px]">{s.college}</td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      Cohort {s.cohort}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`/mentor/students/${s.id}`}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Profile & Tasks →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
