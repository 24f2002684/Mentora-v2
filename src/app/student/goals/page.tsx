"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import {
  getMockStore,
  addGoal,
  updateGoal,
  deleteGoal,
  updateVisionBoard,
  addTask,
} from '@/lib/mock/store';
import { Goal, GoalKind } from '@/lib/types/database';
import { COMPETENCIES, CompetencyKey } from '@/lib/types/competencies';
import {
  Target,
  Sparkles,
  Plus,
  Compass,
  Calendar,
  CheckCircle2,
  Trash2,
  Edit2,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  Brain,
  Upload,
  Sliders,
  ChevronRight,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function StudentGoalsPage() {
  const { user, studentData } = useAuth();
  const store = getMockStore();
  const currentStudent = studentData || store.students[0];

  const [goals, setGoals] = useState<Goal[]>(
    store.goals.filter((g) => g.student_id === currentStudent.id)
  );
  const currentVb = store.visionBoards.find((v) => v.student_id === currentStudent.id);
  const [visionBoardUrl, setVisionBoardUrl] = useState(
    currentVb?.image_url || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
  );

  // Modals & form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [showVbModal, setShowVbModal] = useState(false);
  const [vbInputUrl, setVbInputUrl] = useState('');
  const [showAlignModal, setShowAlignModal] = useState(false);
  const [isAligning, setIsAligning] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [convertedTasks, setConvertedTasks] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState('');

  // Form Fields for Add/Edit Goal
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formKind, setFormKind] = useState<GoalKind>('short_term');
  const [formTargetDate, setFormTargetDate] = useState('2026-12-31');
  const [formProgress, setFormProgress] = useState(0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleOpenAdd = () => {
    setEditingGoal(null);
    setFormTitle('');
    setFormDescription('');
    setFormKind('short_term');
    setFormTargetDate('2026-12-31');
    setFormProgress(0);
    setShowAddModal(true);
  };

  const handleOpenEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setFormTitle(goal.title);
    setFormDescription(goal.description || '');
    setFormKind(goal.kind);
    setFormTargetDate(goal.target_date || '2026-12-31');
    setFormProgress(goal.progress);
    setShowAddModal(true);
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingGoal) {
      const updated = updateGoal(editingGoal.id, {
        title: formTitle.trim(),
        description: formDescription.trim(),
        kind: formKind,
        target_date: formTargetDate,
        progress: Number(formProgress),
        status: formProgress === 100 ? 'completed' : 'in_progress',
      });
      if (updated) {
        setGoals(store.goals.filter((g) => g.student_id === currentStudent.id));
        showToast('Goal updated successfully!');
      }
    } else {
      const newGoal = addGoal({
        student_id: currentStudent.id,
        kind: formKind,
        title: formTitle.trim(),
        description: formDescription.trim(),
        target_date: formTargetDate,
        progress: Number(formProgress),
        status: formProgress === 100 ? 'completed' : 'in_progress',
      });
      setGoals(store.goals.filter((g) => g.student_id === currentStudent.id));
      showToast('New goal created!');
    }

    setShowAddModal(false);
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(id);
      setGoals(store.goals.filter((g) => g.student_id === currentStudent.id));
      showToast('Goal deleted.');
    }
  };

  const handleSaveVisionBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vbInputUrl.trim()) return;
    const updated = updateVisionBoard(currentStudent.id, vbInputUrl.trim());
    setVisionBoardUrl(updated.image_url);
    setShowVbModal(false);
    showToast('Vision board updated!');
  };

  const handleAlignGoals = async () => {
    setIsAligning(true);
    setShowAlignModal(true);

    try {
      const res = await fetch('/api/goals/align', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: currentStudent.name,
          courseName: currentStudent.course_name,
          goals: goals.map((g) => ({
            id: g.id,
            kind: g.kind,
            title: g.title,
            description: g.description,
            progress: g.progress,
          })),
        }),
      });

      const data = await res.json();
      setAiRecommendations(data.recommendations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAligning(false);
    }
  };

  const handleConvertToTask = (suggestion: any) => {
    const focusComps: CompetencyKey[] = suggestion.focusCompetencies && suggestion.focusCompetencies.length > 0
      ? suggestion.focusCompetencies
      : ['critical_thinking', 'problem_solving'];

    addTask({
      student_id: currentStudent.id,
      created_by: currentStudent.profile_id || 'self',
      created_by_role: 'self',
      title: suggestion.title,
      details: suggestion.details,
      due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
      focus_competencies: focusComps,
      status: 'assigned',
    });

    setConvertedTasks(new Set(convertedTasks.add(suggestion.title)));
    showToast('Suggestion added to your Tasks to-do list!');
  };

  const aimGoal = goals.find((g) => g.kind === 'aim');
  const visionGoal = goals.find((g) => g.kind === 'vision_statement');
  const otherGoals = goals.filter((g) => g.kind !== 'aim' && g.kind !== 'vision_statement');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground text-xs font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Align AI Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Vision & Direction
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Goals & Vision Board
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Articulate your long-term vision, track milestones, and align next steps with AI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAlignGoals}
            className="mentora-btn-primary text-sm shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            Align My Goals
          </button>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="mentora-btn-secondary text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </button>
        </div>
      </div>

      {/* 1. Core Aim & Vision Statement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Aim */}
        <div className="mentora-card p-6 border-l-4 border-l-primary space-y-3 bg-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-base text-foreground">Core Academic Aim</h2>
            </div>
            {aimGoal && (
              <button
                type="button"
                onClick={() => handleOpenEdit(aimGoal)}
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>
          <p className="font-bold text-sm sm:text-base text-foreground leading-snug">
            {aimGoal?.title || 'Excel in university coursework and build fundamental problem-solving mastery.'}
          </p>
          <p className="text-xs text-muted leading-relaxed">
            {aimGoal?.description || 'Dedicated to disciplined daily practice, conceptual inquiry, and graduation honors.'}
          </p>
          <div className="pt-2">
            <div className="flex justify-between text-xs text-muted mb-1 font-semibold">
              <span>Aim Progress</span>
              <span className="text-primary font-bold">{aimGoal?.progress || 70}%</span>
            </div>
            <div className="w-full bg-muted-bg rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${aimGoal?.progress || 70}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5-Year Vision Statement */}
        <div className="mentora-card p-6 border-l-4 border-l-sky-500 space-y-3 bg-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-sky-500" />
              <h2 className="font-bold text-base text-foreground">5-Year Leadership Vision</h2>
            </div>
            {visionGoal && (
              <button
                type="button"
                onClick={() => handleOpenEdit(visionGoal)}
                className="text-xs text-sky-500 font-bold hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>
          <p className="font-bold text-sm sm:text-base text-foreground leading-snug">
            {visionGoal?.title || 'Become an ethical leader contributing technological and social innovation in Tamil Nadu.'}
          </p>
          <p className="text-xs text-muted leading-relaxed">
            {visionGoal?.description || 'Empower my family and local community through technology, continuous self-improvement, and ethical mentorship.'}
          </p>
          <div className="pt-2">
            <div className="flex justify-between text-xs text-muted mb-1 font-semibold">
              <span>Vision Trajectory</span>
              <span className="text-sky-500 font-bold">{visionGoal?.progress || 45}%</span>
            </div>
            <div className="w-full bg-muted-bg rounded-full h-2 overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${visionGoal?.progress || 45}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Inspiration Board */}
      <section className="mentora-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            <div>
              <h2 className="font-bold text-lg text-foreground">Scholar Vision Board</h2>
              <p className="text-xs text-muted">A tangible visual reminder of your aspirations and motivations</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setVbInputUrl(visionBoardUrl);
              setShowVbModal(true);
            }}
            className="mentora-btn-secondary text-xs px-3.5 py-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            Replace Image
          </button>
        </div>

        <div className="relative rounded-[20px] overflow-hidden aspect-[21/9] sm:aspect-[24/9] border border-border shadow-md bg-muted-bg group">
          <img
            src={visionBoardUrl}
            alt="Vision Board"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <div className="text-white space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider bg-primary/80 px-2.5 py-0.5 rounded-full">
                VRCF Scholar Inspiration
              </span>
              <p className="text-sm sm:text-base font-extrabold drop-shadow">
                {currentStudent.name} • Journey to Excellence &amp; Community Leadership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categorized Goals List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Active Milestone Goals ({otherGoals.length})
          </h2>
          <span className="text-xs text-muted">Track progress across categories</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherGoals.map((goal) => {
            const kindColors: Record<string, string> = {
              short_term: 'bg-emerald-soft text-emerald-brand',
              long_term: 'bg-primary-soft text-primary',
              career_goal: 'bg-sky-500/10 text-sky-500',
              interest: 'bg-amber-soft text-amber-brand',
            };

            return (
              <div
                key={goal.id}
                className="mentora-card p-5 space-y-3 hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${kindColors[goal.kind] || 'bg-muted-bg text-muted'}`}>
                      {goal.kind.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(goal)}
                        className="p-1 rounded-full text-muted hover:text-primary transition-colors"
                        title="Edit goal"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="p-1 rounded-full text-muted hover:text-rose-500 transition-colors"
                        title="Delete goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                    {goal.title}
                  </h3>

                  {goal.description && (
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">
                      {goal.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-border/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {goal.target_date || 'Target: Ongoing'}
                    </span>
                    <span className="font-extrabold text-foreground">{goal.progress}% Done</span>
                  </div>

                  <div className="w-full bg-muted-bg rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add / Edit Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-lg w-full p-6 sm:p-8 space-y-5 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">
                {editingGoal ? 'Edit Goal' : 'Add New Milestone Goal'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div>
                <label htmlFor="goal-title" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Goal Title *
                </label>
                <input
                  id="goal-title"
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Complete Advanced Certification in Critical Reasoning"
                  className="mentora-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="goal-desc" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Action Details &amp; Purpose
                </label>
                <textarea
                  id="goal-desc"
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="What specific outcome are you targeting?"
                  className="mentora-input resize-none py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="goal-kind" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    id="goal-kind"
                    value={formKind}
                    onChange={(e) => setFormKind(e.target.value as GoalKind)}
                    className="mentora-input cursor-pointer"
                  >
                    <option value="short_term">Short Term (1-3 mos)</option>
                    <option value="long_term">Long Term (6-12 mos)</option>
                    <option value="career_goal">Career Goal</option>
                    <option value="interest">Skill & Interest</option>
                    <option value="aim">Academic Aim</option>
                    <option value="vision_statement">Vision Statement</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="goal-date" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                    Target Date
                  </label>
                  <input
                    id="goal-date"
                    type="date"
                    value={formTargetDate}
                    onChange={(e) => setFormTargetDate(e.target.value)}
                    className="mentora-input"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="goal-progress" className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Current Progress
                  </label>
                  <span className="text-xs font-bold text-primary">{formProgress}%</span>
                </div>
                <input
                  id="goal-progress"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formProgress}
                  onChange={(e) => setFormProgress(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mentora-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="mentora-btn-primary text-xs">
                  {editingGoal ? 'Save Changes' : 'Create Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Replace Vision Board Modal */}
      {showVbModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-md w-full p-6 space-y-4 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">Update Vision Board Image</h3>
              <button
                type="button"
                onClick={() => setShowVbModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVisionBoard} className="space-y-4">
              <div>
                <label htmlFor="vb-url" className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                  Image URL
                </label>
                <input
                  id="vb-url"
                  type="url"
                  value={vbInputUrl}
                  onChange={(e) => setVbInputUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="mentora-input"
                  required
                />
                <p className="text-[11px] text-muted mt-1">Paste any high-resolution image URL representing your future goals.</p>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowVbModal(false)}
                  className="mentora-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="mentora-btn-primary text-xs">
                  Save Vision Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Align My Goals AI Modal */}
      {showAlignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-2xl w-full max-h-[85vh] flex flex-col p-6 sm:p-8 bg-surface border border-primary/30 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">AI Goal Alignment &amp; Action Plan</h3>
                  <p className="text-xs text-muted">Powered by Gemini 3.8 Flash • Socratic Goal Analysis</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAlignModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {isAligning ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-bold text-foreground">Analyzing your goals and competencies...</p>
                  <p className="text-xs text-muted">Synthesizing high-leverage next steps tailored to your academic field.</p>
                </div>
              ) : aiRecommendations.length === 0 ? (
                <div className="p-8 text-center text-muted">
                  <p className="text-sm">No specific recommendations returned. Please try again.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {aiRecommendations.map((rec, rIdx) => (
                    <div key={rIdx} className="p-4 rounded-[16px] bg-muted-bg/50 border border-border space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Goal Alignment</span>
                        <span className="text-xs font-extrabold text-foreground truncate">&ldquo;{rec.goalTitle}&rdquo;</span>
                      </div>

                      <div className="space-y-2.5">
                        {rec.suggestions?.map((sug: any, sIdx: number) => {
                          const isAlreadyConverted = convertedTasks.has(sug.title);

                          return (
                            <div
                              key={sIdx}
                              className="p-3.5 rounded-[12px] bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                              <div className="space-y-1">
                                <h4 className="text-sm font-bold text-foreground">{sug.title}</h4>
                                <p className="text-xs text-muted leading-relaxed">{sug.details}</p>
                                <div className="flex items-center gap-1.5 pt-1">
                                  {sug.focusCompetencies?.map((c: CompetencyKey) => (
                                    <span
                                      key={c}
                                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                                    >
                                      {COMPETENCIES[c]?.shortLabel || c}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                disabled={isAlreadyConverted}
                                onClick={() => handleConvertToTask(sug)}
                                className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 flex items-center justify-center gap-1.5 transition-all ${
                                  isAlreadyConverted
                                    ? 'bg-emerald-soft text-emerald-brand cursor-default'
                                    : 'mentora-btn-primary'
                                }`}
                              >
                                {isAlreadyConverted ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    Added to Tasks
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3.5 h-3.5" />
                                    Convert to Self Task
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => setShowAlignModal(false)}
                className="mentora-btn-secondary text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
