import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { SectionId } from '../types';
import { Database, BrainCircuit, Star, ChartArea, Workflow } from 'lucide-react';
import { fadeInUp, rotateIn, scaleIn, staggerContainer, staggerContainerFast, viewportConfig } from '../utils/animations';
import { useTheme } from '../hooks/useTheme';

// Skill categories with metadata
const skillCategories = [
  { key: 'ai', title: 'AI / ML', icon: <BrainCircuit size={24} />, color: 'bg-neoRed', rotate: '-rotate-1', skills: SKILLS.ai },
  { key: 'bi', title: 'Analytics', icon: <ChartArea size={24} />, color: 'bg-neoGreen', rotate: 'rotate-1', skills: SKILLS.bi },
  { key: 'engineering', title: 'Engineering', icon: <Database size={24} />, color: 'bg-neoBlue', rotate: '-rotate-2', skills: SKILLS.engineering },
  { key: 'devops', title: 'DevOps', icon: <Workflow size={24} />, color: 'bg-neoPurple', rotate: 'rotate-2', skills: SKILLS.devops },
];

// Neo-Brutalist Layout - 2x2 Card Grid
const NeoBrutalistSkills: React.FC = () => {
  return (
    <section id={SectionId.Skills} className="transition-colors duration-300 py-24 bg-neoWhite dark:bg-neoBlack pattern-dots border-t-4 border-neoBlack dark:border-neoWhite">
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
          {skillCategories.map((category) => (
            <motion.div
              key={category.key}
              variants={rotateIn}
              whileHover={{ scale: 1.02, rotate: 0 }}
              className={`bg-white dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite p-8 shadow-neo-lg dark:shadow-neo-dark-lg ${category.rotate} relative overflow-hidden group`}
            >
              {/* Icon badge */}
              <div className={`absolute top-0 right-0 w-16 h-16 ${category.color} border-l-4 border-b-4 border-neoBlack dark:border-neoWhite flex items-center justify-center`}>
                <div className="text-neoBlack">{category.icon}</div>
              </div>

              <h3 className="text-3xl font-black text-neoBlack dark:text-neoWhite mb-8">
                {category.title}
              </h3>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainerFast}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    variants={scaleIn}
                    whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                    className="cursor-default px-4 py-2 font-bold text-neoBlack dark:text-neoWhite bg-neoWhite dark:bg-gray-900 border-2 border-neoBlack dark:border-neoWhite shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_rgba(240,240,240,0.3)] hover:bg-neoYellow dark:hover:bg-darkAccent transition-colors"
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Dark Minimal Layout - Simple Typography List
const DarkMinimalSkills: React.FC = () => {
  return (
    <section id={SectionId.Skills} className="transition-colors duration-300 py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-white tracking-tight">
            <span className="italic">Skills</span>
          </h2>
          <p className="text-zinc-500 font-light mt-4">
            Technologies and tools I work with
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="space-y-16"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.key}
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-serif font-normal text-white mb-4">
                {category.title}
              </h3>
              <p className="text-zinc-400 font-light leading-relaxed">
                {category.skills.join(', ')}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Aurora Layout - Flowing Asymmetric Grid
const AuroraSkills: React.FC = () => {
  // Define varying sizes and positions for asymmetric layout
  const cardVariants = [
    { size: 'lg', offset: 'mt-0', rotation: 'rotate-1' },
    { size: 'md', offset: 'mt-8', rotation: '-rotate-1' },
    { size: 'md', offset: 'mt-4', rotation: 'rotate-2' },
    { size: 'lg', offset: 'mt-12', rotation: '-rotate-2' },
  ];

  return (
    <section id={SectionId.Skills} className="transition-colors duration-300 py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-auroraViolet/20 to-auroraSky/20 p-4 rounded-2xl mb-4"
          >
            <Star className="text-auroraViolet w-8 h-8" />
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-aurora-display text-zinc-900 dark:text-white"
          >
            Skills & <span className="bg-gradient-to-r from-auroraViolet to-auroraSky bg-clip-text text-transparent">Expertise</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {skillCategories.map((category, index) => {
            const variant = cardVariants[index];
            const skillCount = category.skills.length;

            return (
              <motion.div
                key={category.key}
                variants={scaleIn}
                whileHover={{ scale: 1.02, rotate: 0 }}
                className={`${variant.offset} ${variant.rotation}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className="glass-card p-8 hover:shadow-aurora-lg transition-shadow"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-auroraViolet/20 to-auroraSky/20 mb-4">
                    <div className="text-auroraViolet">{category.icon}</div>
                  </div>

                  <h3 className="text-xl font-aurora-display text-zinc-900 dark:text-white mb-6">
                    {category.title.toLowerCase()}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/50 dark:bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-zinc-700 dark:text-zinc-300 border border-white/20"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Skills: React.FC = () => {
  const { designSystem } = useTheme();

  if (designSystem === 'dark-minimal') {
    return <DarkMinimalSkills />;
  }

  if (designSystem === 'aurora') {
    return <AuroraSkills />;
  }

  return <NeoBrutalistSkills />;
};

export default Skills;
