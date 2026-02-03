import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTOS } from '../constants';
import { SectionId } from '../types';
import { Camera, X, Eye } from 'lucide-react';
import { fadeInUp, rotateIn, scaleIn, staggerContainer, viewportConfig } from '../utils/animations';

const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const activePhoto = PHOTOS.find(p => p.id === selectedPhoto);

  return (
    <section id={SectionId.Gallery} className="py-24 bg-neoYellow dark:bg-gradient-to-br dark:from-neoYellow/20 dark:to-neoGreen/10 border-t-4 border-neoBlack dark:border-neoWhite transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={rotateIn}
          className="bg-neoBlack dark:bg-neoWhite text-white dark:text-neoBlack p-6 inline-block border-4 border-white dark:border-neoBlack shadow-neo dark:shadow-neo-dark mb-12 rotate-1"
        >
          <div className="flex items-center gap-4">
            <Camera size={40} className="text-neoGreen" />
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase">Clicks</h2>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          {PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.id}
              variants={fadeInUp}
              whileHover={{ rotate: -1, y: -4, transition: { duration: 0.2 } }}
              className="break-inside-avoid relative group cursor-pointer bg-white dark:bg-neoBlack p-4 pb-12 border-4 border-neoBlack dark:border-neoWhite shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg transition-all"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <div className="overflow-hidden border-2 border-neoBlack dark:border-neoWhite relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={photo.thumbnailUrl || photo.url}
                  alt={photo.title}
                  className="w-full h-auto object-cover filter contrast-125 dark:contrast-100 hover:contrast-100 transition-all"
                  loading="lazy"
                  width={400}
                  height={300}
                />
                <div className="absolute inset-0 bg-neoBlue/0 dark:bg-neoPurple/0 group-hover:bg-neoBlue/20 dark:group-hover:bg-neoPurple/20 transition-colors flex items-center justify-center">
                  <Eye className="text-white opacity-0 group-hover:opacity-100 w-12 h-12 drop-shadow-lg" />
                </div>
              </div>
              <div className="absolute bottom-3 left-4 font-handwriting text-neoBlack dark:text-neoWhite font-bold text-xl font-mono">
                #{photo.id} {photo.title}
              </div>
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-8 bg-red-500/20 rotate-2 backdrop-blur-sm transform"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-neoBlack/90 dark:bg-neoWhite/10 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-6 right-6 bg-neoRed text-white border-4 border-white dark:border-neoBlack p-2 hover:bg-white hover:text-neoRed hover:border-neoRed transition-colors z-50"
            >
              <X size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white dark:bg-neoBlack p-4 border-4 border-white dark:border-neoWhite shadow-2xl max-h-[90vh] max-w-[90vw] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.url}
                className="max-h-[80vh] object-contain border-2 border-neoBlack dark:border-neoWhite"
                alt={activePhoto.title}
              />
              <div className="mt-4 font-black text-xl text-center uppercase text-neoBlack dark:text-neoWhite">
                {activePhoto.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
