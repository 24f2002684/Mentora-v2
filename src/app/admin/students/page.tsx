"use client";

import React, { useState } from 'react';
import { getMockStore, updateStudent, updateStudentStatus } from '@/lib/mock/store';
import { Student } from '@/lib/types/database';
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Edit2,
  FileText,
  CheckCircle2,
  X,
  Save,
  GraduationCap,
  Building,
  Phone,
  Mail,
  IndianRupee,
  Shield,
  MapPin,
} from 'lucide-react';

export default function AdminStudentsPage() {
  const store = getMockStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [cohortFilter, setCohortFilter] = useState<'all' | '1' | '2' | '3'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'graduated' | 'inactive'>('all');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<Partial<Student>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [studentsList, setStudentsList] = useState<Student[]>(store.students);

  // Filter scholars
  const filteredStudents = studentsList.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.vrcf_id.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.college.toLowerCase().includes(q) ||
      s.course_name.toLowerCase().includes(q) ||
      (s.home_district && s.home_district.toLowerCase().includes(q));

    const matchesCohort = cohortFilter === 'all' || s.cohort.toString() === cohortFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

    return matchesSearch && matchesCohort && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = [
      'VRCF ID',
      'Name',
      'Email',
      'Cohort',
      'Course',
      'Year of Study',
      'College',
      'District',
      'Residence Type',
      'Phone',
      'Parent Phone',
      'Tuition Term',
      'Tuition Fee Amount',
      'Hostel Fee',
      'Total Academic Years',
      'Primary Mentor',
      'Status',
    ];

    const rows = filteredStudents.map((s) => [
      s.vrcf_id,
      `"${s.name}"`,
      s.email,
      s.cohort,
      `"${s.course_name}"`,
      `"${s.year_of_study}"`,
      `"${s.college}"`,
      `"${s.home_district || ''}"`,
      s.residence_type,
      s.phone || '',
      s.parent_phone || '',
      `"${s.tuition_fee_term || ''}"`,
      `"${s.tuition_fee_amount || ''}"`,
      `"${s.hostel_fee || ''}"`,
      `"${s.total_academic_years || ''}"`,
      `"${s.primary_mentor?.profile?.full_name || 'Ramkumar SKR'}"`,
      s.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `vrcf_scholars_roster_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Exported CSV for ${filteredStudents.length} scholars!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStartEdit = (student: Student) => {
    setEditingStudent(student);
    setEditForm({
      name: student.name,
      phone: student.phone || '',
      parent_phone: student.parent_phone || '',
      college: student.college,
      course_name: student.course_name,
      year_of_study: student.year_of_study,
      residence_type: student.residence_type,
      tuition_fee_term: student.tuition_fee_term || '',
      tuition_fee_amount: student.tuition_fee_amount || '',
      hostel_fee: student.hostel_fee || '',
      primary_mentor_id: student.primary_mentor_id || store.mentors[0].id,
      status: student.status,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const updated = updateStudent(editingStudent.id, editForm);
    if (updated) {
      setStudentsList([...store.students]);
      setToastMessage(`Updated scholar record for ${updated.name}!`);
      setTimeout(() => setToastMessage(null), 3500);
    }
    setEditingStudent(null);
  };

  const handleStatusQuickChange = (
    studentId: string,
    newStatus: 'active' | 'graduated' | 'inactive'
  ) => {
    const updated = updateStudentStatus(studentId, newStatus);
    if (updated) {
      setStudentsList([...store.students]);
      setToastMessage(`Status changed to ${newStatus} for ${updated.name}`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
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
            Scholar Roster Management
          </h1>
          <p className="text-muted text-sm sm:text-base mt-1">
            Official student database loaded from Student_DB.xlsx with fees, academic status, and mentor allocation
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleExportCSV}
            className="mentora-btn-secondary text-xs sm:text-sm px-4 py-2 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <a
            href="/mentor/add-student"
            className="mentora-btn-primary text-xs sm:text-sm px-4 py-2 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Scholar</span>
          </a>
        </div>
      </div>

      {/* 2. Top Cohort Breakdown Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="mentora-card p-4 space-y-1 border-l-4 border-l-primary">
          <span className="text-xs font-bold text-muted uppercase">Total Scholars</span>
          <div className="text-2xl font-extrabold text-foreground">{store.students.length}</div>
          <p className="text-[11px] text-muted">All active cohorts</p>
        </div>
        <div className="mentora-card p-4 space-y-1 border-l-4 border-l-teal-600">
          <span className="text-xs font-bold text-muted uppercase">Cohort 1</span>
          <div className="text-2xl font-extrabold text-teal-600">
            {store.students.filter((s) => s.cohort === 1).length}
          </div>
          <p className="text-[11px] text-muted">Senior scholars</p>
        </div>
        <div className="mentora-card p-4 space-y-1 border-l-4 border-l-sky-500">
          <span className="text-xs font-bold text-muted uppercase">Cohort 2</span>
          <div className="text-2xl font-extrabold text-sky-500">
            {store.students.filter((s) => s.cohort === 2).length}
          </div>
          <p className="text-[11px] text-muted">Intermediate batch</p>
        </div>
        <div className="mentora-card p-4 space-y-1 border-l-4 border-l-amber-brand">
          <span className="text-xs font-bold text-muted uppercase">Cohort 3</span>
          <div className="text-2xl font-extrabold text-amber-brand">
            {store.students.filter((s) => s.cohort === 3).length}
          </div>
          <p className="text-[11px] text-muted">Incoming batch</p>
        </div>
      </div>

      {/* 3. Search and Filters */}
      <div className="mentora-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, VRCF ID, college, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-raised border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            {/* Cohort Filter */}
            <div className="flex items-center gap-1.5 bg-surface-raised px-3 py-1 rounded-full border border-border text-xs">
              <span className="text-muted font-medium">Cohort:</span>
              <select
                value={cohortFilter}
                onChange={(e) => setCohortFilter(e.target.value as any)}
                className="bg-transparent text-foreground font-bold focus:outline-none cursor-pointer"
              >
                <option value="all">All ({studentsList.length})</option>
                <option value="1">Cohort 1 (14)</option>
                <option value="2">Cohort 2 (16)</option>
                <option value="3">Cohort 3 (12)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-surface-raised px-3 py-1 rounded-full border border-border text-xs">
              <span className="text-muted font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-transparent text-foreground font-bold focus:outline-none cursor-pointer"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="graduated">Graduated</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Scholars Table */}
      <div className="mentora-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-muted border-collapse">
            <thead className="bg-surface-raised/80 border-b border-border text-foreground font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Scholar</th>
                <th className="py-3.5 px-4">Cohort</th>
                <th className="py-3.5 px-4">Course & College</th>
                <th className="py-3.5 px-4">Scholarship Fees</th>
                <th className="py-3.5 px-4">Mentor</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted">
                    No scholars match your current search or filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-muted-bg/40 transition-colors">
                    {/* Scholar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-teal-500/10 text-primary font-bold flex items-center justify-center shrink-0">
                          {s.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-foreground truncate">{s.name}</p>
                          <p className="text-[10px] text-muted">{s.vrcf_id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Cohort */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-foreground">Cohort {s.cohort}</span>
                    </td>

                    {/* Academic */}
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-medium text-foreground truncate">{s.course_name}</p>
                      <p className="text-[11px] text-muted truncate">{s.college}</p>
                      {s.home_district && (
                        <p className="text-[10px] text-muted flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-muted" />
                          {s.home_district}
                        </p>
                      )}
                    </td>

                    {/* Fees */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-foreground">
                        {s.tuition_fee_amount || '₹25,000'}
                      </p>
                      <p className="text-[10px] text-muted">{s.tuition_fee_term || 'Annual'}</p>
                      {s.hostel_fee && s.hostel_fee !== '-' && (
                        <p className="text-[10px] text-amber-brand">Hostel: {s.hostel_fee}</p>
                      )}
                    </td>

                    {/* Mentor */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-foreground">
                        {s.primary_mentor?.profile?.full_name || 'Ramkumar SKR'}
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4">
                      <select
                        value={s.status}
                        onChange={(e) =>
                          handleStatusQuickChange(s.id, e.target.value as any)
                        }
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                          s.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-brand border-emerald-500/20'
                            : s.status === 'graduated'
                            ? 'bg-sky-500/10 text-sky-500 border-sky-500/20'
                            : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="graduated">Graduated</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(s)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-primary hover:bg-muted-bg transition-colors"
                          title="Edit Scholar Record"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`/api/reports/student/${s.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-emerald-brand hover:bg-muted-bg transition-colors"
                          title="Download PDF Dossier"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Edit Scholar Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-surface border border-border rounded-[24px] max-w-xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h2 className="font-extrabold text-lg text-foreground">
                  Edit Scholar Record
                </h2>
                <p className="text-xs text-muted">
                  {editingStudent.name} • {editingStudent.vrcf_id} (Cohort {editingStudent.cohort})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-muted-bg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted font-semibold mb-1">Scholar Name</label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Scholar Phone</label>
                  <input
                    type="text"
                    value={editForm.phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Parent Phone</label>
                  <input
                    type="text"
                    value={editForm.parent_phone || ''}
                    onChange={(e) => setEditForm({ ...editForm, parent_phone: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">College</label>
                  <input
                    type="text"
                    value={editForm.college || ''}
                    onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Course Name</label>
                  <input
                    type="text"
                    value={editForm.course_name || ''}
                    onChange={(e) => setEditForm({ ...editForm, course_name: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Year of Study</label>
                  <input
                    type="text"
                    value={editForm.year_of_study || ''}
                    onChange={(e) => setEditForm({ ...editForm, year_of_study: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Tuition Fee Term</label>
                  <input
                    type="text"
                    value={editForm.tuition_fee_term || ''}
                    onChange={(e) => setEditForm({ ...editForm, tuition_fee_term: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Tuition Fee Amount</label>
                  <input
                    type="text"
                    value={editForm.tuition_fee_amount || ''}
                    onChange={(e) => setEditForm({ ...editForm, tuition_fee_amount: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Hostel Fee</label>
                  <input
                    type="text"
                    value={editForm.hostel_fee || ''}
                    onChange={(e) => setEditForm({ ...editForm, hostel_fee: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted font-semibold mb-1">Assigned Primary Mentor</label>
                  <select
                    value={editForm.primary_mentor_id || ''}
                    onChange={(e) => setEditForm({ ...editForm, primary_mentor_id: e.target.value })}
                    className="w-full p-2.5 rounded-[12px] bg-muted-bg/40 border border-border text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  >
                    {store.mentors.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.profile?.full_name || 'Ramkumar SKR'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="mentora-btn-secondary text-xs px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mentora-btn-primary text-xs px-5 py-2 flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
