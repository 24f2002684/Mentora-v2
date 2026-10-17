"use client";

import React, { useState, useEffect } from 'react';
import {
  WifiOff,
  Wifi,
  Download,
  X,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';

export function PwaBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const [justCameOnline, setJustCameOnline] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Service Worker Registration
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Mentora Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('Mentora Service Worker registration failed:', err);
        });
    }

    // 2. Connectivity Listeners
    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);

      const handleOnline = () => {
        setIsOffline(false);
        setJustCameOnline(true);
        setTimeout(() => setJustCameOnline(false), 4000);
      };

      const handleOffline = () => {
        setIsOffline(true);
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // 3. PWA Install Prompt Listener
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        // Only show if not previously dismissed in session
        const dismissed = sessionStorage.getItem('pwa_install_dismissed');
        if (!dismissed) {
          setShowInstallBanner(true);
        }
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstall);

      window.addEventListener('appinstalled', () => {
        setIsInstalled(true);
        setShowInstallBanner(false);
        setDeferredPrompt(null);
      });

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismissInstall = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('pwa_install_dismissed', 'true');
  };

  return (
    <>
      {/* Offline Alert Strip */}
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          className="sticky top-0 z-50 bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-md flex items-center justify-between gap-3 animate-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
            <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
            <span>
              You are offline. Running in offline mode with cached leadership toolkit.
            </span>
            <a
              href="/offline"
              className="ml-auto underline hover:opacity-80 text-[11px] font-extrabold uppercase shrink-0"
            >
              Open Offline Toolkit →
            </a>
          </div>
        </div>
      )}

      {/* Back Online Toast */}
      {justCameOnline && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-[16px] shadow-2xl text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200"
        >
          <Wifi className="w-4 h-4" />
          <span>Back online! Reconnected to Mentora cloud.</span>
        </div>
      )}

      {/* PWA Install Banner */}
      {showInstallBanner && !isInstalled && (
        <div className="fixed bottom-24 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 p-4 rounded-[20px] bg-surface border border-primary/30 shadow-2xl animate-in slide-in-from-bottom-4 duration-200 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-primary/30 bg-surface-raised flex items-center justify-center p-1 shrink-0">
                <img
                  src="/brand/mentora-logo.png"
                  alt="Mentora"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-foreground">
                  Install Mentora App
                </h4>
                <p className="text-[11px] text-muted">
                  Fast mobile access, offline mode & push updates
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDismissInstall}
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted hover:text-foreground hover:bg-muted-bg"
              aria-label="Dismiss app install banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex-1 mentora-btn-primary text-xs py-2 flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
            <button
              type="button"
              onClick={handleDismissInstall}
              className="mentora-btn-secondary text-xs px-3 py-2"
            >
              Not now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
