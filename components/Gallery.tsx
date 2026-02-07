import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTOS } from '../constants';
import { SectionId } from '../types';
import { Camera, X, Eye } from 'lucide-react';
import { fadeInUp, rotateIn, scaleIn, staggerContainer, viewportConfig } from '../utils/animations';
import { useTheme } from '../hooks/useTheme';

// Neo-Brutalist Layout - 3-column masonry
const NeoBrutalistGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const activePhoto = PHOTOS.find(p => p.id === selectedPhoto);

  return (
    <section id={SectionId.Gallery} className="transition-colors duration-300 py-24 bg-neoYellow dark:bg-gradient-to-br dark:from-neoYellow/20 dark:to-neoGreen/10 border-t-4 border-neoBlack dark:border-neoWhite">
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
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase">
              Clicks
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          {PHOTOS.map((photo) => (
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
                <div className="absolute inset-0 bg-neoBlue/0 dark:bg-darkAccent/0 group-hover:bg-neoBlue/20 dark:group-hover:bg-neoPurple/20 transition-colors flex items-center justify-center">
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

// Dark Minimal Layout - 2-column grid
const DarkMinimalGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const activePhoto = PHOTOS.find(p => p.id === selectedPhoto);

  return (
    <section id={SectionId.Gallery} className="transition-colors duration-300 py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-white tracking-tight">
            <span className="italic">Photography</span>
          </h2>
          <p className="text-zinc-500 font-light mt-4">
            Moments captured through my lens
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {PHOTOS.map((photo) => (
            <motion.div
              key={photo.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.01 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <img
                src={photo.thumbnailUrl || photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Eye className="text-white opacity-0 group-hover:opacity-100 w-8 h-8 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm font-light">{photo.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 transition-colors z-50"
            >
              <X size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[90vh] max-w-[90vw] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.url}
                className="max-h-[80vh] object-contain rounded-lg"
                alt={activePhoto.title}
              />
              <p className="mt-4 text-white text-center font-light">
                {activePhoto.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Aurora Layout - Featured + Thumbnails
const AuroraGallery: React.FC = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const featuredPhoto = PHOTOS[featuredIndex];
  const activePhoto = PHOTOS.find(p => p.id === selectedPhoto);

  return (
    <section id={SectionId.Gallery} className="transition-colors duration-300 py-24 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="glass-card p-6 inline-block mb-12"
        >
          <div className="flex items-center gap-4">
            <Camera size={32} className="text-auroraViolet" />
            <h2 className="text-4xl md:text-5xl font-aurora-display text-zinc-900 dark:text-white">
              Photography
            </h2>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={scaleIn}
          className="mb-6"
        >
          <div
            className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl cursor-pointer glass-card p-2 group"
            onClick={() => setSelectedPhoto(featuredPhoto.id)}
          >
            <motion.img
              key={featuredPhoto.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={featuredPhoto.url}
              alt={featuredPhoto.title}
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
              <Eye className="text-white w-10 h-10" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="glass-card px-4 py-2">
                <p className="text-zinc-900 dark:text-white font-medium">
                  {featuredPhoto.title}
                </p>
              </div>
              <div className="glass-card px-3 py-1">
                <p className="text-zinc-600 dark:text-zinc-300 text-sm">
                  {featuredIndex + 1} / {PHOTOS.length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Strip */}
        <div className="relative">
          {/* Gradient fade on left */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

          {/* Gradient fade on right */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PHOTOS.map((photo, index) => (
              <motion.div
                key={photo.id}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 w-24 h-24 md:w-32 md:h-32 snap-center cursor-pointer rounded-xl overflow-hidden transition-all ${
                  index === featuredIndex
                    ? 'ring-2 ring-auroraViolet ring-offset-2 ring-offset-white dark:ring-offset-zinc-950'
                    : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setFeaturedIndex(index)}
              >
                <img
                  src={photo.thumbnailUrl || photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/20 transition-colors z-50"
            >
              <X size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-card p-4 max-h-[90vh] max-w-[90vw] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.url}
                className="max-h-[80vh] object-contain rounded-xl"
                alt={activePhoto.title}
              />
              <p className="mt-4 text-zinc-900 dark:text-white text-center font-medium">
                {activePhoto.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Gallery: React.FC = () => {
  const { designSystem } = useTheme();

  if (designSystem === 'dark-minimal') {
    return <DarkMinimalGallery />;
  }

  if (designSystem === 'aurora') {
    return <AuroraGallery />;
  }

  return <NeoBrutalistGallery />;
};

export default Gallery;
