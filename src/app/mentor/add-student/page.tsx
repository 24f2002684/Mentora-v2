"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMockStore, addStudent } from '@/lib/mock/store';
import { ResidenceType } from '@/lib/types/database';
import {
  UserPlus,
  ArrowLeft,
  GraduationCap,
  Mail,
  Phone,
  Building,
  Home,
  DollarSign,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function MentorAddStudentPage() {
  const router = useRouter();
  const store = getMockStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cohort, setCohort] = useState<1 | 2 | 3>(1);
  const [courseName, setCourseName] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('1st Year');
  const [college, setCollege] = useState('');
  const [collegeDistrict, setCollegeDistrict] = useState('');
  const [residenceType, setResidenceType] = useState<ResidenceType>('day_scholar');
  const [phone, setPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [homeDistrict, setHomeDistrict] = useState('');
  const [tuitionTerm, setTuitionTerm] = useState('Per Semester');
  const [tuitionAmount, setTuitionAmount] = useState('');
  const [hostelFee, setHostelFee] = useState('No');
  const [totalYears, setTotalYears] = useState('3.0');
  const [primaryMentorId, setPrimaryMentorId] = useState(store.mentors[0]?.id || 'mentor-rec-1');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !courseName.trim() || !college.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Course, College).');
      return;
    }

    // Check duplicate email
    if (store.students.some((s) => s.email.toLowerCase() === email.trim().toLowerCase())) {
      setErrorMsg('A scholar with this email address is already registered in the VRCF database.');
      return;
    }

    setIsSubmitting(true);

    const cohortCount = store.students.filter((s) => s.cohort === cohort).length;
    const vrcfId = `VRCF-C${cohort}-${String(cohortCount + 1).padStart(3, '0')}`;

    const newStudent = addStudent({
      vrcf_id: vrcfId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      cohort,
      course_name: courseName.trim(),
      year_of_study: yearOfStudy.trim(),
      college: college.trim(),
      college_district: collegeDistrict.trim() || homeDistrict.trim(),
      residence_type: residenceType,
      phone: phone.trim(),
      parent_phone: parentPhone.trim(),
      home_address: homeAddress.trim(),
      home_district: homeDistrict.trim(),
      tuition_fee_term: tuitionTerm,
      tuition_fee_amount: tuitionAmount.trim() || 'Covered by VRCF',
      hostel_fee: hostelFee.trim(),
      total_academic_years: totalYears,
      primary_mentor_id: primaryMentorId,
      status: 'active',
    });

    setIsSubmitting(false);
    router.push(`/mentor/students/${newStudent.id}`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <a
          href="/mentor/students"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Scholars Directory
        </a>
      </div>

      <div className="mentora-card p-6 sm:p-8 space-y-6 bg-surface border border-border shadow-xl">
        <div className="space-y-1 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
              Scholar Onboarding
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            Register New VRCF Scholar
          </h1>
          <p className="text-xs text-muted">
            Adding a scholar immediately whitelists their Google account for login and initializes their mentorship profile.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-[14px] bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Section 1: Basic & Contact */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Identity &amp; Account
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="student-name" className="block font-bold text-foreground uppercase mb-1">Full Name *</label>
                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vignesh K"
                  className="mentora-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="student-email" className="block font-bold text-foreground uppercase mb-1">Gmail Address (for OAuth login) *</label>
                <input
                  id="student-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vignesh.k@gmail.com"
                  className="mentora-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="student-cohort" className="block font-bold text-foreground uppercase mb-1">Cohort Batch *</label>
                <select
                  id="student-cohort"
                  value={cohort}
                  onChange={(e) => setCohort(Number(e.target.value) as 1 | 2 | 3)}
                  className="mentora-input cursor-pointer"
                >
                  <option value={1}>Cohort 1 (2024)</option>
                  <option value={2}>Cohort 2 (2025)</option>
                  <option value={3}>Cohort 3 (2026)</option>
                </select>
              </div>

              <div>
                <label htmlFor="student-phone" className="block font-bold text-foreground uppercase mb-1">Student Phone</label>
                <input
                  id="student-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="mentora-input"
                />
              </div>

              <div>
                <label htmlFor="student-parent-phone" className="block font-bold text-foreground uppercase mb-1">Parent Phone</label>
                <input
                  id="student-parent-phone"
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="+91 9443210987"
                  className="mentora-input"
                />
              </div>
            </div>
          </div>

          {/* Section 2: College & Academic */}
          <div className="space-y-3 pt-3 border-t border-border/60">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-500" />
              Academic Enrollment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="student-course" className="block font-bold text-foreground uppercase mb-1">Degree &amp; Major *</label>
                <input
                  id="student-course"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. B.Tech Artificial Intelligence"
                  className="mentora-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="student-year" className="block font-bold text-foreground uppercase mb-1">Year of Study</label>
                <input
                  id="student-year"
                  type="text"
                  value={yearOfStudy}
                  onChange={(e) => setYearOfStudy(e.target.value)}
                  placeholder="e.g. 2nd Year / III Sem"
                  className="mentora-input"
                />
              </div>

              <div>
                <label htmlFor="student-total-years" className="block font-bold text-foreground uppercase mb-1">Total Academic Years</label>
                <input
                  id="student-total-years"
                  type="text"
                  value={totalYears}
                  onChange={(e) => setTotalYears(e.target.value)}
                  placeholder="3.0 or 4.0"
                  className="mentora-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="student-college" className="block font-bold text-foreground uppercase mb-1">College Name *</label>
                <input
                  id="student-college"
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. PSG College of Technology"
                  className="mentora-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="student-college-district" className="block font-bold text-foreground uppercase mb-1">College District</label>
                <input
                  id="student-college-district"
                  type="text"
                  value={collegeDistrict}
                  onChange={(e) => setCollegeDistrict(e.target.value)}
                  placeholder="e.g. Coimbatore"
                  className="mentora-input"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Residence & Support */}
          <div className="space-y-3 pt-3 border-t border-border/60">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-brand" />
              Living &amp; Financial Scholarship Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="student-home-address" className="block font-bold text-foreground uppercase mb-1">Home Address</label>
                <input
                  id="student-home-address"
                  type="text"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder="Door No, Street, Town"
                  className="mentora-input"
                />
              </div>

              <div>
                <label htmlFor="student-home-district" className="block font-bold text-foreground uppercase mb-1">Home District</label>
                <input
                  id="student-home-district"
                  type="text"
                  value={homeDistrict}
                  onChange={(e) => setHomeDistrict(e.target.value)}
                  placeholder="e.g. Salem, Madurai"
                  className="mentora-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="student-residence-type" className="block font-bold text-foreground uppercase mb-1">Residence Status</label>
                <select
                  id="student-residence-type"
                  value={residenceType}
                  onChange={(e) => setResidenceType(e.target.value as ResidenceType)}
                  className="mentora-input cursor-pointer"
                >
                  <option value="day_scholar">Day Scholar</option>
                  <option value="hosteller">Hosteller</option>
                </select>
              </div>

              <div>
                <label htmlFor="student-tuition-term" className="block font-bold text-foreground uppercase mb-1">Tuition Fee Term</label>
                <input
                  id="student-tuition-term"
                  type="text"
                  value={tuitionTerm}
                  onChange={(e) => setTuitionTerm(e.target.value)}
                  placeholder="Per Semester"
                  className="mentora-input"
                />
              </div>

              <div>
                <label htmlFor="student-tuition-amount" className="block font-bold text-foreground uppercase mb-1">Tuition Fee Amount</label>
                <input
                  id="student-tuition-amount"
                  type="text"
                  value={tuitionAmount}
                  onChange={(e) => setTuitionAmount(e.target.value)}
                  placeholder="45,000"
                  className="mentora-input"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-border/80">
            <button
              type="button"
              onClick={() => router.push('/mentor/students')}
              className="mentora-btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mentora-btn-primary text-xs"
            >
              {isSubmitting ? 'Registering Scholar...' : 'Register Scholar & Whitelist Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
