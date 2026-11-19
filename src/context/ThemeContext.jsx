import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('unitbv_theme_preference') || 'dark';
  });

  const [effectiveTheme, setEffectiveTheme] = useState(() => {
    const saved = localStorage.getItem('unitbv_theme_preference');
    if (saved === 'light') return 'light';
    if (saved === 'dark') return 'dark';
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) return 'light';
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = () => {
      let isDark = true;
      if (theme === 'system') {
        isDark = media.matches;
      } else {
        isDark = theme === 'dark';
      }

      setEffectiveTheme(isDark ? 'dark' : 'light');
      if (isDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };

    apply();
    localStorage.setItem('unitbv_theme_preference', theme);

    if (theme === 'system') {
      media.addEventListener('change', apply);
      return () => media.removeEventListener('change', apply);
    }
  }, [theme]);

  const setTheme = (t) => setThemeState(t);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
