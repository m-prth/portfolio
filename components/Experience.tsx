import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import { SectionId } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn, staggerContainer, staggerContainerFast, viewportConfig } from '../utils/animations';

const Experience: React.FC = () => {
  return (
    <section id={SectionId.Experience} className="py-24 bg-neoOrange dark:bg-gradient-to-br dark:from-neoOrange/20 dark:to-neoRed/10 border-t-4 border-neoBlack dark:border-neoWhite transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInDown}
          className="bg-white dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg p-8 md:p-12 mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-black text-neoBlack dark:text-neoWhite mb-4 uppercase">
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

                    <h3 className="text-2xl font-black text-neoBlack dark:text-neoWhite uppercase mb-1 leading-none">{exp.role}</h3>
                    <h4 className="text-xl font-bold text-neoBlue dark:text-neoGreen mb-4 flex items-center gap-2">
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
                          className="text-xs font-black px-2 py-1 bg-neoYellow dark:bg-neoPurple text-neoBlack dark:text-neoWhite border-2 border-neoBlack dark:border-neoWhite shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(240,240,240,0.4)] cursor-default"
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

export default Experience;
