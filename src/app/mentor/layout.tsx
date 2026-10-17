"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { ThemeToggle } from '@/components/theme-toggle';
import { DemoRoleSwitcher } from '@/components/demo-role-switcher';
import { NotificationDropdown } from '@/components/notification-dropdown';
import {
  Users,
  CheckSquare,
  AlertTriangle,
  UserPlus,
  FileText,
  BarChart3,
  LogOut,
  LayoutDashboard,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  UserCircle,
} from 'lucide-react';

const mentorNavItems = [
  { href: '/mentor', label: 'Overview', icon: LayoutDashboard },
  { href: '/mentor/students', label: 'VRCF Students', icon: GraduationCap },
  { href: '/mentor/review', label: 'Review Submissions', icon: CheckSquare },
  { href: '/mentor/alerts', label: 'Support Alerts', icon: ShieldAlert },
  { href: '/mentor/add-student', label: 'Add Scholar', icon: UserPlus },
  { href: '/mentor/profile', label: 'My Profile', icon: UserCircle },
];

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex bg-background text-foreground pb-20 lg:pb-0">
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-surface shrink-0 sticky top-0 h-screen transition-colors">
        {/* Brand Header */}
        <div className="p-6 border-b border-border">
          <a href="/mentor" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-primary/20 bg-surface flex items-center justify-center p-1.5 shadow-sm">
              <img
                src="/brand/mentora-logo.png"
                alt="Mentora Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-lg text-foreground tracking-tight">Mentora</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 uppercase tracking-wider">
                  Mentor Portal
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {mentorNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/mentor' && pathname.startsWith(item.href));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 rounded-[14px] text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted hover:text-foreground hover:bg-muted-bg'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer: Mentor Info, ThemeToggle, Sign Out */}
        <div className="p-4 border-t border-border bg-surface-raised/40 space-y-3">
          <div className="flex items-center justify-between">
            <a href="/mentor/profile" className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-full bg-sky-500/20 text-sky-500 font-bold text-xs flex items-center justify-center border border-sky-500/30 shrink-0">
                RM
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-foreground truncate">{user?.full_name || 'Ramkumar SKR'}</p>
                <p className="text-[10px] text-muted truncate">{user?.email || 'ramkumar.skr01@gmail.com'}</p>
              </div>
            </a>
            <div className="flex items-center gap-1.5 shrink-0">
              <NotificationDropdown />
              <ThemeToggle />
            </div>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="w-full min-h-[40px] flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-500 hover:bg-rose-500/10 border border-border transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-border px-4 h-16 flex items-center justify-between">
          <a href="/mentor" className="flex items-center gap-2.5">
            <img src="/brand/mentora-logo.png" alt="Mentora" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-extrabold text-base text-foreground">Mentora</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 uppercase ml-2">
                Mentor
              </span>
            </div>
          </a>
          <div className="flex items-center gap-2">
            <NotificationDropdown />
            <ThemeToggle />
            <button
              type="button"
              onClick={signOut}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-rose-500 hover:bg-rose-500/10"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Bar for Mentors */}
      <nav
        aria-label="Mentor Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border px-2 py-1 shadow-2xl"
      >
        <div className="flex items-center justify-around">
          {mentorNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/mentor' && pathname.startsWith(item.href));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
                  isActive ? 'text-primary font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] mt-1 tracking-tight">{item.label.split(' ')[0]}</span>
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
