"use client";

import React, { useState } from 'react';
import { getMockStore } from '@/lib/mock/store';
import { AuditLogItem } from '@/lib/types/database';
import {
  ClipboardList,
  Search,
  Filter,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  User,
  ShieldAlert,
  FileText,
} from 'lucide-react';

export default function AdminAuditPage() {
  const store = getMockStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'mentor' | 'trustee' | 'admin' | 'system'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const logs = store.auditLogs || [];

  const filteredLogs = logs.filter((log) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      log.actor_name.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.entity.toLowerCase().includes(q) ||
      (log.details && log.details.toLowerCase().includes(q));

    const matchesRole = roleFilter === 'all' || log.actor_role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleExportCSV = () => {
    const headers = ['Log ID', 'Timestamp', 'Actor Name', 'Actor Role', 'Action', 'Entity', 'Entity ID', 'Details'];
    const rows = filteredLogs.map((l) => [
      l.id,
      `"${l.created_at}"`,
      `"${l.actor_name}"`,
      l.actor_role,
      l.action,
      l.entity,
      l.entity_id || '',
      `"${(l.details || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `vrcf_audit_log_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Exported ${filteredLogs.length} audit entries to CSV!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'trustee':
        return 'bg-amber-500/10 text-amber-brand border-amber-500/20';
      case 'mentor':
        return 'bg-sky-500/10 text-sky-500 border-sky-500/20';
      case 'student':
        return 'bg-teal-500/10 text-primary border-teal-500/20';
      default:
        return 'bg-muted-bg text-muted border-border';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-[16px] bg-emerald-600 text-white shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Governance & Compliance Audit Trail
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Immutable log of role access, DPDP Act data privacy consent, task evaluations, and trustee dispatches
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="mentora-btn-secondary text-xs sm:text-sm px-4 py-2 flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* 2. Security & Compliance Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-emerald-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">DPDP Act Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-brand" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-brand">100% Compliant</div>
          <p className="text-xs text-muted">Parental and scholar data consent verified</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-primary">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Row Level Security</span>
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">Active (22 Tables)</div>
          <p className="text-xs text-muted">Strict student-mentor boundary isolation</p>
        </div>

        <div className="mentora-card p-5 space-y-2 border-l-4 border-l-amber-brand">
          <div className="flex items-center justify-between text-muted">
            <span className="text-xs font-bold uppercase tracking-wider">Total Recorded Events</span>
            <Clock className="w-4 h-4 text-amber-brand" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{logs.length} Actions</div>
          <p className="text-xs text-muted">Tamper-evident system activity</p>
        </div>
      </div>

      {/* 3. Search and Filter Bar */}
      <div className="mentora-card p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by actor, action, entity, details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-raised border border-border text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none text-foreground"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-surface-raised p-1 rounded-full border border-border overflow-x-auto self-stretch sm:self-auto">
            {(['all', 'admin', 'trustee', 'mentor', 'student', 'system'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap capitalize ${
                  roleFilter === r
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Audit Table */}
      <div className="mentora-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-muted border-collapse">
            <thead className="bg-surface-raised/80 border-b border-border text-foreground font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Entity</th>
                <th className="py-3.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted">
                    No audit records match your query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted-bg/40 transition-colors">
                    {/* Timestamp */}
                    <td className="py-3 px-4 whitespace-nowrap text-muted font-mono text-[11px]">
                      {new Date(log.created_at).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Actor */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{log.actor_name}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${getRoleBadge(log.actor_role)}`}>
                          {log.actor_role}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <code className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {log.action}
                      </code>
                    </td>

                    {/* Entity */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold text-foreground">{log.entity}</span>
                      {log.entity_id && (
                        <span className="text-[10px] text-muted ml-1 font-mono">
                          ({log.entity_id})
                        </span>
                      )}
                    </td>

                    {/* Details */}
                    <td className="py-3 px-4 max-w-md">
                      <p className="text-foreground leading-relaxed">
                        {log.details || '—'}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
