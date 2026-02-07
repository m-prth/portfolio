import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme, DesignSystem } from '../hooks/useTheme';

const ThemeSwitcher: React.FC = () => {
  const { designSystem, setDesignSystem, colorMode, toggleColorMode } = useTheme();

  const themes: { id: DesignSystem; label: string }[] = [
    { id: 'neo-brutalist', label: 'Neo' },
    { id: 'dark-minimal', label: 'Min' },
    { id: 'aurora', label: 'Aur' },
  ];

  return (
    <div className="fixed top-4 left-4 z-[60] flex items-center gap-2">
      {/* Design System Switcher */}
      <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-lg border border-black/10 dark:border-white/10 shadow-lg">
        {themes.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => setDesignSystem(theme.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-3 py-2 text-xs font-bold transition-all duration-200 ${
              theme.id === 'neo-brutalist'
                ? designSystem === theme.id
                  ? 'bg-neoYellow text-neoBlack border-2 border-neoBlack shadow-[2px_2px_0px_0px_#111]'
                  : 'bg-transparent text-neoBlack dark:text-neoWhite border-2 border-transparent hover:border-neoBlack dark:hover:border-neoWhite'
                : theme.id === 'dark-minimal'
                ? designSystem === theme.id
                  ? 'bg-white text-black rounded-full border border-white/20'
                  : 'bg-transparent text-zinc-500 rounded-full hover:text-white'
                : theme.id === 'aurora'
                ? designSystem === theme.id
                  ? 'bg-gradient-to-r from-auroraViolet/80 to-auroraSky/80 text-white rounded-full shadow-[0_0_20px_rgba(167,139,250,0.4)]'
                  : 'bg-transparent text-zinc-500 rounded-full hover:text-auroraViolet'
                : ''
            }`}
            title={`Switch to ${theme.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} theme`}
          >
            {/* Visual indicator for each theme */}
            {theme.id === 'neo-brutalist' && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-neoBlack dark:bg-neoWhite" />
                {theme.label}
              </span>
            )}
            {theme.id === 'dark-minimal' && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-current rounded-full" />
                {theme.label}
              </span>
            )}
            {theme.id === 'aurora' && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-gradient-to-r from-auroraViolet to-auroraSky rounded-full" />
                {theme.label}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Color Mode Toggle */}
      <motion.button
        onClick={toggleColorMode}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        className={`p-2 transition-all ${
          designSystem === 'neo-brutalist'
            ? 'bg-neoBlack dark:bg-neoWhite text-neoYellow dark:text-darkAccent border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm'
            : designSystem === 'dark-minimal'
            ? 'bg-zinc-900 text-white border border-white/10 rounded-full'
            : 'bg-white/60 dark:bg-white/10 backdrop-blur-sm text-zinc-700 dark:text-white border border-white/20 rounded-full shadow-aurora'
        }`}
        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      >
        {colorMode === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      </motion.button>
    </div>
  );
};

export default ThemeSwitcher;
