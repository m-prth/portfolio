import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronRight, Home, Briefcase, Code, Camera, Mail, Terminal, Download, Moon, Sun, Lightbulb, User, Palette } from 'lucide-react';
import { SectionId } from '../types';
import { useTheme, DesignSystem } from '../hooks/useTheme';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  onOpenChat?: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onOpenChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { designSystem, theme, toggleTheme, setDesignSystem } = useTheme();

  // Scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Download resume
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.download = 'Parth_Mistry_Resume.pdf';
    link.click();
    setIsOpen(false);
  };

  // Define commands
  const commands: Command[] = useMemo(() => [
    {
      id: 'nav-home',
      label: designSystem === 'neo-brutalist' ? 'Go to Home' : 'home',
      description: 'Navigate to hero section',
      icon: <Home size={18} />,
      action: () => scrollToSection(SectionId.Hero),
      keywords: ['home', 'top', 'hero', 'start']
    },
    {
      id: 'nav-about',
      label: designSystem === 'neo-brutalist' ? 'Go to About' : 'about',
      description: 'Learn about me',
      icon: <User size={18} />,
      action: () => scrollToSection(SectionId.Hero),
      keywords: ['about', 'bio', 'me', 'info']
    },
    {
      id: 'nav-experience',
      label: designSystem === 'neo-brutalist' ? 'Go to Experience' : 'experience',
      description: 'View work experience',
      icon: <Briefcase size={18} />,
      action: () => scrollToSection(SectionId.Experience),
      keywords: ['experience', 'work', 'jobs', 'career', 'xp']
    },
    {
      id: 'nav-skills',
      label: designSystem === 'neo-brutalist' ? 'Go to Skills' : 'skills',
      description: 'View technical skills',
      icon: <Lightbulb size={18} />,
      action: () => scrollToSection(SectionId.Skills),
      keywords: ['skills', 'technologies', 'tech', 'tools']
    },
    {
      id: 'nav-projects',
      label: designSystem === 'neo-brutalist' ? 'Go to Projects' : 'projects',
      description: 'View portfolio projects',
      icon: <Code size={18} />,
      action: () => scrollToSection(SectionId.Projects),
      keywords: ['projects', 'works', 'portfolio', 'code']
    },
    {
      id: 'nav-gallery',
      label: designSystem === 'neo-brutalist' ? 'Go to Gallery' : 'gallery',
      description: 'View photography',
      icon: <Camera size={18} />,
      action: () => scrollToSection(SectionId.Gallery),
      keywords: ['gallery', 'photos', 'images', 'photography', 'clicks']
    },
    {
      id: 'nav-contact',
      label: designSystem === 'neo-brutalist' ? 'Go to Contact' : 'contact',
      description: 'Get in touch',
      icon: <Mail size={18} />,
      action: () => scrollToSection(SectionId.Contact),
      keywords: ['contact', 'email', 'reach', 'social']
    },
    {
      id: 'action-theme',
      label: theme === 'light' ? (designSystem === 'neo-brutalist' ? 'Switch to Dark Mode' : 'dark mode') : (designSystem === 'neo-brutalist' ? 'Switch to Light Mode' : 'light mode'),
      description: 'Toggle dark/light theme',
      icon: theme === 'light' ? <Moon size={18} /> : <Sun size={18} />,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
      keywords: ['theme', 'dark', 'light', 'mode', 'color']
    },
    {
      id: 'action-design-neo',
      label: designSystem === 'neo-brutalist' ? 'Switch to Neo-Brutalist' : 'neo-brutalist theme',
      description: 'Bold, hard shadows, thick borders',
      icon: <Palette size={18} />,
      action: () => {
        setDesignSystem('neo-brutalist');
        setIsOpen(false);
      },
      keywords: ['theme', 'neo', 'brutalist', 'bold']
    },
    {
      id: 'action-design-minimal',
      label: designSystem === 'neo-brutalist' ? 'Switch to Dark Minimal' : 'dark minimal theme',
      description: 'Elegant, monochrome, no shadows',
      icon: <Palette size={18} />,
      action: () => {
        setDesignSystem('dark-minimal');
        setIsOpen(false);
      },
      keywords: ['theme', 'dark', 'minimal', 'elegant']
    },
    {
      id: 'action-design-aurora',
      label: designSystem === 'neo-brutalist' ? 'Switch to Aurora' : 'aurora theme',
      description: 'Glassmorphism, gradients, soft glows',
      icon: <Palette size={18} />,
      action: () => {
        setDesignSystem('aurora');
        setIsOpen(false);
      },
      keywords: ['theme', 'aurora', 'glass', 'gradient']
    },
    {
      id: 'action-chat',
      label: designSystem === 'neo-brutalist' ? 'Open AI Assistant' : 'ai assistant',
      description: 'Chat with portfolio assistant',
      icon: <Terminal size={18} />,
      action: () => {
        if (onOpenChat) onOpenChat();
        setIsOpen(false);
      },
      keywords: ['chat', 'ai', 'assistant', 'help', 'terminal']
    },
    {
      id: 'action-resume',
      label: designSystem === 'neo-brutalist' ? 'Download Resume' : 'download resume',
      description: 'Download PDF resume',
      icon: <Download size={18} />,
      action: downloadResume,
      keywords: ['resume', 'cv', 'download', 'pdf']
    }
  ], [theme, toggleTheme, onOpenChat, designSystem, setDesignSystem]);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;

    const lowerQuery = query.toLowerCase();
    return commands.filter(cmd =>
      cmd.label.toLowerCase().includes(lowerQuery) ||
      cmd.description?.toLowerCase().includes(lowerQuery) ||
      cmd.keywords?.some(kw => kw.includes(lowerQuery))
    );
  }, [query, commands]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to toggle
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
      }

      // Arrow navigation when open
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
        }
        if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto-scroll to selected item
  useEffect(() => {
    if (isOpen && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex, isOpen]);

  // Theme-specific styles
  const getBackdropStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoBlack/60 dark:bg-neoWhite/10 backdrop-blur-sm';
      case 'dark-minimal':
        return 'bg-black/80 backdrop-blur-md';
      case 'aurora':
        return 'bg-black/60 backdrop-blur-xl';
      default:
        return '';
    }
  };

  const getModalStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg';
      case 'dark-minimal':
        return 'bg-zinc-900 border border-white/10 rounded-xl';
      case 'aurora':
        return 'glass-card';
      default:
        return '';
    }
  };

  const getHeaderStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoBlack dark:bg-neoWhite p-3 border-b-4 border-neoBlack dark:border-neoWhite';
      case 'dark-minimal':
        return 'p-3 border-b border-white/10';
      case 'aurora':
        return 'p-3 border-b border-white/10';
      default:
        return '';
    }
  };

  const getInputStyles = () => {
    switch (designSystem) {
      case 'neo-brutalist':
        return 'bg-neoWhite dark:bg-neoBlack text-neoBlack dark:text-neoWhite font-mono font-bold focus:bg-neoYellow/20 dark:focus:bg-darkAccent/20';
      case 'dark-minimal':
        return 'bg-transparent text-white font-medium focus:outline-none';
      case 'aurora':
        return 'bg-transparent text-zinc-900 dark:text-white font-medium focus:outline-none';
      default:
        return '';
    }
  };

  const getCommandItemStyles = (isSelected: boolean) => {
    switch (designSystem) {
      case 'neo-brutalist':
        return isSelected
          ? 'bg-neoPurple text-white border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm translate-x-1'
          : 'bg-white dark:bg-neoBlack text-neoBlack dark:text-neoWhite border-transparent hover:border-neoBlack dark:hover:border-neoWhite';
      case 'dark-minimal':
        return isSelected
          ? 'bg-white/10 text-white border-white/20'
          : 'bg-transparent text-zinc-400 border-transparent hover:text-white hover:bg-white/5';
      case 'aurora':
        return isSelected
          ? 'bg-gradient-to-r from-auroraViolet/20 to-auroraSky/20 text-zinc-900 dark:text-white border-white/20'
          : 'bg-transparent text-zinc-600 dark:text-zinc-400 border-transparent hover:bg-white/10';
      default:
        return '';
    }
  };

  const getIconContainerStyles = (isSelected: boolean) => {
    switch (designSystem) {
      case 'neo-brutalist':
        return isSelected
          ? 'bg-white text-neoPurple border-white'
          : 'bg-gray-100 dark:bg-gray-800 text-neoBlack dark:text-neoWhite border-neoBlack dark:border-neoWhite';
      case 'dark-minimal':
        return 'text-current';
      case 'aurora':
        return isSelected
          ? 'text-auroraViolet'
          : 'text-current';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] ${getBackdropStyles()}`}
            onClick={() => setIsOpen(false)}
          />

          {/* Command Palette Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`overflow-hidden ${getModalStyles()}`}>

              {/* Window Chrome Header - only for neo-brutalist */}
              {designSystem === 'neo-brutalist' && (
                <div className={`flex justify-between items-center ${getHeaderStyles()}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full border border-white dark:border-neoBlack"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white dark:border-neoBlack"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-white dark:border-neoBlack"></div>
                    <span className="font-mono font-bold text-white dark:text-neoBlack ml-2 text-sm">
                      CMD_PALETTE_V1.0
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white dark:text-neoBlack hover:text-neoRed transition-colors"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>
                </div>
              )}

              {/* Header for other themes */}
              {designSystem !== 'neo-brutalist' && (
                <div className={`flex justify-between items-center ${getHeaderStyles()}`}>
                  <span className={`text-sm ${designSystem === 'dark-minimal' ? 'text-zinc-500' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    Command Palette
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`${designSystem === 'dark-minimal' ? 'text-zinc-500 hover:text-white' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-white'} transition-colors`}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {/* Search Input */}
              <div className={`relative ${designSystem === 'neo-brutalist' ? 'border-b-4 border-neoBlack dark:border-neoWhite' : 'border-b border-white/10'}`}>
                <Search
                  size={20}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${designSystem === 'dark-minimal' ? 'text-zinc-600' : 'text-gray-400'}`}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={designSystem === 'neo-brutalist' ? 'Type a command or search...' : 'Search commands...'}
                  className={`w-full pl-12 pr-4 py-4 text-lg focus:outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500 ${getInputStyles()}`}
                />
                <kbd className={`absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold ${
                  designSystem === 'neo-brutalist'
                    ? 'bg-gray-200 dark:bg-gray-800 border-2 border-neoBlack dark:border-neoWhite'
                    : designSystem === 'dark-minimal'
                    ? 'bg-zinc-800 border border-white/10 rounded text-zinc-500'
                    : 'bg-white/20 backdrop-blur-sm border border-white/20 rounded text-zinc-500 dark:text-zinc-400'
                }`}>
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div className={`max-h-[400px] overflow-y-auto ${designSystem === 'neo-brutalist' ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                {filteredCommands.length === 0 ? (
                  <div className={`p-8 text-center font-bold ${designSystem === 'neo-brutalist' ? 'font-mono text-gray-400' : 'text-zinc-500'}`}>
                    {designSystem === 'neo-brutalist' ? 'NO COMMANDS FOUND' : 'No commands found'}
                  </div>
                ) : (
                  <div className="p-2">
                    {filteredCommands.map((command, index) => (
                      <motion.button
                        key={command.id}
                        ref={(el) => { itemRefs.current[index] = el; }}
                        onClick={command.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={`w-full flex items-center gap-4 p-4 ${designSystem === 'neo-brutalist' ? 'border-2' : 'border rounded-lg'} mb-2 transition-all font-bold group ${getCommandItemStyles(index === selectedIndex)}`}
                      >
                        {/* Icon */}
                        <div className={`flex-shrink-0 ${designSystem === 'neo-brutalist' ? 'p-2 border-2' : 'p-2'} ${getIconContainerStyles(index === selectedIndex)}`}>
                          {command.icon}
                        </div>

                        {/* Label & Description */}
                        <div className="flex-1 text-left">
                          <div className={`${designSystem === 'neo-brutalist' ? 'font-black uppercase tracking-tight text-sm' : 'font-medium text-sm'}`}>
                            {command.label}
                          </div>
                          {command.description && (
                            <div className={`text-xs mt-1 ${
                              index === selectedIndex
                                ? designSystem === 'neo-brutalist' ? 'text-white/80' : 'opacity-80'
                                : designSystem === 'neo-brutalist' ? 'text-gray-500 dark:text-gray-400' : 'opacity-60'
                            }`}>
                              {command.description}
                            </div>
                          )}
                        </div>

                        {/* Arrow indicator */}
                        <ChevronRight
                          size={20}
                          className={`flex-shrink-0 transition-transform ${
                            index === selectedIndex ? 'translate-x-1' : ''
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer with keyboard hints */}
              <div className={`p-3 flex items-center justify-between text-xs font-bold ${
                designSystem === 'neo-brutalist'
                  ? 'bg-neoBlack dark:bg-neoWhite border-t-4 border-neoBlack dark:border-neoWhite'
                  : 'border-t border-white/10'
              }`}>
                <div className={`flex gap-4 ${designSystem === 'neo-brutalist' ? 'text-white dark:text-neoBlack' : 'text-zinc-500'}`}>
                  <span className="flex items-center gap-2">
                    <kbd className={`px-2 py-1 ${
                      designSystem === 'neo-brutalist'
                        ? 'bg-gray-700 dark:bg-gray-300 border border-gray-600 dark:border-gray-400'
                        : 'bg-white/10 border border-white/20 rounded'
                    }`}>
                      ↑↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-2">
                    <kbd className={`px-2 py-1 ${
                      designSystem === 'neo-brutalist'
                        ? 'bg-gray-700 dark:bg-gray-300 border border-gray-600 dark:border-gray-400'
                        : 'bg-white/10 border border-white/20 rounded'
                    }`}>
                      ↵
                    </kbd>
                    Select
                  </span>
                </div>
                <span className={designSystem === 'neo-brutalist' ? 'text-gray-400 dark:text-gray-600' : 'text-zinc-600'}>
                  {filteredCommands.length} commands
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
