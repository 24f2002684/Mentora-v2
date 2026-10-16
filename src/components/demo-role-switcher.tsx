"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/context';
import { UserCheck, Shield, GraduationCap, Users, Building, ChevronDown, Check } from 'lucide-react';

export function DemoRoleSwitcher() {
  const { role, user, switchDemoRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    {
      id: 'student' as const,
      label: 'Student',
      email: 'lakshana042006@gmail.com',
      name: 'Lakshana R (Cohort 1)',
      icon: GraduationCap,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      id: 'mentor' as const,
      label: 'Lead Mentor',
      email: 'ramkumar.skr01@gmail.com',
      name: 'Ramkumar SKR',
      icon: Users,
      color: 'text-sky-500',
      bg: 'bg-sky-500/10',
    },
    {
      id: 'trustee' as const,
      label: 'VRCF Trustee',
      email: 'trustee1@vrcf.org.in',
      name: 'Smt. Shanthi Ramaswami',
      icon: Building,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      id: 'admin' as const,
      label: 'Admin (Owner)',
      email: 'suhailmobina95@gmail.com',
      name: 'Suhail Akthar',
      icon: Shield,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
    },
  ];

  const currentRoleObj = roles.find((r) => r.id === role) || roles[0];

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="min-h-[44px] flex items-center gap-2.5 px-4 py-2 rounded-full mentora-card shadow-lg border border-primary/30 hover:border-primary transition-all bg-surface/95 backdrop-blur-md text-foreground text-sm font-medium"
          aria-expanded={isOpen}
          aria-label="Switch Demo User Role"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${role === 'admin' ? 'bg-rose-500' : role === 'mentor' ? 'bg-sky-500' : role === 'trustee' ? 'bg-amber-500' : 'bg-primary'} animate-pulse`} />
          <currentRoleObj.icon className={`w-4 h-4 ${currentRoleObj.color}`} />
          <span className="hidden sm:inline font-semibold text-xs tracking-wider uppercase text-muted">Role:</span>
          <span className="font-semibold text-foreground text-xs">{currentRoleObj.label}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 w-72 rounded-[20px] mentora-card p-2 shadow-2xl border border-border bg-surface animate-in fade-in slide-in-from-bottom-2">
            <div className="px-3 py-2 border-b border-border/50">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">Quick Role Preview</p>
              <p className="text-[11px] text-muted leading-tight mt-0.5">Switch active user view to test role permissions</p>
            </div>
            <div className="py-1 space-y-1">
              {roles.map((r) => {
                const isSelected = role === r.id;
                const IconComponent = r.icon;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      switchDemoRole(r.id, r.email);
                      setIsOpen(false);
                    }}
                    className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-[14px] text-left transition-colors ${
                      isSelected
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'hover:bg-muted-bg text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`p-1.5 rounded-full ${r.bg}`}>
                        <IconComponent className={`w-4 h-4 ${r.color}`} />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-foreground truncate">{r.name}</div>
                        <div className="text-[10px] text-muted truncate">{r.email}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-primary shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
