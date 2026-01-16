import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT_CONTENT, PROJECTS } from '../constants';
import { SectionId } from '../types';
import { ExternalLink, Github, Maximize2 } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id={SectionId.Projects} className="py-24 bg-neoGreen border-t-4 border-neoBlack">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b-4 border-neoBlack pb-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white drop-shadow-[4px_4px_0px_#000]">
              SELECTED<br/>WORKS
            </h2>
          </div>
          <a href={CONTACT_CONTENT.github} className="bg-white text-neoBlack border-4 border-neoBlack px-6 py-3 font-bold shadow-neo hover:shadow-neo-hover active:shadow-none active:translate-y-1 transition-all flex items-center gap-2 mt-6 md:mt-0">
            <Github size={20} /> GITHUB
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border-4 border-neoBlack shadow-neo-lg flex flex-col group"
            >
              {/* Window Chrome */}
              <div className="bg-neoBlack p-3 flex items-center justify-between border-b-4 border-neoBlack">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-neoRed border-2 border-white"></div>
                  <div className="w-4 h-4 rounded-full bg-neoYellow border-2 border-white"></div>
                  <div className="w-4 h-4 rounded-full bg-neoGreen border-2 border-white"></div>
                </div>
                <div className="text-white font-mono text-xs font-bold uppercase truncate max-w-[150px]">
                  {project.title}.exe
                </div>
                <Maximize2 size={16} className="text-white" />
              </div>

              {/* Image Area */}
              <div className="relative aspect-video border-b-4 border-neoBlack overflow-hidden bg-gray-200">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-neoBlue/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content Area */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-3xl font-black text-neoBlack mb-4 uppercase leading-none">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-bold bg-neoBlack text-white px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-neoBlack font-medium mb-8 flex-grow border-l-4 border-neoYellow pl-4">
                  {project.description}
                </p>

                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-neoYellow text-neoBlack border-4 border-neoBlack py-3 font-black uppercase tracking-wider shadow-neo hover:bg-neoOrange transition-colors flex items-center justify-center gap-2 group-hover:shadow-neo-hover group-hover:translate-x-[2px] group-hover:translate-y-[2px]"
                >
    Open Project <ExternalLink size={18} />
</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;