import React from 'react';
import { SectionId } from '../types';
import { Mail, Linkedin, Github, Instagram, Send } from 'lucide-react';
import { CONTACT_CONTENT } from '@/constants';

const Contact: React.FC = () => {
  return (
    <section id={SectionId.Contact} className="py-24 bg-neoBlue border-t-4 border-neoBlack">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-neoWhite border-4 border-neoBlack shadow-neo-lg p-8 md:p-16 text-center relative overflow-hidden">
          {/* Decorative background stripes */}
          <div className="absolute top-0 left-0 w-full h-4 bg-neoRed border-b-4 border-neoBlack"></div>
          
          <h2 className="text-5xl md:text-7xl font-display font-black text-neoBlack mb-6 mt-4 uppercase">
            HIT ME UP
          </h2>
          <p className="text-xl font-bold text-neoBlack mb-12 max-w-lg mx-auto">
            Want to talk about soccer, F1, video games, watches, photography or mechanical keyboards?
          </p>

          <div className="flex justify-center gap-6 mb-12">
            {[
              { 
                icon: <Linkedin size={24} />, 
                bg: 'bg-blue-600', 
                href: CONTACT_CONTENT.linkedin 
              },
              { 
                icon: <Github size={24} />, 
                bg: 'bg-gray-800', 
                href: CONTACT_CONTENT.github 
              },
              { 
                icon: <Mail size={24} />, 
                bg: 'bg-red-500', 
                href: `mailto:${CONTACT_CONTENT.email}` // Added mailto: prefix
              }
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href}
                target={item.href.startsWith('http') ? "_blank" : "_self"} // Opens links in new tab, keeps email in same
                rel="noopener noreferrer"
                className={`${item.bg} text-white p-4 border-4 border-neoBlack shadow-neo hover:shadow-neo-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:shadow-none active:translate-y-1`}
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* <div className="bg-neoYellow p-8 border-4 border-neoBlack shadow-neo transform -rotate-1">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="YOUR_EMAIL@ADDRESS.COM" 
                className="flex-1 bg-white border-4 border-neoBlack px-6 py-4 text-neoBlack font-bold placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-neoBlue"
              />
              <button className="bg-neoBlack text-white font-black px-8 py-4 text-lg border-4 border-neoBlack hover:bg-white hover:text-neoBlack transition-colors flex items-center justify-center gap-2">
                SEND IT <Send size={20} />
              </button>
            </div>
          </div> */}

          <footer className="mt-16 text-neoBlack font-mono font-bold text-sm opacity-50">
            © 2026 PARTH MISTRY. BUILT DIFFERENTLY.
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Contact;