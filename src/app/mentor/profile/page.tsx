"use client";

import React, { useState } from 'react';
import { getMockStore, updateMentorProfile } from '@/lib/mock/store';
import { useAuth } from '@/lib/auth/context';
import { COMPETENCIES, CompetencyKey } from '@/lib/types/competencies';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
  Award,
  CheckCircle2,
  Save,
  Globe,
  Sparkles,
  Users,
  CheckSquare,
  ShieldCheck,
  Camera,
} from 'lucide-react';

export default function MentorProfilePage() {
  const { user } = useAuth();
  const store = getMockStore();

  // Find current mentor profile or default to Ramkumar
  const mentorRecord = store.mentors.find(
    (m) => m.profile?.email === (user?.email || 'ramkumar.skr01@gmail.com') || m.id === 'mentor-rec-1'
  ) || store.mentors[0];

  const profile = mentorRecord.profile;

  const [fullName, setFullName] = useState(profile?.full_name || 'Ramkumar SKR');
  const [email, setEmail] = useState(profile?.email || 'ramkumar.skr01@gmail.com');
  const [phone, setPhone] = useState(profile?.phone || '+91 9443210987');
  const [designation, setDesignation] = useState(mentorRecord.designation || 'Lead Mentor & Technical Program Manager');
  const [organization, setOrganization] = useState(mentorRecord.organization || 'VRCF & Tech Industry');
  const [photoUrl, setPhotoUrl] = useState(
    profile?.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
  );
  const [bio, setBio] = useState(
    'Dedicated to empowering rural and first-generation college scholars through systematic problem-solving, analytical thinking, and career readiness. Supporting VRCF fellows in tech leadership and lifelong learning.'
  );
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/ramkumar-vrcf');

  // Selected competencies mentored
  const [selectedCompetencies, setSelectedCompetencies] = useState<CompetencyKey[]>([
    'problem_solving',
    'analytical_thinking',
    'digital_ai_literacy',
    'career_readiness',
    'leadership',
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleCompetency = (key: CompetencyKey) => {
    setSelectedCompetencies((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMentorProfile(mentorRecord.id, {
      full_name: fullName,
      email,
      phone,
      designation,
      organization,
      photo_url: photoUrl,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  // Stats
  const totalMentees = store.students.length;
  const submissionsReviewed = store.submissions.filter((s) => !!s.review).length;
  const openAlerts = store.aiFlags.filter((f) => f.status === 'open').length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted mb-1">
            <a href="/mentor" className="hover:text-primary transition-colors">Mentor Workspace</a>
            <span>/</span>
            <span className="text-foreground font-semibold">My Profile & Mentorship Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Mentor Profile
          </h1>
          <p className="text-muted text-sm mt-1">
            Manage your credentials, mentorship focus areas, and foundation contact information.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            Profile updated successfully!
          </div>
        )}
      </div>

      {/* Profile Overview Card with Avatar */}
      <div className="mentora-card p-6 md:p-8 bg-gradient-to-br from-surface via-surface to-surface-tint border border-border">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative group shrink-0">
            <img
              src={photoUrl}
              alt={fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-md group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-md cursor-pointer hover:scale-105 transition-transform" title="Update photo">
              <Camera className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center md:justify-start">
              <h2 className="text-2xl font-black text-foreground">{fullName}</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 w-fit mx-auto md:mx-0">
                <ShieldCheck className="w-3.5 h-3.5" />
                VRCF Lead Mentor
              </span>
            </div>
            <p className="text-sm font-semibold text-primary">{designation}</p>
            <p className="text-xs text-muted flex items-center justify-center md:justify-start gap-1.5">
              <Building className="w-3.5 h-3.5" />
              {organization}
            </p>
            <p className="text-xs text-muted max-w-2xl pt-1 italic">
              &ldquo;{bio}&rdquo;
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-border md:pl-6 text-center">
            <div className="p-3 rounded-[16px] bg-surface-raised border border-border">
              <Users className="w-4 h-4 mx-auto text-primary mb-1" />
              <div className="text-xl font-black text-foreground">{totalMentees}</div>
              <div className="text-[10px] text-muted font-bold">Mentees</div>
            </div>
            <div className="p-3 rounded-[16px] bg-surface-raised border border-border">
              <CheckSquare className="w-4 h-4 mx-auto text-emerald-brand mb-1" />
              <div className="text-xl font-black text-emerald-brand">{submissionsReviewed}</div>
              <div className="text-[10px] text-muted font-bold">Reviewed</div>
            </div>
            <div className="p-3 rounded-[16px] bg-surface-raised border border-border">
              <Sparkles className="w-4 h-4 mx-auto text-amber-brand mb-1" />
              <div className="text-xl font-black text-amber-brand">1.2d</div>
              <div className="text-[10px] text-muted font-bold">Turnaround</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Edit Form */}
      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Contact & Credentials */}
        <div className="mentora-card p-6 md:p-8 space-y-6">
          <div className="border-b border-border pb-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Personal & Professional Details
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Contact information visible to your assigned VRCF scholars and foundation trustees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mentora-input pl-10 text-sm"
                />
                <User className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mentora-input pl-10 text-sm"
                />
                <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mentora-input pl-10 text-sm"
                />
                <Phone className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                LinkedIn or Profile URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="mentora-input pl-10 text-sm"
                  placeholder="https://linkedin.com/in/..."
                />
                <Globe className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Current Designation / Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="mentora-input pl-10 text-sm"
                />
                <Briefcase className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Organization / Affiliation
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="mentora-input pl-10 text-sm"
                />
                <Building className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Profile Photo URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="mentora-input pl-10 text-sm"
                  placeholder="https://images.unsplash.com/..."
                />
                <Camera className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <p className="text-[11px] text-muted mt-1">Enter a direct image link or use your Gravatar / Unsplash portrait.</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Mentorship Philosophy & Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mentora-input text-sm resize-none"
                placeholder="Share your mentoring approach and expectations with scholars..."
              />
            </div>
          </div>
        </div>

        {/* Section 2: Mentored Competencies Focus */}
        <div className="mentora-card p-6 md:p-8 space-y-6">
          <div className="border-b border-border pb-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Primary Mentorship Competencies
            </h3>
            <p className="text-xs text-muted mt-0.5">
              Select the VRCF leadership competencies you specialize in evaluating and coaching.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(COMPETENCIES) as CompetencyKey[]).map((key) => {
              const comp = COMPETENCIES[key];
              const isSelected = selectedCompetencies.includes(key);
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => toggleCompetency(key)}
                  className={`p-3.5 rounded-[14px] border text-left flex items-start justify-between gap-3 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border bg-surface hover:bg-surface-tint text-muted'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      {comp.label}
                    </div>
                    <p className="text-[11px] text-muted mt-0.5 line-clamp-1">{comp.description}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <a
            href="/mentor"
            className="mentora-btn-secondary text-sm"
          >
            Cancel
          </a>
          <button
            type="submit"
            className="mentora-btn-primary text-sm shadow-md"
          >
            <Save className="w-4 h-4" />
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
