import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_CONTENT, PROJECTS } from '../constants';
import { SectionId } from '../types';
import { ExternalLink, Github, Maximize2 } from 'lucide-react';
import { fadeInUp, fadeInLeft, scaleIn, staggerContainer, staggerContainerFast, viewportConfig } from '../utils/animations';

const Projects: React.FC = () => {
  return (
    <section id={SectionId.Projects} className="py-24 bg-neoGreen dark:bg-gradient-to-br dark:from-neoGreen/20 dark:to-neoBlue/10 border-t-4 border-neoBlack dark:border-neoWhite transition-colors duration-300">
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
            className="bg-white dark:bg-neoBlack text-neoBlack dark:text-neoWhite border-4 border-neoBlack dark:border-neoWhite px-6 py-3 font-bold shadow-neo dark:shadow-neo-dark hover:shadow-neo-hover dark:hover:shadow-neo-dark-hover active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 mt-6 md:mt-0"
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
          {PROJECTS.map((project, idx) => (
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
                <div className="absolute inset-0 bg-neoBlue/20 dark:bg-neoPurple/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content Area */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-3xl font-black text-neoBlack dark:text-neoWhite mb-4 uppercase leading-none">
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

                <p className="text-neoBlack dark:text-neoWhite font-medium mb-8 flex-grow border-l-4 border-neoYellow dark:border-neoPurple pl-4">
                  {project.description}
                </p>

                <motion.a
                  whileHover={{ x: 4, y: 4 }}
                  whileTap={{ x: 0, y: 0 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-neoYellow dark:bg-neoPurple text-neoBlack dark:text-neoWhite border-4 border-neoBlack dark:border-neoWhite py-3 font-black uppercase tracking-wider shadow-neo dark:shadow-neo-dark hover:bg-neoOrange dark:hover:bg-neoBlue transition-colors flex items-center justify-center gap-2"
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

export default Projects;
