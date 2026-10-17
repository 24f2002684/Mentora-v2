"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { getMockStore, updateStudentProfile } from '@/lib/mock/store';
import {
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Home,
  Shield,
  Upload,
  CheckCircle2,
  Lock,
  Eye,
  Info,
  DollarSign,
  AlertCircle,
  Camera,
} from 'lucide-react';

export default function StudentProfilePage() {
  const { user, studentData, role } = useAuth();
  const store = getMockStore();
  const currentStudent = studentData || store.students[0];

  const [student, setStudent] = useState(currentStudent);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(
    user?.photo_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentStudent.name)}`
  );
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Handle custom photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size must be less than 5 MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        setSuccessToast('Profile picture updated successfully!');
        setTimeout(() => setSuccessToast(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const assignedMentor = store.mentors.find((m) => m.id === currentStudent.primary_mentor_id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-brand text-white text-xs font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="mentora-card p-6 sm:p-8 bg-gradient-to-br from-surface via-surface to-surface-tint border border-primary/20 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Upload Badge */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/40 shadow-md bg-muted-bg flex items-center justify-center">
              <img
                src={photoUrl}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary-hover cursor-pointer transition-transform hover:scale-105"
              title="Upload new profile photo"
            >
              <Camera className="w-4 h-4" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Profile Identity */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {student.vrcf_id}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-muted-bg text-muted">
                Cohort {student.cohort}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-soft text-emerald-brand">
                {student.status.toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {student.name}
            </h1>

            <p className="text-sm text-muted">
              {student.course_name} • {student.year_of_study} at {student.college}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="mentora-btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-primary" />
                Data Privacy Transparency
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic & College Information */}
        <div className="mentora-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-base text-foreground">Academic Enrollment</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Degree & Course</span>
              <span className="font-semibold text-foreground">{student.course_name}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Year of Study</span>
              <span className="font-semibold text-foreground">{student.year_of_study} (Total {student.total_academic_years || '3'} Academic Years)</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">College & District</span>
              <span className="font-semibold text-foreground">{student.college}</span>
              {student.college_district && (
                <span className="text-xs text-muted block mt-0.5">District: {student.college_district}</span>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Residence Status</span>
              <span className="font-semibold text-foreground capitalize">
                {student.residence_type.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Contact & Family Information */}
        <div className="mentora-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <Mail className="w-5 h-5 text-sky-500" />
            <h2 className="font-bold text-base text-foreground">Contact & Family Details</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Registered Email</span>
              <span className="font-semibold text-foreground">{student.email}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Student Phone</span>
              <span className="font-semibold text-foreground">{student.phone || 'Not provided'}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Parent / Guardian Contact</span>
              <span className="font-semibold text-foreground">{student.parent_phone || 'Not provided'}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Home Address & District</span>
              <span className="font-semibold text-foreground leading-relaxed block">
                {student.home_address || 'Address on record'}
              </span>
              {student.home_district && (
                <span className="text-xs text-muted block mt-0.5">District: {student.home_district}</span>
              )}
            </div>
          </div>
        </div>

        {/* VRCF Financial Support Information */}
        <div className="mentora-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <DollarSign className="w-5 h-5 text-emerald-brand" />
            <h2 className="font-bold text-base text-foreground">VRCF Scholarship Support</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Fee Payment Schedule</span>
              <span className="font-semibold text-foreground">{student.tuition_fee_term || 'Per Semester'}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Tuition Support Amount</span>
              <span className="font-semibold text-foreground">{student.tuition_fee_amount || 'Covered by VRCF'}</span>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Hostel Fee Support</span>
              <span className="font-semibold text-foreground">{student.hostel_fee || 'None / Day Scholar'}</span>
            </div>
          </div>
        </div>

        {/* Primary VRCF Mentor */}
        <div className="mentora-card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <User className="w-5 h-5 text-amber-brand" />
            <h2 className="font-bold text-base text-foreground">Assigned Lead Mentor</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                RM
              </div>
              <div>
                <p className="font-bold text-foreground">{assignedMentor?.profile?.full_name || 'Ramkumar SKR'}</p>
                <p className="text-xs text-muted">{assignedMentor?.designation || 'Lead Mentor & Technical Program Manager'}</p>
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed pt-2 border-t border-border/50">
              Your mentor conducts monthly reviews, provides written evaluation on assignments, and guides your leadership development.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Transparency Modal (DPDP Act Spirit) */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="mentora-card max-w-lg w-full p-6 sm:p-8 space-y-5 bg-surface border border-border shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">VRCF Data Privacy & Visibility</h3>
                  <p className="text-[11px] text-muted">Compliant with the spirit of India&apos;s DPDP Act</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="text-muted hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-foreground">
              <div className="p-3.5 rounded-[14px] bg-muted-bg/50 border border-border space-y-1">
                <div className="font-bold text-primary flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  What Your Mentors Can See
                </div>
                <p className="text-muted">
                  Your academic goals, task reflections, submissions, and competency scores. Mentors read your submissions to give constructive written feedback.
                </p>
              </div>

              <div className="p-3.5 rounded-[14px] bg-muted-bg/50 border border-border space-y-1">
                <div className="font-bold text-amber-brand flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  What VRCF Trustees Can See
                </div>
                <p className="text-muted">
                  Trustees see aggregate cohort statistics, task completion rates, and foundation-wide growth trends. <strong>Trustees are strictly blocked by security rules from reading your raw AI chat messages.</strong>
                </p>
              </div>

              <div className="p-3.5 rounded-[14px] bg-muted-bg/50 border border-border space-y-1">
                <div className="font-bold text-sky-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  What the AI Mentor Receives
                </div>
                <p className="text-muted">
                  Your first name, academic degree, active goals, and competency scores. <strong>The AI is never provided with your phone number, parents&apos; contact details, or home address.</strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="mentora-btn-primary w-full text-xs font-bold"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
