"use client";

import React, { useState } from 'react';
import { getMockStore } from '@/lib/mock/store';
import { Student } from '@/lib/types/database';
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  ChevronRight,
  UserPlus,
  Flame,
  Award,
  Building,
  CheckCircle2,
} from 'lucide-react';

export default function MentorStudentsPage() {
  const store = getMockStore();
  const [students, setStudents] = useState<Student[]>(store.students);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCohort, setSelectedCohort] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Districts list from data
  const districts = Array.from(
    new Set(store.students.map((s) => s.college_district || s.home_district).filter(Boolean))
  ) as string[];

  const filteredStudents = students.filter((s) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      s.name.toLowerCase().includes(query) ||
      s.vrcf_id.toLowerCase().includes(query) ||
      s.college.toLowerCase().includes(query) ||
      s.course_name.toLowerCase().includes(query);

    const matchesCohort = selectedCohort === 'all' || s.cohort.toString() === selectedCohort;
    const matchesDistrict =
      selectedDistrict === 'all' ||
      (s.college_district && s.college_district.toLowerCase().includes(selectedDistrict.toLowerCase())) ||
      (s.home_district && s.home_district.toLowerCase().includes(selectedDistrict.toLowerCase()));

    return matchesSearch && matchesCohort && matchesDistrict;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Foundation Scholars
            </span>
            <span className="text-xs text-muted">Active Roster ({filteredStudents.length} of {students.length})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            VRCF Scholars Directory
          </h1>
          <p className="text-sm text-muted mt-0.5">
            Monitor academic progress, review reflections, and assign targeted leadership milestones.
          </p>
        </div>

        <a
          href="/mentor/add-student"
          className="mentora-btn-primary text-sm self-start sm:self-auto shadow-md"
        >
          <UserPlus className="w-4 h-4" />
          Add New Scholar
        </a>
      </div>

      {/* Search & Filters Bar */}
      <div className="mentora-card p-4 space-y-3 bg-surface">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, VRCF ID, college..."
              className="mentora-input pl-9 text-xs"
            />
          </div>

          {/* Cohort Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted shrink-0" />
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="mentora-input text-xs cursor-pointer"
            >
              <option value="all">All Cohorts (1, 2, 3)</option>
              <option value="1">Cohort 1</option>
              <option value="2">Cohort 2</option>
              <option value="3">Cohort 3</option>
            </select>
          </div>

          {/* District Filter */}
          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="mentora-input text-xs cursor-pointer"
            >
              <option value="all">All Districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scholars Table */}
      <div className="mentora-card overflow-hidden bg-surface">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-muted space-y-2">
            <Users className="w-10 h-10 mx-auto text-muted/60" />
            <h3 className="text-base font-bold text-foreground">No scholars match your criteria</h3>
            <p className="text-xs text-muted">Try clearing your filters or adjusting your search keyword.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-muted uppercase bg-muted-bg/60 border-b border-border">
                <tr>
                  <th className="px-5 py-3.5">VRCF ID</th>
                  <th className="px-5 py-3.5">Scholar</th>
                  <th className="px-5 py-3.5">Degree &amp; Year</th>
                  <th className="px-5 py-3.5">College &amp; District</th>
                  <th className="px-5 py-3.5">Cohort</th>
                  <th className="px-5 py-3.5">Engagement</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredStudents.map((s) => {
                  const gamification = store.gamification[s.id] || {
                    current_streak: 3,
                    xp: 250,
                  };

                  return (
                    <tr
                      key={s.id}
                      className="hover:bg-surface-tint/60 transition-colors group cursor-pointer"
                      onClick={() => (window.location.href = `/mentor/students/${s.id}`)}
                    >
                      <td className="px-5 py-4 font-mono text-xs font-bold text-primary whitespace-nowrap">
                        {s.vrcf_id}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20 shrink-0">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">
                              {s.name}
                            </p>
                            <p className="text-[11px] text-muted truncate max-w-[150px]">{s.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-xs">
                        <p className="font-semibold text-foreground">{s.course_name}</p>
                        <p className="text-muted text-[11px]">{s.year_of_study}</p>
                      </td>

                      <td className="px-5 py-4 text-xs max-w-[200px]">
                        <p className="font-medium text-foreground truncate">{s.college}</p>
                        <p className="text-muted text-[11px] truncate">{s.college_district || s.home_district}</p>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                          Cohort {s.cohort}
                        </span>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-xs">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 font-bold text-amber-brand text-[11px]">
                            <Flame className="w-3.5 h-3.5 fill-amber-brand" />
                            {gamification.current_streak}d
                          </span>
                          <span className="text-muted text-[11px]">• {gamification.xp} XP</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <a
                          href={`/mentor/students/${s.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Profile
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
