import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import { SectionId } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerContainerFast, viewportConfig } from '../utils/animations';
import { useTheme } from '../hooks/useTheme';

// Neo-Brutalist Layout - Zigzag Timeline
const NeoBrutalistExperience: React.FC = () => {
  return (
    <section id={SectionId.Experience} className="transition-colors duration-300 py-24 bg-neoOrange dark:bg-gradient-to-br dark:from-neoOrange/20 dark:to-neoRed/10 border-t-4 border-neoBlack dark:border-neoWhite">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInDown}
          className="bg-white dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg p-8 md:p-12 mb-16"
        >
          <h2 className="mb-4 text-5xl md:text-6xl font-display font-black text-neoBlack dark:text-neoWhite uppercase">
            XP_LOG<span className="text-neoRed">.txt</span>
          </h2>
          <p className="font-mono text-lg font-bold text-gray-600 dark:text-gray-400">
            // Executing career path subroutine...
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 bg-neoBlack dark:bg-neoWhite transform md:-translate-x-1/2 hidden md:block" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={index % 2 === 0 ? fadeInRight : fadeInLeft}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Connector Dot */}
                <motion.div
                  variants={scaleIn}
                  className="absolute left-8 md:left-1/2 top-8 w-6 h-6 bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite z-10 transform md:-translate-x-1/2 hidden md:block"
                />

                {/* Content Card */}
                <div className="md:w-1/2">
                  <div className={`bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite p-6 shadow-neo dark:shadow-neo-dark transition-transform hover:-translate-y-1 hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    {/* Header Bar */}
                    <div className="flex justify-between items-start mb-4 border-b-2 border-neoBlack dark:border-neoWhite pb-2">
                      <div className="bg-neoBlack dark:bg-neoWhite text-white dark:text-neoBlack px-3 py-1 font-mono font-bold text-sm inline-block">
                        ROLE_ID: 0{exp.id}
                      </div>
                      <div className="flex items-center gap-2 font-bold text-sm text-neoBlack dark:text-neoWhite">
                        <Calendar size={16} /> {exp.period}
                      </div>
                    </div>

                    <h3 className="mb-1 text-2xl font-black text-neoBlack dark:text-neoWhite uppercase leading-none">{exp.role}</h3>
                    <h4 className="mb-4 text-xl font-bold text-neoBlue dark:text-neoGreen flex items-center gap-2">
                      @ {exp.company}
                    </h4>

                    <motion.ul
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainerFast}
                      className="space-y-3 mb-6 font-medium"
                    >
                      {exp.description.map((item, i) => (
                        <motion.li key={i} variants={fadeInUp} className="flex items-start gap-3 text-neoBlack dark:text-neoWhite">
                          <ArrowRight className="min-w-[20px] text-neoRed" size={20} />
                          <span className="leading-tight">{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={staggerContainerFast}
                      className="flex flex-wrap gap-2 border-t-2 border-neoBlack dark:border-neoWhite pt-4"
                    >
                      {exp.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          variants={scaleIn}
                          whileHover={{ scale: 1.1, rotate: Math.random() * 6 - 3 }}
                          className="text-xs font-black px-2 py-1 bg-neoYellow dark:bg-darkAccent text-neoBlack dark:text-neoWhite border-2 border-neoBlack dark:border-neoWhite shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(240,240,240,0.4)] cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Dark Minimal Layout - Vertical List with horizontal dividers
const DarkMinimalExperience: React.FC = () => {
  return (
    <section id={SectionId.Experience} className="transition-colors duration-300 py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-white tracking-tight">
            <span className="italic">Experience</span>
          </h2>
          <p className="text-zinc-500 font-light mt-4">
            A timeline of professional growth
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="space-y-0"
        >
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={fadeInUp}
              className="border-t border-white/10 py-12 first:border-t-0"
            >
              <div className="grid md:grid-cols-12 gap-8">
                {/* Index number */}
                <div className="md:col-span-2">
                  <span className="text-5xl font-serif text-zinc-700">
                    {String(exp.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-serif font-normal text-white">
                        {exp.role}
                      </h3>
                      <p className="text-zinc-400 font-light mt-1">
                        {exp.company} · {exp.period}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {exp.description.map((item, i) => (
                      <p key={i} className="text-zinc-400 font-light leading-relaxed">
                        {item}
                      </p>
                    ))}
                  </div>

                  <p className="text-zinc-500 text-sm">
                    {exp.skills.join(' · ')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Aurora Layout - Horizontal Scroll with snap
const AuroraExperience: React.FC = () => {
  return (
    <section id={SectionId.Experience} className="transition-colors duration-300 py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="glass-card p-8 md:p-12 mb-12 max-w-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-aurora-display text-zinc-900 dark:text-white mb-4">
            Experience
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Where I've worked and what I've built
          </p>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative">
          {/* Gradient fade on left */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

          {/* Gradient fade on right */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {EXPERIENCES.map((exp) => (
              <motion.div
                key={exp.id}
                variants={scaleIn}
                className="flex-shrink-0 w-[350px] md:w-[400px] snap-center"
              >
                <div className="glass-card p-6 h-full hover:shadow-aurora-lg transition-shadow">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-auroraViolet/10 text-auroraViolet px-3 py-1 rounded-full text-xs font-medium">
                      #{exp.id}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm flex items-center gap-2">
                      <Calendar size={14} /> {exp.period}
                    </span>
                  </div>

                  <h3 className="text-xl font-aurora-display text-zinc-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-auroraViolet mb-4">
                    {exp.company}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
                        <ArrowRight className="min-w-[16px] text-auroraViolet mt-0.5" size={16} />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs bg-auroraSky/10 text-auroraSky px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-4">
            <span className="text-zinc-400 text-sm flex items-center gap-2">
              <span>Scroll to explore</span>
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience: React.FC = () => {
  const { designSystem } = useTheme();

  if (designSystem === 'dark-minimal') {
    return <DarkMinimalExperience />;
  }

  if (designSystem === 'aurora') {
    return <AuroraExperience />;
  }

  return <NeoBrutalistExperience />;
};

export default Experience;
