import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { SectionId } from '../types';
import { Database, BrainCircuit, Star, ChartArea, Workflow } from 'lucide-react';
import { fadeInUp, rotateIn, scaleIn, staggerContainer, staggerContainerFast, viewportConfig } from '../utils/animations';

const SkillCard: React.FC<{ title: string; skills: string[]; icon: React.ReactNode; color: string; rotate: string }> = ({ title, skills, icon, color, rotate }) => (
  <motion.div
    variants={rotateIn}
    whileHover={{ scale: 1.02, rotate: 0 }}
    className={`bg-white dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite p-8 shadow-neo-lg dark:shadow-neo-dark-lg ${rotate} relative overflow-hidden group`}
  >
    <div className={`absolute top-0 right-0 w-16 h-16 ${color} border-l-4 border-b-4 border-neoBlack dark:border-neoWhite flex items-center justify-center`}>
      <div className="text-neoBlack">{icon}</div>
    </div>

    <h3 className="text-3xl font-black text-neoBlack dark:text-neoWhite mb-8">
      {title}
    </h3>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainerFast}
      className="flex flex-wrap gap-3"
    >
      {skills.map((skill, idx) => (
        <motion.div
          key={idx}
          variants={scaleIn}
          whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
          className="cursor-default px-4 py-2 font-bold text-neoBlack dark:text-neoWhite bg-neoWhite dark:bg-gray-900 border-2 border-neoBlack dark:border-neoWhite shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_rgba(240,240,240,0.3)] hover:bg-neoYellow dark:hover:bg-neoPurple transition-colors"
        >
          {skill}
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

const Skills: React.FC = () => {
  return (
    <section id={SectionId.Skills} className="py-24 bg-neoWhite dark:bg-neoBlack pattern-dots border-t-4 border-neoBlack dark:border-neoWhite transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div
            variants={rotateIn}
            className="bg-neoPurple border-4 border-neoBlack dark:border-neoWhite p-4 shadow-neo dark:shadow-neo-dark mb-4 rotate-2"
          >
            <Star className="text-white w-12 h-12" fill="white" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-display font-black text-neoBlack dark:text-neoWhite uppercase tracking-tight"
          >
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-neoPurple to-neoBlue">Matrix</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto"
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
