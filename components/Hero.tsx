import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { HERO_CONTENT } from '../constants';
import { SectionId } from '../types';

const Marquee: React.FC<{ text: string; direction?: 'left' | 'right' }> = ({ text, direction = 'left' }) => (
  <div className={`w-full overflow-hidden bg-neoBlack text-neoWhite border-y-4 border-neoBlack py-3 ${direction === 'right' ? 'rotate-1' : '-rotate-1'} z-10 my-4`}>
    <div className="animate-marquee whitespace-nowrap flex gap-8 font-mono font-bold text-xl">
      {Array(10).fill(text).map((t, i) => (
        <span key={i} className="flex items-center gap-4">
          {t} <span className="text-neoGreen">★</span>
        </span>
      ))}
    </div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section id={SectionId.Hero} className="relative min-h-screen flex flex-col pt-20 overflow-hidden bg-neoWhite transition-colors duration-300">
      {/* Background Blobs - blend mode adjusted for dark mode */}
      <div className="absolute top-20 right-[-100px] w-[400px] h-[400px] bg-neoPurple rounded-full border-4 border-neoBlack mix-blend-multiply dark:mix-blend-screen opacity-20 blur-none" />
      <div className="absolute bottom-0 left-[-100px] w-[300px] h-[300px] bg-neoOrange rounded-full border-4 border-neoBlack mix-blend-multiply dark:mix-blend-screen opacity-20 blur-none" />

      <div className="container mx-auto px-6 pt-12 flex-grow flex flex-col justify-center relative z-20">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Left: Content */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block bg-neoBlue text-white px-4 py-2 font-mono font-bold border-2 border-neoBlack shadow-neo mb-6 rotate-2"
            >
              HELLO_WORLD.INIT()
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-black leading-[0.9] text-neoBlack mb-8"
            >
              I AM <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neoOrange to-neoRed decoration-slice">
                PARTH MISTRY
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-display text-black border-l-8 border-neoYellow pl-6 mb-10 max-w-xl"
            >
              {HERO_CONTENT.headline}
            </motion.p>


            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '2px 2px 0px 0px var(--neo-shadow)' }}
                whileTap={{ scale: 0.98, translate: '4px 4px' }}
                onClick={() => document.getElementById(SectionId.Projects)?.scrollIntoView({behavior: 'smooth'})}
                className="bg-neoBlack text-neoWhite px-8 py-4 font-black text-lg border-2 border-neoBlack shadow-neo hover:shadow-neo-hover transition-all flex items-center gap-3"
              >
                VIEW WORK <ArrowDown size={24} />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '2px 2px 0px 0px var(--neo-shadow)' }}
                whileTap={{ scale: 0.98, translate: '4px 4px' }}
                className="bg-neoCard text-neoBlack px-8 py-4 font-black text-lg border-2 border-neoBlack shadow-neo hover:shadow-neo-hover transition-all flex items-center gap-3"
              >
                RESUME <Download size={24} />
              </motion.button>
            </div>
          </div>

          {/* Right: Interactive Terminal */}
          <div className="md:col-span-5 relative hidden md:block perspective-1000">
             {/* Decorative underlay */}
            <div className="absolute top-4 left-4 w-full h-full bg-neoPurple border-4 border-neoBlack -z-10"></div>

            <motion.div 
              initial={{ rotateY: 10, rotateX: 5, opacity: 0 }}
              animate={{ rotateY: 0, rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-[#111111] border-4 border-neoBlack p-1 shadow-neo-lg"
            >
              {/* Terminal Header */}
              <div className="bg-[#E0E0E0] border-b-4 border-neoBlack p-2 flex items-center justify-between">
                <div className="flex gap-2 pl-1">
                   <div className="w-4 h-4 rounded-full bg-neoRed border-2 border-black"></div>
                   <div className="w-4 h-4 rounded-full bg-neoYellow border-2 border-black"></div>
                   <div className="w-4 h-4 rounded-full bg-neoGreen border-2 border-black"></div>
                </div>
                <span className="font-mono font-bold text-black text-sm uppercase tracking-widest">term_v1.sh</span>
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
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Marquee text="DATA SCIENCE • DATA ENGINEERING • BUSINESS INTELLIGENCE" />
      </div>
    </section>
  );
};

export default Hero;