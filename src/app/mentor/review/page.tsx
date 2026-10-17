"use client";

import React, { useState } from 'react';
import { getMockStore, reviewSubmission } from '@/lib/mock/store';
import { Submission, Task, Review } from '@/lib/types/database';
import { COMPETENCIES, CompetencyKey } from '@/lib/types/competencies';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  FileText,
  Star,
  ExternalLink,
  MessageSquare,
  Award,
  Filter,
  Paperclip,
  ChevronRight,
  AlertCircle,
  User,
  Sparkles,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

export default function MentorReviewPage() {
  const store = getMockStore();
  const [submissions, setSubmissions] = useState<Submission[]>([...store.submissions]);
  const [activeTab, setActiveTab] = useState<'to_review' | 'reviewed'>('to_review');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Review form state
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('A+');
  const [rating, setRating] = useState(5);
  const [competencyScores, setCompetencyScores] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [safetyNotice, setSafetyNotice] = useState<string | null>(null);
  const [aiEvidence, setAiEvidence] = useState<Record<string, string>>({});

  const toReviewList = submissions.filter((s) => !s.review);
  const reviewedList = submissions.filter((s) => !!s.review);

  const displayList = activeTab === 'to_review' ? toReviewList : reviewedList;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleAnalyzeWithAI = async () => {
    if (!selectedSubmission) return;
    const task = store.tasks.find((t) => t.id === selectedSubmission.task_id);
    setIsAnalyzing(true);
    setSafetyNotice(null);

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: task?.student_id,
          taskId: task?.id,
          submissionText: selectedSubmission.reflection || selectedSubmission.remarks || 'Practical execution completed.',
          taskTitle: task?.title,
          focusCompetencies: task?.focus_competencies,
        }),
      });

      if (!res.ok) throw new Error('AI analysis failed');
      const data = await res.json();

      if (data.suggestedFeedback) setFeedback(data.suggestedFeedback);
      if (data.suggestedGrade) setGrade(data.suggestedGrade);
      if (data.competencyRatings) {
        setCompetencyScores((prev) => ({ ...prev, ...data.competencyRatings }));
      }
      if (data.evidence) setAiEvidence(data.evidence);
      if (data.safetyFlag?.triggered) {
        setSafetyNotice(`Welfare Attention (${data.safetyFlag.severity}): ${data.safetyFlag.reason}`);
      }
      showToast('AI rubric evaluation applied! Review and adjust as needed.');
    } catch (err) {
      console.error(err);
      showToast('Could not complete AI analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOpenReview = (sub: Submission) => {
    setSelectedSubmission(sub);
    const task = store.tasks.find((t) => t.id === sub.task_id);

    if (sub.review) {
      setFeedback(sub.review.feedback);
      setGrade(sub.review.grade || 'A+');
      setRating(sub.review.rating || 5);
      setCompetencyScores(sub.review.competency_ratings || {});
    } else {
      setFeedback('');
      setGrade('A+');
      setRating(5);
      // Preload target competencies with default 4.5
      const initialScores: Record<string, number> = {};
      if (task) {
        task.focus_competencies.forEach((c) => {
          initialScores[c] = 4.5;
        });
      }
      setCompetencyScores(initialScores);
    }
  };

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission || !feedback.trim()) return;

    reviewSubmission(selectedSubmission.id, {
      mentorId: 'mentor-rec-1',
      feedback: feedback.trim(),
      grade,
      rating,
      competencyRatings: competencyScores,
    });

    setSubmissions([...store.submissions]);
    setSelectedSubmission(null);
    showToast('Evaluation and mentor competency scores saved successfully!');
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-brand bg-amber-soft px-2.5 py-0.5 rounded-full">
              Evaluation Inbox
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Review Scholar Submissions
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Read assignment reflections, assign grades and ratings, and update mentor competency scores.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-muted-bg border border-border">
          <button
            type="button"
            onClick={() => setActiveTab('to_review')}
            className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'to_review'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <span>To Review</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-brand text-white">
              {toReviewList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviewed')}
            className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'reviewed'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <span>Reviewed</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-muted text-foreground">
              {reviewedList.length}
            </span>
          </button>
        </div>
      </div>

      {/* Submissions List */}
      {displayList.length === 0 ? (
        <div className="p-12 text-center rounded-[20px] mentora-card border-dashed border-border text-muted space-y-2">
          <CheckSquare className="w-10 h-10 mx-auto text-emerald-brand/60" />
          <h3 className="text-base font-bold text-foreground">
            {activeTab === 'to_review' ? 'Inbox completely cleared!' : 'No reviewed submissions yet'}
          </h3>
          <p className="text-xs text-muted max-w-sm mx-auto">
            {activeTab === 'to_review'
              ? 'All scholar assignments have been graded with mentor feedback and competency rubrics.'
              : 'Evaluated assignments will be cataloged here for historical reference.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayList.map((sub) => {
            const task = store.tasks.find((t) => t.id === sub.task_id);
            const student = store.students.find((s) => s.id === task?.student_id);

            return (
              <div
                key={sub.id}
                className="mentora-card p-5 sm:p-6 space-y-4 bg-surface hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-foreground">
                        {student?.name || 'Scholar'}
                      </span>
                      <span className="text-[11px] font-semibold text-muted bg-muted-bg px-2.5 py-0.5 rounded-full font-mono">
                        {student?.vrcf_id} • Cohort {student?.cohort}
                      </span>
                      <span className="text-xs text-muted">
                        Submitted: {new Date(sub.submitted_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-foreground leading-snug">
                      {task?.title || 'Assignment Task'}
                    </h3>

                    {sub.remarks && (
                      <p className="text-xs text-muted font-medium">Remarks: {sub.remarks}</p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {sub.review ? (
                      <div className="flex items-center gap-2">
                        <span className="mentora-badge-emerald text-xs">
                          Grade {sub.review.grade} ({sub.review.rating}/5)
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenReview(sub)}
                          className="mentora-btn-secondary text-xs px-3.5 py-1.5"
                        >
                          View Evaluation
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenReview(sub)}
                        className="mentora-btn-primary text-xs px-4 py-2"
                      >
                        Evaluate Submission
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Student's Reflection Box */}
                <div className="p-4 rounded-[14px] bg-muted-bg/50 border border-border text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-muted font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      Scholar Learning Reflection
                    </span>
                    {sub.attachment_url && (
                      <a
                        href={sub.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <Paperclip className="w-3 h-3" />
                        Attached Work
                      </a>
                    )}
                  </div>
                  <p className="text-foreground italic leading-relaxed">
                    &ldquo;{sub.reflection}&rdquo;
                  </p>
                </div>

                {/* Target Competencies */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
                  <span className="text-[11px] font-bold text-muted uppercase tracking-wider mr-1">Target Skills:</span>
                  {task?.focus_competencies.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-tint text-primary border border-primary/20"
                    >
                      {COMPETENCIES[c]?.shortLabel || c}
                    </span>
                  ))}
                </div>

                {/* Reviewed Feedback Quote if already reviewed */}
                {sub.review && (
                  <div className="p-4 rounded-[14px] bg-emerald-soft/40 border border-emerald-brand/20 text-xs space-y-2">
                    <p className="font-bold text-emerald-brand flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      Mentor Written Evaluation
                    </p>
                    <p className="text-foreground italic">&ldquo;{sub.review.feedback}&rdquo;</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Review & Evaluation Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-border/60 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  Assignment Evaluation Rubric
                </span>
                <h3 className="font-bold text-lg text-foreground mt-1">
                  Evaluate Scholar Submission
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Reflection details review */}
            <div className="p-4 rounded-[14px] bg-muted-bg/60 border border-border text-xs space-y-2">
              <span className="font-bold text-muted uppercase tracking-wider block">Submitted Reflection</span>
              <p className="text-foreground leading-relaxed italic">
                &ldquo;{selectedSubmission.reflection}&rdquo;
              </p>
              {selectedSubmission.attachment_url && (
                <div className="pt-2 border-t border-border/40">
                  <a
                    href={selectedSubmission.attachment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open Attached Student Work
                  </a>
                </div>
              )}
            </div>

            {/* AI Assistant Quick Evaluation Helper */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[14px] bg-primary/5 border border-primary/20">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Gemini Rubric Pre-Evaluation
                </span>
                <p className="text-[10px] text-muted">
                  Auto-evaluates depth and pre-fills grade, feedback, and competency scores.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAnalyzeWithAI}
                disabled={isAnalyzing}
                className="mentora-btn-secondary text-xs px-3.5 py-1.5 shrink-0 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>{isAnalyzing ? 'Analyzing with AI...' : 'Analyze with AI'}</span>
              </button>
            </div>

            {/* Safety alert if triggered */}
            {safetyNotice && (
              <div className="p-3 rounded-[12px] bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{safetyNotice}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveEvaluation} className="space-y-4 text-xs">
              <div>
                <label htmlFor="eval-feedback" className="block font-bold text-foreground uppercase tracking-wider mb-1">
                  Written Constructive Feedback *
                </label>
                <textarea
                  id="eval-feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Articulate strengths in their thinking, challenge unexamined assumptions, and suggest practical next steps..."
                  className="mentora-input resize-none py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="eval-grade" className="block font-bold text-foreground uppercase tracking-wider mb-1">
                    Letter Grade
                  </label>
                  <select
                    id="eval-grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="mentora-input cursor-pointer"
                  >
                    <option value="A+">A+ (Exceptional Mastery)</option>
                    <option value="A">A (Strong Rigor)</option>
                    <option value="B+">B+ (Good Competence)</option>
                    <option value="B">B (Satisfactory Progress)</option>
                    <option value="C">C (Needs Further Iteration)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="eval-rating" className="block font-bold text-foreground uppercase tracking-wider mb-1">
                    Overall Rating (1 - 5 Stars)
                  </label>
                  <select
                    id="eval-rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mentora-input cursor-pointer"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                    <option value={2}>⭐⭐ (2/5)</option>
                    <option value={1}>⭐ (1/5)</option>
                  </select>
                </div>
              </div>

              {/* Competency Ratings */}
              <div className="space-y-2 pt-2 border-t border-border">
                <span className="block font-bold text-foreground uppercase tracking-wider">
                  Target Competency Scores (Updates Scholar Profile)
                </span>
                <p className="text-[11px] text-muted">
                  Score each focus competency from 1.0 to 5.0 based on evidence demonstrated in this submission.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {Object.entries(competencyScores).map(([compKey, sc]) => (
                    <div key={compKey} className="p-3 rounded-[12px] bg-surface border border-border space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">
                          {COMPETENCIES[compKey as CompetencyKey]?.label || compKey}
                        </span>
                        <span className="font-extrabold text-primary">{sc.toFixed(1)} / 5.0</span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="5.0"
                        step="0.1"
                        value={sc}
                        onChange={(e) =>
                          setCompetencyScores({
                            ...competencyScores,
                            [compKey]: parseFloat(e.target.value),
                          })
                        }
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setSelectedSubmission(null)}
                  className="mentora-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="mentora-btn-primary text-xs">
                  Save Evaluation &amp; Award Competency Scores
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
