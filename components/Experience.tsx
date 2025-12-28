import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import { SectionId } from '../types';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id={SectionId.Experience} className="py-24 bg-neoOrange border-t-4 border-neoBlack">
      <div className="container mx-auto px-6">
        <div className="bg-white border-4 border-neoBlack shadow-neo-lg p-8 md:p-12 mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black text-neoBlack mb-4 uppercase">
            EXPERIENCE_LOG<span className="text-neoRed">.txt</span>
          </h2>
          <p className="font-mono text-lg font-bold text-gray-600">
            // Executing career path subroutine...
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 bg-neoBlack transform md:-translate-x-1/2 hidden md:block" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Connector Dot */}
                <div className="absolute left-8 md:left-1/2 top-8 w-6 h-6 bg-neoWhite border-4 border-neoBlack z-10 transform md:-translate-x-1/2 hidden md:block" />

                {/* Content Card */}
                <div className="md:w-1/2">
                  <div className={`bg-neoWhite border-4 border-neoBlack p-6 shadow-neo transition-transform hover:-translate-y-1 hover:shadow-neo-lg ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    
                    {/* Header Bar */}
                    <div className="flex justify-between items-start mb-4 border-b-2 border-neoBlack pb-2">
                      <div className="bg-neoBlack text-white px-3 py-1 font-mono font-bold text-sm inline-block">
                        ROLE_ID: 0{exp.id}
                      </div>
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <Calendar size={16} /> {exp.period}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-neoBlack uppercase mb-1 leading-none">{exp.role}</h3>
                    <h4 className="text-xl font-bold text-neoBlue mb-4 flex items-center gap-2">
                      @ {exp.company}
                    </h4>
                    
                    <ul className="space-y-3 mb-6 font-medium">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ArrowRight className="min-w-[20px] text-neoRed" size={20} />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 border-t-2 border-neoBlack pt-4">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="text-xs font-black px-2 py-1 bg-neoYellow border-2 border-neoBlack shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Spacer */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;