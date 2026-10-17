"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth/context';
import {
  getMockStore,
  getStudentChatThreads,
  getThreadMessages,
  createChatThread,
  renameChatThread,
  deleteChatThread,
  clearChatThreadMessages,
  getDailyChatQuota,
} from '@/lib/mock/store';
import { ChatThread, ChatMessage } from '@/lib/types/database';
import {
  Bot,
  Sparkles,
  Send,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Copy,
  CheckCheck,
  RefreshCw,
  AlertCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Flame,
  ArrowRight,
} from 'lucide-react';

const STARTER_PROMPTS = [
  {
    title: 'Break down goals into weekly tasks',
    prompt: 'Help me break down my active semester goal into 3 concrete, weekly first-principles tasks.',
    tag: 'Goal Execution',
  },
  {
    title: 'Overcoming study & exam overwhelm',
    prompt: 'I am feeling overwhelmed by college semester exams and my foundation assignments. How should I prioritize?',
    tag: 'Emotional Clarity',
  },
  {
    title: 'Practicing daily analytical thinking',
    prompt: 'How can I practice analytical thinking and root-cause inquiry in my everyday college routine?',
    tag: 'Competency Growth',
  },
];

export default function StudentAIMentorPage() {
  const { user } = useAuth();
  const store = getMockStore();

  const student = store.students.find(
    (s) => s.profile?.email === user?.email || s.id === 'student-1'
  ) || store.students[0];

  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [liveStreamText, setLiveStreamText] = useState('');
  const [quota, setQuota] = useState({ used: 6, remaining: 24, max: 30 });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Thread management state
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState('');
  const [threadToDelete, setThreadToDelete] = useState<ChatThread | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load threads on mount
  useEffect(() => {
    refreshThreads();
  }, [student.id]);

  const refreshThreads = () => {
    const studentThreads = getStudentChatThreads(student.id);
    setThreads(studentThreads);

    if (studentThreads.length > 0) {
      if (!activeThreadId || !studentThreads.some((t) => t.id === activeThreadId)) {
        selectThread(studentThreads[0].id);
      } else {
        setMessages(getThreadMessages(activeThreadId));
      }
    } else {
      // Create first thread if none exist
      const newT = createChatThread(student.id, 'Analytical Frameworks for Semester Projects');
      setThreads([newT]);
      setActiveThreadId(newT.id);
      setMessages([]);
    }

    setQuota(getDailyChatQuota(student.id));
  };

  const selectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setMessages(getThreadMessages(threadId));
    setLiveStreamText('');
    setMobileSidebarOpen(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, liveStreamText, isStreaming]);

  // Handle textarea resize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  };

  // Create new thread
  const handleNewThread = () => {
    const newT = createChatThread(student.id, 'New Mentorship Dialogue');
    setThreads([newT, ...threads]);
    selectThread(newT.id);
  };

  // Start renaming thread
  const startRenameThread = (thread: ChatThread, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingThreadId(thread.id);
    setEditTitleInput(thread.title);
  };

  // Save renamed thread
  const saveRenameThread = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingThreadId && editTitleInput.trim()) {
      renameChatThread(editingThreadId, editTitleInput.trim());
      setThreads(getStudentChatThreads(student.id));
      setEditingThreadId(null);
    }
  };

  // Delete thread confirm
  const confirmDeleteThread = () => {
    if (threadToDelete) {
      deleteChatThread(threadToDelete.id);
      const remaining = getStudentChatThreads(student.id);
      setThreads(remaining);
      setThreadToDelete(null);
      if (remaining.length > 0) {
        selectThread(remaining[0].id);
      } else {
        handleNewThread();
      }
    }
  };

  // Clear chat messages confirm
  const confirmClearChat = () => {
    if (activeThreadId) {
      clearChatThreadMessages(activeThreadId);
      setMessages([]);
      setShowClearModal(false);
    }
  };

  // Copy AI message
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content || isStreaming) return;

    if (quota.remaining <= 0) {
      alert('You have reached your daily limit of 30 messages. It resets tonight at midnight.');
      return;
    }

    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Optimistic user message in UI
    const optimisticUserMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      thread_id: activeThreadId,
      role: 'user',
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticUserMsg]);
    setIsStreaming(true);
    setLiveStreamText('');

    try {
      const response = await fetch('/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          threadId: activeThreadId,
          studentId: student.id,
          message: content,
          history: messages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to communicate with Mentora AI.');
      }

      // Read streaming chunks
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;
          setLiveStreamText(accumulated);
        }
      }

      // Update quota from response header if available
      const remainingHeader = response.headers.get('X-Remaining-Quota');
      if (remainingHeader) {
        const rem = parseInt(remainingHeader, 10);
        setQuota((q) => ({ ...q, remaining: rem, used: q.max - rem }));
      } else {
        setQuota(getDailyChatQuota(student.id));
      }

      // Sync fresh messages from store
      setMessages(getThreadMessages(activeThreadId));
      setLiveStreamText('');
      setThreads(getStudentChatThreads(student.id));
    } catch (err: unknown) {
      console.error(err);
      const fallbackText = `I hear how important this is to your development. What is the fundamental assumption you are making here, and how would you test it with one small step today?`;
      setLiveStreamText('');
      setMessages(getThreadMessages(activeThreadId));
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Group threads by date
  const now = new Date();
  const todayDateStr = now.toISOString().split('T')[0];
  const yesterday = new Date(now.getTime() - 86400000).toISOString().split('T')[0];
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);

  const groupedThreads: { label: string; items: ChatThread[] }[] = [
    {
      label: 'Today',
      items: threads.filter((t) => t.created_at.startsWith(todayDateStr)),
    },
    {
      label: 'Yesterday',
      items: threads.filter((t) => t.created_at.startsWith(yesterday)),
    },
    {
      label: 'Previous 7 Days',
      items: threads.filter((t) => {
        const d = new Date(t.created_at);
        return d < new Date(yesterday) && d >= sevenDaysAgo;
      }),
    },
    {
      label: 'Older Dialogues',
      items: threads.filter((t) => new Date(t.created_at) < sevenDaysAgo),
    },
  ].filter((g) => g.items.length > 0);

  const activeThread = threads.find((t) => t.id === activeThreadId);

  return (
    <div className="flex h-[calc(100vh-8rem)] max-w-6xl mx-auto rounded-[20px] border border-border bg-surface overflow-hidden shadow-sm relative">
      {/* 1. Left Sidebar: Threads List */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-surface-raised border-r border-border flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-foreground">Mentora AI</span>
              <p className="text-[10px] text-muted">Socratic Dialogue Partner</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 text-muted hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            type="button"
            onClick={handleNewThread}
            className="w-full mentora-btn-primary text-xs py-2.5 justify-center shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Mentorship Chat
          </button>
        </div>

        {/* Threads Grouped List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 text-xs">
          {groupedThreads.map((group) => (
            <div key={group.label} className="space-y-1">
              <span className="px-2 text-[10px] font-bold text-muted uppercase tracking-wider">
                {group.label}
              </span>
              <div className="space-y-1">
                {group.items.map((thread) => {
                  const isActive = thread.id === activeThreadId;
                  const isEditing = editingThreadId === thread.id;

                  return (
                    <div
                      key={thread.id}
                      onClick={() => selectThread(thread.id)}
                      className={`group relative flex items-center justify-between px-3 py-2.5 rounded-[12px] cursor-pointer transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                          : 'text-muted hover:text-foreground hover:bg-surface-tint'
                      }`}
                    >
                      {isEditing ? (
                        <div
                          className="flex items-center gap-1.5 w-full"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="text"
                            autoFocus
                            value={editTitleInput}
                            onChange={(e) => setEditTitleInput(e.target.value)}
                            className="w-full bg-surface text-foreground border border-border px-2 py-1 rounded text-xs"
                          />
                          <button
                            type="button"
                            onClick={saveRenameThread}
                            className="p-1 hover:text-emerald-500"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingThreadId(null)}
                            className="p-1 hover:text-rose-500"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 min-w-0">
                            <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
                            <span className="truncate max-w-[145px]">{thread.title}</span>
                          </div>

                          {/* Quick action buttons */}
                          <div
                            className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                              isActive ? 'opacity-100' : ''
                            }`}
                          >
                            <button
                              type="button"
                              onClick={(e) => startRenameThread(thread, e)}
                              className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 ${
                                isActive ? 'text-primary-foreground' : 'text-muted hover:text-foreground'
                              }`}
                              title="Rename thread"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setThreadToDelete(thread);
                              }}
                              className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 ${
                                isActive ? 'text-primary-foreground' : 'text-muted hover:text-rose-500'
                              }`}
                              title="Delete thread"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Quota Information */}
        <div className="p-4 border-t border-border bg-surface text-xs space-y-1.5">
          <div className="flex items-center justify-between font-bold">
            <span className="text-muted text-[11px]">Daily AI Quota</span>
            <span className="text-primary text-[11px]">
              {quota.remaining} / {quota.max} left
            </span>
          </div>
          <div className="w-full bg-muted-bg rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(quota.remaining / quota.max) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-muted">
            Protects platform sustainability. Resets every midnight.
          </p>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-xs"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 2. Main Chat Conversation Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        {/* Chat Header */}
        <div className="h-16 px-4 sm:px-6 border-b border-border flex items-center justify-between bg-surface-raised/40 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-border text-muted hover:text-foreground hover:bg-muted-bg"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-foreground truncate">
                  {activeThread?.title || 'Mentora Dialogue Partner'}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="w-3 h-3" />
                  Socratic Mode
                </span>
              </div>
              <p className="text-[11px] text-muted truncate">
                First-principles inquiry • Language adaptive (EN/TA) • Socratic reflection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="mentora-btn-secondary text-xs px-3 py-1.5 text-muted hover:text-rose-500"
                title="Clear conversation messages"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
            )}
          </div>
        </div>

        {/* Messages Stream View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.length === 0 && !liveStreamText && !isStreaming ? (
            /* Empty State & Starter Prompts */
            <div className="h-full flex flex-col justify-center items-center max-w-lg mx-auto text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shadow-xs">
                <Bot className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-foreground">
                  Hello {student.name.split(' ')[0]}, I&apos;m Mentora.
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  I am your AI Socratic mentor. Rather than just giving quick answers, I will help you
                  think clearly from first principles, structure your college priorities, and develop
                  lifelong leadership confidence.
                </p>
              </div>

              {/* Starter Chips */}
              <div className="w-full space-y-2 text-left pt-2">
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider px-1">
                  Suggested Prompts to Begin
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {STARTER_PROMPTS.map((starter, idx) => (
                    <button
                      type="button"
                      key={idx}
                      id={`starter-prompt-${idx}`}
                      onClick={() => {
                        setInputText(starter.prompt);
                        handleSendMessage(starter.prompt);
                      }}
                      className="p-3.5 rounded-[14px] border border-border bg-surface-raised hover:border-primary/50 hover:bg-surface-tint text-left transition-all group flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {starter.tag}
                        </span>
                        <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors pt-1">
                          {starter.prompt}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-1 shadow-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-[18px] p-4 text-sm leading-relaxed transition-all shadow-xs ${
                        isUser
                          ? 'bg-primary text-primary-foreground rounded-tr-xs font-medium'
                          : 'bg-surface-raised border border-border text-foreground rounded-tl-xs'
                      }`}
                    >
                      {/* Markdown text representation */}
                      <div className="whitespace-pre-wrap space-y-2">
                        {msg.content}
                      </div>

                      {/* AI Message Footer with Copy Action */}
                      {!isUser && (
                        <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted">
                          <span className="flex items-center gap-1 font-semibold text-primary">
                            <Sparkles className="w-3 h-3" />
                            Mentora AI
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted-bg text-muted hover:text-foreground transition-colors"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <CheckCheck className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500 font-bold">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="w-8 h-8 rounded-full bg-surface-tint border border-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-1">
                        {student.name.charAt(0)}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Live Streaming Message Bubble */}
              {isStreaming && (
                <div className="flex items-start gap-3 justify-start animate-in fade-in">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>

                  <div className="max-w-[85%] sm:max-w-[75%] rounded-[18px] rounded-tl-xs p-4 text-sm leading-relaxed bg-surface-raised border border-border text-foreground shadow-xs">
                    {liveStreamText ? (
                      <div className="whitespace-pre-wrap">{liveStreamText}</div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted text-xs py-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        <span>Mentora is formulating a Socratic reflection...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* 3. Input Message Area */}
        <div className="p-3 sm:p-4 border-t border-border bg-surface-raised/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2 max-w-4xl mx-auto bg-surface border border-border focus-within:border-primary/60 rounded-[18px] p-2 shadow-xs transition-all"
          >
            <textarea
              id="chat-textarea"
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder={
                quota.remaining <= 0
                  ? 'Daily limit of 30 messages reached. Resets at midnight.'
                  : 'Ask Mentora a dilemma, goal question, or leadership challenge...'
              }
              className="flex-1 bg-transparent border-0 resize-none text-sm p-2 focus:ring-0 text-foreground placeholder:text-muted disabled:opacity-50 max-h-32 focus:outline-hidden"
            />

            <button
              id="chat-send-btn"
              type="submit"
              disabled={!inputText.trim() || isStreaming || quota.remaining <= 0}
              className="mentora-btn-primary p-2.5 rounded-[12px] shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
              title="Send message (Enter)"
            >
              {isStreaming ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] text-muted max-w-4xl mx-auto px-2 pt-2">
            <span>
              Press <kbd className="px-1.5 py-0.5 bg-muted-bg rounded text-foreground font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-muted-bg rounded text-foreground font-mono">Shift+Enter</kbd> for new line
            </span>
            <span className="font-semibold text-primary">
              {quota.remaining} messages remaining today
            </span>
          </div>
        </div>
      </div>

      {/* 4. Delete Thread Modal */}
      {threadToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[20px] max-w-sm w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-500">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-foreground">Delete Conversation?</h3>
                <p className="text-xs text-muted">This dialogue cannot be recovered.</p>
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              Are you sure you want to delete &ldquo;{threadToDelete.title}&rdquo; and all of its messages?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setThreadToDelete(null)}
                className="mentora-btn-secondary text-xs px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteThread}
                className="px-4 py-2 rounded-full text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors"
              >
                Delete Thread
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Clear Chat Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-[20px] max-w-sm w-full p-6 space-y-4 shadow-xl animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-amber-500">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-foreground">Clear Messages?</h3>
                <p className="text-xs text-muted">Reset current dialogue history.</p>
              </div>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              This will remove all messages in &ldquo;{activeThread?.title}&rdquo;. You can start a fresh Socratic discussion immediately.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="mentora-btn-secondary text-xs px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmClearChat}
                className="px-4 py-2 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
              >
                Clear Messages
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
