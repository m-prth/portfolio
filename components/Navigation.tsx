import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { SectionId } from '../types';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { getNavStyles, getNavLinkStyles, showWindowChrome } from '../utils/themeStyles';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { designSystem, theme, toggleTheme } = useTheme();

  const navLinks = [
    { id: SectionId.Hero, label: 'About' },
    { id: SectionId.Experience, label: 'XP' },
    { id: SectionId.Projects, label: 'Works' },
    { id: SectionId.Gallery, label: 'Photos' },
    { id: SectionId.Contact, label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Theme-specific classes
  const navClasses = getNavStyles(designSystem);
  const linkClasses = getNavLinkStyles(designSystem);

  // Logo styles per theme
  const getLogoStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoBlack dark:bg-neoWhite text-white dark:text-neoBlack px-4 py-2 font-display font-black text-xl tracking-tighter border-2 border-transparent hover:bg-white hover:text-neoBlack dark:hover:bg-neoBlack dark:hover:text-white hover:border-neoBlack dark:hover:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm';
      case 'dark-minimal':
        return 'text-white font-serif text-2xl tracking-tight';
      case 'aurora':
        return 'text-zinc-900 dark:text-white font-aurora-display text-2xl';
      default:
        return '';
    }
  };

  // Theme toggle button styles per theme
  const getThemeToggleStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'p-3 bg-neoBlack dark:bg-neoWhite text-neoYellow dark:text-darkAccent border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm hover:shadow-neo dark:hover:shadow-neo-dark';
      case 'dark-minimal':
        return 'p-2 text-zinc-400 hover:text-white border border-white/10 rounded-full hover:bg-white/10';
      case 'aurora':
        return 'p-2 bg-white/50 dark:bg-white/10 backdrop-blur-sm text-zinc-600 dark:text-white border border-white/20 rounded-full hover:bg-white/80 dark:hover:bg-white/20';
      default:
        return '';
    }
  };

  // Mobile menu button styles
  const getMobileMenuButtonStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'p-2 border-2 border-neoBlack dark:border-neoWhite bg-white dark:bg-neoBlack shadow-neo-sm dark:shadow-neo-dark-sm active:shadow-none active:translate-y-1';
      case 'dark-minimal':
        return 'p-2 text-white border border-white/10 rounded-md hover:bg-white/10';
      case 'aurora':
        return 'p-2 bg-white/50 dark:bg-white/10 backdrop-blur-sm text-zinc-600 dark:text-white border border-white/20 rounded-lg';
      default:
        return '';
    }
  };

  // Mobile menu container styles
  const getMobileMenuStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoWhite dark:bg-neoBlack border-b-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg';
      case 'dark-minimal':
        return 'bg-black border-b border-white/10';
      case 'aurora':
        return 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-white/20';
      default:
        return '';
    }
  };

  // Mobile link styles
  const getMobileLinkStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'text-xl font-black border-b-2 border-neoBlack dark:border-neoWhite last:border-b-0 hover:bg-neoPurple hover:text-white uppercase';
      case 'dark-minimal':
        return 'text-lg font-medium text-zinc-400 hover:text-white border-b border-white/5 last:border-b-0';
      case 'aurora':
        return 'text-lg font-medium text-zinc-600 dark:text-zinc-300 hover:text-auroraViolet border-b border-white/10 last:border-b-0';
      default:
        return '';
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${navClasses}`}>
      <div className="container mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={designSystem === 'neo-brutalist' ? { scale: 1.05, rotate: -2 } : { scale: 1.02 }}
          className={`cursor-pointer transition-colors ${getLogoStyles()}`}
          onClick={() => scrollToSection(SectionId.Hero)}
        >
          {designSystem === 'neo-brutalist' ? (
            <>PARTH<span className="text-neoGreen"> MISTRY</span></>
          ) : designSystem === 'dark-minimal' ? (
            <span className="italic">Parth Mistry</span>
          ) : (
            <span>Parth Mistry</span>
          )}
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`px-4 py-2 transition-all active:translate-y-[2px] ${linkClasses}`}
            >
              {designSystem === 'neo-brutalist' ? link.label : link.label.toLowerCase()}
            </button>
          ))}

          {/* Theme Toggle Button (moved to ThemeSwitcher, but keeping minimal version for some themes) */}
          {designSystem !== 'neo-brutalist' && (
            <motion.button
              onClick={toggleTheme}
              whileHover={designSystem === 'neo-brutalist' ? { scale: 1.1, rotate: 180 } : { scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`transition-all ${getThemeToggleStyles()}`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.button>
          )}

          {/* Ctrl+K hint - only for neo-brutalist */}
          {designSystem === 'neo-brutalist' && (
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono font-bold text-neoBlack dark:text-neoWhite">
              <kbd className="px-2 py-1 bg-neoBlack dark:bg-neoWhite text-neoWhite dark:text-neoBlack border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm">
                Ctrl+K
              </kbd>
            </div>
          )}

          {designSystem === 'dark-minimal' && (
            <div className="hidden lg:flex items-center text-xs text-zinc-500">
              <kbd className="px-2 py-1 border border-white/10 rounded text-zinc-400">
                ⌘K
              </kbd>
            </div>
          )}

          {designSystem === 'aurora' && (
            <div className="hidden lg:flex items-center text-xs text-zinc-400">
              <kbd className="px-2 py-1 bg-white/50 dark:bg-white/10 backdrop-blur-sm border border-white/20 rounded-md">
                ⌘K
              </kbd>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Theme Toggle - only for non-neo themes since ThemeSwitcher is in corner */}
          {designSystem !== 'neo-brutalist' && (
            <button
              onClick={toggleTheme}
              className={`${getThemeToggleStyles()}`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          )}

          <button
            className={`${getMobileMenuButtonStyles()}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full flex flex-col transition-colors duration-300 ${getMobileMenuStyles()}`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-left px-8 py-4 transition-colors ${getMobileLinkStyles()}`}
            >
              {designSystem === 'neo-brutalist' ? link.label : link.label.toLowerCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
