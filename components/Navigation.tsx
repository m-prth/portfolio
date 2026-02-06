import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { SectionId } from '../types';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { id: SectionId.About, label: 'About' },
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

  return (
    <nav className="fixed top-0 w-full z-50 border-b-4 border-neoBlack dark:border-neoWhite bg-neoYellow dark:bg-darkAccent transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="cursor-pointer bg-neoBlack dark:bg-neoWhite text-white dark:text-neoBlack px-4 py-2 font-display font-black text-xl tracking-tighter border-2 border-transparent hover:bg-white hover:text-neoBlack dark:hover:bg-neoBlack dark:hover:text-white hover:border-neoBlack dark:hover:border-neoWhite transition-colors shadow-neo-sm dark:shadow-neo-dark-sm"
          onClick={() => scrollToSection(SectionId.Hero)}
        >
          PARTH<span className="text-neoGreen"> MISTRY</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="px-4 py-2 font-bold text-neoBlack dark:text-neoWhite border-2 border-transparent hover:border-neoBlack dark:hover:border-neoWhite hover:bg-white dark:hover:bg-neoBlack hover:shadow-neo-sm dark:hover:shadow-neo-dark-sm transition-all active:translate-y-[2px] active:shadow-none uppercase tracking-wide text-sm"
            >
              {link.label}
            </button>
          ))}

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-neoBlack dark:bg-neoWhite text-neoYellow dark:text-darkAccent border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm hover:shadow-neo dark:hover:shadow-neo-dark transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>

          {/* Ctrl+K hint */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono font-bold text-neoBlack dark:text-neoWhite">
            <kbd className="px-2 py-1 bg-neoBlack dark:bg-neoWhite text-neoWhite dark:text-neoBlack border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm">
              Ctrl+K
            </kbd>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-neoBlack dark:bg-neoWhite text-neoYellow dark:text-darkAccent border-2 border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            className="p-2 border-2 border-neoBlack dark:border-neoWhite bg-white dark:bg-neoBlack shadow-neo-sm dark:shadow-neo-dark-sm active:shadow-none active:translate-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neoWhite dark:bg-neoBlack border-b-4 border-neoBlack dark:border-neoWhite flex flex-col shadow-neo-lg dark:shadow-neo-dark-lg transition-colors duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left px-8 py-4 text-xl font-black border-b-2 border-neoBlack dark:border-neoWhite last:border-b-0 hover:bg-neoPurple hover:text-white transition-colors uppercase"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
