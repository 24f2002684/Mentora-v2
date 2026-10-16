"use client";

import React from 'react';
import { useAuth } from '@/lib/auth/context';
import { getMockStore } from '@/lib/mock/store';
import { COMPETENCIES } from '@/lib/types/competencies';
import {
  Flame,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Brain,
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, studentData } = useAuth();
  const store = getMockStore();

  const currentStudent = studentData || store.students[0];
  const gamification = store.gamification[currentStudent.id] || {
    xp: 385,
    level: 2,
    current_streak: 5,
    longest_streak: 9,
    badges: ['first_goal', 'deep_thinker'],
  };

  const studentTasks = store.tasks.filter((t) => t.student_id === currentStudent.id);
  const pendingTasks = studentTasks.filter((t) => t.status === 'assigned' || t.status === 'in_progress');
  const reviewedTasks = studentTasks.filter((t) => t.status === 'reviewed');
  const latestReview = reviewedTasks.length > 0 ? reviewedTasks[0].submission?.review : null;

  const dailyActivity = store.activities[0];
  const studentScores = store.competencyScores.filter((s) => s.student_id === currentStudent.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. Welcome Hero Banner */}
      <section className="mentora-card p-6 sm:p-8 bg-gradient-to-br from-surface via-surface to-surface-tint border border-primary/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                {currentStudent.vrcf_id} • Cohort {currentStudent.cohort}
              </span>
              <span className="text-xs text-muted">
                {currentStudent.course_name} ({currentStudent.year_of_study})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Vanakkam, {currentStudent.name.split(' ')[0]}! ✨
            </h1>
            <p className="text-muted text-sm sm:text-base max-w-xl">
              Consistency builds leadership. You are on a{' '}
              <strong className="text-amber-brand font-semibold">{gamification.current_streak}-day learning streak</strong>. Let&apos;s push your critical thinking today.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex items-center gap-3">
            <div className="mentora-card p-3 sm:p-4 text-center border-border/80 min-w-[100px]">
              <div className="flex items-center justify-center gap-1 text-amber-brand font-extrabold text-xl">
                <Flame className="w-5 h-5 fill-amber-brand" />
                {gamification.current_streak}
              </div>
              <p className="text-[11px] font-semibold text-muted uppercase mt-0.5">Day Streak</p>
            </div>
            <div className="mentora-card p-3 sm:p-4 text-center border-border/80 min-w-[100px]">
              <div className="flex items-center justify-center gap-1 text-primary font-extrabold text-xl">
                <Award className="w-5 h-5" />
                {gamification.xp}
              </div>
              <p className="text-[11px] font-semibold text-muted uppercase mt-0.5">Level {gamification.level} XP</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Today's "Think It Through" Challenge Card */}
      {dailyActivity && (
        <section className="mentora-card p-6 border-l-4 border-l-primary relative overflow-hidden bg-surface hover:shadow-lg transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="mentora-badge-teal text-xs">
                  <Brain className="w-3.5 h-3.5" />
                  Today&apos;s Challenge
                </span>
                <span className="text-xs font-semibold text-muted">
                  {COMPETENCIES[dailyActivity.competency]?.label || dailyActivity.competency}
                </span>
                <span className="text-xs font-bold text-amber-brand bg-amber-soft px-2 py-0.5 rounded-full">
                  +{dailyActivity.xp} XP
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground">{dailyActivity.title}</h2>
              <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                {dailyActivity.prompt}
              </p>
            </div>
            <a
              href="/student/tasks"
              className="mentora-btn-primary self-start sm:self-center shrink-0"
            >
              Solve Challenge
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}

      {/* 3. Grid: Pending Tasks & Recent Mentor Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Due / Pending Tasks */}
        <section className="mentora-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-lg text-foreground">Actionable Tasks</h2>
            </div>
            <a href="/student/tasks" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View all ({studentTasks.length})
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {pendingTasks.length === 0 ? (
            <div className="p-8 text-center rounded-[14px] bg-muted-bg/50 border border-dashed border-border text-muted">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-brand mb-2" />
              <p className="text-sm font-semibold text-foreground">You are all caught up!</p>
              <p className="text-xs text-muted mt-1">No pending tasks. You can add a self-study goal or talk with your AI mentor.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-[14px] border border-border bg-surface hover:border-primary/50 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-sm text-foreground leading-snug">{task.title}</h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-soft text-amber-brand shrink-0">
                      In Progress
                    </span>
                  </div>
                  <p className="text-xs text-muted line-clamp-1">{task.details}</p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {task.focus_competencies.map((c) => (
                        <span key={c} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted-bg text-muted">
                          {COMPETENCIES[c]?.shortLabel || c}
                        </span>
                      ))}
                    </div>
                    <a
                      href="/student/tasks"
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Submit
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Latest Mentor Review */}
        <section className="mentora-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-500" />
              <h2 className="font-bold text-lg text-foreground">Latest Mentor Review</h2>
            </div>
            <span className="text-xs text-muted font-medium">Verified by Mentor</span>
          </div>

          {latestReview ? (
            <div className="p-5 rounded-[16px] bg-surface-tint border border-primary/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                    RM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Ramkumar SKR</p>
                    <p className="text-[10px] text-muted">Lead Mentor • VRCF</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-emerald-brand text-xs font-extrabold border border-emerald-brand/30">
                  Grade {latestReview.grade || 'A+'} ({latestReview.rating}/5)
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-foreground italic bg-surface/70 p-3 rounded-[12px] border border-border/50">
                &ldquo;{latestReview.feedback}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-muted text-[11px]">Reviewed 4 days ago</span>
                <a href="/student/tasks" className="text-primary font-bold hover:underline flex items-center gap-1">
                  View Full Review
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center rounded-[14px] bg-muted-bg/50 border border-dashed border-border text-muted">
              <p className="text-sm font-semibold text-foreground">No reviews yet</p>
              <p className="text-xs text-muted mt-1">Submit your first task to receive personalized feedback from your mentor.</p>
            </div>
          )}

          {/* AI Mentor Shortcut */}
          <div className="p-4 rounded-[16px] bg-muted-bg/60 border border-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Continue with AI Mentor</p>
                <p className="text-xs text-muted">Reflect on decisions or discuss today&apos;s goal</p>
              </div>
            </div>
            <a href="/student/ai-mentor" className="mentora-btn-secondary text-xs px-3.5 py-1.5 shrink-0">
              Chat
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      </div>

      {/* 4. Mini Competency Radar Preview */}
      <section className="mentora-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              VRCF 10 Competencies Snapshot
            </h2>
            <p className="text-xs text-muted">Your leadership development evaluated through mentor tasks and reflective practice</p>
          </div>
          <a href="/student/progress" className="mentora-btn-secondary text-xs px-3.5 py-1.5 self-start sm:self-auto">
            Full Radar & Growth Trends
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
          {studentScores.slice(0, 10).map((item) => (
            <div
              key={item.competency}
              className="p-3 rounded-[14px] bg-surface border border-border hover:border-primary/40 transition-colors"
            >
              <p className="text-[11px] font-semibold text-muted truncate">
                {COMPETENCIES[item.competency]?.shortLabel || item.competency}
              </p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-lg font-extrabold text-foreground">{item.score.toFixed(1)}</span>
                <span className="text-[10px] text-muted">/ 5.0</span>
              </div>
              <div className="w-full bg-muted-bg rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
