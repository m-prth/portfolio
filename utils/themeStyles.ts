import { DesignSystem } from '../hooks/useTheme';

// Card styles for each theme
export const getCardStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'bg-white dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo dark:shadow-neo-dark';
    case 'dark-minimal':
      return 'bg-zinc-900/50 border border-white/10 rounded-lg backdrop-blur-sm';
    case 'aurora':
      return 'glass-card';
    default:
      return '';
  }
};

export const getCardHoverStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'hover:shadow-neo-lg dark:hover:shadow-neo-dark-lg hover:-translate-y-1';
    case 'dark-minimal':
      return 'hover:bg-zinc-800/50 hover:border-white/20';
    case 'aurora':
      return 'hover:shadow-aurora-lg hover:scale-[1.02]';
    default:
      return '';
  }
};

// Button styles for each theme
export const getButtonPrimaryStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'bg-neoBlack dark:bg-neoWhite text-neoWhite dark:text-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo dark:shadow-neo-dark hover:shadow-neo-hover dark:hover:shadow-neo-dark-hover font-black uppercase';
    case 'dark-minimal':
      return 'bg-white text-black border border-white/20 rounded-md font-medium hover:bg-white/90';
    case 'aurora':
      return 'bg-gradient-to-r from-auroraViolet to-auroraSky text-white rounded-full font-medium shadow-aurora hover:shadow-aurora-glow';
    default:
      return '';
  }
};

export const getButtonSecondaryStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'bg-neoWhite dark:bg-neoBlack text-neoBlack dark:text-neoWhite border-4 border-neoBlack dark:border-neoWhite shadow-neo dark:shadow-neo-dark hover:shadow-neo-hover dark:hover:shadow-neo-dark-hover font-black uppercase';
    case 'dark-minimal':
      return 'bg-transparent text-white border border-white/20 rounded-md font-medium hover:bg-white/10';
    case 'aurora':
      return 'bg-white/10 dark:bg-white/5 backdrop-blur-sm text-zinc-900 dark:text-white border border-white/20 rounded-full font-medium hover:bg-white/20';
    default:
      return '';
  }
};

// Navigation styles for each theme
export const getNavStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'border-b-4 border-neoBlack dark:border-neoWhite bg-neoYellow dark:bg-darkAccent';
    case 'dark-minimal':
      return 'border-b border-white/10 bg-black/80 backdrop-blur-md';
    case 'aurora':
      return 'bg-white/60 dark:bg-black/60 backdrop-blur-xl border-b border-white/20 dark:border-white/10';
    default:
      return '';
  }
};

export const getNavLinkStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'font-bold text-neoBlack dark:text-neoWhite border-2 border-transparent hover:border-neoBlack dark:hover:border-neoWhite hover:bg-white dark:hover:bg-neoBlack hover:shadow-neo-sm dark:hover:shadow-neo-dark-sm uppercase tracking-wide text-sm';
    case 'dark-minimal':
      return 'font-medium text-zinc-400 hover:text-white text-sm tracking-wide';
    case 'aurora':
      return 'font-medium text-zinc-600 dark:text-zinc-300 hover:text-auroraViolet dark:hover:text-auroraViolet text-sm';
    default:
      return '';
  }
};

// Section styles for each theme
export const getSectionStyles = (theme: DesignSystem, colorVariant?: string): string => {
  switch (theme) {
    case 'neo-brutalist':
      return `border-t-4 border-neoBlack dark:border-neoWhite transition-colors duration-300 ${colorVariant || ''}`;
    case 'dark-minimal':
      return 'bg-black border-t border-white/5';
    case 'aurora':
      return 'relative overflow-hidden';
    default:
      return '';
  }
};

// Heading styles for each theme
export const getHeadingStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'font-display font-black text-neoBlack dark:text-neoWhite uppercase';
    case 'dark-minimal':
      return 'font-serif font-normal text-white tracking-tight';
    case 'aurora':
      return 'font-aurora-display text-zinc-900 dark:text-white';
    default:
      return '';
  }
};

// Badge/Tag styles for each theme
export const getBadgeStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'bg-neoBlack dark:bg-neoWhite text-white dark:text-neoBlack px-2 py-1 text-xs font-bold border-2 border-neoBlack dark:border-neoWhite';
    case 'dark-minimal':
      return 'text-zinc-400 text-xs font-medium';
    case 'aurora':
      return 'bg-auroraViolet/10 text-auroraViolet dark:bg-auroraViolet/20 dark:text-auroraViolet px-3 py-1 text-xs font-medium rounded-full';
    default:
      return '';
  }
};

// Input styles for each theme
export const getInputStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'bg-white dark:bg-gray-900 border-4 border-neoBlack dark:border-neoWhite font-mono font-bold focus:outline-none focus:bg-neoYellow dark:focus:bg-darkAccent';
    case 'dark-minimal':
      return 'bg-zinc-900 border border-white/10 rounded-md font-medium focus:outline-none focus:border-white/30';
    case 'aurora':
      return 'bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:border-auroraViolet/50 focus:ring-2 focus:ring-auroraViolet/20';
    default:
      return '';
  }
};

// Modal styles for each theme
export const getModalStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'bg-neoWhite dark:bg-neoBlack border-4 border-neoBlack dark:border-neoWhite shadow-neo-lg dark:shadow-neo-dark-lg';
    case 'dark-minimal':
      return 'bg-zinc-900 border border-white/10 rounded-xl';
    case 'aurora':
      return 'glass-card';
    default:
      return '';
  }
};

// Window chrome (traffic lights) visibility
export const showWindowChrome = (theme: DesignSystem): boolean => {
  return theme === 'neo-brutalist';
};

// Get body background classes for each theme
export const getBodyBgStyles = (theme: DesignSystem): string => {
  switch (theme) {
    case 'neo-brutalist':
      return 'bg-neoWhite dark:bg-neoBlack';
    case 'dark-minimal':
      return 'bg-black';
    case 'aurora':
      return 'bg-zinc-50 dark:bg-zinc-950';
    default:
      return '';
  }
};

// Animation variants for each theme
export const getAnimationConfig = (theme: DesignSystem) => {
  switch (theme) {
    case 'neo-brutalist':
      return {
        duration: 0.3,
        includeRotation: true,
        includeScale: true,
      };
    case 'dark-minimal':
      return {
        duration: 0.5,
        includeRotation: false,
        includeScale: false,
      };
    case 'aurora':
      return {
        duration: 0.4,
        includeRotation: false,
        includeScale: true,
      };
    default:
      return {
        duration: 0.3,
        includeRotation: true,
        includeScale: true,
      };
  }
};
