import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_CONTENT, PROJECTS } from '../constants';
import { SectionId } from '../types';
import { ExternalLink, Github, Maximize2, ArrowRight } from 'lucide-react';
import { fadeInUp, fadeInLeft, scaleIn, staggerContainer, staggerContainerFast, viewportConfig } from '../utils/animations';
import { useTheme } from '../hooks/useTheme';

// Neo-Brutalist Layout - 2-column grid with window chrome
const NeoBrutalistProjects: React.FC = () => {
  return (
    <section id={SectionId.Projects} className="transition-colors duration-300 py-24 bg-neoGreen dark:bg-gradient-to-br dark:from-neoGreen/20 dark:to-neoBlue/10 border-t-4 border-neoBlack dark:border-neoWhite">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInLeft}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-neoBlack dark:border-neoWhite pb-8"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white dark:text-neoWhite drop-shadow-[4px_4px_0px_#000] dark:drop-shadow-[4px_4px_0px_rgba(240,240,240,0.3)]">
              SELECTED<br/>WORKS
            </h2>
          </div>
          <a
            href={CONTACT_CONTENT.github}
            className="mt-6 md:mt-0 bg-white dark:bg-neoBlack text-neoBlack dark:text-neoWhite border-4 border-neoBlack dark:border-neoWhite px-6 py-3 font-bold shadow-neo dark:shadow-neo-dark hover:shadow-neo-hover dark:hover:shadow-neo-dark-hover active:shadow-none active:translate-y-1 transition-all flex items-center gap-2"
          >
            <Github size={20} /> GITHUB
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={scaleIn}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg flex flex-col group"
            >
              {/* Window Chrome */}
              <div className="bg-neoBlack dark:bg-neoWhite p-3 flex items-center justify-between border-b-4 border-neoBlack dark:border-neoWhite">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-neoRed border-2 border-white dark:border-neoBlack"></div>
                  <div className="w-4 h-4 rounded-full bg-neoYellow border-2 border-white dark:border-neoBlack"></div>
                  <div className="w-4 h-4 rounded-full bg-neoGreen border-2 border-white dark:border-neoBlack"></div>
                </div>
                <div className="text-white dark:text-neoBlack font-mono text-xs font-bold uppercase truncate max-w-[150px]">
                  {project.title}.exe
                </div>
                <Maximize2 size={16} className="text-white dark:text-neoBlack" />
              </div>

              {/* Image Area */}
              <div className="relative aspect-video border-b-4 border-neoBlack dark:border-neoWhite overflow-hidden bg-gray-200 dark:bg-gray-800">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-neoBlue/20 dark:bg-darkAccent/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content Area */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="mb-4 text-3xl font-black text-neoBlack dark:text-neoWhite uppercase leading-none">
                  {project.title}
                </h3>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainerFast}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      variants={fadeInUp}
                      className="text-xs font-bold bg-neoBlack dark:bg-neoWhite text-white dark:text-neoBlack px-2 py-1"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <p className="mb-8 text-neoBlack dark:text-neoWhite font-medium flex-grow border-l-4 border-neoYellow dark:border-darkAccent pl-4">
                  {project.description}
                </p>

                <motion.a
                  whileHover={{ x: 4, y: 4 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-neoYellow dark:bg-darkAccent text-neoBlack dark:text-neoWhite border-4 border-neoBlack dark:border-neoWhite py-3 font-black uppercase tracking-wider shadow-neo dark:shadow-neo-dark hover:bg-neoOrange dark:hover:bg-neoBlue transition-colors flex items-center justify-center gap-2"
                >
                  Open Project <ExternalLink size={18} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Dark Minimal Layout - Single Column Showcase
const DarkMinimalProjects: React.FC = () => {
  return (
    <section id={SectionId.Projects} className="transition-colors duration-300 py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-normal text-white tracking-tight">
              <span className="italic">Selected Works</span>
            </h2>
            <p className="text-zinc-500 font-light mt-4">
              A curated collection of projects
            </p>
          </div>
          <a
            href={CONTACT_CONTENT.github}
            className="mt-6 md:mt-0 text-zinc-400 hover:text-white flex items-center gap-2 text-sm border border-white/10 px-4 py-2 rounded-md hover:bg-white/5 transition-colors"
          >
            <Github size={18} /> View GitHub
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="space-y-24"
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.id}
              variants={fadeInUp}
              className="group"
            >
              {/* Large Image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-8">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-zinc-500 text-sm">
                  {project.tags.slice(0, 3).join(' · ')}
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-normal text-white">
                  {project.title}
                </h3>

                <p className="text-zinc-400 font-light leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group/link mt-4"
                >
                  <span>View Project</span>
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Aurora Layout - Bento Grid
const AuroraProjects: React.FC = () => {
  return (
    <section id={SectionId.Projects} className="transition-colors duration-300 py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div className="glass-card p-8 md:p-10">
            <h2 className="text-4xl md:text-5xl font-aurora-display text-zinc-900 dark:text-white mb-2">
              Selected Works
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Projects I'm proud of
            </p>
          </div>
          <a
            href={CONTACT_CONTENT.github}
            className="mt-6 md:mt-0 bg-white/50 dark:bg-white/10 backdrop-blur-sm text-zinc-700 dark:text-white flex items-center gap-2 text-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/80 dark:hover:bg-white/20 transition-colors"
          >
            <Github size={18} /> View GitHub
          </a>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px] md:auto-rows-[180px]"
        >
          {PROJECTS.map((project, index) => {
            // First project is featured (large)
            const isFeatured = index === 0;
            const gridClass = isFeatured
              ? 'md:col-span-2 md:row-span-2'
              : index === 1
                ? 'md:col-span-2 md:row-span-1'
                : 'md:col-span-1 md:row-span-2';

            return (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`glass-card overflow-hidden group cursor-pointer hover:shadow-aurora-lg transition-all ${gridClass}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, isFeatured ? 4 : 2).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className={`font-aurora-display text-white ${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                    {project.title}
                  </h3>

                  {isFeatured && (
                    <p className="text-white/70 text-sm mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                      <ExternalLink size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Projects: React.FC = () => {
  const { designSystem } = useTheme();

  if (designSystem === 'dark-minimal') {
    return <DarkMinimalProjects />;
  }

  if (designSystem === 'aurora') {
    return <AuroraProjects />;
  }

  return <NeoBrutalistProjects />;
};

export default Projects;
