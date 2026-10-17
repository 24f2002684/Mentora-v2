"use client";

import React from 'react';
import { useAuth } from '@/lib/auth/context';
import { getMockStore } from '@/lib/mock/store';
import { COMPETENCIES, COMPETENCY_KEYS } from '@/lib/types/competencies';
import { TrendingUp, Award, Flame, CheckCircle2, Star, ShieldCheck, ArrowRight } from 'lucide-react';

export default function StudentProgressPage() {
  const { studentData } = useAuth();
  const store = getMockStore();
  const currentStudent = studentData || store.students[0];
  const gamification = store.gamification[currentStudent.id] || {
    xp: 385,
    level: 2,
    current_streak: 5,
    longest_streak: 9,
    badges: ['first_goal', 'deep_thinker', 'task_champion'],
  };

  const studentScores = store.competencyScores.filter((s) => s.student_id === currentStudent.id);
  const mentorScores = studentScores.filter((s) => s.source === 'mentor');
  const aiScores = studentScores.filter((s) => s.source === 'ai');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Leadership Growth
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Competency Evaluations &amp; Badges
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Transparent breakdown of your 10 leadership competencies evaluated by mentors and AI evidence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-soft text-amber-brand text-xs font-bold border border-amber-brand/20">
            <Flame className="w-4 h-4 fill-amber-brand" />
            <span>{gamification.current_streak}-Day Streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-bold border border-primary/20">
            <Award className="w-4 h-4" />
            <span>{gamification.xp} XP</span>
          </div>
        </div>
      </div>

      {/* 10 Competencies Full Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMPETENCY_KEYS.map((key) => {
          const compMeta = COMPETENCIES[key];
          const scoreObj = studentScores.find((s) => s.competency === key);
          const score = scoreObj?.score || 4.0;
          const source = scoreObj?.source || 'mentor';

          return (
            <div
              key={key}
              className="mentora-card p-5 space-y-3 bg-surface hover:border-primary/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground">{compMeta.label}</h3>
                  <p className="text-xs text-muted leading-tight mt-0.5">{compMeta.description}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-xl font-extrabold text-foreground">{score.toFixed(1)}</span>
                  <span className="text-xs text-muted block">/ 5.0</span>
                </div>
              </div>

              <div className="w-full bg-muted-bg rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>

              {scoreObj?.evidence && (
                <p className="text-[11px] text-muted italic bg-muted-bg/40 p-2.5 rounded-[10px] border border-border/40">
                  <span className="font-bold not-italic text-primary capitalize mr-1">{source} evaluation:</span>
                  &ldquo;{scoreObj.evidence}&rdquo;
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
