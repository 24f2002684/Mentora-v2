"use client";

import React, { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { DemoRoleSwitcher } from '@/components/demo-role-switcher';
import { COMPETENCIES } from '@/lib/types/competencies';
import {
  Palette,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Search,
  ChevronRight,
  Flame,
  Award,
  Layers,
  Sliders,
  Type,
  Layout,
  Table as TableIcon,
} from 'lucide-react';

export default function DesignSystemPage() {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'tokens' | 'buttons' | 'inputs' | 'cards' | 'badges' | 'tables'>('tokens');

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              VRCF Design System
            </span>
            <span className="text-xs text-muted">Admin Architecture Reference</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            Mentora UI &amp; Brand Tokens
          </h1>
          <p className="text-sm text-muted mt-1">
            Clean, minimalist, calm aesthetic. Primary teal with WCAG AA compliance in light &amp; dark modes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="/admin" className="mentora-btn-secondary text-sm">
            Back to Admin
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border">
        {[
          { id: 'tokens', label: 'Color Tokens & Typography', icon: Palette },
          { id: 'buttons', label: 'Buttons & Touch Targets', icon: Sliders },
          { id: 'inputs', label: 'Inputs & Form Controls', icon: Type },
          { id: 'cards', label: 'Cards (20px Radius)', icon: Layout },
          { id: 'badges', label: 'Status & Badges', icon: Award },
          { id: 'tables', label: 'Accessible Tables', icon: TableIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-muted-bg'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Section 1: Color Tokens */}
      {activeTab === 'tokens' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-xl font-bold text-foreground">Core Palette</h2>
            <p className="text-xs text-muted">Primary teal brand colors with adaptive light and dark theme variations.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="mentora-card p-4 space-y-2">
              <div className="h-16 rounded-[14px] bg-[#0D9488] flex items-center justify-center text-white font-mono text-xs font-bold">
                #0D9488
              </div>
              <p className="text-xs font-bold text-foreground">Primary Teal (Light)</p>
              <p className="text-[11px] text-muted">Main interactive element</p>
            </div>

            <div className="mentora-card p-4 space-y-2">
              <div className="h-16 rounded-[14px] bg-[#2DD4BF] flex items-center justify-center text-black font-mono text-xs font-bold">
                #2DD4BF
              </div>
              <p className="text-xs font-bold text-foreground">Primary Teal (Dark)</p>
              <p className="text-[11px] text-muted">High contrast dark accent</p>
            </div>

            <div className="mentora-card p-4 space-y-2">
              <div className="h-16 rounded-[14px] bg-[#F6FAF9] border border-border flex items-center justify-center text-[#0F1F1D] font-mono text-xs font-bold">
                #F6FAF9
              </div>
              <p className="text-xs font-bold text-foreground">Light Background</p>
              <p className="text-[11px] text-muted">Calm non-distracting canvas</p>
            </div>

            <div className="mentora-card p-4 space-y-2">
              <div className="h-16 rounded-[14px] bg-[#0B1416] border border-border flex items-center justify-center text-[#E8F3F1] font-mono text-xs font-bold">
                #0B1416
              </div>
              <p className="text-xs font-bold text-foreground">Dark Background</p>
              <p className="text-[11px] text-muted">Deep teal-infused dark mode</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Semantic Colors (Used Sparingly)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="mentora-card p-4 space-y-1">
                <div className="h-10 rounded-[10px] bg-amber-brand flex items-center justify-center text-white font-mono text-xs font-bold">
                  Amber
                </div>
                <p className="text-xs font-bold text-foreground mt-2">Amber Warning</p>
                <p className="text-[11px] text-muted">Tasks awaiting review</p>
              </div>

              <div className="mentora-card p-4 space-y-1">
                <div className="h-10 rounded-[10px] bg-emerald-brand flex items-center justify-center text-white font-mono text-xs font-bold">
                  Emerald
                </div>
                <p className="text-xs font-bold text-foreground mt-2">Emerald Success</p>
                <p className="text-[11px] text-muted">Approved reviews &amp; progress</p>
              </div>

              <div className="mentora-card p-4 space-y-1">
                <div className="h-10 rounded-[10px] bg-rose-brand flex items-center justify-center text-white font-mono text-xs font-bold">
                  Rose
                </div>
                <p className="text-xs font-bold text-foreground mt-2">Rose Alert</p>
                <p className="text-[11px] text-muted">Safety flags &amp; critical issues</p>
              </div>
            </div>
          </div>

          <div className="mentora-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Manrope Typography Hierarchy</h3>
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-extrabold text-foreground">H1: Vasumathi Ramaswami Centenary Foundation</h1>
                <p className="text-[11px] text-muted">32px / 2rem • ExtraBold • Friendly heading scale</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">H2: Scholar Mentorship &amp; Leadership Development</h2>
                <p className="text-[11px] text-muted">24px / 1.5rem • Bold</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">H3: Critical Thinking &amp; Socratic Inquiry</h3>
                <p className="text-[11px] text-muted">18px / 1.125rem • Bold</p>
              </div>
              <div>
                <p className="text-[15px] text-foreground leading-relaxed">
                  Body: The Vasumathi Ramaswami Centenary Foundation supports bright college students across Tamil Nadu with financial scholarships and personalized leadership mentoring. Mobile body text strictly maintains a 15px minimum for comfort and accessibility.
                </p>
                <p className="text-[11px] text-muted">15px minimum on mobile • Line height 1.6 • Regular</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Buttons */}
      {activeTab === 'buttons' && (
        <div className="mentora-card p-6 space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-lg font-bold text-foreground">Pill Button Variants</h2>
            <p className="text-xs text-muted">Fully rounded pill buttons with minimum 44px touch targets for mobile accessibility.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="mentora-btn-primary">
              <Sparkles className="w-4 h-4" />
              Primary Action
            </button>

            <button type="button" className="mentora-btn-secondary">
              Secondary Button
            </button>

            <button
              type="button"
              className="min-h-[44px] px-6 py-2.5 rounded-full text-sm font-semibold bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
            >
              Alert / Danger Action
            </button>

            <button
              type="button"
              disabled
              className="min-h-[44px] px-6 py-2.5 rounded-full text-sm font-semibold bg-muted-bg text-muted cursor-not-allowed opacity-60"
            >
              Disabled State
            </button>

            <button
              type="button"
              className="min-h-[44px] min-w-[44px] rounded-full mentora-btn-primary p-0 flex items-center justify-center"
              aria-label="Icon Button"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Section 3: Inputs */}
      {activeTab === 'inputs' && (
        <div className="mentora-card p-6 space-y-6 animate-in fade-in max-w-xl">
          <div>
            <h2 className="text-lg font-bold text-foreground">Form Inputs (14px Radius)</h2>
            <p className="text-xs text-muted">Accessible inputs with WCAG labels, visible focus rings, and soft teal glow.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="example-name" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Full Scholar Name
              </label>
              <input
                id="example-name"
                type="text"
                placeholder="e.g. Lakshana R"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="mentora-input"
              />
            </div>

            <div>
              <label htmlFor="example-search" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Search with Icon
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="example-search"
                  type="text"
                  placeholder="Search by VRCF ID or College..."
                  className="mentora-input pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="example-select" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Cohort Select
              </label>
              <select id="example-select" className="mentora-input cursor-pointer">
                <option value="1">Cohort 1 (2024)</option>
                <option value="2">Cohort 2 (2025)</option>
                <option value="3">Cohort 3 (2026)</option>
              </select>
            </div>

            <div>
              <label htmlFor="example-textarea" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Student Reflection / Notes
              </label>
              <textarea
                id="example-textarea"
                rows={3}
                placeholder="Write your reflection on the assignment..."
                className="mentora-input resize-none py-2.5"
              />
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Cards */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
          <div className="mentora-card p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Standard Card (20px)</span>
            <h3 className="text-base font-bold text-foreground">Standard Container</h3>
            <p className="text-xs text-muted leading-relaxed">
              Default surface container with 20px radius and soft shadow. Clean and calm without heavy glassmorphism.
            </p>
          </div>

          <div className="mentora-card-interactive p-6 space-y-2 cursor-pointer">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Interactive Card</span>
            <h3 className="text-base font-bold text-foreground">Hover &amp; Focus Glow</h3>
            <p className="text-xs text-muted leading-relaxed">
              Gains a subtle teal border and gentle lift on hover. Perfect for tasks, challenge cards, and resources.
            </p>
          </div>

          <div className="mentora-card p-6 space-y-2 bg-surface-tint border-primary/20">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Subtle Tinted Card</span>
            <h3 className="text-base font-bold text-foreground">Selected or Highlighted</h3>
            <p className="text-xs text-muted leading-relaxed">
              Uses a soft 7% teal wash to draw calm focus to featured milestones or mentor reviews.
            </p>
          </div>
        </div>
      )}

      {/* Section 5: Badges */}
      {activeTab === 'badges' && (
        <div className="mentora-card p-6 space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-lg font-bold text-foreground">Status &amp; Competency Badges</h2>
            <p className="text-xs text-muted">Curated pill badges for task statuses and the 10 VRCF competencies.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="mentora-badge-teal">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Reviewed
            </span>

            <span className="mentora-badge-amber">
              <AlertTriangle className="w-3.5 h-3.5" />
              In Progress / To Review
            </span>

            <span className="mentora-badge-emerald">
              <Award className="w-3.5 h-3.5" />
              Milestone Complete
            </span>

            <span className="mentora-badge-rose">
              <AlertCircle className="w-3.5 h-3.5" />
              Flagged Support
            </span>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">The 10 Core Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {Object.values(COMPETENCIES).map((c) => (
                <span
                  key={c.key}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-foreground hover:border-primary/50 transition-colors"
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 6: Tables */}
      {activeTab === 'tables' && (
        <div className="mentora-card p-6 space-y-4 animate-in fade-in">
          <div>
            <h2 className="text-lg font-bold text-foreground">Accessible Data Tables</h2>
            <p className="text-xs text-muted">Clear headers, generous padding, responsive touch rows, and alternating states.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-muted uppercase bg-muted-bg/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 rounded-l-[12px]">VRCF ID</th>
                  <th className="px-4 py-3">Scholar Name</th>
                  <th className="px-4 py-3">Course &amp; College</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right rounded-r-[12px]">Turnaround</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-surface-tint/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-primary text-xs">VRCF-C1-001</td>
                  <td className="px-4 py-3 font-semibold text-foreground">Lakshana R</td>
                  <td className="px-4 py-3 text-xs text-muted">B.COM • Government Arts College Cbe</td>
                  <td className="px-4 py-3">
                    <span className="mentora-badge-emerald text-[11px]">Active</span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-foreground">1.1 days</td>
                </tr>
                <tr className="hover:bg-surface-tint/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-primary text-xs">VRCF-C2-002</td>
                  <td className="px-4 py-3 font-semibold text-foreground">Jasmiya J</td>
                  <td className="px-4 py-3 text-xs text-muted">B.COM Accounting • Ethiraj College</td>
                  <td className="px-4 py-3">
                    <span className="mentora-badge-teal text-[11px]">Reviewed</span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs font-semibold text-foreground">0.8 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Floating Demo Role Switcher */}
      <DemoRoleSwitcher />
    </div>
  );
}
