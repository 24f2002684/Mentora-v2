"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  getMockStore,
  addTask,
  updateStudentProfile,
  addMentorNote,
} from '@/lib/mock/store';
import { Student, Task, Goal, MentorNote } from '@/lib/types/database';
import { COMPETENCIES, COMPETENCY_KEYS, CompetencyKey } from '@/lib/types/competencies';
import {
  User,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Edit2,
  FileText,
  Download,
  ArrowLeft,
  Mail,
  Phone,
  Home,
  DollarSign,
  Award,
  Flame,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  CheckSquare,
} from 'lucide-react';

export default function MentorStudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;
  const store = getMockStore();

  const [student, setStudent] = useState<Student | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [notes, setNotes] = useState<MentorNote[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  // Assign Task Modal State
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskCompetencies, setTaskCompetencies] = useState<CompetencyKey[]>(['critical_thinking', 'analytical_thinking']);

  // Edit Student Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editCollege, setEditCollege] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editParentPhone, setEditParentPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editTuitionAmount, setEditTuitionAmount] = useState('');

  // Meeting Note Form State
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteDate, setNoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [noteText, setNoteText] = useState('');
  const [noteActionItems, setNoteActionItems] = useState('');

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const s = store.students.find((st) => st.id === studentId) || store.students[0];
    if (s) {
      setStudent(s);
      setTasks(store.tasks.filter((t) => t.student_id === s.id));
      setGoals(store.goals.filter((g) => g.student_id === s.id));
      setNotes(store.mentorNotes.filter((n) => n.student_id === s.id));

      // Prep edit fields
      setEditName(s.name);
      setEditCourse(s.course_name);
      setEditYear(s.year_of_study);
      setEditCollege(s.college);
      setEditPhone(s.phone || '');
      setEditParentPhone(s.parent_phone || '');
      setEditAddress(s.home_address || '');
      setEditTuitionAmount(s.tuition_fee_amount || '');
    }
  }, [studentId]);

  if (!student) {
    return (
      <div className="p-12 text-center text-muted">
        <p className="text-sm">Loading scholar record...</p>
      </div>
    );
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const visionBoard = store.visionBoards.find((v) => v.student_id === student.id);
  const scores = store.competencyScores.filter((cs) => cs.student_id === student.id);
  const gamification = store.gamification[student.id] || { xp: 350, current_streak: 5, level: 2 };

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask({
      student_id: student.id,
      created_by: 'mentor-ramkumar',
      created_by_role: 'mentor',
      title: taskTitle.trim(),
      details: taskDetails.trim(),
      due_date: taskDueDate ? new Date(taskDueDate).toISOString() : new Date(Date.now() + 7 * 86400000).toISOString(),
      focus_competencies: taskCompetencies,
      status: 'assigned',
    });

    setTasks(store.tasks.filter((t) => t.student_id === student.id));
    setShowAssignModal(false);
    setTaskTitle('');
    setTaskDetails('');
    showToast(`Task assigned to ${student.name.split(' ')[0]}!`);
  };

  const handleEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = updateStudentProfile(student.id, {
      name: editName.trim(),
      course_name: editCourse.trim(),
      year_of_study: editYear.trim(),
      college: editCollege.trim(),
      phone: editPhone.trim(),
      parent_phone: editParentPhone.trim(),
      home_address: editAddress.trim(),
      tuition_fee_amount: editTuitionAmount.trim(),
    });

    if (updated) {
      setStudent({ ...updated });
      setShowEditModal(false);
      showToast('Scholar details updated in database.');
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    addMentorNote({
      student_id: student.id,
      mentor_id: 'mentor-rec-1',
      meeting_date: noteDate,
      notes: noteText.trim(),
      action_items: noteActionItems.trim(),
    });

    setNotes(store.mentorNotes.filter((n) => n.student_id === student.id));
    setShowNoteModal(false);
    setNoteText('');
    setNoteActionItems('');
    showToast('1:1 meeting note logged.');
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const response = await fetch(`/api/reports/student/${student.id}`);
      if (!response.ok) throw new Error('PDF failed to generate');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VRCF_Leadership_Report_${student.vrcf_id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showToast('Branded PDF report downloaded!');
    } catch (e) {
      console.error(e);
      showToast('Failed to download PDF report.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const toggleTaskCompetency = (key: CompetencyKey) => {
    if (taskCompetencies.includes(key)) {
      if (taskCompetencies.length > 1) {
        setTaskCompetencies(taskCompetencies.filter((c) => c !== key));
      }
    } else {
      if (taskCompetencies.length < 3) {
        setTaskCompetencies([...taskCompetencies, key]);
      }
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground text-xs font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back button */}
      <div>
        <a
          href="/mentor/students"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Scholars Directory
        </a>
      </div>

      {/* Header Banner */}
      <div className="mentora-card p-6 sm:p-8 bg-gradient-to-br from-surface via-surface to-surface-tint border border-primary/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 text-primary font-extrabold text-2xl flex items-center justify-center border-2 border-primary/30 shrink-0">
            {student.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {student.vrcf_id}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-muted-bg text-muted">
                Cohort {student.cohort}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              {student.course_name} • {student.year_of_study} at {student.college}
            </p>
          </div>
        </div>

        {/* Action Buttons: Assign Task, Edit Details, Generate Report */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setShowAssignModal(true)}
            className="mentora-btn-primary text-xs px-4 py-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Assign Task
          </button>

          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            className="mentora-btn-secondary text-xs px-3.5 py-2"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Details
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="mentora-btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            {isGeneratingPdf ? 'Generating PDF...' : 'Download Report'}
          </button>
        </div>
      </div>

      {/* Tabs / Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Comprehensive Details & 1:1 Notes */}
        <div className="space-y-6">
          {/* Contact & College Details Card */}
          <div className="mentora-card p-5 space-y-4 bg-surface">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2 border-b border-border/60 pb-2.5">
              <User className="w-4 h-4 text-primary" />
              Scholar Contact &amp; Family Info
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-muted block font-semibold">Email</span>
                <span className="font-semibold text-foreground">{student.email}</span>
              </div>
              <div>
                <span className="text-muted block font-semibold">Personal Phone</span>
                <span className="font-semibold text-foreground">{student.phone || 'Not on record'}</span>
              </div>
              <div>
                <span className="text-muted block font-semibold">Parents&apos; Phone</span>
                <span className="font-semibold text-foreground">{student.parent_phone || 'Not on record'}</span>
              </div>
              <div>
                <span className="text-muted block font-semibold">Home Address</span>
                <span className="font-semibold text-foreground leading-relaxed block">{student.home_address}</span>
              </div>
              <div>
                <span className="text-muted block font-semibold">Residence Status</span>
                <span className="font-semibold text-foreground capitalize">{student.residence_type.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-muted block font-semibold">VRCF Tuition Support</span>
                <span className="font-semibold text-foreground">{student.tuition_fee_amount || 'Fully Covered'}</span>
              </div>
            </div>
          </div>

          {/* 1:1 Meeting Logs */}
          <div className="mentora-card p-5 space-y-4 bg-surface">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-500" />
                1:1 Meeting Logs ({notes.length})
              </h3>
              <button
                type="button"
                onClick={() => setShowNoteModal(true)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Log Note
              </button>
            </div>

            {notes.length === 0 ? (
              <p className="text-xs text-muted text-center py-4">No 1:1 meeting notes logged yet.</p>
            ) : (
              <div className="space-y-3">
                {notes.map((n) => (
                  <div key={n.id} className="p-3.5 rounded-[12px] bg-muted-bg/50 border border-border text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-muted font-bold text-[11px]">
                      <span>Check-in Date:</span>
                      <span>{n.meeting_date}</span>
                    </div>
                    <p className="text-foreground leading-relaxed">{n.notes}</p>
                    {n.action_items && (
                      <p className="text-[11px] text-primary font-semibold pt-1 border-t border-border/40">
                        Action: {n.action_items}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Tasks, Goals, Competencies, Vision Board */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Tasks & Submissions */}
          <div className="mentora-card p-6 space-y-4 bg-surface">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                Leadership Milestones &amp; Tasks ({tasks.length})
              </h3>
              <span className="text-xs text-muted">Assigned &amp; Submitted</span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-[14px] border border-border bg-surface hover:border-primary/40 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{task.title}</h4>
                      {task.details && <p className="text-xs text-muted line-clamp-2 mt-0.5">{task.details}</p>}
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                        task.status === 'reviewed'
                          ? 'bg-emerald-soft text-emerald-brand'
                          : task.status === 'submitted'
                          ? 'bg-amber-soft text-amber-brand'
                          : 'bg-primary-soft text-primary'
                      }`}
                    >
                      {task.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-border/40 text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {task.focus_competencies.map((c) => (
                        <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted-bg text-muted">
                          {COMPETENCIES[c]?.shortLabel || c}
                        </span>
                      ))}
                    </div>
                    {task.status === 'submitted' && (
                      <a href="/mentor/review" className="text-xs font-bold text-primary hover:underline">
                        Review Now →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competency Scores Snapshot */}
          <div className="mentora-card p-6 space-y-4 bg-surface">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-brand" />
              10 Competencies Evaluation Snapshot
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {scores.map((cs) => (
                <div key={cs.competency} className="p-3 rounded-[12px] bg-muted-bg/50 border border-border space-y-1">
                  <span className="text-[11px] font-semibold text-muted truncate block">
                    {COMPETENCIES[cs.competency as CompetencyKey]?.shortLabel || cs.competency}
                  </span>
                  <div className="text-base font-extrabold text-foreground">{cs.score.toFixed(1)} / 5.0</div>
                  <div className="w-full bg-border rounded-full h-1 overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${(cs.score / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals & Vision Board Snippet */}
          <div className="mentora-card p-6 space-y-4 bg-surface">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-500" />
              Active Goals ({goals.length})
            </h3>

            <div className="space-y-2">
              {goals.slice(0, 4).map((g) => (
                <div key={g.id} className="p-3 rounded-[12px] border border-border bg-surface flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-foreground block">{g.title}</span>
                    <span className="text-muted capitalize text-[10px]">{g.kind.replace('_', ' ')}</span>
                  </div>
                  <span className="font-extrabold text-primary">{g.progress}% Done</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assign Task Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-lg w-full p-6 sm:p-8 space-y-5 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Mentor Assignment
                </span>
                <h3 className="font-bold text-lg text-foreground mt-1">Assign Task to {student.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignTask} className="space-y-4">
              <div>
                <label htmlFor="mentor-task-title" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Task Title *
                </label>
                <input
                  id="mentor-task-title"
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Critical Analysis of Industry Case Study"
                  className="mentora-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="mentor-task-details" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Task Instructions &amp; Reflection Requirements
                </label>
                <textarea
                  id="mentor-task-details"
                  rows={3}
                  value={taskDetails}
                  onChange={(e) => setTaskDetails(e.target.value)}
                  placeholder="Clearly explain the milestone objectives and expectations..."
                  className="mentora-input resize-none py-2"
                />
              </div>

              <div>
                <label htmlFor="mentor-task-due" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Submission Due Date
                </label>
                <input
                  id="mentor-task-due"
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="mentora-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Focus Competencies (Select up to 3)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
                  {COMPETENCY_KEYS.map((k) => {
                    const isSelected = taskCompetencies.includes(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => toggleTaskCompetency(k)}
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
                  onClick={() => setShowAssignModal(false)}
                  className="mentora-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="mentora-btn-primary text-xs">
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Details Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-4 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-bold text-lg text-foreground">Edit Scholar Details</h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditStudent} className="space-y-3 text-xs">
              <div>
                <label htmlFor="edit-name" className="block font-bold text-foreground uppercase mb-1">Full Name</label>
                <input
                  id="edit-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mentora-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="edit-course" className="block font-bold text-foreground uppercase mb-1">Course Name</label>
                  <input
                    id="edit-course"
                    type="text"
                    value={editCourse}
                    onChange={(e) => setEditCourse(e.target.value)}
                    className="mentora-input"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-year" className="block font-bold text-foreground uppercase mb-1">Year of Study</label>
                  <input
                    id="edit-year"
                    type="text"
                    value={editYear}
                    onChange={(e) => setEditYear(e.target.value)}
                    className="mentora-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-college" className="block font-bold text-foreground uppercase mb-1">College &amp; District</label>
                <input
                  id="edit-college"
                  type="text"
                  value={editCollege}
                  onChange={(e) => setEditCollege(e.target.value)}
                  className="mentora-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="edit-phone" className="block font-bold text-foreground uppercase mb-1">Phone</label>
                  <input
                    id="edit-phone"
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="mentora-input"
                  />
                </div>
                <div>
                  <label htmlFor="edit-parent-phone" className="block font-bold text-foreground uppercase mb-1">Parent Phone</label>
                  <input
                    id="edit-parent-phone"
                    type="text"
                    value={editParentPhone}
                    onChange={(e) => setEditParentPhone(e.target.value)}
                    className="mentora-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-address" className="block font-bold text-foreground uppercase mb-1">Home Address</label>
                <textarea
                  id="edit-address"
                  rows={2}
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="mentora-input resize-none py-1.5"
                />
              </div>

              <div>
                <label htmlFor="edit-tuition" className="block font-bold text-foreground uppercase mb-1">Tuition Fee Term Amount</label>
                <input
                  id="edit-tuition"
                  type="text"
                  value={editTuitionAmount}
                  onChange={(e) => setEditTuitionAmount(e.target.value)}
                  className="mentora-input"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="mentora-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="mentora-btn-primary text-xs">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Meeting Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-md w-full p-6 space-y-4 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">Log 1:1 Mentoring Check-in</h3>
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label htmlFor="note-date" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Meeting Date
                </label>
                <input
                  id="note-date"
                  type="date"
                  value={noteDate}
                  onChange={(e) => setNoteDate(e.target.value)}
                  className="mentora-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="note-text" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Discussion Notes &amp; Observations *
                </label>
                <textarea
                  id="note-text"
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Summary of check-in discussion, challenges identified, progress made..."
                  className="mentora-input resize-none py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="note-action" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Agreed Action Items
                </label>
                <input
                  id="note-action"
                  type="text"
                  value={noteActionItems}
                  onChange={(e) => setNoteActionItems(e.target.value)}
                  placeholder="e.g. Complete 2 mock interviews before next call"
                  className="mentora-input"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="mentora-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="mentora-btn-primary text-xs">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
