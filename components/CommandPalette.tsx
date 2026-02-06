import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronRight, Home, Briefcase, Code, Camera, Mail, Terminal, Download, Moon, Sun, Lightbulb, User } from 'lucide-react';
import { SectionId } from '../types';
import { useTheme } from '../hooks/useTheme';

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
  const { theme, toggleTheme } = useTheme();

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
      label: 'Go to Home',
      description: 'Navigate to hero section',
      icon: <Home size={18} />,
      action: () => scrollToSection(SectionId.Hero),
      keywords: ['home', 'top', 'hero', 'start']
    },
    {
      id: 'nav-about',
      label: 'Go to About',
      description: 'Learn about me',
      icon: <User size={18} />,
      action: () => scrollToSection(SectionId.Hero),
      keywords: ['about', 'bio', 'me', 'info']
    },
    {
      id: 'nav-experience',
      label: 'Go to Experience',
      description: 'View work experience',
      icon: <Briefcase size={18} />,
      action: () => scrollToSection(SectionId.Experience),
      keywords: ['experience', 'work', 'jobs', 'career', 'xp']
    },
    {
      id: 'nav-skills',
      label: 'Go to Skills',
      description: 'View technical skills',
      icon: <Lightbulb size={18} />,
      action: () => scrollToSection(SectionId.Skills),
      keywords: ['skills', 'technologies', 'tech', 'tools']
    },
    {
      id: 'nav-projects',
      label: 'Go to Projects',
      description: 'View portfolio projects',
      icon: <Code size={18} />,
      action: () => scrollToSection(SectionId.Projects),
      keywords: ['projects', 'works', 'portfolio', 'code']
    },
    {
      id: 'nav-gallery',
      label: 'Go to Gallery',
      description: 'View photography',
      icon: <Camera size={18} />,
      action: () => scrollToSection(SectionId.Gallery),
      keywords: ['gallery', 'photos', 'images', 'photography', 'clicks']
    },
    {
      id: 'nav-contact',
      label: 'Go to Contact',
      description: 'Get in touch',
      icon: <Mail size={18} />,
      action: () => scrollToSection(SectionId.Contact),
      keywords: ['contact', 'email', 'reach', 'social']
    },
    {
      id: 'action-theme',
      label: theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode',
      description: 'Toggle dark/light theme',
      icon: theme === 'light' ? <Moon size={18} /> : <Sun size={18} />,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
      keywords: ['theme', 'dark', 'light', 'mode', 'color']
    },
    {
      id: 'action-chat',
      label: 'Open AI Assistant',
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
      label: 'Download Resume',
      description: 'Download PDF resume',
      icon: <Download size={18} />,
      action: downloadResume,
      keywords: ['resume', 'cv', 'download', 'pdf']
    }
  ], [theme, toggleTheme, onOpenChat]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-neoBlack/60 dark:bg-neoWhite/10 backdrop-blur-sm"
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
            <div className="bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg overflow-hidden">

              {/* Window Chrome Header */}
              <div className="bg-neoBlack dark:bg-neoWhite p-3 border-b-4 border-neoBlack dark:border-neoWhite flex justify-between items-center">
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

              {/* Search Input */}
              <div className="relative border-b-4 border-neoBlack dark:border-neoWhite">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full bg-neoWhite dark:bg-neoBlack text-neoBlack dark:text-neoWhite pl-12 pr-4 py-4 font-mono font-bold text-lg focus:outline-none focus:bg-neoYellow/20 dark:focus:bg-darkAccent/20 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-200 dark:bg-gray-800 border-2 border-neoBlack dark:border-neoWhite text-xs font-bold">
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div className="max-h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-900">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center font-mono font-bold text-gray-400">
                    NO COMMANDS FOUND
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
                        className={`w-full flex items-center gap-4 p-4 border-2 mb-2 transition-all font-bold group ${
                          index === selectedIndex
                            ? 'bg-neoPurple text-white border-neoBlack dark:border-neoWhite shadow-neo-sm dark:shadow-neo-dark-sm translate-x-1'
                            : 'bg-white dark:bg-neoBlack text-neoBlack dark:text-neoWhite border-transparent hover:border-neoBlack dark:hover:border-neoWhite'
                        }`}
                      >
                        {/* Icon */}
                        <div className={`flex-shrink-0 p-2 border-2 ${
                          index === selectedIndex
                            ? 'bg-white text-neoPurple border-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-neoBlack dark:text-neoWhite border-neoBlack dark:border-neoWhite'
                        }`}>
                          {command.icon}
                        </div>

                        {/* Label & Description */}
                        <div className="flex-1 text-left">
                          <div className="font-black uppercase tracking-tight text-sm">
                            {command.label}
                          </div>
                          {command.description && (
                            <div className={`text-xs font-mono mt-1 ${
                              index === selectedIndex
                                ? 'text-white/80'
                                : 'text-gray-500 dark:text-gray-400'
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
              <div className="bg-neoBlack dark:bg-neoWhite border-t-4 border-neoBlack dark:border-neoWhite p-3 flex items-center justify-between text-xs font-mono font-bold">
                <div className="flex gap-4 text-white dark:text-neoBlack">
                  <span className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-gray-700 dark:bg-gray-300 border border-gray-600 dark:border-gray-400">
                      ↑↓
                    </kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-gray-700 dark:bg-gray-300 border border-gray-600 dark:border-gray-400">
                      ↵
                    </kbd>
                    Select
                  </span>
                </div>
                <span className="text-gray-400 dark:text-gray-600">
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
