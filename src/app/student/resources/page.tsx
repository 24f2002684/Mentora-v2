"use client";

import React, { useState } from 'react';
import { getMockStore } from '@/lib/mock/store';
import { COMPETENCIES, CompetencyKey } from '@/lib/types/competencies';
import { BookOpen, ExternalLink, Bookmark, Filter, Video, FileText, Globe, Search } from 'lucide-react';

export default function StudentResourcesPage() {
  const store = getMockStore();
  const [resources, setResources] = useState(store.resources);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleBookmark = (id: string) => {
    const updated = new Set(bookmarked);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setBookmarked(updated);
  };

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.competency_tags.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const typeIcons: Record<string, any> = {
    article: FileText,
    youtube: Video,
    course: Globe,
    tool: BookOpen,
    linkedin: Globe,
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Curated Growth Materials
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Learning Resources
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Hand-picked leadership articles, mental model breakdowns, and professional tools recommended by mentors.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic or skill..."
            className="mentora-input pl-9 text-xs py-2"
          />
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const Icon = typeIcons[item.type] || BookOpen;
          const isSaved = bookmarked.has(item.id);

          return (
            <div
              key={item.id}
              className="mentora-card p-5 space-y-3 bg-surface hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary capitalize flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    {item.type}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(item.id)}
                    className={`p-1.5 rounded-full border transition-colors ${
                      isSaved ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted hover:text-foreground'
                    }`}
                    title={isSaved ? 'Remove bookmark' : 'Bookmark resource'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-bold text-base text-foreground leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {item.competency_tags.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted-bg text-muted"
                    >
                      {COMPETENCIES[c as CompetencyKey]?.shortLabel || c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                <span className="text-[11px] text-muted">Recommended for leadership development</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Open Resource
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
