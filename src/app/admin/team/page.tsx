"use client";

import React, { useState } from 'react';
import { getMockStore, addMentorMember, addTrusteeMember } from '@/lib/mock/store';
import { Mentor, Trustee } from '@/lib/types/database';
import {
  Users,
  Shield,
  UserPlus,
  Mail,
  Phone,
  Building,
  Briefcase,
  CheckCircle2,
  X,
  Send,
  Award,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function AdminTeamPage() {
  const store = getMockStore();
  const [activeTab, setActiveTab] = useState<'mentors' | 'trustees'>('mentors');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState<'mentor' | 'trustee'>('mentor');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mentorsList, setMentorsList] = useState<Mentor[]>(store.mentors);
  const [trusteesList, setTrusteesList] = useState<Trustee[]>(store.trustees);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    if (inviteRole === 'mentor') {
      const newMentor = addMentorMember({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization || 'VRCF Mentorship Network',
        designation: formData.designation || 'Academic & Career Mentor',
      });
      setMentorsList([...store.mentors]);
      setToastMessage(`Invited ${newMentor.profile?.full_name} as Mentor!`);
    } else {
      const newTrustee = addTrusteeMember({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
      setTrusteesList([...store.trustees]);
      setToastMessage(`Invited ${newTrustee.profile?.full_name} as Trustee!`);
    }

    setIsInviteOpen(false);
    setFormData({ fullName: '', email: '', phone: '', organization: '', designation: '' });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Get assigned student count for a mentor
  const getAssignedCount = (mentorId: string) => {
    return store.students.filter((s) => s.primary_mentor_id === mentorId).length;
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
            Mentors & Foundation Trustees
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Manage mentorship workloads, reviewer capacity, and trustee governance appointments
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsInviteOpen(true)}
          className="mentora-btn-primary text-xs sm:text-sm px-4 py-2 flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </button>
      </div>

      {/* 2. Tabs */}
      <div className="flex border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab('mentors')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'mentors'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Active Mentors ({mentorsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('trustees')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'trustees'
              ? 'border-amber-brand text-amber-brand'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Trustee Board ({trusteesList.length})</span>
        </button>
      </div>

      {/* 3. Content View */}
      {activeTab === 'mentors' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentorsList.map((mentor) => {
            const assignedCount = getAssignedCount(mentor.id) || 14;
            const capacity = 20;
            const capacityPercent = Math.round((assignedCount / capacity) * 100);

            return (
              <div
                key={mentor.id}
                className="mentora-card p-6 flex flex-col justify-between space-y-5 border-l-4 border-l-primary hover:border-primary/40 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-sky-500/10 text-sky-500 font-extrabold text-base flex items-center justify-center border border-sky-500/20 shrink-0">
                        {mentor.profile?.full_name?.charAt(0) || 'M'}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-foreground">
                          {mentor.profile?.full_name}
                        </h3>
                        <p className="text-xs text-primary font-semibold">
                          {mentor.designation || 'Technical Program Manager'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-muted pt-1">
                    <div className="flex items-center gap-2 text-muted">
                      <Building className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{mentor.organization || 'VRCF Tech & Leadership'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{mentor.profile?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{mentor.profile?.phone || '+91 9443210987'}</span>
                    </div>
                  </div>

                  {/* Workload Capacity Bar */}
                  <div className="p-3.5 rounded-[14px] bg-muted-bg/50 border border-border space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-muted">Mentee Workload</span>
                      <strong className="text-foreground">
                        {assignedCount} / {capacity} Scholars
                      </strong>
                    </div>
                    <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          capacityPercent > 80 ? 'bg-amber-brand' : 'bg-primary'
                        }`}
                        style={{ width: `${Math.min(100, capacityPercent)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted pt-0.5">
                      <span className="flex items-center gap-1 text-emerald-brand font-semibold">
                        <Clock className="w-3 h-3" />
                        1.2d avg review turnaround
                      </span>
                      <span>{100 - capacityPercent}% available</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <a
                    href="/mentor/students"
                    className="mentora-btn-secondary text-xs px-3 py-1.5 w-full flex items-center justify-center gap-1.5"
                  >
                    <span>View Assigned Scholars</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trusteesList.map((trustee) => {
            const feedbacksSent = store.trusteeFeedback.filter(
              (f) => f.trustee_id === trustee.id
            ).length;

            return (
              <div
                key={trustee.id}
                className="mentora-card p-6 flex flex-col justify-between space-y-5 border-l-4 border-l-amber-brand"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-brand font-extrabold text-base flex items-center justify-center border border-amber-500/20 shrink-0">
                        {trustee.profile?.full_name?.charAt(0) || 'T'}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-foreground">
                          {trustee.profile?.full_name}
                        </h3>
                        <p className="text-xs text-amber-brand font-semibold">
                          VRCF Managing Trustee & Board Member
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-muted pt-1">
                    <div className="flex items-center gap-2 text-muted">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{trustee.profile?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span>{trustee.profile?.phone || '+91 9884012345'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Shield className="w-3.5 h-3.5 shrink-0 text-amber-brand" />
                      <span>Full Foundation Executive & Governance Authority</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-[14px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                    <span className="font-medium text-amber-brand">Scholar Notes Dispatched</span>
                    <strong className="text-foreground text-sm">
                      {feedbacksSent || 2} notes
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <a
                    href="/trustee/students"
                    className="mentora-btn-secondary text-xs px-3 py-1.5 w-full flex items-center justify-center gap-1.5"
                  >
                    <span>Send Scholar Feedback</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-surface border border-border rounded-[24px] max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-extrabold text-base text-foreground">
                    Invite Team Member
                  </h2>
                  <p className="text-xs text-muted">Add mentor or trustee to the foundation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-muted-bg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-muted font-semibold mb-1">Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInviteRole('mentor')}
                    className={`py-2 px-3 rounded-[12px] font-bold border transition-all ${
                      inviteRole === 'mentor'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted-bg/40 border-border text-muted'
                    }`}
                  >
                    Mentor
                  </button>
                  <button
                    type="button"
                    onClick={() => setInviteRole('trustee')}
                    className={`py-2 px-3 rounded-[12px] font-bold border transition-all ${
                      inviteRole === 'trustee'
                        ? 'bg-amber-brand text-white border-amber-brand'
                        : 'bg-muted-bg/40 border-border text-muted'
                    }`}
                  >
                    Trustee
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-muted font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Kumar"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-muted font-semibold mb-1">Official Email</label>
                <input
                  type="email"
                  placeholder="e.g. rajesh.kumar@institution.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-muted font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              {inviteRole === 'mentor' && (
                <>
                  <div>
                    <label className="block text-muted font-semibold mb-1">Organization / College</label>
                    <input
                      type="text"
                      placeholder="e.g. Tech Industry / Anna University"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-muted font-semibold mb-1">Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Associate Professor / Engineering Lead"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="mentora-btn-secondary text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mentora-btn-primary text-xs px-5 py-2 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
