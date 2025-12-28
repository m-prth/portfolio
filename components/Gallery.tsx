import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTOS } from '../constants';
import { SectionId } from '../types';
import { Camera, X, Eye } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <section id={SectionId.Gallery} className="py-24 bg-neoYellow border-t-4 border-neoBlack">
      <div className="container mx-auto px-6">
        <div className="bg-neoBlack text-white p-6 inline-block border-4 border-white shadow-neo mb-12 rotate-1">
          <div className="flex items-center gap-4">
            <Camera size={40} className="text-neoGreen" />
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase">Clicks</h2>
          </div>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="break-inside-avoid relative group cursor-pointer bg-white p-4 pb-12 border-4 border-neoBlack shadow-neo hover:shadow-neo-lg transition-all hover:-rotate-1"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <div className="overflow-hidden border-2 border-neoBlack relative">
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-auto object-cover filter contrast-125 hover:contrast-100 transition-all"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-neoBlue/0 group-hover:bg-neoBlue/20 transition-colors flex items-center justify-center">
                   <Eye className="text-white opacity-0 group-hover:opacity-100 w-12 h-12 drop-shadow-lg" />
                </div>
              </div>
              <div className="absolute bottom-3 left-4 font-handwriting text-neoBlack font-bold text-xl font-mono">
                #{photo.id} {photo.title}
              </div>
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-24 h-8 bg-red-500/20 rotate-2 backdrop-blur-sm transform"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neoBlack/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <button className="absolute top-6 right-6 bg-neoRed text-white border-4 border-white p-2 hover:bg-white hover:text-neoRed hover:border-neoRed transition-colors">
              <X size={32} />
            </button>
            <div className="bg-white p-4 border-4 border-white shadow-2xl max-h-[90vh] max-w-[90vw]">
               <img 
                src={PHOTOS.find(p => p.id === selectedPhoto)?.url} 
                className="max-h-[80vh] object-contain border-2 border-neoBlack"
                alt="Full view" 
              />
              <div className="mt-4 font-black text-xl text-center uppercase">
                {PHOTOS.find(p => p.id === selectedPhoto)?.title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;