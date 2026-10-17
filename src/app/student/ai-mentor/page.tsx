"use client";

import React from 'react';
import { Bot, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Flame, BookOpen } from 'lucide-react';

export default function StudentAIMentorPage() {
  const starters = [
    {
      title: 'Career & Degree Clarity',
      prompt: 'I am in my final semester and wondering whether to pursue campus software placements or higher studies in data science. How should I evaluate this?',
      tag: 'Career Strategy',
    },
    {
      title: 'Weekly Goal Check-In',
      prompt: 'I set a goal to master first-principles in my subject, but I feel overwhelmed by syllabus volume. Help me structure my study routine.',
      tag: 'Goal Alignment',
    },
    {
      title: 'Tackling a Tough Decision',
      prompt: 'Our project group is stuck because two members disagree on the technical architecture. How do I lead them without causing friction?',
      tag: 'Leadership',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="mentora-card p-6 sm:p-8 bg-gradient-to-br from-surface via-surface to-surface-tint border border-primary/20 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI Socratic Mentor
          </span>
          <span className="text-xs text-muted">Powered by Gemini 3.8 Flash</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Mentora Dialogue Partner
        </h1>
        <p className="text-sm text-muted max-w-2xl leading-relaxed">
          A dedicated Socratic sounding board designed to sharpen your critical reasoning, challenge your assumptions, and help you think through tough college and leadership dilemmas.
        </p>
      </div>

      <div className="mentora-card p-6 sm:p-8 space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm">
          <Bot className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-lg font-bold text-foreground">Interactive Session Readiness</h2>
          <p className="text-xs text-muted leading-relaxed">
            AI Mentor streaming conversations, multi-turn dialogue history, and thread management are scheduled for full deployment in <strong>Phase 4</strong>. Try one of these curated conversation starters below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-2">
          {starters.map((starter, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[16px] bg-muted-bg/50 border border-border space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {starter.tag}
                </span>
                <h3 className="font-bold text-sm text-foreground">{starter.title}</h3>
                <p className="text-xs text-muted leading-relaxed italic">&ldquo;{starter.prompt}&rdquo;</p>
              </div>
              <div className="pt-2 text-xs font-bold text-primary flex items-center gap-1">
                Explore in Phase 4 →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
