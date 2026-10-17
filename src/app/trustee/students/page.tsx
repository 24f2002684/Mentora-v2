"use client";

import React, { useState } from 'react';
import { getMockStore, sendTrusteeFeedback } from '@/lib/mock/store';
import { Student, TrusteeFeedback } from '@/lib/types/database';
import {
  Users,
  Search,
  Filter,
  HeartHandshake,
  Award,
  BookOpen,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle2,
  X,
  Sparkles,
  MessageSquare,
  Clock,
} from 'lucide-react';

const ENCOURAGEMENT_TEMPLATES = [
  {
    title: 'Exceptional Analytical Depth',
    text: 'I am thoroughly impressed by your analytical depth and dedication in your recent coursework. VRCF is exceptionally proud to support your leadership journey.',
  },
  {
    title: 'Semester Exam Encouragement',
    text: 'Wishing you clarity, calm confidence, and deep focus for your upcoming semester evaluations. You have the full backing and trust of the Foundation.',
  },
  {
    title: 'Leadership & Value Demonstration',
    text: 'Your initiative in applying first-principles thinking to real-world challenges reflects the core values of the Vasumathi Ramaswami Centenary Foundation. Keep shining!',
  },
];

export default function TrusteeStudentsPage() {
  const store = getMockStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [cohortFilter, setCohortFilter] = useState<'all' | '1' | '2' | '3'>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filter students
  const filteredStudents = store.students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.vrcf_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCohort =
      cohortFilter === 'all' || student.cohort.toString() === cohortFilter;

    return matchesSearch && matchesCohort;
  });

  const handleOpenModal = (student: Student) => {
    setSelectedStudent(student);
    setMessage(ENCOURAGEMENT_TEMPLATES[0].text);
  };

  const handleSendFeedback = () => {
    if (!selectedStudent || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      sendTrusteeFeedback({
        studentId: selectedStudent.id,
        trusteeId: 'trustee-rec-1',
        trusteeName: 'Smt. Shanthi Ramaswami',
        message: message.trim(),
      });

      setIsSubmitting(false);
      setSuccessToast(`Encouraging note delivered to ${selectedStudent.name}!`);
      setSelectedStudent(null);
      setMessage('');

      setTimeout(() => setSuccessToast(null), 4000);
    }, 400);
  };

  const getStudentFeedbacks = (studentId: string): TrusteeFeedback[] => {
    return store.trusteeFeedback.filter((f) => f.student_id === studentId);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-[16px] bg-emerald-600 text-white shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm font-bold">{successToast}</span>
        </div>
      )}

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            VRCF Scholars Directory
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Review funded scholars across cohorts and dispatch direct trustee encouragement
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="mentora-badge-amber text-xs">
            {store.students.length} Total Scholars
          </span>
          <span className="mentora-badge-teal text-xs">
            {store.trusteeFeedback.length} Notes Dispatched
          </span>
        </div>
      </div>

      {/* 2. Filters & Search Strip */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by scholar name, VRCF ID, college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-surface-raised p-1 rounded-full border border-border self-stretch sm:self-auto overflow-x-auto">
          {(['all', '1', '2', '3'] as const).map((cohort) => (
            <button
              key={cohort}
              type="button"
              onClick={() => setCohortFilter(cohort)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                cohortFilter === cohort
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {cohort === 'all' ? 'All Cohorts' : `Cohort ${cohort}`}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Scholars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full mentora-card p-12 text-center space-y-3">
            <Users className="w-10 h-10 text-muted mx-auto" />
            <h3 className="font-bold text-base text-foreground">No scholars found</h3>
            <p className="text-xs text-muted">Try adjusting your search criteria or cohort filter</p>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const previousFeedbacks = getStudentFeedbacks(student.id);
            return (
              <div
                key={student.id}
                className="mentora-card p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all group"
              >
                {/* Scholar Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-teal-500/10 text-primary font-bold text-sm flex items-center justify-center border border-teal-500/20 shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors">
                          {student.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted-bg text-muted uppercase">
                            {student.vrcf_id}
                          </span>
                          <span className="text-[10px] font-semibold text-primary">
                            Cohort {student.cohort}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic info */}
                  <div className="space-y-1.5 text-xs text-muted pt-1">
                    <p className="text-foreground font-medium truncate">
                      {student.course_name} • {student.year_of_study}
                    </p>
                    <p className="truncate">{student.college}</p>
                    <div className="flex items-center gap-1 text-[11px] text-muted">
                      <MapPin className="w-3 h-3 text-muted shrink-0" />
                      <span>{student.home_district || 'Tamil Nadu'}</span>
                    </div>
                  </div>

                  {/* Mentor & Notes count */}
                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted">Mentor:</span>
                    <strong className="text-foreground">
                      {student.primary_mentor?.profile?.full_name || 'Ramkumar SKR'}
                    </strong>
                  </div>

                  {previousFeedbacks.length > 0 && (
                    <div className="p-2.5 rounded-[12px] bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-amber-brand">
                        <span className="flex items-center gap-1">
                          <HeartHandshake className="w-3 h-3" />
                          Last Trustee Note
                        </span>
                        <span>{new Date(previousFeedbacks[0].created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[11px] text-muted line-clamp-2 italic">
                        "{previousFeedbacks[0].message}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-border flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(student)}
                    className="flex-1 mentora-btn-primary text-xs py-2 flex items-center justify-center gap-1.5"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Send Note</span>
                  </button>

                  <a
                    href={`/mentor/students/${student.id}`}
                    className="mentora-btn-secondary text-xs px-3 py-2 flex items-center justify-center"
                    title="View Scholar Profile"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Send Encouraging Note Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-surface border border-border rounded-[24px] max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-brand font-bold text-sm flex items-center justify-center border border-amber-500/20">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-extrabold text-base text-foreground">
                    Send Trustee Note
                  </h2>
                  <p className="text-xs text-muted">
                    To {selectedStudent.name} • {selectedStudent.vrcf_id} (Cohort {selectedStudent.cohort})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-muted-bg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Template Chips */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Inspirational Templates
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ENCOURAGEMENT_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(tmpl.text)}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-raised border border-border hover:border-primary/50 text-foreground transition-all"
                  >
                    {tmpl.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-foreground">Personalized Message</span>
                <span className="text-muted text-[11px]">{message.length} characters</span>
              </div>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write an encouraging note to the scholar..."
                className="w-full p-3 rounded-[16px] bg-muted-bg/50 border border-border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
              />
            </div>

            <div className="p-3 rounded-[14px] bg-primary/5 border border-primary/20 text-xs text-muted flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                This note will be delivered straight to {selectedStudent.name}'s mobile dashboard notification center and recorded in Foundation governance logs.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="mentora-btn-secondary text-xs px-4 py-2"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendFeedback}
                disabled={isSubmitting || !message.trim()}
                className="mentora-btn-primary text-xs px-5 py-2 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Delivering...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Deliver Note</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
