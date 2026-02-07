import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import React from 'react';

export type DesignSystem = 'neo-brutalist' | 'dark-minimal' | 'aurora';
export type ColorMode = 'light' | 'dark';

interface ThemeContextType {
  designSystem: DesignSystem;
  colorMode: ColorMode;
  setDesignSystem: (ds: DesignSystem) => void;
  toggleColorMode: () => void;
  // Legacy support
  theme: ColorMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [designSystem, setDesignSystemState] = useState<DesignSystem>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('designSystem') as DesignSystem | null;
      if (stored === 'neo-brutalist' || stored === 'dark-minimal' || stored === 'aurora') {
        return stored;
      }
    }
    return 'neo-brutalist';
  });

  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('colorMode') as ColorMode | null;
      if (stored === 'light' || stored === 'dark') return stored;

      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Remove all design system classes
    root.classList.remove('neo-brutalist', 'dark-minimal', 'aurora');

    // Add current design system class
    root.classList.add(designSystem);

    // Handle color mode
    if (colorMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist to localStorage
    localStorage.setItem('designSystem', designSystem);
    localStorage.setItem('colorMode', colorMode);

    // Also persist legacy theme key for compatibility
    localStorage.setItem('theme', colorMode);
  }, [designSystem, colorMode]);

  const setDesignSystem = (ds: DesignSystem) => {
    setDesignSystemState(ds);
  };

  const toggleColorMode = () => {
    setColorMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return React.createElement(
    ThemeContext.Provider,
    {
      value: {
        designSystem,
        colorMode,
        setDesignSystem,
        toggleColorMode,
        // Legacy support
        theme: colorMode,
        toggleTheme: toggleColorMode
      }
    },
    children
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
