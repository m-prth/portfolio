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
import { ThemeProvider } from './hooks/useTheme';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="bg-neoWhite dark:bg-neoBlack min-h-screen text-neoBlack dark:text-neoWhite font-sans pattern-grid transition-colors duration-300">
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
    </ThemeProvider>
  );
};

export default App;
