'use client';

import type React from 'react';

import {
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';

interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<IThemeContext>({
  isDark: false,
  toggleTheme: () => {},
  mounted: false,
});

export const useTheme = () => useContext<IThemeContext>(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme') ?? 'light';
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const shouldBeDark = theme === 'dark' || (theme === 'auto' && prefersDark);

    setIsDark(shouldBeDark);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');

    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider
      value={{ isDark: isDark, toggleTheme: toggleTheme, mounted: mounted }}
    >
      {children}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const theme = localStorage.getItem('theme') ?? 'light'
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const isDark = theme === 'dark' || (theme === 'auto' && prefersDark)
            if (isDark) document.documentElement.classList.add('dark')
          `,
        }}
      />
    </ThemeContext.Provider>
  );
}
