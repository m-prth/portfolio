import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { Mail, Linkedin, Github } from 'lucide-react';
import { CONTACT_CONTENT } from '@/constants';
import { fadeInUp, scaleIn, staggerContainer, viewportConfig } from '../utils/animations';

const Contact: React.FC = () => {
  return (
    <section id={SectionId.Contact} className="py-24 bg-neoBlue dark:bg-gradient-to-br dark:from-neoBlue/20 dark:to-neoPurple/10 border-t-4 border-neoBlack dark:border-neoWhite transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg p-8 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative background stripes */}
          <div className="absolute top-0 left-0 w-full h-4 bg-neoRed border-b-4 border-neoBlack dark:border-neoWhite"></div>

          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-display font-black text-neoBlack dark:text-neoWhite mb-6 mt-4 uppercase"
          >
            HIT ME UP
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl font-bold text-neoBlack dark:text-neoWhite mb-12 max-w-lg mx-auto"
          >
            Want to talk about soccer, F1, video games, watches, photography or mechanical keyboards?
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="flex justify-center gap-6 mb-12"
          >
            {[
              {
                icon: <Linkedin size={24} />,
                bg: 'bg-blue-600',
                href: CONTACT_CONTENT.linkedin
              },
              {
                icon: <Github size={24} />,
                bg: 'bg-gray-800 dark:bg-gray-700',
                href: CONTACT_CONTENT.github
              },
              {
                icon: <Mail size={24} />,
                bg: 'bg-red-500',
                href: `mailto:${CONTACT_CONTENT.email}`
              }
            ].map((item, i) => (
              <motion.a
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                href={item.href}
                target={item.href.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`${item.bg} text-white p-4 border-4 border-neoBlack dark:border-neoWhite shadow-neo dark:shadow-neo-dark hover:shadow-neo-hover dark:hover:shadow-neo-dark-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-y-1`}
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.footer
            variants={fadeInUp}
            className="mt-16 text-neoBlack dark:text-neoWhite font-mono font-bold text-sm opacity-50"
          >
            © 2026 PARTH MISTRY. BUILT DIFFERENTLY.
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
