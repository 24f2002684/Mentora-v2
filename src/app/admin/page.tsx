"use client";

import React from 'react';
import { getMockStore } from '@/lib/mock/store';
import {
  Shield,
  Users,
  GraduationCap,
  Download,
  CheckCircle2,
  AlertTriangle,
  UserPlus,
  BookOpen,
  ArrowRight,
  Database,
  Palette,
} from 'lucide-react';

export default function AdminDashboard() {
  const store = getMockStore();

  const handleExportCSV = () => {
    const headers = ['VRCF ID', 'Name', 'Email', 'Cohort', 'Course', 'Year', 'College', 'District', 'Phone', 'Parent Phone', 'Residence', 'Status'];
    const rows = store.students.map((s) => [
      s.vrcf_id,
      `"${s.name}"`,
      s.email,
      s.cohort,
      `"${s.course_name}"`,
      `"${s.year_of_study}"`,
      `"${s.college}"`,
      `"${s.home_district || ''}"`,
      s.phone || '',
      s.parent_phone || '',
      s.residence_type,
      s.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vrcf_students_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Platform Administration
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Complete management of VRCF users, mentors, trustees, learning content, and database integrity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="mentora-btn-secondary text-sm"
          >
            <Download className="w-4 h-4" />
            Export Scholars CSV
          </button>
          <a
            href="/design-system"
            className="mentora-btn-primary text-sm"
          >
            <Palette className="w-4 h-4" />
            Design System
          </a>
        </div>
      </div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Registered Scholars</span>
            <GraduationCap className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">{store.students.length}</div>
          <p className="text-xs text-muted">All loaded from Student_DB.xlsx</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-sky-500">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Active Mentors</span>
            <Users className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">{store.mentors.length}</div>
          <p className="text-xs text-muted">Lead: Ramkumar SKR</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-amber-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">VRCF Trustees</span>
            <Shield className="w-4 h-4 text-amber-brand" />
          </div>
          <div className="text-3xl font-extrabold text-foreground">{store.trustees.length}</div>
          <p className="text-xs text-muted">Governing Council & Board</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-emerald-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Security & RLS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-brand" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-brand">Active</div>
          <p className="text-xs text-muted">Strict Row Level Security enabled</p>
        </div>
      </div>

      {/* 3. Fast Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="mentora-card p-6 space-y-4">
          <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            User & Role Management
          </h2>
          <p className="text-sm text-muted">
            Manage invitations and access controls for mentors, trustees, and incoming scholar cohorts.
          </p>

          <div className="space-y-2 pt-2">
            <a
              href="/mentor/add-student"
              className="flex items-center justify-between p-3.5 rounded-[14px] border border-border hover:border-primary/50 hover:bg-surface-tint transition-all"
            >
              <div className="flex items-center gap-3">
                <UserPlus className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Add New VRCF Scholar</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted" />
            </a>

            <div className="flex items-center justify-between p-3.5 rounded-[14px] border border-border/60 bg-muted-bg/30">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-sky-500" />
                <span className="text-sm font-semibold text-foreground">Manage Mentors (3 active)</span>
              </div>
              <span className="text-xs text-muted font-medium">Configure</span>
            </div>
          </div>
        </section>

        <section className="mentora-card p-6 space-y-4">
          <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-brand" />
            Content & Database Hygiene
          </h2>
          <p className="text-sm text-muted">
            Oversee the 10 core competencies rubric, curated resources library, and AI daily challenges.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-[14px] border border-border/60 bg-muted-bg/30">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-amber-brand" />
                <span className="text-sm font-semibold text-foreground">Curated Resources ({store.resources.length})</span>
              </div>
              <span className="text-xs text-muted font-medium">Active</span>
            </div>

            <a
              href="/design-system"
              className="flex items-center justify-between p-3.5 rounded-[14px] border border-border hover:border-primary/50 hover:bg-surface-tint transition-all"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Open Design System Showcase</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
