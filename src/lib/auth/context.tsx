"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Profile, UserRole, Student, Mentor, Trustee } from '../types/database';
import { getMockStore } from '../mock/store';
import { createClient } from '../supabase/client';

interface AuthContextType {
  user: Profile | null;
  role: UserRole | null;
  studentData: Student | null;
  mentorData: Mentor | null;
  trusteeData: Trustee | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  switchDemoRole: (role: UserRole, email?: string) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [mentorData, setMentorData] = useState<Mentor | null>(null);
  const [trusteeData, setTrusteeData] = useState<Trustee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with default or cached user
  useEffect(() => {
    const savedEmail = typeof window !== 'undefined' ? localStorage.getItem('mentora_auth_email') : null;
    const store = getMockStore();

    if (savedEmail) {
      handleUserResolution(savedEmail);
    } else {
      // Default to student (Lakshana R) for immediate interactive demo preview
      const defaultStudent = store.students[0];
      if (defaultStudent && defaultStudent.profile) {
        setUser(defaultStudent.profile);
        setRole('student');
        setStudentData(defaultStudent);
      }
      setIsLoading(false);
    }
  }, []);

  function handleUserResolution(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    const store = getMockStore();

    // 1. Check if Admin
    if (cleanEmail === 'suhailmobina95@gmail.com') {
      const adminProfile = store.profiles.find((p) => p.role === 'admin')!;
      setUser(adminProfile);
      setRole('admin');
      setStudentData(null);
      setMentorData(null);
      setTrusteeData(null);
      localStorage.setItem('mentora_auth_email', cleanEmail);
      setIsLoading(false);
      return { success: true, role: 'admin' as UserRole };
    }

    // 2. Check if Mentor
    const mentorProfile = store.profiles.find((p) => p.email.toLowerCase() === cleanEmail && p.role === 'mentor');
    if (mentorProfile) {
      const mentor = store.mentors.find((m) => m.profile_id === mentorProfile.id);
      setUser(mentorProfile);
      setRole('mentor');
      setMentorData(mentor || null);
      setStudentData(null);
      setTrusteeData(null);
      localStorage.setItem('mentora_auth_email', cleanEmail);
      setIsLoading(false);
      return { success: true, role: 'mentor' as UserRole };
    }

    // 3. Check if Trustee
    const trusteeProfile = store.profiles.find((p) => p.email.toLowerCase() === cleanEmail && p.role === 'trustee');
    if (trusteeProfile) {
      const trustee = store.trustees.find((t) => t.profile_id === trusteeProfile.id);
      setUser(trusteeProfile);
      setRole('trustee');
      setTrusteeData(trustee || null);
      setStudentData(null);
      setMentorData(null);
      localStorage.setItem('mentora_auth_email', cleanEmail);
      setIsLoading(false);
      return { success: true, role: 'trustee' as UserRole };
    }

    // 4. Check if Student (Whitelist Check)
    const student = store.students.find((s) => s.email.toLowerCase() === cleanEmail);
    if (student) {
      const profile = store.profiles.find((p) => p.id === student.profile_id) || {
        id: student.profile_id || `profile-${student.id}`,
        role: 'student' as UserRole,
        full_name: student.name,
        email: student.email,
        phone: student.phone,
        photo_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(student.name)}`,
        created_at: student.created_at,
      };
      setUser(profile);
      setRole('student');
      setStudentData(student);
      setMentorData(null);
      setTrusteeData(null);
      localStorage.setItem('mentora_auth_email', cleanEmail);
      setIsLoading(false);
      return { success: true, role: 'student' as UserRole };
    }

    // Email not registered
    setIsLoading(false);
    return { success: false, error: 'not_registered' };
  }

  const signInWithEmail = async (email: string) => {
    setIsLoading(true);
    const result = handleUserResolution(email);
    if (result.success && result.role) {
      router.push(`/${result.role}`);
      return { success: true };
    }
    return { success: false, error: 'You are not registered in the VRCF student database. Please contact your VRCF mentor.' };
  };

  const signInWithGoogle = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (e) {
      console.warn('Supabase OAuth redirected in mock mode', e);
    }
  };

  const switchDemoRole = (newRole: UserRole, targetEmail?: string) => {
    const store = getMockStore();
    if (newRole === 'admin') {
      handleUserResolution('suhailmobina95@gmail.com');
      router.push('/admin');
    } else if (newRole === 'mentor') {
      handleUserResolution(targetEmail || 'ramkumar.skr01@gmail.com');
      router.push('/mentor');
    } else if (newRole === 'trustee') {
      handleUserResolution(targetEmail || 'trustee1@vrcf.org.in');
      router.push('/trustee');
    } else if (newRole === 'student') {
      const email = targetEmail || store.students[0]?.email || 'lakshana042006@gmail.com';
      handleUserResolution(email);
      router.push('/student');
    }
  };

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    localStorage.removeItem('mentora_auth_email');
    setUser(null);
    setRole(null);
    setStudentData(null);
    setMentorData(null);
    setTrusteeData(null);
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        studentData,
        mentorData,
        trusteeData,
        isLoading,
        signInWithGoogle,
        signInWithEmail,
        switchDemoRole,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
