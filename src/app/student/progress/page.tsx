"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import {
  getMockStore,
  toggleStreakFreeze,
  recordActivityAttempt,
} from '@/lib/mock/store';
import { COMPETENCIES, COMPETENCY_KEYS, CompetencyKey } from '@/lib/types/competencies';
import { Activity, ActivityAttempt } from '@/lib/types/database';
import {
  TrendingUp,
  Award,
  Flame,
  CheckCircle2,
  Star,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Brain,
  Sparkles,
  RefreshCw,
  Send,
  Lock,
  Unlock,
  Check,
  HelpCircle,
} from 'lucide-react';

const ALL_BADGES = [
  {
    id: 'first_goal',
    title: 'Visionary Foundation',
    desc: 'Set your primary academic aim and 5-year vision statement',
    icon: Star,
  },
  {
    id: 'task_champion',
    title: 'Execution Master',
    desc: 'Completed and reviewed 3 core foundation tasks',
    icon: CheckCircle2,
  },
  {
    id: 'socratic_thinker',
    title: 'Socratic Mind',
    desc: 'Engaged in 5 multi-turn reflective dialogues with Mentora AI',
    icon: Brain,
  },
  {
    id: 'deep_thinker',
    title: 'First Principles',
    desc: 'Evaluated with Grade A+ for rigorous analytical inquiry',
    icon: Award,
  },
  {
    id: 'streak_master',
    title: 'Consistency Star',
    desc: 'Maintained a 7-day continuous active learning streak',
    icon: Flame,
  },
  {
    id: 'first_activity',
    title: 'Daily Thinker',
    desc: 'Tackled a real-world leadership micro-challenge scenario',
    icon: Sparkles,
  },
];

