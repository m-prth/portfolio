import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';
import { CONTACT_CONTENT } from '@/constants';
import { fadeInUp, scaleIn, staggerContainer, viewportConfig } from '../utils/animations';
import { useTheme } from '../hooks/useTheme';

const socialLinks = [
  {
    icon: <Linkedin size={24} />,
    bg: 'bg-blue-600',
    href: CONTACT_CONTENT.linkedin,
    label: 'LinkedIn'
  },
  {
    icon: <Github size={24} />,
    bg: 'bg-gray-800 dark:bg-gray-700',
    href: CONTACT_CONTENT.github,
    label: 'GitHub'
  },
  {
    icon: <Mail size={24} />,
    bg: 'bg-red-500',
    href: `mailto:${CONTACT_CONTENT.email}`,
    label: 'Email'
  }
];

// Neo-Brutalist Layout - Centered card with decorations
const NeoBrutalistContact: React.FC = () => {
  return (
    <section id={SectionId.Contact} className="transition-colors duration-300 py-24 bg-neoBlue dark:bg-gradient-to-br dark:from-neoBlue/20 dark:to-neoPurple/10 border-t-4 border-neoBlack dark:border-neoWhite">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg p-8 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative background stripe */}
          <div className="absolute top-0 left-0 w-full h-4 bg-neoRed border-b-4 border-neoBlack dark:border-neoWhite"></div>

          <motion.h2
            variants={fadeInUp}
            className="mt-4 mb-6 text-5xl md:text-7xl font-display font-black text-neoBlack dark:text-neoWhite uppercase"
          >
            HIT ME UP
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mb-12 text-xl font-bold text-neoBlack dark:text-neoWhite max-w-lg mx-auto"
          >
            Want to talk about soccer, F1, video games, watches, photography or mechanical keyboards?
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="flex justify-center gap-6 mb-12"
          >
            {socialLinks.map((item, i) => (
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

// Dark Minimal Layout - Minimalist footer style
const DarkMinimalContact: React.FC = () => {
  return (
    <section id={SectionId.Contact} className="transition-colors duration-300 py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-serif font-normal text-white tracking-tight mb-8"
          >
            <span className="italic">Get in Touch</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-zinc-400 font-light mb-16 max-w-md mx-auto"
          >
            Always open to discussing new opportunities, creative ideas, or ways to collaborate.
          </motion.p>

          {/* Large email link */}
          <motion.a
            variants={fadeInUp}
            href={`mailto:${CONTACT_CONTENT.email}`}
            className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-serif text-white hover:text-zinc-300 transition-colors mb-16"
          >
            <span className="italic">{CONTACT_CONTENT.email}</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
          </motion.a>

          {/* Small social icons */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center gap-8 mb-16"
          >
            <a
              href={CONTACT_CONTENT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={CONTACT_CONTENT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
          </motion.div>

          <motion.footer
            variants={fadeInUp}
            className="text-zinc-600 text-sm font-light"
          >
            © 2026 Parth Mistry
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
};

// Aurora Layout - Floating glass elements
const AuroraContact: React.FC = () => {
  return (
    <section id={SectionId.Contact} className="transition-colors duration-300 py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Floating decorative orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-br from-auroraViolet/20 to-auroraViolet/5 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-[15%] w-40 h-40 bg-gradient-to-br from-auroraSky/20 to-auroraSky/5 rounded-full blur-2xl"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Floating layout with multiple cards */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {/* Main title card - center */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeInUp}
              className="relative z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card p-10 md:p-16 text-center"
              >
                <h2 className="text-4xl md:text-5xl font-aurora-display text-zinc-900 dark:text-white mb-4">
                  Let's <span className="bg-gradient-to-r from-auroraViolet to-auroraSky bg-clip-text text-transparent">Connect</span>
                </h2>
                <p className="text-zinc-600 dark:text-zinc-300 max-w-md mx-auto mb-8">
                  Always open to discussing new opportunities, creative ideas, or ways to collaborate.
                </p>

                {/* Email button */}
                <motion.a
                  href={`mailto:${CONTACT_CONTENT.email}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-auroraViolet to-auroraSky text-white px-8 py-4 rounded-full font-medium hover:shadow-aurora-glow transition-shadow"
                >
                  <Mail size={20} />
                  <span>{CONTACT_CONTENT.email}</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Floating social card - top right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.3 }}
              className="absolute top-0 right-0 md:right-[-40px] z-10 hidden md:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="glass-card p-4"
              >
                <div className="flex gap-3">
                  <motion.a
                    href={CONTACT_CONTENT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="bg-white/50 dark:bg-white/10 backdrop-blur-sm text-zinc-600 dark:text-white p-3 border border-white/20 rounded-full hover:bg-white/80 dark:hover:bg-white/20 transition-all"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href={CONTACT_CONTENT.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="bg-white/50 dark:bg-white/10 backdrop-blur-sm text-zinc-600 dark:text-white p-3 border border-white/20 rounded-full hover:bg-white/80 dark:hover:bg-white/20 transition-all"
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative card - bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.5 }}
              className="absolute bottom-[-20px] left-0 md:left-[-30px] z-10 hidden md:block"
            >
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="glass-card p-4"
              >
                <span className="text-2xl">✨</span>
              </motion.div>
            </motion.div>

            {/* Another decorative element - top left */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportConfig}
              transition={{ delay: 0.7 }}
              className="absolute top-[-10px] left-[20%] z-10 hidden md:block"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="glass-card px-4 py-2"
              >
                <span className="text-auroraViolet text-sm font-medium">Say hello</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            className="text-center mt-16 text-zinc-400 text-sm"
          >
            © 2026 Parth Mistry
          </motion.footer>

          {/* Mobile social icons (shown only on mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportConfig}
            className="flex justify-center gap-4 mt-8 md:hidden"
          >
            {socialLinks.slice(0, 2).map((item, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.1 }}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/50 dark:bg-white/10 backdrop-blur-sm text-zinc-600 dark:text-white p-4 border border-white/20 rounded-full hover:bg-white/80 dark:hover:bg-white/20 transition-all"
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const { designSystem } = useTheme();

  if (designSystem === 'dark-minimal') {
    return <DarkMinimalContact />;
  }

  if (designSystem === 'aurora') {
    return <AuroraContact />;
  }

  return <NeoBrutalistContact />;
};

export default Contact;
