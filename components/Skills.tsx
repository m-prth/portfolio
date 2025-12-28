import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { SectionId } from '../types';
import { Code2, Database, BrainCircuit, Star, ChartArea, Workflow } from 'lucide-react';

const SkillCard: React.FC<{ title: string; skills: string[]; icon: React.ReactNode; color: string; rotate: string }> = ({ title, skills, icon, color, rotate }) => (
  <motion.div 
    className={`bg-white border-4 border-neoBlack p-8 shadow-neo-lg ${rotate} relative overflow-hidden group`}
    whileHover={{ scale: 1.02, rotate: 0 }}
  >
    <div className={`absolute top-0 right-0 w-16 h-16 ${color} border-l-4 border-b-4 border-neoBlack flex items-center justify-center`}>
       <div className="text-neoBlack">{icon}</div>
    </div>
    
    <h3 className={`text-3xl font-black text-neoBlack mb-8 bg-${color} inline-block px-2 border-2 border-neoBlack shadow-neo-sm`}>
      {title}
    </h3>

    <div className="flex flex-wrap gap-3">
      {skills.map((skill, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
          className="cursor-default px-4 py-2 font-bold text-neoBlack bg-neoWhite border-2 border-neoBlack shadow-[2px_2px_0px_0px_#000] hover:bg-neoYellow transition-colors"
        >
          {skill}
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Skills: React.FC = () => {
  return (
    <section id={SectionId.Skills} className="py-24 bg-neoWhite pattern-dots border-t-4 border-neoBlack">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="bg-neoPurple border-4 border-neoBlack p-4 shadow-neo mb-4 rotate-2">
            <Star className="text-white w-12 h-12" fill="white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-neoBlack uppercase tracking-tight">
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-neoPurple to-neoBlue" style={{ WebkitTextStroke: '2px black' }}>Matrix</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    <SkillCard 
            title="AI / ML" 
            skills={SKILLS.ai} 
            icon={<BrainCircuit size={24} />}
            color="bg-neoRed"
            rotate="-rotate-1"
          />
          <SkillCard 
            title="ANALYTICS" 
            skills={SKILLS.bi} 
            icon={<ChartArea size={24} />}
            color="bg-neoGreen"
            rotate="rotate-1"
          />
          <SkillCard 
            title="ENGINEERING" 
            skills={SKILLS.engineering} 
            icon={<Database size={24} />}
            color="bg-neoBlue"
            rotate="-rotate-2"
          />
          
          <SkillCard 
            title="DEVOPS" 
            skills={SKILLS.devops}
            icon={<Workflow size={24} />}
            color="bg-neoPurple"
            rotate="rotate-2"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;