export default function StudentProgressPage() {
  const { studentData } = useAuth();
  const store = getMockStore();
  const currentStudent = studentData || store.students[0];

  const [gamification, setGamification] = useState(
    store.gamification[currentStudent.id] || {
      xp: 385,
      level: 2,
      current_streak: 5,
      longest_streak: 9,
      streak_freeze_available: true,
      badges: ['first_goal', 'deep_thinker', 'task_champion', 'socratic_thinker'],
    }
  );

  const [studentScores, setStudentScores] = useState(
    store.competencyScores.filter((s) => s.student_id === currentStudent.id)
  );

  // Active micro-challenge state
  const [activities, setActivities] = useState<Activity[]>([...store.activities]);
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);
  const [responseInput, setResponseInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    aiFeedback: string;
    xpAwarded: number;
    unlockedBadge?: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState('');

  const currentActivity = activities[activeActivityIndex] || activities[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Toggle Streak Freeze
  const handleToggleFreeze = () => {
    const newState = toggleStreakFreeze(currentStudent.id);
    setGamification((prev) => ({ ...prev, streak_freeze_available: newState }));
    showToast(newState ? 'Streak freeze activated for tomorrow!' : 'Streak freeze deactivated.');
  };

  // Generate new challenge with AI
  const handleGenerateChallenge = async () => {
    setIsGenerating(true);
    setEvaluationResult(null);
    try {
      const res = await fetch('/api/activities/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: currentStudent.id }),
      });
      if (!res.ok) throw new Error('Failed to generate challenge');
      const data = await res.json();
      if (data.activity) {
        setActivities([data.activity, ...activities]);
        setActiveActivityIndex(0);
        setResponseInput('');
        showToast('New AI leadership micro-challenge generated!');
      }
    } catch (err) {
      console.error(err);
      showToast('Could not generate new activity right now.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit response for AI evaluation
  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/activities/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentStudent.id,
          activityId: currentActivity.id,
          response: responseInput.trim(),
        }),
      });

      if (!res.ok) throw new Error('Submission evaluation failed');
      const data = await res.json();

      setEvaluationResult({
        score: data.score,
        aiFeedback: data.aiFeedback,
        xpAwarded: data.xpAwarded,
        unlockedBadge: data.unlockedBadge,
      });

      // Update local state
      setGamification(store.gamification[currentStudent.id]);
      setStudentScores(store.competencyScores.filter((s) => s.student_id === currentStudent.id));
      showToast(`+${data.xpAwarded} XP awarded for critical reflection!`);
    } catch (err) {
      console.error(err);
      showToast('Evaluation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // XP level calculation: L1: 0-250, L2: 251-500, L3: 501-800, L4: 801-1200
  const getLevelMeta = (level: number) => {
    switch (level) {
      case 1:
        return { name: 'VRCF Scholar', nextXp: 250, prevXp: 0 };
      case 2:
        return { name: 'VRCF Fellow', nextXp: 500, prevXp: 250 };
      case 3:
        return { name: 'VRCF Leader', nextXp: 800, prevXp: 500 };
      case 4:
        return { name: 'VRCF Ambassador', nextXp: 1200, prevXp: 800 };
      default:
        return { name: 'VRCF Master Fellow', nextXp: 2000, prevXp: 1200 };
    }
  };

  const levelMeta = getLevelMeta(gamification.level);
  const xpInCurrentLevel = Math.max(0, gamification.xp - levelMeta.prevXp);
  const levelSpan = levelMeta.nextXp - levelMeta.prevXp;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / levelSpan) * 100));

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground text-xs font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Leadership &amp; Gamification Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Progress &amp; Competencies
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Transparent view of your learning streak, XP progression, and mentor &amp; AI evaluations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-raised border border-border shadow-xs">
            <Flame className="w-5 h-5 text-amber-brand fill-amber-brand" />
            <div className="text-left">
              <span className="text-xs font-black text-foreground block leading-tight">
                {gamification.current_streak}-Day Streak
              </span>
              <span className="text-[10px] text-muted">Best: {gamification.longest_streak} days</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary shadow-xs">
            <Award className="w-5 h-5" />
            <div className="text-left">
              <span className="text-xs font-black text-foreground block leading-tight">
                {gamification.xp} XP
              </span>
              <span className="text-[10px] text-primary font-bold">Level {gamification.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Gamification Level & Streak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Level Progression Card */}
        <div className="mentora-card p-6 bg-gradient-to-br from-surface via-surface to-surface-tint border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                Current Standing
              </span>
              <h2 className="text-xl font-black text-foreground flex items-center gap-2">
                Level {gamification.level} • {levelMeta.name}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg border border-primary/20 shadow-xs">
              L{gamification.level}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted font-semibold">
                {gamification.xp} / {levelMeta.nextXp} XP to next rank
              </span>
              <span className="font-bold text-primary">{progressPercent}%</span>
            </div>
            <div className="w-full bg-muted-bg rounded-full h-2.5 overflow-hidden border border-border/50">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-muted">
            Earn +50 XP per submitted task, +75 XP for daily micro-challenges, and +25 XP per completed learning resource.
          </p>
        </div>

        {/* Streak & Freeze Card */}
        <div className="mentora-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                Active Learning Habit
              </span>
              <h2 className="text-xl font-black text-foreground flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-brand fill-amber-brand" />
                {gamification.current_streak} Consecutive Days
              </h2>
            </div>
            <button
              type="button"
              onClick={handleToggleFreeze}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all ${
                gamification.streak_freeze_available
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400'
                  : 'bg-muted-bg border-border text-muted hover:text-foreground'
              }`}
            >
              {gamification.streak_freeze_available ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Freeze Active
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Enable Freeze
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
              const isActive = idx < gamification.current_streak;
              return (
                <div key={day} className="flex-1 text-center space-y-1">
                  <div
                    className={`h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                      isActive
                        ? 'bg-amber-brand/15 text-amber-brand border border-amber-brand/30'
                        : 'bg-muted-bg text-muted border border-border/40'
                    }`}
                  >
                    {isActive ? <Flame className="w-3.5 h-3.5 fill-amber-brand" /> : '•'}
                  </div>
                  <span className="text-[10px] text-muted block">{day}</span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-muted">
            Streak freeze protects your consecutive days if you are unable to log in during examination week.
          </p>
        </div>
      </div>

      {/* 2. Milestones Badges Showcase */}
      <section className="mentora-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Leadership Milestone Badges
            </h2>
            <p className="text-xs text-muted">Earn badges as you develop first-principles habits and complete assignments</p>
          </div>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            {gamification.badges.length} of {ALL_BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = gamification.badges.includes(badge.id);
            const Icon = badge.icon;

            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-[16px] border text-center space-y-2 flex flex-col items-center justify-between transition-all ${
                  isUnlocked
                    ? 'bg-surface-raised border-primary/30 shadow-xs'
                    : 'bg-muted-bg/30 border-border opacity-50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs ${
                    isUnlocked
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-muted-bg text-muted border border-border'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-foreground line-clamp-1">{badge.title}</h3>
                  <p className="text-[10px] text-muted line-clamp-2 leading-tight">{badge.desc}</p>
                </div>

                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    isUnlocked
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-muted-bg text-muted'
                  }`}
                >
                  {isUnlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive "Daily Think It Through" Micro-Challenge */}
      <section className="mentora-card p-6 md:p-8 space-y-6 border-2 border-primary/20 bg-gradient-to-br from-surface via-surface to-surface-tint shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-brand/10 text-amber-brand border border-amber-brand/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Daily Think It Through Micro-Challenge
              </span>
              <span className="text-xs font-bold text-emerald-brand bg-emerald-500/10 px-2 py-0.5 rounded-full">
                +{currentActivity?.xp || 75} XP
              </span>
            </div>
            <h2 className="text-xl font-black text-foreground">
              {currentActivity?.title || 'Resolving Department Project Deadlock'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>Target: {COMPETENCIES[currentActivity?.competency]?.label || 'Critical Thinking'}</span>
              <span>•</span>
              <span className="capitalize">{currentActivity?.type?.replace(/_/g, ' ') || 'Mini Case Study'}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerateChallenge}
            disabled={isGenerating}
            className="mentora-btn-secondary text-xs px-3.5 py-2 shrink-0 self-start sm:self-center"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Generate New with AI</span>
          </button>
        </div>

        {/* Challenge Prompt */}
        <div className="p-4 rounded-[16px] bg-surface-raised border border-border text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {currentActivity?.prompt}
        </div>

        {/* Solution Input Form */}
        <form onSubmit={handleSubmitResponse} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center justify-between">
              <span>Your First-Principles Solution &amp; Decision Rationale</span>
              <span className="text-muted text-[11px] font-normal">Min 2-3 sentences</span>
            </label>
            <textarea
              rows={4}
              required
              value={responseInput}
              onChange={(e) => setResponseInput(e.target.value)}
              disabled={isSubmitting}
              placeholder="Outline your decision framework, trade-off analysis, and specific immediate action..."
              className="mentora-input text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-muted">
              Evaluated by AI against VRCF leadership rubrics with instant feedback.
            </span>
            <button
              type="submit"
              disabled={!responseInput.trim() || isSubmitting}
              className="mentora-btn-primary text-xs px-5 py-2.5 shadow-sm disabled:opacity-40"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Evaluating with AI...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Submit Solution (+{currentActivity?.xp || 75} XP)
                </>
              )}
            </button>
          </div>
        </form>

        {/* Evaluation Feedback Card */}
        {evaluationResult && (
          <div className="p-5 rounded-[16px] bg-emerald-500/10 border border-emerald-500/30 text-foreground space-y-3 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-extrabold text-sm text-foreground">
                  AI Rubric Feedback • Score: {evaluationResult.score} / 5.0
                </h3>
              </div>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
                +{evaluationResult.xpAwarded} XP Earned!
              </span>
            </div>

            <p className="text-xs text-foreground/90 leading-relaxed italic">
              &ldquo;{evaluationResult.aiFeedback}&rdquo;
            </p>

            <div className="flex items-center justify-between text-[11px] text-muted pt-1 border-t border-emerald-500/20">
              <span>Competency score updated in your official profile.</span>
              <button
                type="button"
                onClick={handleGenerateChallenge}
                className="font-bold text-primary hover:underline flex items-center gap-1"
              >
                Try Another Challenge →
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 4. 10 VRCF Competencies Detailed Scorecard */}
      <section className="mentora-card p-6 md:p-8 space-y-6">
        <div className="border-b border-border pb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            10 VRCF Leadership Competencies Breakdown
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Combines formal mentor evaluations with evidence gathered from self-tasks, reflections, and micro-challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPETENCY_KEYS.map((key) => {
            const compMeta = COMPETENCIES[key];
            const scoreObj = studentScores.find((s) => s.competency === key);
            const score = scoreObj?.score || 4.0;
            const source = scoreObj?.source || 'mentor';

            return (
              <div
                key={key}
                className="p-4 rounded-[16px] border border-border bg-surface-raised space-y-2.5 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{compMeta.label}</h3>
                    <p className="text-[11px] text-muted line-clamp-1">{compMeta.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-foreground">{score.toFixed(1)}</span>
                    <span className="text-xs text-muted block">/ 5.0</span>
                  </div>
                </div>

                <div className="w-full bg-muted-bg rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${(score / 5) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted pt-0.5">
                  <span className="capitalize px-2 py-0.5 rounded-full bg-surface border border-border font-semibold">
                    Source: {source}
                  </span>
                  {scoreObj?.evidence && (
                    <span className="truncate max-w-[200px] italic">
                      &ldquo;{scoreObj.evidence}&rdquo;
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
