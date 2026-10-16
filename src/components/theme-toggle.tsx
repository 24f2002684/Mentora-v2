"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center opacity-50 ${className}`}>
        <Sun className="w-4 h-4 text-muted" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center transition-colors border border-border hover:border-primary hover:bg-surface-tint text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-primary transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="w-5 h-5 text-muted transition-transform rotate-0 scale-100" />
      )}
    </button>
  );
}
