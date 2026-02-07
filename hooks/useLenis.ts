import { useEffect, useRef, useState } from 'react';

interface LenisOptions {
  duration?: number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
}

// Simple smooth scrolling implementation as a fallback
// Lenis can be installed separately: npm install @studio-freight/lenis
export const useLenis = (enabled: boolean, options: LenisOptions = {}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.style.scrollBehavior = '';
      setIsActive(false);
      return;
    }

    // Use native smooth scroll as fallback (works great in modern browsers)
    document.documentElement.style.scrollBehavior = 'smooth';
    setIsActive(true);

    return () => {
      document.documentElement.style.scrollBehavior = '';
      setIsActive(false);
    };
  }, [enabled]);

  return { isActive };
};
