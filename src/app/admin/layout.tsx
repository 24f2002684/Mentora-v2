"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import { ThemeToggle } from '@/components/theme-toggle';
import { DemoRoleSwitcher } from '@/components/demo-role-switcher';
import { NotificationDropdown } from '@/components/notification-dropdown';
import {
  Shield,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Palette,
  LogOut,
  LayoutDashboard,
  UserCheck,
} from 'lucide-react';

const adminNavItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/students', label: 'Scholars', icon: GraduationCap },
  { href: '/admin/team', label: 'Mentors & Trustees', icon: Users },
  { href: '/admin/content', label: 'Curriculum & Activities', icon: BookOpen },
  { href: '/admin/audit', label: 'Audit Log', icon: ClipboardList },
  { href: '/design-system', label: 'Design System', icon: Palette },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pb-20 md:pb-6">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-rose-500/30 bg-surface flex items-center justify-center p-1">
              <img
                src="/brand/mentora-logo.png"
                alt="Mentora Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-foreground">Mentora</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 uppercase tracking-wider">
                  Admin Owner
                </span>
              </div>
              <p className="text-[11px] text-muted -mt-0.5 hidden sm:block">VRCF Governance & Management</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-muted hover:text-foreground hover:bg-muted-bg'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Header items */}
          <div className="flex items-center gap-2 sm:gap-3">
            <NotificationDropdown />
            <ThemeToggle />

            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-foreground">{user?.full_name || 'Suhail Akthar'}</p>
                <p className="text-[10px] text-muted">suhailmobina95@gmail.com</p>
              </div>
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 animate-in fade-in duration-200">
        {children}
      </main>

      {/* Mobile Bottom Navigation for Admin */}
      <nav
        aria-label="Admin Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border px-2 py-1 shadow-2xl"
      >
        <div className="flex items-center justify-around">
          {adminNavItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`min-h-[48px] min-w-[48px] flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all ${
                  isActive ? 'text-rose-500 font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] mt-1 tracking-tight">{item.label.split(' ')[0]}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <DemoRoleSwitcher />
    </div>
  );
}
