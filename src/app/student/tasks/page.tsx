"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import {
  getMockStore,
  addTask,
  submitTask,
} from '@/lib/mock/store';
import { Task, TaskStatus } from '@/lib/types/database';
import { COMPETENCIES, COMPETENCY_KEYS, CompetencyKey } from '@/lib/types/competencies';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Calendar,
  Star,
  FileText,
  Paperclip,
  ArrowRight,
  Filter,
  MessageSquare,
  User,
  ExternalLink,
  ChevronRight,
  Award,
} from 'lucide-react';

export default function StudentTasksPage() {
  const { user, studentData } = useAuth();
  const store = getMockStore();
  const currentStudent = studentData || store.students[0];

  const [tasks, setTasks] = useState<Task[]>(
    store.tasks.filter((t) => t.student_id === currentStudent.id)
  );

  const [activeTab, setActiveTab] = useState<TaskStatus>('assigned');
  const [selectedCompetency, setSelectedCompetency] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Submission Form State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitRemarks, setSubmitRemarks] = useState('');
  const [submitReflection, setSubmitReflection] = useState('');
  const [submitAttachment, setSubmitAttachment] = useState('');
  const [submitErrors, setSubmitErrors] = useState<string>('');

  // Self Task Form State
  const [showSelfTaskModal, setShowSelfTaskModal] = useState(false);
  const [selfTitle, setSelfTitle] = useState('');
  const [selfDetails, setSelfDetails] = useState('');
  const [selfDueDate, setSelfDueDate] = useState('');
  const [selfCompetencies, setSelfCompetencies] = useState<CompetencyKey[]>(['critical_thinking']);

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesTab = t.status === activeTab;
    const matchesComp =
      selectedCompetency === 'all' || t.focus_competencies.includes(selectedCompetency as CompetencyKey);
    return matchesTab && matchesComp;
  });

  const tabCounts = {
    assigned: tasks.filter((t) => t.status === 'assigned').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    submitted: tasks.filter((t) => t.status === 'submitted').length,
    reviewed: tasks.filter((t) => t.status === 'reviewed').length,
  };

  const handleOpenSubmit = (task: Task) => {
    setSelectedTask(task);
    setSubmitRemarks('');
    setSubmitReflection('');
    setSubmitAttachment('');
    setSubmitErrors('');
    setShowSubmitModal(true);
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitReflection.trim() || submitReflection.trim().length < 20) {
      setSubmitErrors('Please write a reflective summary of at least 20 characters explaining your approach and learning.');
      return;
    }

    if (selectedTask) {
      submitTask(selectedTask.id, {
        remarks: submitRemarks.trim() || 'Assignment submission for review.',
        reflection: submitReflection.trim(),
        attachment_url: submitAttachment.trim() || 'https://example.com/vrcf-assignments/work.pdf',
      });

      // Refresh list
      setTasks([...store.tasks.filter((t) => t.student_id === currentStudent.id)]);
      setShowSubmitModal(false);
      showToast('Assignment submitted successfully! +50 XP awarded.');
    }
  };

  const handleCreateSelfTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selfTitle.trim()) return;

    addTask({
      student_id: currentStudent.id,
      created_by: currentStudent.profile_id || 'self',
      created_by_role: 'self',
      title: selfTitle.trim(),
      details: selfDetails.trim() || 'Self-directed learning goal.',
      due_date: selfDueDate ? new Date(selfDueDate).toISOString() : new Date(Date.now() + 7 * 86400000).toISOString(),
      focus_competencies: selfCompetencies,
      status: 'assigned',
    });

    setTasks([...store.tasks.filter((t) => t.student_id === currentStudent.id)]);
    setShowSelfTaskModal(false);
    setSelfTitle('');
    setSelfDetails('');
    showToast('Self task added to your plan!');
  };

  const toggleSelfCompetency = (key: CompetencyKey) => {
    if (selfCompetencies.includes(key)) {
      if (selfCompetencies.length > 1) {
        setSelfCompetencies(selfCompetencies.filter((c) => c !== key));
      }
    } else {
      if (selfCompetencies.length < 3) {
        setSelfCompetencies([...selfCompetencies, key]);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-brand text-white text-xs font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Leadership Tasks &amp; Milestones
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Assignments &amp; To-Do
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Submit assignments, review mentor evaluations, and manage your personal study plan.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowSelfTaskModal(true)}
          className="mentora-btn-primary text-sm self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Self Task
        </button>
      </div>

      {/* 1. Status Tabs & Competency Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-border">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1">
            {[
              { id: 'assigned' as const, label: 'Assigned', count: tabCounts.assigned, color: 'text-sky-500' },
              { id: 'in_progress' as const, label: 'In Progress', count: tabCounts.in_progress, color: 'text-amber-brand' },
              { id: 'submitted' as const, label: 'Submitted', count: tabCounts.submitted, color: 'text-primary' },
              { id: 'reviewed' as const, label: 'Reviewed', count: tabCounts.reviewed, color: 'text-emerald-brand' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted hover:text-foreground hover:bg-muted-bg'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted-bg text-muted'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Competency Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-muted" />
            <select
              value={selectedCompetency}
              onChange={(e) => setSelectedCompetency(e.target.value)}
              className="mentora-input text-xs py-1.5 px-3 min-h-[38px] w-auto cursor-pointer"
            >
              <option value="all">All Focus Competencies</option>
              {COMPETENCY_KEYS.map((k) => (
                <option key={k} value={k}>
                  {COMPETENCIES[k].label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="p-12 text-center rounded-[20px] mentora-card border-dashed border-border text-muted space-y-3">
          <CheckSquare className="w-10 h-10 mx-auto text-muted/60" />
          <h3 className="text-base font-bold text-foreground">No tasks in this category</h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            {activeTab === 'reviewed'
              ? 'Once your mentor reviews your submitted assignments, grades and detailed competency feedback will appear here.'
              : 'You have no tasks matching this filter. You can add a self-study task or request a challenge.'}
          </p>
          <button
            type="button"
            onClick={() => setShowSelfTaskModal(true)}
            className="mentora-btn-secondary text-xs mt-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add a Self Task
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const isSelf = task.created_by_role === 'self';
            const submission = task.submission;
            const review = submission?.review;

            return (
              <div
                key={task.id}
                className="mentora-card p-5 sm:p-6 space-y-4 hover:border-primary/40 transition-all bg-surface"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-muted-bg text-muted">
                        {isSelf ? 'Self-Directed To-Do' : 'VRCF Mentor Assigned'}
                      </span>
                      {task.due_date && (
                        <span className="text-xs text-muted flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-foreground leading-snug">
                      {task.title}
                    </h3>

                    {task.details && (
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {task.details}
                      </p>
                    )}
                  </div>

                  {/* Right Action / Status Badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    {task.status === 'assigned' || task.status === 'in_progress' ? (
                      <button
                        type="button"
                        onClick={() => handleOpenSubmit(task)}
                        className="mentora-btn-primary text-xs px-4 py-2"
                      >
                        Submit Assignment
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : task.status === 'submitted' ? (
                      <span className="mentora-badge-amber text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        Awaiting Review
                      </span>
                    ) : (
                      <span className="mentora-badge-emerald text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Reviewed
                      </span>
                    )}
                  </div>
                </div>

                {/* Focus Competency Badges */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-border/50">
                  <span className="text-[11px] font-bold text-muted uppercase tracking-wider mr-1">Focus Skills:</span>
                  {task.focus_competencies.map((comp) => (
                    <span
                      key={comp}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-surface-tint text-primary border border-primary/20"
                    >
                      {COMPETENCIES[comp]?.label || comp}
                    </span>
                  ))}
                </div>

                {/* Submitted Reflection Snippet */}
                {submission && (
                  <div className="p-4 rounded-[14px] bg-muted-bg/50 border border-border text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-muted font-bold">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        Your Submitted Reflection
                      </span>
                      <span className="text-[10px]">
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-foreground italic leading-relaxed">
                      &ldquo;{submission.reflection}&rdquo;
                    </p>
                  </div>
                )}

                {/* Mentor Review & Grades Breakdown */}
                {review && (
                  <div className="p-5 rounded-[16px] bg-surface-tint border border-primary/30 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                          RM
                        </div>
                        <div>
                          <span className="text-xs font-bold text-foreground">Mentor Review &amp; Evaluation</span>
                          <p className="text-[10px] text-muted">Ramkumar SKR • VRCF Lead Mentor</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {review.grade && (
                          <span className="px-3 py-1 rounded-full bg-emerald-brand text-white text-xs font-extrabold shadow-sm">
                            Grade {review.grade}
                          </span>
                        )}
                        {review.rating && (
                          <div className="flex items-center gap-1 text-amber-brand font-bold text-xs bg-amber-soft px-2.5 py-1 rounded-full">
                            <Star className="w-3.5 h-3.5 fill-amber-brand" />
                            {review.rating}/5
                          </div>
                        )}
                      </div>
                    </div>

                    <blockquote className="text-xs sm:text-sm text-foreground italic bg-surface/80 p-3.5 rounded-[12px] border border-border/50 leading-relaxed">
                      &ldquo;{review.feedback}&rdquo;
                    </blockquote>

                    {/* Competency Ratings */}
                    {review.competency_ratings && (
                      <div className="pt-2 space-y-2">
                        <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
                          Assigned Competency Scores
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {Object.entries(review.competency_ratings).map(([comp, score]) => (
                            <div
                              key={comp}
                              className="p-2.5 rounded-[10px] bg-surface border border-border text-xs flex items-center justify-between"
                            >
                              <span className="font-semibold text-muted truncate">
                                {COMPETENCIES[comp as CompetencyKey]?.shortLabel || comp}
                              </span>
                              <span className="font-extrabold text-primary ml-2">{score} / 5.0</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Submission Modal */}
      {showSubmitModal && selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-lg w-full p-6 sm:p-8 space-y-5 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Assignment Submission
                </span>
                <h3 className="font-bold text-lg text-foreground mt-1">{selectedTask.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {submitErrors && (
              <div className="p-3 rounded-[12px] bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitErrors}</span>
              </div>
            )}

            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <div>
                <label htmlFor="sub-remarks" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Submission Remarks (Optional)
                </label>
                <input
                  id="sub-remarks"
                  type="text"
                  value={submitRemarks}
                  onChange={(e) => setSubmitRemarks(e.target.value)}
                  placeholder="e.g. Attached complete problem breakdown"
                  className="mentora-input"
                />
              </div>

              <div>
                <label htmlFor="sub-reflection" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Learning Reflection *
                </label>
                <textarea
                  id="sub-reflection"
                  rows={4}
                  value={submitReflection}
                  onChange={(e) => setSubmitReflection(e.target.value)}
                  placeholder="What key insights did you learn? How did you challenge your own assumptions during this assignment?"
                  className="mentora-input resize-none py-2"
                  required
                />
                <p className="text-[11px] text-muted mt-1">
                  VRCF mentors emphasize deep reflective self-inquiry rather than simple factual answers.
                </p>
              </div>

              <div>
                <label htmlFor="sub-attach" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Attachment Link or Document URL (Optional)
                </label>
                <input
                  id="sub-attach"
                  type="url"
                  value={submitAttachment}
                  onChange={(e) => setSubmitAttachment(e.target.value)}
                  placeholder="https://drive.google.com/... or pdf url"
                  className="mentora-input"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="mentora-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="mentora-btn-primary text-xs">
                  Submit for Mentor Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Self Task Modal */}
      {showSelfTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-lg w-full p-6 sm:p-8 space-y-5 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground">Add Self-Directed Task</h3>
                <p className="text-xs text-muted">Create a study or project milestone that mentors can also view</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSelfTaskModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSelfTask} className="space-y-4">
              <div>
                <label htmlFor="self-title" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Task Title *
                </label>
                <input
                  id="self-title"
                  type="text"
                  value={selfTitle}
                  onChange={(e) => setSelfTitle(e.target.value)}
                  placeholder="e.g. Solve 10 Aptitude Problems on Logical Deduction"
                  className="mentora-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="self-details" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Details / Action Plan
                </label>
                <textarea
                  id="self-details"
                  rows={2}
                  value={selfDetails}
                  onChange={(e) => setSelfDetails(e.target.value)}
                  placeholder="Describe your execution approach..."
                  className="mentora-input resize-none py-2"
                />
              </div>

              <div>
                <label htmlFor="self-date" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Target Due Date
                </label>
                <input
                  id="self-date"
                  type="date"
                  value={selfDueDate}
                  onChange={(e) => setSelfDueDate(e.target.value)}
                  className="mentora-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Focus Competencies (Select up to 3)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                  {COMPETENCY_KEYS.map((k) => {
                    const isSelected = selfCompetencies.includes(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => toggleSelfCompetency(k)}
                        className={`text-xs px-3 py-1 rounded-full font-semibold transition-all border ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                            : 'bg-surface border-border text-muted hover:text-foreground'
                        }`}
                      >
                        {COMPETENCIES[k].shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSelfTaskModal(false)}
                  className="mentora-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="mentora-btn-primary text-xs">
                  Create Self Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
