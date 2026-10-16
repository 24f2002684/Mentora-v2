"use client";

import React from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/context';
import { ThemeToggle } from '@/components/theme-toggle';
import { DemoRoleSwitcher } from '@/components/demo-role-switcher';
import {
  Home,
  Target,
  CheckSquare,
  Bot,
  TrendingUp,
  BookOpen,
  User,
  Flame,
  Award,
  Bell,
  LogOut,
  Menu,
} from 'lucide-react';

const navItems = [
  { href: '/student', label: 'Home', icon: Home },
  { href: '/student/goals', label: 'Goals', icon: Target },
  { href: '/student/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/student/ai-mentor', label: 'AI Mentor', icon: Bot },
  { href: '/student/progress', label: 'Progress', icon: TrendingUp },
  { href: '/student/resources', label: 'Resources', icon: BookOpen },
  { href: '/student/profile', label: 'Profile', icon: User },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, studentData, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 md:pb-6">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <a href="/student" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-primary/20 bg-surface flex items-center justify-center p-1">
              <img
                src="/brand/mentora-logo.png"
                alt="Mentora Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-foreground">Mentora</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                  VRCF Scholar
                </span>
              </div>
              <p className="text-[11px] text-muted -mt-0.5 hidden sm:block">Vasumathi Ramaswami Centenary Foundation</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/student' && pathname.startsWith(item.href));
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`min-h-[44px] px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                      : 'text-muted hover:text-foreground hover:bg-muted-bg'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Items: Streak, XP, ThemeToggle, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gamification Pills */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-soft text-amber-brand text-xs font-bold border border-amber-brand/20">
              <Flame className="w-4 h-4 fill-amber-brand" />
              <span>5d</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-bold border border-primary/20">
              <Award className="w-4 h-4" />
              <span>385 XP</span>
            </div>

            <ThemeToggle />

            {/* Profile Dropdown / Sign out */}
            <div className="flex items-center gap-2 pl-1 border-l border-border">
              <a
                href="/student/profile"
                className="flex items-center gap-2 p-1 rounded-full hover:bg-muted-bg transition-colors"
                title="View Profile"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/40 bg-muted-bg flex items-center justify-center font-bold text-xs text-primary">
                  {user?.full_name?.charAt(0) || 'S'}
                </div>
              </a>
              <button
                type="button"
                onClick={signOut}
                className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-200">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border px-2 py-1 shadow-2xl"
      >
        <div className="flex items-center justify-around">
          {[
            { href: '/student', label: 'Home', icon: Home },
            { href: '/student/goals', label: 'Goals', icon: Target },
            { href: '/student/tasks', label: 'Tasks', icon: CheckSquare },
            { href: '/student/ai-mentor', label: 'AI Mentor', icon: Bot },
            { href: '/student/progress', label: 'Progress', icon: TrendingUp },
            { href: '/student/profile', label: 'More', icon: User },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/student' && pathname.startsWith(item.href));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Role Switcher floating widget */}
      <DemoRoleSwitcher />
    </div>
  );
}
