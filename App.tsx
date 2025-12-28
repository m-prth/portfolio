import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import PortfolioAssistant from './components/PortfolioAssistant';

const App: React.FC = () => {
  return (
    <div className="bg-neoWhite min-h-screen text-neoBlack font-sans pattern-grid">
      <Navigation />
      <main>
        <Hero />
        <div className="space-y-0 relative z-10">
          <Experience />
          <Skills />
          <Projects />
          <Gallery />
          <Contact />
        </div>
      </main>

      <PortfolioAssistant />
    </div>
  );
};

export default App;