import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { HERO_CONTENT } from '../constants';
import { SectionId } from '../types';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportConfig } from '../utils/animations';
import { useTheme } from '../hooks/useTheme';
import { getButtonPrimaryStyles, getButtonSecondaryStyles } from '../utils/themeStyles';

const Marquee: React.FC<{ text: string; direction?: 'left' | 'right'; designSystem: string }> = ({ text, direction = 'left', designSystem }) => {
  if (designSystem !== 'neo-brutalist') return null;

  return (
    <div className={`w-full overflow-hidden bg-neoBlack dark:bg-neoWhite text-neoWhite dark:text-neoBlack border-y-4 border-neoBlack dark:border-neoWhite py-3 ${direction === 'right' ? 'rotate-1' : '-rotate-1'} z-10 my-4 transition-colors duration-300`}>
      <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono font-bold text-xl">
        {Array(10).fill(text).map((t, i) => (
          <span key={i} className="flex items-center gap-4">
            {t} <span className="text-neoGreen">★</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// Minimal scroll indicator for dark-minimal theme
const MinimalScrollIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
  >
    <span className="text-zinc-500 text-xs tracking-widest uppercase">Scroll</span>
    <motion.div
      animate={{ height: [16, 32, 16] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-px bg-gradient-to-b from-zinc-600 to-transparent"
    />
  </motion.div>
);

// Neo-Brutalist Layout
const NeoBrutalistHero: React.FC = () => {
  return (
    <section id={SectionId.Hero} className="relative min-h-screen flex flex-col pt-20 overflow-hidden transition-colors duration-300 bg-neoWhite dark:bg-neoBlack">
      <div className="container mx-auto px-6 pt-12 flex-grow flex flex-col justify-center relative z-20">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            className="md:col-span-7"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInLeft}
              className="inline-block mb-6 bg-neoBlue text-white px-4 py-2 font-mono font-bold border-2 border-neoBlack dark:border-neoWhite shadow-neo dark:shadow-neo-dark rotate-2"
            >
              HELLO_WORLD.INIT()
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-8 text-6xl md:text-8xl font-display font-black leading-[0.9] text-neoBlack dark:text-neoWhite"
            >
              I AM <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neoOrange to-neoRed decoration-slice">
                PARTH MISTRY
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mb-10 text-xl md:text-2xl font-display text-neoBlack dark:text-neoWhite border-l-8 border-neoYellow dark:border-darkAccent pl-6 max-w-xl"
            >
              {HERO_CONTENT.headline}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '2px 2px 0px 0px var(--neo-shadow)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById(SectionId.Projects)?.scrollIntoView({behavior: 'smooth'})}
                className={`px-8 py-4 flex items-center gap-3 transition-all ${getButtonPrimaryStyles('neo-brutalist')}`}
              >
                VIEW WORK <ArrowDown size={24} />
              </motion.button>

              <motion.a
                href="/assets/resume.pdf"
                download="Parth_Mistry_Resume"
                whileHover={{ scale: 1.02, boxShadow: '2px 2px 0px 0px var(--neo-shadow)' }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 flex items-center gap-3 cursor-pointer transition-all ${getButtonSecondaryStyles('neo-brutalist')}`}
              >
                RESUME <Download size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Terminal */}
          <motion.div
            className="md:col-span-5 relative hidden md:block perspective-1000"
            initial="hidden"
            animate="visible"
            variants={fadeInRight}
          >
            {/* Decorative underlay */}
            <div className="absolute top-4 left-4 w-full h-full bg-neoPurple border-4 border-neoBlack dark:border-neoWhite -z-10"></div>

            <motion.div
              initial={{ rotateY: 10, rotateX: 5, opacity: 0 }}
              animate={{ rotateY: 0, rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-[#111111] border-4 border-neoBlack dark:border-neoWhite p-1 shadow-neo-lg dark:shadow-neo-dark-lg"
            >
              {/* Terminal Header */}
              <div className="bg-[#E0E0E0] dark:bg-[#2a2a2a] border-b-4 border-neoBlack dark:border-neoWhite p-2 flex items-center justify-between">
                <div className="flex gap-2 pl-1">
                  <div className="w-4 h-4 rounded-full bg-neoRed border-2 border-black dark:border-white"></div>
                  <div className="w-4 h-4 rounded-full bg-neoYellow border-2 border-black dark:border-white"></div>
                  <div className="w-4 h-4 rounded-full bg-neoGreen border-2 border-black dark:border-white"></div>
                </div>
                <span className="font-mono font-bold text-black dark:text-neoWhite text-sm uppercase tracking-widest">term_v1.sh</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 min-h-[360px] font-mono text-neoGreen text-sm md:text-base flex flex-col leading-relaxed selection:bg-neoGreen selection:text-black">
                <div className="mb-4">
                  <span className="text-neoBlue">root@parth-portfolio</span>:<span className="text-neoPurple">~</span>$ ./init_profile.sh
                </div>

                <div className="space-y-2">
                  <p> Loading core modules...</p>
                  <p className="flex justify-between border-b border-gray-800 pb-1">
                    <span>[ABOUT]</span>
                    <span className="text-neoGreen font-bold">OK</span>
                  </p>
                  <p className="flex justify-between border-b border-gray-800 pb-1">
                    <span>[EXPERIENCE]</span>
                    <span className="text-neoGreen font-bold">OK</span>
                  </p>
                  <p className="flex justify-between border-b border-gray-800 pb-1">
                    <span>[PROJECTS]</span>
                    <span className="text-neoGreen font-bold">OK</span>
                  </p>
                  <p className="flex justify-between border-b border-gray-800 pb-1">
                    <span>[CLICKS]</span>
                    <span className="text-neoYellow font-bold">LOADING...</span>
                  </p>
                </div>

                <div className="mt-6 border-t-2 border-dashed border-gray-700 pt-4 text-gray-400">
                  <p className="mb-2 text-xs uppercase tracking-widest text-neoPurple">Current Objective:</p>
                  <p className="text-white italic">"Transforming complex datasets into actionable business intelligence and sometimes talk about Real Madrid."</p>
                </div>

                <div className="mt-auto pt-4">
                  <span className="text-neoBlue">root@parth-portfolio</span>:<span className="text-neoPurple">~</span>$ <span className="animate-pulse inline-block w-3 h-5 bg-neoGreen align-middle"></span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mt-auto">
        <Marquee text="DATA SCIENCE • DATA ENGINEERING • BUSINESS INTELLIGENCE" designSystem="neo-brutalist" />
      </div>
    </section>
  );
};

// Dark Minimal Layout - Editorial/Magazine style
const DarkMinimalHero: React.FC = () => {
  return (
    <section id={SectionId.Hero} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.span
            variants={fadeInUp}
            className="text-zinc-500 font-medium tracking-widest uppercase text-sm mb-8"
          >
            Data Scientist & Engineer
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-7xl md:text-9xl font-serif font-normal leading-[0.9] text-white tracking-tight mb-8"
          >
            <span className="italic">Parth</span>
            <br />
            <span className="italic">Mistry</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-zinc-400 font-light max-w-lg mb-12"
          >
            {HERO_CONTENT.headline}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById(SectionId.Projects)?.scrollIntoView({behavior: 'smooth'})}
              className={`px-8 py-4 flex items-center gap-3 transition-all ${getButtonPrimaryStyles('dark-minimal')}`}
            >
              View Work <ArrowDown size={20} />
            </motion.button>

            <motion.a
              href="/assets/resume.pdf"
              download="Parth_Mistry_Resume"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-8 py-4 flex items-center gap-3 cursor-pointer transition-all ${getButtonSecondaryStyles('dark-minimal')}`}
            >
              Resume <Download size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <MinimalScrollIndicator />
    </section>
  );
};

// Aurora Layout - Floating Glass Cards with depth
const AuroraHero: React.FC = () => {
  return (
    <section id={SectionId.Hero} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-20">
        <div className="relative min-h-[70vh] flex items-center justify-center">
          {/* Floating decorative orbs */}
          <motion.div
            animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-[10%] w-40 h-40 bg-gradient-to-br from-auroraViolet/30 to-auroraViolet/5 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 right-[15%] w-56 h-56 bg-gradient-to-br from-auroraSky/30 to-auroraSky/5 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-[5%] w-32 h-32 bg-gradient-to-br from-auroraRose/30 to-auroraRose/5 rounded-full blur-2xl"
          />

          {/* Floating Glass Cards Layout */}
          <div className="relative w-full max-w-6xl mx-auto">
            {/* Tag Card - Top Left */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute top-0 left-0 md:left-[5%] z-10"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card px-6 py-3"
              >
                <span className="text-auroraViolet text-sm font-medium">Welcome to my portfolio</span>
              </motion.div>
            </motion.div>

            {/* Main Name Card - Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative z-20 text-center py-16 md:py-24"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card inline-block px-12 py-10 md:px-20 md:py-14"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-aurora-display leading-[1.1] text-zinc-900 dark:text-white">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-auroraViolet via-auroraSky to-auroraRose bg-clip-text text-transparent">
                    Parth Mistry
                  </span>
                </h1>
              </motion.div>
            </motion.div>

            {/* Description Card - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-0 right-0 md:right-[5%] z-10 max-w-sm"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="glass-card p-6"
              >
                <p className="text-zinc-600 dark:text-zinc-300 text-lg">
                  {HERO_CONTENT.headline}
                </p>
              </motion.div>
            </motion.div>

            {/* Buttons Card - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-16 left-0 md:left-[10%] z-10"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="glass-card p-4 flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById(SectionId.Projects)?.scrollIntoView({behavior: 'smooth'})}
                  className={`px-6 py-3 flex items-center gap-2 transition-all ${getButtonPrimaryStyles('aurora')}`}
                >
                  View Work <ArrowDown size={18} />
                </motion.button>

                <motion.a
                  href="/assets/resume.pdf"
                  download="Parth_Mistry_Resume"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 flex items-center gap-2 cursor-pointer transition-all ${getButtonSecondaryStyles('aurora')}`}
                >
                  Resume <Download size={18} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Decorative floating element - Top Right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-10 right-0 md:right-[10%] z-10 hidden md:block"
            >
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="glass-card p-6 w-24 h-24 flex items-center justify-center"
              >
                <span className="text-4xl">👋</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-zinc-400 dark:border-zinc-600 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-auroraViolet rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Hero: React.FC = () => {
  const { designSystem } = useTheme();

  if (designSystem === 'dark-minimal') {
    return <DarkMinimalHero />;
  }

  if (designSystem === 'aurora') {
    return <AuroraHero />;
  }

  return <NeoBrutalistHero />;
};

export default Hero;
