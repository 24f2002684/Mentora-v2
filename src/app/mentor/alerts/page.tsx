"use client";

import React, { useState } from 'react';
import { getMockStore, updateAIFlag } from '@/lib/mock/store';
import { AIFlag, FlagSeverity, FlagStatus } from '@/lib/types/database';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  ArrowRight,
  MessageSquare,
  Shield,
  Check,
  ChevronRight,
} from 'lucide-react';

export default function MentorAlertsPage() {
  const store = getMockStore();
  const [flags, setFlags] = useState<AIFlag[]>([...store.aiFlags]);
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'resolved'>('all');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleUpdateStatus = (flagId: string, newStatus: FlagStatus) => {
    updateAIFlag(flagId, newStatus, 'mentor-ramkumar');
    setFlags([...store.aiFlags]);
    showToast(`Alert marked as ${newStatus}`);
  };

  const filteredFlags = flags.filter((f) => {
    if (activeTab === 'open') return f.status === 'open';
    if (activeTab === 'resolved') return f.status === 'resolved' || f.status === 'acknowledged';
    return true;
  });

  const severityBadges: Record<FlagSeverity, { color: string; label: string }> = {
    high: { color: 'bg-rose-500/10 text-rose-500 border-rose-500/20', label: 'High Severity' },
    medium: { color: 'bg-amber-soft text-amber-brand border-amber-brand/20', label: 'Medium Attention' },
    low: { color: 'bg-sky-500/10 text-sky-500 border-sky-500/20', label: 'Low / Check-in' },
  };

  const highSeverityAlerts = flags.filter((f) => f.severity === 'high' && f.status === 'open');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground text-xs font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* High Severity Banner if any */}
      {highSeverityAlerts.length > 0 && (
        <div className="p-4 rounded-[16px] bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-500 uppercase tracking-wider">Priority Attention Required</p>
              <p className="text-sm font-semibold text-foreground">
                {highSeverityAlerts.length} scholar expressed distress or high academic stress during mentoring.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-500 px-3 py-1 rounded-full bg-rose-500/20 shrink-0">
            Immediate Follow-up
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-full">
              Scholar Welfare &amp; Safety
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            AI Support Flags &amp; Mentor Alerts
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Non-diagnostic wellness flags generated when scholars express severe stress, workload strain, or need 1:1 guidance.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-muted-bg border border-border">
          {[
            { id: 'all' as const, label: 'All Alerts' },
            { id: 'open' as const, label: 'Open' },
            { id: 'resolved' as const, label: 'Resolved' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[38px] px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flags List */}
      {filteredFlags.length === 0 ? (
        <div className="p-12 text-center rounded-[20px] mentora-card border-dashed border-border text-muted space-y-2">
          <Shield className="w-10 h-10 mx-auto text-emerald-brand/60" />
          <h3 className="text-base font-bold text-foreground">No active support alerts</h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            All scholars are progressing steadily without flagged distress or unresolved mentor check-ins.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFlags.map((flag) => {
            const student = store.students.find((s) => s.id === flag.student_id);
            const badge = severityBadges[flag.severity] || severityBadges.medium;

            return (
              <div
                key={flag.id}
                className="mentora-card p-5 sm:p-6 space-y-4 bg-surface hover:border-border/80 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs font-bold text-foreground">
                        {student?.name || 'Scholar'}
                      </span>
                      <span className="text-[11px] font-mono text-muted bg-muted-bg px-2 py-0.5 rounded-full">
                        {student?.vrcf_id} • Cohort {student?.cohort}
                      </span>
                      <span className="text-xs text-muted">
                        Flagged {new Date(flag.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-foreground leading-snug pt-1">
                      {flag.reason}
                    </h3>
                  </div>

                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full shrink-0 ${
                      flag.status === 'open'
                        ? 'bg-rose-500/10 text-rose-500'
                        : flag.status === 'acknowledged'
                        ? 'bg-amber-soft text-amber-brand'
                        : 'bg-emerald-soft text-emerald-brand'
                    }`}
                  >
                    Status: {flag.status.toUpperCase()}
                  </span>
                </div>

                <div className="p-3.5 rounded-[12px] bg-muted-bg/50 border border-border text-xs text-muted leading-relaxed">
                  <strong className="text-foreground not-italic block mb-0.5">Non-Diagnostic Guidance:</strong>
                  Reach out for a calm 15-minute 1:1 check-in. Help the scholar prioritize semester tasks and assure them of VRCF community mentorship.
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`/mentor/students/${student?.id}`}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    Open Scholar Profile &amp; Contact Info
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-2">
                    {flag.status === 'open' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(flag.id, 'acknowledged')}
                        className="mentora-btn-secondary text-xs px-3.5 py-1.5"
                      >
                        Acknowledge Alert
                      </button>
                    )}
                    {flag.status !== 'resolved' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(flag.id, 'resolved')}
                        className="mentora-btn-primary text-xs px-3.5 py-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
