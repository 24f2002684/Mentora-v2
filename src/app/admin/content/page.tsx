"use client";

import React, { useState } from 'react';
import { getMockStore, addCuratedResource } from '@/lib/mock/store';
import { COMPETENCIES, CompetencyKey } from '@/lib/types/competencies';
import { Resource, ResourceType } from '@/lib/types/database';
import {
  BookOpen,
  Award,
  Sparkles,
  Plus,
  ExternalLink,
  CheckCircle2,
  X,
  Save,
  Tag,
  Video,
  FileText,
  GraduationCap,
  Wrench,
  Search,
} from 'lucide-react';

export default function AdminContentPage() {
  const store = getMockStore();
  const [activeSection, setActiveSection] = useState<'competencies' | 'resources' | 'ai'>('competencies');
  const [selectedComp, setSelectedComp] = useState<CompetencyKey>('critical_thinking');
  const [resourcesList, setResourcesList] = useState<Resource[]>(store.resources);
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [searchResource, setSearchResource] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [resourceForm, setResourceForm] = useState<{
    title: string;
    url: string;
    type: ResourceType;
    competency: CompetencyKey;
    goalTag: string;
  }>({
    title: '',
    url: '',
    type: 'article',
    competency: 'critical_thinking',
    goalTag: 'Academic Excellence',
  });

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title || !resourceForm.url) return;

    const newRes = addCuratedResource({
      title: resourceForm.title,
      url: resourceForm.url,
      type: resourceForm.type,
      competency_tags: [resourceForm.competency],
      goal_tags: [resourceForm.goalTag],
      added_by: 'admin-suhail',
    });

    setResourcesList([...store.resources]);
    setIsAddResourceOpen(false);
    setToastMessage(`Added resource: "${newRes.title}"!`);
    setResourceForm({
      title: '',
      url: '',
      type: 'article',
      competency: 'critical_thinking',
      goalTag: 'Academic Excellence',
    });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getMediaIcon = (type: ResourceType) => {
    switch (type) {
      case 'youtube':
        return <Video className="w-4 h-4 text-rose-500" />;
      case 'course':
        return <GraduationCap className="w-4 h-4 text-sky-500" />;
      case 'tool':
        return <Wrench className="w-4 h-4 text-amber-brand" />;
      default:
        return <FileText className="w-4 h-4 text-emerald-brand" />;
    }
  };

  const filteredResources = resourcesList.filter((r) =>
    r.title.toLowerCase().includes(searchResource.toLowerCase()) ||
    r.competency_tags.some((c) => c.toLowerCase().includes(searchResource.toLowerCase()))
  );

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
            Curriculum & Content Hub
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Rubric definitions for the 10 core competencies, curated resource registry, and AI challenge configuration
          </p>
        </div>

        {activeSection === 'resources' && (
          <button
            type="button"
            onClick={() => setIsAddResourceOpen(true)}
            className="mentora-btn-primary text-xs sm:text-sm px-4 py-2 flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
        )}
      </div>

      {/* 2. Top Navigation Tabs */}
      <div className="flex border-b border-border">
        <button
          type="button"
          onClick={() => setActiveSection('competencies')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeSection === 'competencies'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>10 Core Competencies</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('resources')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeSection === 'resources'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Curated Resources ({resourcesList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('ai')}
          className={`py-3 px-5 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
            activeSection === 'ai'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-foreground'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Activity Engine</span>
        </button>
      </div>

      {/* 3. Section Views */}
      {activeSection === 'competencies' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Competency Selector Sidebar */}
          <div className="space-y-1.5 md:col-span-1">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block px-1 mb-2">
              Select Competency
            </span>
            {Object.entries(COMPETENCIES).map(([key, comp]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedComp(key as CompetencyKey)}
                className={`w-full text-left p-3 rounded-[14px] text-xs font-bold transition-all flex items-center justify-between border ${
                  selectedComp === key
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-surface text-foreground border-border hover:bg-muted-bg'
                }`}
              >
                <span>{comp.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  selectedComp === key ? 'bg-white/20' : 'bg-muted-bg text-muted'
                }`}>
                  {comp.shortLabel}
                </span>
              </button>
            ))}
          </div>

          {/* Competency Detailed Rubric Card */}
          <div className="md:col-span-2 mentora-card p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="mentora-badge-teal text-xs">Official VRCF Rubric</span>
                <span className="text-xs text-muted">ID: {selectedComp}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                {COMPETENCIES[selectedComp]?.label}
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {COMPETENCIES[selectedComp]?.description}
              </p>
            </div>

            {/* 5-Level Rubric Progression */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-extrabold text-muted uppercase tracking-wider">
                Assessment Rubric Progression (1.0 to 5.0)
              </h3>

              <div className="space-y-2.5">
                {[
                  { level: 'Level 1: Emerging (1.0 - 2.0)', desc: 'Identifies basic premises but relies on memorized routines without decomposing core assumptions.' },
                  { level: 'Level 2: Developing (2.1 - 3.0)', desc: 'Applies structured guidelines with guidance; questions assumptions when prompted by mentors.' },
                  { level: 'Level 3: Competent (3.1 - 4.0)', desc: 'Independently breaks down multi-layered problems into atomic principles with structured reasoning.' },
                  { level: 'Level 4: Advanced (4.1 - 4.7)', desc: 'Constructs novel conceptual frameworks, synthesizes disparate domain knowledge, and mentors peers.' },
                  { level: 'Level 5: Master (4.8 - 5.0)', desc: 'Demonstrates instinctive first-principles clarity, driving exemplary organizational leadership and impact.' },
                ].map((rub, i) => (
                  <div key={i} className="p-3.5 rounded-[14px] bg-muted-bg/40 border border-border space-y-1">
                    <span className="text-xs font-bold text-foreground">{rub.level}</span>
                    <p className="text-xs text-muted leading-relaxed">{rub.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'resources' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources by title or competency..."
              value={searchResource}
              onChange={(e) => setSearchResource(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface border border-border text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="mentora-card p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-muted-bg border border-border">
                      {getMediaIcon(res.type)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      {res.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug">
                    {res.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {res.competency_tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary"
                      >
                        {tag.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[10px] text-muted truncate">
                    {res.goal_tags[0] || 'Leadership'}
                  </span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mentora-btn-secondary text-[11px] px-2.5 py-1 flex items-center gap-1"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'ai' && (
        <div className="space-y-6">
          <div className="mentora-card p-6 space-y-4 border-l-4 border-l-primary">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-extrabold text-lg text-foreground">
                Google Gemini Leadership Challenge Engine
              </h2>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Mentora dynamically personalizes leadership micro-challenges ("Daily Think It Through") using the official Google GenAI SDK. Challenges target each scholar's lowest evaluated competency score from mentor reviews.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-[16px] bg-muted-bg/40 border border-border space-y-1.5">
                <span className="text-xs font-bold text-foreground">1. Dynamic Targeting</span>
                <p className="text-xs text-muted leading-relaxed">
                  Identifies lowest competency &lt; 4.0; synthesizes realistic scenarios (e.g. ethical village cooperative decisions, technical root-cause analyses).
                </p>
              </div>

              <div className="p-4 rounded-[16px] bg-muted-bg/40 border border-border space-y-1.5">
                <span className="text-xs font-bold text-foreground">2. Socratic Evaluation</span>
                <p className="text-xs text-muted leading-relaxed">
                  Grades student responses against VRCF analytical rubrics; awards +75 to +100 XP with constructive qualitative feedback.
                </p>
              </div>

              <div className="p-4 rounded-[16px] bg-muted-bg/40 border border-border space-y-1.5">
                <span className="text-xs font-bold text-foreground">3. Safety Screening</span>
                <p className="text-xs text-muted leading-relaxed">
                  Silently screens student inputs for non-diagnostic welfare and academic distress indicators, creating triage alerts for mentors.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Add Resource Modal */}
      {isAddResourceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-surface border border-border rounded-[24px] max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <h2 className="font-extrabold text-base text-foreground">Add Curated Resource</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddResourceOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-muted-bg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddResource} className="space-y-4 text-xs">
              <div>
                <label className="block text-muted font-semibold mb-1">Resource Title</label>
                <input
                  type="text"
                  placeholder="e.g. Richard Feynman on First Principles & Thinking"
                  value={resourceForm.title}
                  onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-muted font-semibold mb-1">URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={resourceForm.url}
                  onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                  className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted font-semibold mb-1">Media Type</label>
                  <select
                    value={resourceForm.type}
                    onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value as ResourceType })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  >
                    <option value="article">Article</option>
                    <option value="youtube">YouTube Video</option>
                    <option value="course">Course</option>
                    <option value="tool">Interactive Tool</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Target Competency</label>
                  <select
                    value={resourceForm.competency}
                    onChange={(e) => setResourceForm({ ...resourceForm, competency: e.target.value as CompetencyKey })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  >
                    {Object.entries(COMPETENCIES).map(([k, c]) => (
                      <option key={k} value={k}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-muted font-semibold mb-1">Scholar Goal Alignment</label>
                <input
                  type="text"
                  placeholder="e.g. Placement Readiness, First Principles, Public Speaking"
                  value={resourceForm.goalTag}
                  onChange={(e) => setResourceForm({ ...resourceForm, goalTag: e.target.value })}
                  className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddResourceOpen(false)}
                  className="mentora-btn-secondary text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mentora-btn-primary text-xs px-5 py-2 flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Resource</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
