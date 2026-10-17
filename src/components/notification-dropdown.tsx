"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth/context';
import {
  getUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '@/lib/mock/store';
import { NotificationItem } from '@/lib/types/database';
import {
  Bell,
  CheckCheck,
  GraduationCap,
  HeartHandshake,
  Award,
  Sparkles,
  Clock,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface NotificationDropdownProps {
  className?: string;
}

export function NotificationDropdown({ className = '' }: NotificationDropdownProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync notifications on mount and whenever user changes or open changes
  const refreshNotifications = () => {
    // If student, matches profile-student-1 or user.id
    // If mentor, matches mentor-ramkumar or user.id
    // If trustee, matches trustee-shanthi or user.id
    // If admin, matches admin-suhail or user.id
    let lookupId = user?.id;
    if (user?.role === 'student' && !lookupId) lookupId = 'profile-student-1';
    if (user?.role === 'mentor' && !lookupId) lookupId = 'mentor-ramkumar';
    if (user?.role === 'trustee' && !lookupId) lookupId = 'trustee-shanthi';
    if (user?.role === 'admin' && !lookupId) lookupId = 'admin-suhail';

    const list = getUserNotifications(lookupId);
    // If user has specific items, show those; otherwise show all platform items
    if (list.length > 0) {
      setNotifications(list);
    } else {
      setNotifications(getUserNotifications());
    }
  };

  useEffect(() => {
    refreshNotifications();
  }, [user, isOpen]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const handleMarkAsRead = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    markNotificationRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('mentor') || lower.includes('submission') || lower.includes('review')) {
      return <GraduationCap className="w-4 h-4 text-primary" />;
    }
    if (lower.includes('trustee') || lower.includes('encourag') || lower.includes('feedback')) {
      return <HeartHandshake className="w-4 h-4 text-amber-brand" />;
    }
    if (lower.includes('alert') || lower.includes('support') || lower.includes('check')) {
      return <ShieldAlert className="w-4 h-4 text-rose-500" />;
    }
    if (lower.includes('xp') || lower.includes('level') || lower.includes('badge')) {
      return <Award className="w-4 h-4 text-amber-brand" />;
    }
    return <Sparkles className="w-4 h-4 text-sky-500" />;
  };

  const formatRelativeTime = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-muted-bg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
        aria-label="Open notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-sm animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-[20px] bg-surface border border-border shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header */}
          <div className="p-4 border-b border-border bg-surface-raised/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-border px-4 bg-muted-bg/30 text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`py-2 px-3 font-semibold border-b-2 transition-colors ${
                filter === 'all'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('unread')}
              className={`py-2 px-3 font-semibold border-b-2 transition-colors ${
                filter === 'unread'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-border/60">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-muted-bg flex items-center justify-center mx-auto text-muted">
                  <CheckCircle2 className="w-6 h-6 text-emerald-brand" />
                </div>
                <p className="text-xs font-bold text-foreground">You are all caught up!</p>
                <p className="text-[11px] text-muted">
                  {filter === 'unread' ? 'No unread notifications.' : 'No notifications yet.'}
                </p>
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    handleMarkAsRead(n.id);
                    if (n.link) {
                      window.location.href = n.link;
                    }
                  }}
                  className={`p-4 transition-colors cursor-pointer hover:bg-muted-bg/50 flex items-start gap-3 relative ${
                    !n.read ? 'bg-primary/5' : ''
                  }`}
                >
                  {/* Category icon */}
                  <div className="w-8 h-8 rounded-full bg-surface-raised border border-border flex items-center justify-center shrink-0 mt-0.5">
                    {getNotificationIcon(n.title)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs ${!n.read ? 'font-bold text-foreground' : 'font-medium text-foreground/80'} truncate`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] text-muted shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelativeTime(n.created_at)}
                      </span>
                    </div>

                    <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
                      {n.body}
                    </p>

                    {n.link && (
                      <div className="pt-1 flex items-center gap-1 text-[10px] font-semibold text-primary">
                        <span>View details</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Unread dot */}
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 self-center" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-surface-raised/40 border-t border-border text-center">
            <span className="text-[10px] text-muted font-medium">
              Vasumathi Ramaswami Centenary Foundation
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
