"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/context';
import {
  getMockStore,
  toggleResourceBookmark,
  completeResource,
} from '@/lib/mock/store';
import { Resource, ResourceType } from '@/lib/types/database';
import { COMPETENCIES, CompetencyKey, COMPETENCY_KEYS } from '@/lib/types/competencies';
import {
  BookOpen,
  ExternalLink,
  Bookmark,
  Filter,
  Video,
  FileText,
  Globe,
  Search,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Award,
  Check,
} from 'lucide-react';

export default function StudentResourcesPage() {
  const { studentData } = useAuth();
  const store = getMockStore();
  const currentStudent = studentData || store.students[0];

  const [resources, setResources] = useState<any[]>([...store.resources]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    new Set(store.bookmarkedResources[currentStudent.id] || ['res-1', 'res-5'])
  );
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    new Set(store.completedResources[currentStudent.id] || ['res-1'])
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCompetency, setSelectedCompetency] = useState<string>('all');
  const [isRanking, setIsRanking] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Rank resources via AI on mount
  useEffect(() => {
    handleRankResources();
  }, [currentStudent.id]);

  const handleRankResources = async () => {
    setIsRanking(true);
    try {
      const res = await fetch('/api/resources/rank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: currentStudent.id }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.rankedResources) {
          setResources(data.rankedResources);
        }
      }
    } catch (err) {
      console.warn('Could not rank resources via API:', err);
    } finally {
      setIsRanking(false);
    }
  };

  const handleToggleBookmark = (id: string) => {
    const isNowBookmarked = toggleResourceBookmark(currentStudent.id, id);
    const updated = new Set(bookmarkedIds);
    if (isNowBookmarked) {
      updated.add(id);
      showToast('Resource saved to bookmarks.');
    } else {
      updated.delete(id);
      showToast('Resource removed from bookmarks.');
    }
    setBookmarkedIds(updated);
  };

  const handleCompleteResource = (id: string) => {
    const result = completeResource(currentStudent.id, id);
    if (result.success) {
      const updated = new Set(completedIds);
      updated.add(id);
      setCompletedIds(updated);
      showToast(`+${result.xpEarned} XP awarded for completing resource!`);
    }
  };

  const typeIcons: Record<string, any> = {
    article: FileText,
    youtube: Video,
    course: Globe,
    tool: BookOpen,
    linkedin: Globe,
  };

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.competency_tags.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || r.type === selectedType;
    const matchesComp =
      selectedCompetency === 'all' || r.competency_tags.includes(selectedCompetency);

    return matchesSearch && matchesType && matchesComp;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-primary-foreground text-xs font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              AI Tailored Library
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Curated Learning Resources
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Articles, mental models, video breakdowns, and tools ranked specifically for your active goals and competencies.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRankResources}
          disabled={isRanking}
          className="mentora-btn-secondary text-xs px-3.5 py-2 self-start sm:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRanking ? 'animate-spin' : ''}`} />
          <span>Re-rank with AI</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="mentora-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or author..."
              className="mentora-input pl-10 text-xs py-2"
            />
          </div>

          {/* Media Type Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {['all', 'article', 'youtube', 'course', 'tool'].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-surface-raised border border-border text-muted hover:text-foreground'
                }`}
              >
                {type === 'all' ? 'All Formats' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Competencies Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-border/50 pb-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider shrink-0 mr-1">
            Competency:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCompetency('all')}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedCompetency === 'all'
                ? 'bg-primary/20 text-primary font-bold'
                : 'text-muted hover:text-foreground hover:bg-muted-bg'
            }`}
          >
            All 10
          </button>
          {COMPETENCY_KEYS.map((key) => {
            const isSelected = selectedCompetency === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => setSelectedCompetency(key)}
                className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-primary/20 text-primary font-bold'
                    : 'text-muted hover:text-foreground hover:bg-muted-bg'
                }`}
              >
                {COMPETENCIES[key].shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => {
          const Icon = typeIcons[item.type] || BookOpen;
          const isSaved = bookmarkedIds.has(item.id);
          const isCompleted = completedIds.has(item.id);
          const hasRationale = item.recommendationRationale && idx < 3;

          return (
            <div
              key={item.id}
              className={`mentora-card p-5 space-y-4 bg-surface hover:border-primary/40 transition-all flex flex-col justify-between ${
                hasRationale ? 'border-primary/30 ring-1 ring-primary/20' : ''
              }`}
            >
              <div className="space-y-3">
                {/* Header Pills */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary capitalize flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      {item.type}
                    </span>
                    {hasRationale && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-brand/10 text-amber-brand border border-amber-brand/20 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Top Match
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(item.id)}
                      className={`p-1.5 rounded-full border transition-colors ${
                        isSaved
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-muted hover:text-foreground hover:bg-surface-raised'
                      }`}
                      title={isSaved ? 'Remove bookmark' : 'Bookmark resource'}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base text-foreground leading-snug">
                  {item.title}
                </h3>

                {/* AI Recommendation Rationale */}
                {item.recommendationRationale && (
                  <p className="text-xs text-muted leading-relaxed italic bg-surface-raised p-2.5 rounded-[12px] border border-border">
                    <span className="font-bold not-italic text-primary block text-[10px] uppercase tracking-wider mb-0.5">
                      Why Recommended for You:
                    </span>
                    {item.recommendationRationale}
                  </p>
                )}

                {/* Competency Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.competency_tags.map((c: CompetencyKey) => (
                    <span
                      key={c}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted-bg text-muted border border-border/50"
                    >
                      {COMPETENCIES[c]?.shortLabel || c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => handleCompleteResource(item.id)}
                  disabled={isCompleted}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border flex items-center gap-1.5 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-surface hover:bg-surface-tint text-muted hover:text-foreground border-border'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Completed (+25 XP)
                    </>
                  ) : (
                    <>
                      <Award className="w-3.5 h-3.5 text-primary" />
                      Mark Done (+25 XP)
                    </>
                  )}
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mentora-btn-primary text-xs px-3.5 py-1.5 inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
