import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { SectionId } from '../types';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav className="fixed top-0 w-full z-50 border-b-4 border-neoBlack bg-neoYellow">
      <div className="container mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="cursor-pointer bg-neoBlack text-white px-4 py-2 font-display font-black text-xl tracking-tighter border-2 border-transparent hover:bg-white hover:text-neoBlack hover:border-neoBlack transition-colors shadow-neo-sm"
          onClick={() => scrollToSection(SectionId.Hero)}
        >
          PARTH<span className="text-neoGreen"> MISTRY</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="px-4 py-2 font-bold text-neoBlack border-2 border-transparent hover:border-neoBlack hover:bg-white hover:shadow-neo-sm transition-all active:translate-y-[2px] active:shadow-none uppercase tracking-wide text-sm"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 border-2 border-neoBlack bg-white shadow-neo-sm active:shadow-none active:translate-y-1" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neoWhite border-b-4 border-neoBlack flex flex-col shadow-neo-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left px-8 py-4 text-xl font-black border-b-2 border-neoBlack last:border-b-0 hover:bg-neoPurple hover:text-white transition-colors uppercase"
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