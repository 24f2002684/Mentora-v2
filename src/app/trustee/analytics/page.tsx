"use client";

import React, { useState, useEffect } from 'react';
import { getMockStore } from '@/lib/mock/store';
import { COMPETENCIES } from '@/lib/types/competencies';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Users,
  Printer,
  Filter,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export default function TrusteeAnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState<'all' | '1' | '2' | '3'>('all');
  const store = getMockStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalStudents = store.students.length;
  const reviewedTasks = store.tasks.filter((t) => t.status === 'reviewed').length;
  const totalTasks = store.tasks.length;

  // 1. Competency Comparison Data Across Cohorts
  const competencyData = Object.entries(COMPETENCIES).map(([key, comp]) => {
    // Generate realistic cohort averages
    return {
      name: comp.label.length > 15 ? comp.label.slice(0, 14) + '...' : comp.label,
      fullName: comp.label,
      cohort1: 4.4,
      cohort2: 4.1,
      cohort3: 3.9,
      baseline: 3.2,
    };
  });

  // 2. Submission & Review Velocity over 6 months
  const velocityData = [
    { month: 'May 2026', submissions: 12, reviews: 11 },
    { month: 'Jun 2026', submissions: 18, reviews: 16 },
    { month: 'Jul 2026', submissions: 24, reviews: 23 },
    { month: 'Aug 2026', submissions: 32, reviews: 30 },
    { month: 'Sep 2026', submissions: 45, reviews: 42 },
    { month: 'Oct 2026', submissions: 58, reviews: 54 },
  ];

  // 3. Turnaround distribution
  const turnaroundData = [
    { name: '< 24 Hours', value: 68, color: '#0D9488' },
    { name: '24 - 48 Hours', value: 24, color: '#0284C7' },
    { name: '> 48 Hours', value: 8, color: '#F59E0B' },
  ];

  // 4. District Distribution
  const districtCounts: Record<string, number> = {};
  store.students.forEach((s) => {
    const d = s.home_district || 'Tiruchirappalli';
    districtCounts[d] = (districtCounts[d] || 0) + 1;
  });
  const topDistricts = Object.entries(districtCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* 1. Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="mentora-badge-amber text-xs">Trustee Board Oversight</span>
            <span className="text-xs text-muted flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Academic Year 2026-27
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
            Foundation Analytics & Impact
          </h1>
          <p className="text-muted text-sm sm:text-base">
            Longitudinal leadership competency outcomes, mentor velocity, and cohort performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-raised border border-border rounded-full px-3 py-1.5 text-xs font-semibold">
            <Filter className="w-3.5 h-3.5 text-muted" />
            <span className="text-muted">Cohort:</span>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value as any)}
              className="bg-transparent text-foreground font-bold focus:outline-none cursor-pointer"
            >
              <option value="all">All Cohorts (42)</option>
              <option value="1">Cohort 1 (14)</option>
              <option value="2">Cohort 2 (16)</option>
              <option value="3">Cohort 3 (12)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="mentora-btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-primary">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Competency</span>
            <Award className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">4.2</span>
            <span className="text-xs font-bold text-emerald-brand flex items-center">
              +0.8 delta
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-xs text-muted">Compared to 3.4 induction baseline</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-emerald-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Turnaround Time</span>
            <Clock className="w-4 h-4 text-emerald-brand" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-brand">1.2</span>
            <span className="text-xs font-semibold text-muted">Days</span>
          </div>
          <p className="text-xs text-muted">Well within 48h foundation SLA</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-sky-500">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Review Velocity</span>
            <CheckCircle2 className="w-4 h-4 text-sky-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-foreground">92%</span>
            <span className="text-xs text-muted">54 / 58 tasks</span>
          </div>
          <p className="text-xs text-muted">High engagement across cohorts</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-amber-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Retention & Standing</span>
            <Users className="w-4 h-4 text-amber-brand" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-brand">100%</span>
            <span className="text-xs text-muted">42 Scholars</span>
          </div>
          <p className="text-xs text-muted">Zero dropouts across 3 batches</p>
        </div>
      </div>

      {/* 3. Main Chart: Cohort Competency Comparison */}
      <section className="mentora-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              10 Core Competencies by Cohort
            </h2>
            <p className="text-xs text-muted">
              Evaluated using mentor rubrics and reflective evidence on a 1.0 - 5.0 scale
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-teal-600 inline-block" />
              <span>Cohort 1 (Senior)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-sky-500 inline-block" />
              <span>Cohort 2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" />
              <span>Cohort 3 (New)</span>
            </div>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competencyData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis
                  dataKey="name"
                  angle={-30}
                  textAnchor="end"
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  interval={0}
                />
                <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: 'currentColor' }} />
                <Tooltip
                  formatter={(value: any, name: any) => [`${value} / 5.0`, name]}
                  labelFormatter={(label) => {
                    const found = competencyData.find((d) => d.name === label);
                    return found ? found.fullName : label;
                  }}
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="cohort1" name="Cohort 1" fill="#0D9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cohort2" name="Cohort 2" fill="#0284C7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cohort3" name="Cohort 3" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted text-xs">
              Loading charts...
            </div>
          )}
        </div>
      </section>

      {/* 4. Secondary Charts Grid: Velocity & Turnaround */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Velocity Area Chart */}
        <section className="mentora-card p-6 space-y-4">
          <div>
            <h2 className="font-bold text-base text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-brand" />
              Submission & Review Velocity (Last 6 Months)
            </h2>
            <p className="text-xs text-muted">Cumulative scholar submissions vs completed mentor reviews</p>
          </div>

          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'currentColor' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'currentColor' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="submissions"
                    name="Submissions"
                    stroke="#0284C7"
                    fill="#0284C7"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="reviews"
                    name="Completed Reviews"
                    stroke="#0D9488"
                    fill="#0D9488"
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </section>

        {/* Turnaround Time Donut Chart */}
        <section className="mentora-card p-6 space-y-4">
          <div>
            <h2 className="font-bold text-base text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" />
              Mentor Feedback Turnaround Distribution
            </h2>
            <p className="text-xs text-muted">Proportion of student reviews completed within timeframe</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-64">
            <div className="h-full w-full sm:w-1/2">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={turnaroundData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {turnaroundData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, 'Reviews']}
                      contentStyle={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : null}
            </div>

            <div className="w-full sm:w-1/2 space-y-3">
              {turnaroundData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <strong className="text-foreground">{item.value}%</strong>
                </div>
              ))}

              <div className="pt-3 border-t border-border space-y-1 text-xs text-muted">
                <p>
                  <strong>Lead Mentor Ramkumar SKR:</strong> 1.2 days avg
                </p>
                <p>
                  <strong>Dr. Ananya Subramanian:</strong> 1.4 days avg
                </p>
                <p>
                  <strong>Karthik Narayanan:</strong> 1.5 days avg
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. Executive Takeaways for Board of Trustees */}
      <section className="mentora-card p-6 space-y-4 border-2 border-primary/20 bg-surface-raised/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg text-foreground">
              VRCF Board of Trustees • Executive Minutes
            </h2>
          </div>
          <span className="mentora-badge-teal text-xs">Q3 Board Memo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-[16px] bg-surface border border-border space-y-2">
            <div className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span>01</span>
              <span>First Principles & AI Literacy Leading Growth</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Scholars across all three cohorts demonstrated the steepest acceleration in <em>Critical Thinking</em> (+1.1) and <em>Digital & AI Literacy</em> (+1.0), driven by the AI Mentor dialogue integration and guided problem breakdown tasks.
            </p>
          </div>

          <div className="p-4 rounded-[16px] bg-surface border border-border space-y-2">
            <div className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span>02</span>
              <span>Turnaround SLA Maintained Under 36 Hours</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              With 92% of submissions reviewed within 48 hours and an average turnaround of 1.2 days, mentor capacity remains balanced. No student submission has remained unaddressed for more than 4 days.
            </p>
          </div>

          <div className="p-4 rounded-[16px] bg-surface border border-border space-y-2">
            <div className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span>03</span>
              <span>100% Scholarship Academic Continuity</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              All 42 active VRCF scholars have completed term tuition fee verification with their respective institutions and maintain active GPA trajectories averaging 8.5/10.0.
            </p>
          </div>

          <div className="p-4 rounded-[16px] bg-surface border border-border space-y-2">
            <div className="text-xs font-bold text-primary flex items-center gap-1.5">
              <span>04</span>
              <span>Welfare & Stress Early-Intervention Active</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Two non-diagnostic support flags for exam fatigue were triaged in the past 14 days, with mentors scheduling 1:1 check-ins and academic schedule adjustments without formal stigmatization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
