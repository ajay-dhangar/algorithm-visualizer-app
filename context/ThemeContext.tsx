'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem('algorithm-visualizer-theme') as Theme | null;

      if (stored) {
        setTheme(stored);
        applyTheme(stored);
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme: Theme = isDark ? 'dark' : 'light';
        setTheme(initialTheme);
        applyTheme(initialTheme);
      }
    } catch (e) {
      console.log('[v0] Theme initialization error');
    }

    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    try {
      const html = document.documentElement;
      if (newTheme === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
      } else {
        html.classList.add('light');
        html.classList.remove('dark');
      }
    } catch (e) {
      console.log('[v0] Error applying theme');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem('algorithm-visualizer-theme', newTheme);
    } catch (e) {
      console.log('[v0] Error saving theme');
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: 'dark' as Theme, toggleTheme: () => {}, isDark: true };
  }
  return context;
}
