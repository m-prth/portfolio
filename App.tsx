import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import PortfolioAssistant from './components/PortfolioAssistant';
import CommandPalette from './components/CommandPalette';
import ThemeSwitcher from './components/ThemeSwitcher';
import AuroraMeshGradient from './components/AuroraMeshGradient';
import AuroraCursorSpotlight from './components/AuroraCursorSpotlight';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';
import { getBodyBgStyles } from './utils/themeStyles';

const AppContent: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { designSystem } = useTheme();

  // Enable Lenis smooth scroll for Aurora theme only
  useLenis(designSystem === 'aurora', { duration: 1.2, smoothWheel: true });

  const bgStyles = getBodyBgStyles(designSystem);

  return (
    <div className={`${bgStyles} min-h-screen text-neoBlack dark:text-neoWhite font-sans ${designSystem === 'neo-brutalist' ? 'pattern-grid' : ''} transition-colors duration-300`}>
      {/* Aurora theme specific elements */}
      <AuroraMeshGradient />
      <AuroraCursorSpotlight />

      {/* Theme Switcher - fixed position */}
      <ThemeSwitcher />

      <Navigation />
      <main className="pt-20">
        <Hero />
        <div className="space-y-0 relative z-10">
          <Experience />
          <Skills />
          <Projects />
          <Gallery />
          <Contact />
        </div>
      </main>
      <PortfolioAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <CommandPalette onOpenChat={() => setIsChatOpen(true)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
