// Animation configuration for consistent, snappy neo-brutalist animations

export const ANIMATION_CONFIG = {
  // Base durations
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,

  // Spring settings for snappy, bold movements
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 25
  },

  // Stagger timing
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15
  }
};

// Viewport settings for scroll-triggered animations
export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: "-50px"
};

// Fade in from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...ANIMATION_CONFIG.spring, duration: ANIMATION_CONFIG.normal }
  }
};

// Fade in from top
export const fadeInDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...ANIMATION_CONFIG.spring, duration: ANIMATION_CONFIG.normal }
  }
};

// Fade in from left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...ANIMATION_CONFIG.spring, duration: ANIMATION_CONFIG.normal }
  }
};

// Fade in from right
export const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...ANIMATION_CONFIG.spring, duration: ANIMATION_CONFIG.normal }
  }
};

// Scale in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...ANIMATION_CONFIG.spring, duration: ANIMATION_CONFIG.normal }
  }
};

// Rotate in (for cards with rotation)
export const rotateIn = {
  hidden: { opacity: 0, rotate: -5, scale: 0.95 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { ...ANIMATION_CONFIG.spring, duration: ANIMATION_CONFIG.slow }
  }
};

// Container for staggered children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.normal,
      delayChildren: 0.1
    }
  }
};

// Fast stagger container
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_CONFIG.stagger.fast,
      delayChildren: 0.05
    }
  }
};
